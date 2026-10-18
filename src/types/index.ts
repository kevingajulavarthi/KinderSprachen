export type Language = 'en' | 'de';

export interface VocabularyItem {
  id: string;
  german: string;
  english: string;
  article?: 'der' | 'die' | 'das';
  phonetic: string;
  category: string;
  emoji: string;
  exampleSentenceDe?: string;
  exampleSentenceEn?: string;
}

export interface AlphabetItem {
  letter: string;
  isSpecial?: boolean; // For Ä, Ö, Ü, ß
  nameDe: string;
  phonetic: string;
  wordDe: string;
  wordEn: string;
  emoji: string;
  exampleSentence?: string;
}

export interface LessonStep {
  type: 'look' | 'listen' | 'repeat' | 'quiz' | 'dialogue';
  titleDe: string;
  titleEn: string;
  promptDe: string;
  promptEn: string;
  germanWord?: string;
  englishMeaning?: string;
  phonetic?: string;
  emoji?: string;
  options?: {
    text: string;
    emoji: string;
    isCorrect: boolean;
  }[];
  dialogue?: {
    speaker: string;
    avatar: string;
    de: string;
    en: string;
  }[];
}

export interface Lesson {
  id: string;
  number: number;
  titleDe: string;
  titleEn: string;
  descriptionDe: string;
  descriptionEn: string;
  icon: string;
  themeColor: string;
  starsAwarded: number;
  steps: LessonStep[];
}

export interface StoryPage {
  textDe: string;
  textEn: string;
  imagePrompt?: string;
  emoji: string;
  highlightWords: {
    word: string;
    meaning: string;
  }[];
  question?: {
    questionDe: string;
    questionEn: string;
    options: {
      text: string;
      isCorrect: boolean;
    }[];
  };
}

export interface Story {
  id: string;
  titleDe: string;
  titleEn: string;
  descriptionEn: string;
  coverEmoji: string;
  coverImage?: string;
  pages: StoryPage[];
}

export interface Achievement {
  id: string;
  titleDe: string;
  titleEn: string;
  descriptionDe: string;
  descriptionEn: string;
  icon: string;
  unlockedAt?: string;
  isUnlocked: boolean;
  targetCount: number;
  currentCount: number;
}

export interface SpeakingPhrase {
  id: string;
  german: string;
  english: string;
  phonetic: string;
  context: string;
  emoji: string;
}

export interface UserProgress {
  completedLessons: string[];
  stars: number;
  wordsLearned: string[];
  favoriteWords: string[];
  streakDays: number;
  lastActiveDate: string;
  level: number;
  dailyGoal: number; // e.g. 5 words or 1 lesson
  dailyWordsCount: number;
  gamesPlayedCount: number;
  storiesReadCount: number;
  speakingPracticedCount: number;
}

export interface ParentSettings {
  speechRate: number; // 0.6 to 1.0
  speechPitch: number; // 0.9 to 1.3
  soundEffects: boolean;
  dailyGoalWords: number;
  interfaceLanguage: Language;
}
