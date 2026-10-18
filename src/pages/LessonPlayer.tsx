import React, { useState, useEffect } from 'react';
import { useLearning } from '../context/LearningContext';
import { LESSONS } from '../data/lessons';
import { AudioButton } from '../components/AudioButton';
import { MascotLeo } from '../components/MascotLeo';
import { ArrowLeft, Check, RotateCcw, ArrowRight, Mic, Volume2, Star, Sparkles, Smile } from 'lucide-react';

interface LessonPlayerProps {
  lessonId: string;
  onBackToMap: () => void;
  onNextLesson?: (nextId: string) => void;
}

export const LessonPlayer: React.FC<LessonPlayerProps> = ({
  lessonId,
  onBackToMap,
  onNextLesson,
}) => {
  const { completeLesson, language, playSfx, playAudio, triggerCelebration } = useLearning();

  const lesson = LESSONS.find((l) => l.id === lessonId) || LESSONS[0];
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswerCorrect, setIsAnswerCorrect] = useState<boolean | null>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [voiceHeard, setVoiceHeard] = useState<string | null>(null);
  const [hasCelebrated, setHasCelebrated] = useState(false);

  const step = lesson.steps[currentStepIndex];
  const isFinalStep = currentStepIndex === lesson.steps.length - 1;
  const isCompletedScreen = currentStepIndex >= lesson.steps.length;

  // Auto speak on step enter
  useEffect(() => {
    setSelectedOption(null);
    setIsAnswerCorrect(null);
    setVoiceHeard(null);

    if (step && step.germanWord) {
      const timer = setTimeout(() => {
        playAudio(step.germanWord!);
      }, 350);
      return () => clearTimeout(timer);
    }
  }, [currentStepIndex, step, playAudio]);

  // Handle Quiz Option Selection
  const handleSelectOption = (idx: number, isCorrect: boolean) => {
    if (selectedOption !== null) return; // Prevent double tap
    setSelectedOption(idx);

    if (isCorrect) {
      setIsAnswerCorrect(true);
      playSfx('correct');
    } else {
      setIsAnswerCorrect(false);
      playSfx('wrong');
      // Clear after short moment so child can try again without penalty
      setTimeout(() => {
        setSelectedOption(null);
        setIsAnswerCorrect(null);
      }, 1200);
    }
  };

  // Handle Moving to Next Step
  const handleNextStep = () => {
    playSfx('click');
    if (currentStepIndex + 1 < lesson.steps.length) {
      setCurrentStepIndex((prev) => prev + 1);
    } else {
      // Completed!
      setCurrentStepIndex(lesson.steps.length);
      if (!hasCelebrated) {
        setHasCelebrated(true);
        const learned = lesson.steps.map((s) => s.germanWord).filter(Boolean) as string[];
        completeLesson(lesson.id, lesson.starsAwarded, learned);
      }
    }
  };

  const handleRestart = () => {
    playSfx('click');
    setCurrentStepIndex(0);
    setSelectedOption(null);
    setIsAnswerCorrect(null);
    setHasCelebrated(false);
  };

  // Safe Microphone Simulation / Web Speech for Repeat step
  const handleMicPractice = () => {
    playSfx('pop');
    setIsRecording(true);

    if (typeof window !== 'undefined' && 'webkitSpeechRecognition' in window) {
      try {
        const SpeechRec = (window as unknown as { webkitSpeechRecognition: new () => {
          lang: string;
          start: () => void;
          onresult: (e: { results: { [0]: { transcript: string } }[] }) => void;
          onerror: () => void;
          onend: () => void;
        } }).webkitSpeechRecognition;

        const recognition = new SpeechRec();
        recognition.lang = 'de-DE';
        recognition.onresult = (event) => {
          const text = event.results[0][0].transcript;
          setVoiceHeard(text);
          setIsRecording(false);
          playSfx('correct');
        };
        recognition.onerror = () => {
          setIsRecording(false);
          setVoiceHeard('Gut gemacht! (Well done!)');
          playSfx('star');
        };
        recognition.onend = () => setIsRecording(false);
        recognition.start();
        return;
      } catch {
        // Fallback
      }
    }

    // Friendly fallback without mic requirement
    setTimeout(() => {
      setIsRecording(false);
      setVoiceHeard('Super gemacht! 🌟');
      playSfx('star');
    }, 1500);
  };

  // If Completed Screen
  if (isCompletedScreen) {
    const nextLessonIndex = LESSONS.findIndex((l) => l.id === lesson.id) + 1;
    const nextLesson = LESSONS[nextLessonIndex];

    return (
      <div className="max-w-2xl mx-auto py-8 text-center space-y-6 animate-pop">
        <div className="bg-white rounded-3xl p-8 sm:p-12 border-4 border-[#75E6A6] shadow-xl space-y-6">
          <div className="w-24 h-24 mx-auto rounded-full bg-[#75E6A6]/20 text-[#75E6A6] flex items-center justify-center text-5xl animate-bounce">
            🎉
          </div>

          <div className="space-y-2">
            <h2 className="font-fredoka text-3xl sm:text-4xl font-bold text-[#26354A]">
              {language === 'de' ? 'Fantastisch! Du hast es geschafft!' : 'Fantastisch! You did it!'}
            </h2>
            <p className="font-nunito text-base sm:text-lg text-[#26354A]/80">
              {language === 'de'
                ? `Du hast Lektion "${lesson.titleDe}" gemeistert und 3 Sterne verdient!`
                : `You mastered lesson "${lesson.titleEn}" and earned 3 stars!`}
            </p>
          </div>

          <div className="flex items-center justify-center gap-3 text-amber-400">
            <Star size={36} className="fill-amber-400 animate-spin" />
            <Star size={44} className="fill-amber-400 animate-bounce" />
            <Star size={36} className="fill-amber-400 animate-spin" />
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            {nextLesson && onNextLesson && (
              <button
                type="button"
                onClick={() => onNextLesson(nextLesson.id)}
                className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-[#55B8FF] hover:bg-[#3ea7f3] text-white font-fredoka font-bold text-lg shadow-lg flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>{language === 'de' ? 'Nächste Lektion' : 'Next Lesson'}</span>
                <ArrowRight size={20} />
              </button>
            )}

            <button
              type="button"
              onClick={handleRestart}
              className="w-full sm:w-auto px-6 py-4 rounded-2xl bg-[#FFD966] hover:bg-[#f3cb47] text-[#26354A] font-fredoka font-bold text-base shadow-sm flex items-center justify-center gap-2 cursor-pointer"
            >
              <RotateCcw size={18} />
              <span>{language === 'de' ? 'Nochmal üben' : 'Repeat Lesson'}</span>
            </button>

            <button
              type="button"
              onClick={onBackToMap}
              className="w-full sm:w-auto px-6 py-4 rounded-2xl bg-slate-100 hover:bg-slate-200 text-[#26354A] font-fredoka font-bold text-base flex items-center justify-center cursor-pointer"
            >
              <span>{language === 'de' ? 'Zum Lernpfad' : 'Return to Map'}</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto space-y-6 pb-12 animate-pop">
      {/* Top Header Controls */}
      <div className="flex items-center justify-between gap-4">
        <button
          type="button"
          onClick={onBackToMap}
          className="flex items-center gap-2 px-4 py-2 rounded-2xl bg-white hover:bg-slate-100 border border-slate-200 text-sm font-fredoka font-semibold text-[#26354A] transition-colors cursor-pointer"
        >
          <ArrowLeft size={16} />
          <span>{language === 'de' ? 'Zurück' : 'Back to Map'}</span>
        </button>

        <div className="text-center">
          <p className="font-fredoka text-sm font-bold text-[#26354A]">
            {language === 'de' ? lesson.titleDe : lesson.titleEn}
          </p>
          <p className="text-xs text-[#26354A]/60">
            {language === 'de' ? 'Schritt' : 'Step'} {currentStepIndex + 1} / {lesson.steps.length}
          </p>
        </div>

        {/* Progress Dots */}
        <div className="flex items-center gap-1.5">
          {lesson.steps.map((_, i) => (
            <div
              key={i}
              className={`h-2.5 rounded-full transition-all duration-300 ${
                i === currentStepIndex
                  ? 'w-6 bg-[#55B8FF]'
                  : i < currentStepIndex
                  ? 'w-2.5 bg-[#75E6A6]'
                  : 'w-2.5 bg-slate-200'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Main Lesson Stage Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-10 border-2 border-[#55B8FF]/20 shadow-md min-h-[460px] flex flex-col justify-between relative overflow-hidden">
        {/* Step Indicator Header */}
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <span className="text-xs font-bold uppercase tracking-wider text-[#55B8FF] bg-[#55B8FF]/10 px-3 py-1 rounded-full">
            {step.type.toUpperCase()}
          </span>
          <h2 className="font-fredoka text-lg sm:text-xl font-bold text-[#26354A]">
            {language === 'de' ? step.titleDe : step.titleEn}
          </h2>
        </div>

        {/* Dynamic Step Content */}
        <div className="py-6 flex flex-col items-center text-center my-auto">
          {/* LOOK STEP */}
          {step.type === 'look' && (
            <div className="space-y-6">
              <div className="w-36 h-36 mx-auto rounded-3xl bg-[#FFFDF5] border-4 border-[#FFD966] flex items-center justify-center text-7xl shadow-md animate-gentle-bounce">
                {step.emoji}
              </div>
              <div className="space-y-1">
                <p className="font-fredoka text-3xl sm:text-4xl font-extrabold text-[#26354A]">
                  {step.germanWord}
                </p>
                <p className="font-nunito text-lg text-[#26354A]/70 font-semibold">
                  {step.englishMeaning}
                </p>
                {step.phonetic && (
                  <p className="text-xs text-slate-400 font-mono italic">
                    Pronunciation: [{step.phonetic}]
                  </p>
                )}
              </div>
              <div className="pt-2 flex justify-center">
                <AudioButton text={step.germanWord || ''} size="lg" label="Anhören (Listen)" />
              </div>
            </div>
          )}

          {/* LISTEN STEP */}
          {step.type === 'listen' && (
            <div className="space-y-6">
              <div className="w-32 h-32 mx-auto rounded-full bg-[#55B8FF]/15 border-4 border-[#55B8FF] flex items-center justify-center text-6xl shadow-md">
                {step.emoji}
              </div>
              <div className="space-y-2">
                <h3 className="font-fredoka text-3xl font-bold text-[#26354A]">
                  {step.germanWord}
                </h3>
                <p className="text-base text-[#26354A]/70">{step.englishMeaning}</p>
                <p className="text-sm text-[#55B8FF] font-semibold">
                  {language === 'de' ? step.promptDe : step.promptEn}
                </p>
              </div>
              <div className="pt-2 flex justify-center">
                <AudioButton text={step.germanWord || ''} size="xl" />
              </div>
            </div>
          )}

          {/* REPEAT STEP */}
          {step.type === 'repeat' && (
            <div className="space-y-6">
              <div className="w-32 h-32 mx-auto rounded-full bg-[#FF8F9C]/15 border-4 border-[#FF8F9C] flex items-center justify-center text-6xl shadow-md">
                {step.emoji}
              </div>
              <div className="space-y-1">
                <p className="font-fredoka text-3xl font-bold text-[#26354A]">
                  {step.germanWord}
                </p>
                <p className="text-sm text-[#26354A]/70">
                  {language === 'de' ? step.promptDe : step.promptEn}
                </p>
              </div>

              {/* Action Buttons: Audio and Voice Practice */}
              <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
                <AudioButton text={step.germanWord || ''} size="md" label="Leo anhören" />

                <button
                  type="button"
                  onClick={handleMicPractice}
                  className={`px-6 py-3.5 rounded-2xl font-fredoka font-bold text-base flex items-center gap-2 shadow-md transition-all cursor-pointer ${
                    isRecording
                      ? 'bg-red-500 text-white animate-pulse'
                      : 'bg-[#75E6A6] hover:bg-[#5fd893] text-[#26354A]'
                  }`}
                >
                  <Mic size={20} />
                  <span>{isRecording ? 'Höre zu...' : 'Selbst sprechen!'}</span>
                </button>
              </div>

              {voiceHeard && (
                <div className="bg-[#75E6A6]/20 border border-[#75E6A6] px-4 py-2 rounded-2xl text-sm font-bold text-[#26354A] animate-pop">
                  🌟 {voiceHeard}
                </div>
              )}
            </div>
          )}

          {/* QUIZ PLAY STEP */}
          {step.type === 'quiz' && step.options && (
            <div className="w-full space-y-6">
              <div className="space-y-2">
                <div className="text-5xl mb-2">{step.emoji}</div>
                <h3 className="font-fredoka text-2xl sm:text-3xl font-bold text-[#26354A]">
                  {language === 'de' ? step.promptDe : step.promptEn}
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                {step.options.map((opt, idx) => {
                  const isSelected = selectedOption === idx;
                  let cardStyle = 'bg-[#FFFDF5] border-slate-200 hover:border-[#55B8FF] hover:bg-white';
                  if (isSelected) {
                    cardStyle = isAnswerCorrect
                      ? 'bg-[#75E6A6]/20 border-[#75E6A6] ring-4 ring-[#75E6A6]/40 scale-105'
                      : 'bg-red-50 border-red-300 ring-4 ring-red-200';
                  }

                  return (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => handleSelectOption(idx, opt.isCorrect)}
                      disabled={selectedOption !== null && isAnswerCorrect === true}
                      className={`p-6 rounded-3xl border-3 flex flex-col items-center justify-center gap-3 transition-all duration-200 cursor-pointer shadow-xs ${cardStyle}`}
                    >
                      <span className="text-5xl">{opt.emoji}</span>
                      <span className="font-fredoka text-lg font-bold text-[#26354A]">
                        {opt.text}
                      </span>
                      {isSelected && isAnswerCorrect && (
                        <span className="text-xs font-bold text-[#2bb463] flex items-center gap-1">
                          <Check size={16} /> Richtig!
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>

              {isAnswerCorrect && (
                <div className="bg-[#75E6A6]/20 border border-[#75E6A6]/50 rounded-2xl p-3 text-sm font-bold text-[#26354A] animate-pop">
                  Super! Das ist richtig! 🎉
                </div>
              )}
            </div>
          )}

          {/* DIALOGUE MINI-CHAT STEP */}
          {step.type === 'dialogue' && step.dialogue && (
            <div className="w-full max-w-md space-y-4">
              <p className="text-sm font-semibold text-[#26354A]/70 mb-4">
                {language === 'de' ? step.promptDe : step.promptEn}
              </p>

              <div className="space-y-3">
                {step.dialogue.map((line, idx) => (
                  <div
                    key={idx}
                    className={`flex items-center gap-3 p-3.5 rounded-2xl border ${
                      line.speaker === 'Leo'
                        ? 'bg-[#55B8FF]/10 border-[#55B8FF]/30 mr-8'
                        : 'bg-[#FFD966]/15 border-[#FFD966]/40 ml-8'
                    }`}
                  >
                    <span className="text-3xl shrink-0">{line.avatar}</span>
                    <div className="text-left flex-1">
                      <p className="font-fredoka text-base font-bold text-[#26354A]">
                        {line.de}
                      </p>
                      <p className="text-xs text-[#26354A]/60">{line.en}</p>
                    </div>
                    <AudioButton text={line.de} size="sm" />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Bottom Navigation Control */}
        <div className="border-t border-slate-100 pt-4 flex items-center justify-between">
          <button
            type="button"
            onClick={handleRestart}
            className="flex items-center gap-1.5 text-xs text-[#26354A]/60 hover:text-[#26354A] font-semibold"
          >
            <RotateCcw size={14} />
            <span>{language === 'de' ? 'Neu starten' : 'Restart'}</span>
          </button>

          {/* Proceed Button */}
          {step.type === 'quiz' ? (
            <button
              type="button"
              onClick={handleNextStep}
              disabled={isAnswerCorrect !== true}
              className="px-8 py-3.5 rounded-2xl bg-[#55B8FF] hover:bg-[#3ea7f3] disabled:opacity-40 disabled:cursor-not-allowed text-white font-fredoka font-bold text-base shadow-md flex items-center gap-2 cursor-pointer transition-all"
            >
              <span>{language === 'de' ? 'Weiter' : 'Next'}</span>
              <ArrowRight size={18} />
            </button>
          ) : (
            <button
              type="button"
              onClick={handleNextStep}
              className="px-8 py-3.5 rounded-2xl bg-[#55B8FF] hover:bg-[#3ea7f3] text-white font-fredoka font-bold text-base shadow-md flex items-center gap-2 cursor-pointer transition-all"
            >
              <span>{isFinalStep ? (language === 'de' ? 'Abschließen' : 'Finish!') : (language === 'de' ? 'Weiter' : 'Next')}</span>
              <ArrowRight size={18} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
