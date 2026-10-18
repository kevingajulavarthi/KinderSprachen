import React, { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';
import { UserProgress, ParentSettings, Language } from '../types';
import {
  loadStoredProgress,
  saveStoredProgress,
  loadStoredSettings,
  saveStoredSettings,
  clearAllLearningData,
  DEFAULT_PROGRESS,
} from '../utils/storage';
import { speakGerman, playSoundEffect, stopSpeaking, SpeechOptions } from '../utils/audio';
import confetti from 'canvas-confetti';

interface LearningContextType {
  progress: UserProgress;
  settings: ParentSettings;
  language: Language;
  setLanguage: (lang: Language) => void;
  playAudio: (text: string, customOptions?: SpeechOptions) => void;
  playSfx: (type: 'correct' | 'wrong' | 'star' | 'pop' | 'fanfare' | 'click') => void;
  triggerCelebration: () => void;
  completeLesson: (lessonId: string, starsEarned: number, newWords: string[]) => void;
  toggleFavoriteWord: (word: string) => void;
  recordGamePlayed: () => void;
  recordStoryRead: () => void;
  recordSpeakingPracticed: () => void;
  updateSettings: (newSettings: Partial<ParentSettings>) => void;
  resetAllData: () => void;
  mascotMessage: { de: string; en: string } | null;
  showMascotMessage: (de: string, en: string, durationMs?: number) => void;
}

const LearningContext = createContext<LearningContextType | undefined>(undefined);

export const LearningProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [progress, setProgress] = useState<UserProgress>(loadStoredProgress);
  const [settings, setSettings] = useState<ParentSettings>(loadStoredSettings);
  const [mascotMessage, setMascotMessage] = useState<{ de: string; en: string } | null>({
    de: 'Hallo! Schön, dass du da bist!',
    en: 'Hello! So happy you are here!',
  });

  // Keep localStorage synchronized
  useEffect(() => {
    saveStoredProgress(progress);
  }, [progress]);

  useEffect(() => {
    saveStoredSettings(settings);
  }, [settings]);

  const setLanguage = useCallback((lang: Language) => {
    setSettings((prev) => ({ ...prev, interfaceLanguage: lang }));
  }, []);

  const showMascotMessage = useCallback((de: string, en: string, durationMs = 4500) => {
    setMascotMessage({ de, en });
    if (durationMs > 0) {
      setTimeout(() => {
        setMascotMessage(null);
      }, durationMs);
    }
  }, []);

  const playAudio = useCallback(
    (text: string, customOptions?: SpeechOptions) => {
      speakGerman(text, {
        rate: settings.speechRate,
        pitch: settings.speechPitch,
        ...customOptions,
      });
    },
    [settings.speechRate, settings.speechPitch]
  );

  const playSfx = useCallback(
    (type: 'correct' | 'wrong' | 'star' | 'pop' | 'fanfare' | 'click') => {
      if (settings.soundEffects) {
        playSoundEffect(type);
      }
    },
    [settings.soundEffects]
  );

  const triggerCelebration = useCallback(() => {
    playSfx('fanfare');
    try {
      confetti({
        particleCount: 65,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#55B8FF', '#FFD966', '#75E6A6', '#FF8F9C', '#B7A4FF'],
      });
    } catch {
      // Fallback
    }
  }, [playSfx]);

  const completeLesson = useCallback(
    (lessonId: string, starsEarned: number, newWords: string[]) => {
      setProgress((prev) => {
        const isNewCompletion = !prev.completedLessons.includes(lessonId);
        const updatedCompleted = isNewCompletion
          ? [...prev.completedLessons, lessonId]
          : prev.completedLessons;

        const combinedWords = Array.from(new Set([...prev.wordsLearned, ...newWords]));
        const updatedStars = prev.stars + (isNewCompletion ? starsEarned : 1);
        const newLevel = Math.max(1, Math.min(6, Math.floor(updatedCompleted.length / 2) + 1));

        return {
          ...prev,
          completedLessons: updatedCompleted,
          stars: updatedStars,
          wordsLearned: combinedWords,
          level: newLevel,
          dailyWordsCount: prev.dailyWordsCount + newWords.length,
        };
      });

      triggerCelebration();
      showMascotMessage('Fantastisch! Lektion geschafft!', 'Fantastic! Lesson completed!');
    },
    [triggerCelebration, showMascotMessage]
  );

  const toggleFavoriteWord = useCallback((word: string) => {
    setProgress((prev) => {
      const exists = prev.favoriteWords.includes(word);
      const updated = exists
        ? prev.favoriteWords.filter((w) => w !== word)
        : [...prev.favoriteWords, word];
      return { ...prev, favoriteWords: updated };
    });
  }, []);

  const recordGamePlayed = useCallback(() => {
    setProgress((prev) => ({
      ...prev,
      gamesPlayedCount: prev.gamesPlayedCount + 1,
      stars: prev.stars + 1,
    }));
    playSfx('star');
  }, [playSfx]);

  const recordStoryRead = useCallback(() => {
    setProgress((prev) => ({
      ...prev,
      storiesReadCount: prev.storiesReadCount + 1,
      stars: prev.stars + 2,
    }));
    triggerCelebration();
  }, [triggerCelebration]);

  const recordSpeakingPracticed = useCallback(() => {
    setProgress((prev) => ({
      ...prev,
      speakingPracticedCount: prev.speakingPracticedCount + 1,
      stars: prev.stars + 1,
    }));
    playSfx('star');
  }, [playSfx]);

  const updateSettings = useCallback((newSettings: Partial<ParentSettings>) => {
    setSettings((prev) => ({ ...prev, ...newSettings }));
  }, []);

  const resetAllData = useCallback(() => {
    stopSpeaking();
    clearAllLearningData();
    setProgress(DEFAULT_PROGRESS);
    showMascotMessage('Auf ein Neues!', 'Ready for a fresh start!');
  }, [showMascotMessage]);

  return (
    <LearningContext.Provider
      value={{
        progress,
        settings,
        language: settings.interfaceLanguage,
        setLanguage,
        playAudio,
        playSfx,
        triggerCelebration,
        completeLesson,
        toggleFavoriteWord,
        recordGamePlayed,
        recordStoryRead,
        recordSpeakingPracticed,
        updateSettings,
        resetAllData,
        mascotMessage,
        showMascotMessage,
      }}
    >
      {children}
    </LearningContext.Provider>
  );
};

export function useLearning(): LearningContextType {
  const context = useContext(LearningContext);
  if (!context) {
    throw new Error('useLearning must be used within a LearningProvider');
  }
  return context;
}
