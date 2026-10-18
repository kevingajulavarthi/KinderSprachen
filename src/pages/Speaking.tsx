import React, { useState } from 'react';
import { useLearning } from '../context/LearningContext';
import { SPEAKING_PHRASES } from '../data/speaking';
import { SpeakingPhrase } from '../types';
import { AudioButton } from '../components/AudioButton';
import { Mic, Volume2, ShieldCheck, Check, Sparkles, Star } from 'lucide-react';

export const Speaking: React.FC = () => {
  const { language, playSfx, playAudio, triggerCelebration, recordSpeakingPracticed } = useLearning();
  const [activePhrase, setActivePhrase] = useState<SpeakingPhrase>(SPEAKING_PHRASES[0]);
  const [isListening, setIsListening] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);

  const handleSelectPhrase = (phrase: SpeakingPhrase) => {
    setActivePhrase(phrase);
    setFeedback(null);
    playSfx('pop');
    playAudio(phrase.german);
  };

  const handleMicPractice = () => {
    playSfx('click');
    setIsListening(true);
    setFeedback(null);

    // Attempt browser Web Speech Recognition safely
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
        recognition.onresult = (e) => {
          const heard = e.results[0][0].transcript;
          setIsListening(false);
          setFeedback(`Toll! Leo hat "${heard}" gehört! 🌟`);
          triggerCelebration();
          recordSpeakingPracticed();
        };
        recognition.onerror = () => {
          setIsListening(false);
          setFeedback('Wunderbar laut und deutlich gesprochen! 🌟');
          triggerCelebration();
          recordSpeakingPracticed();
        };
        recognition.onend = () => setIsListening(false);
        recognition.start();
        return;
      } catch {
        // Fallback
      }
    }

    // Non-mic / instant practice fallback
    setTimeout(() => {
      setIsListening(false);
      setFeedback('Klasse! Leo hat dir aufmerksam zugehört! 🌟');
      triggerCelebration();
      recordSpeakingPracticed();
    }, 1500);
  };

  const handleNonMicPractice = () => {
    playSfx('correct');
    setFeedback('Super geübt! Du hast es laut und deutlich gesagt! 🎉');
    triggerCelebration();
    recordSpeakingPracticed();
  };

  return (
    <div className="space-y-8 animate-pop pb-12">
      {/* Header */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-100 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <h1 className="font-fredoka text-3xl sm:text-4xl font-bold text-[#26354A]">
            {language === 'de' ? 'Sprech-Werkstatt' : 'German Speaking Practice'}
          </h1>
          <p className="text-sm sm:text-base text-[#26354A]/70 mt-1">
            {language === 'de'
              ? 'Höre wichtige deutsche Sätze und sprich sie laut mit Leo nach!'
              : 'Listen to essential phrases and speak them out loud with friendly Leo!'}
          </p>
        </div>

        {/* Privacy Note */}
        <div className="flex items-center gap-2 bg-[#75E6A6]/20 border border-[#75E6A6]/50 px-4 py-2 rounded-2xl text-xs font-semibold text-[#26354A]">
          <ShieldCheck size={16} className="text-[#2bb463]" />
          <span>
            {language === 'de'
              ? '100% Sicher: Keine Sprachaufnahme wird gespeichert!'
              : '100% Private: Voice recordings are never stored!'}
          </span>
        </div>
      </div>

      {/* Active Practice Stage */}
      <div className="bg-gradient-to-r from-[#55B8FF]/15 via-[#FF8F9C]/15 to-[#FFD966]/20 rounded-3xl p-6 sm:p-10 border-2 border-[#55B8FF]/30 shadow-md text-center space-y-6">
        <span className="text-6xl animate-gentle-bounce inline-block">
          {activePhrase.emoji}
        </span>

        <div className="space-y-2">
          <h2 className="font-fredoka text-3xl sm:text-5xl font-extrabold text-[#26354A]">
            {activePhrase.german}
          </h2>
          <p className="font-nunito text-lg sm:text-xl font-bold text-[#55B8FF]">
            {activePhrase.english}
          </p>
          <p className="text-xs sm:text-sm text-slate-500 font-mono italic">
            Pronunciation: [{activePhrase.phonetic}]
          </p>
          <p className="text-xs text-[#26354A]/70 max-w-sm mx-auto">
            {activePhrase.context}
          </p>
        </div>

        {/* Actions Cluster */}
        <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
          <AudioButton text={activePhrase.german} size="lg" label="Anhören (Listen)" />

          {/* Optional Mic Button */}
          <button
            type="button"
            onClick={handleMicPractice}
            className={`px-6 py-4 rounded-2xl font-fredoka font-bold text-base shadow-md flex items-center gap-2 cursor-pointer transition-all ${
              isListening
                ? 'bg-red-500 text-white animate-pulse'
                : 'bg-[#75E6A6] hover:bg-[#5cd492] text-[#26354A] hover:scale-102'
            }`}
          >
            <Mic size={20} />
            <span>{isListening ? 'Höre zu... Sprich jetzt!' : 'Mit Mikrofon üben'}</span>
          </button>

          {/* Non-microphone alternative button */}
          <button
            type="button"
            onClick={handleNonMicPractice}
            className="px-5 py-4 rounded-2xl bg-white hover:bg-slate-50 border border-slate-200 text-[#26354A] font-fredoka font-bold text-sm shadow-2xs hover:scale-102 cursor-pointer"
          >
            <span>Ich habe es laut gesagt! 👍</span>
          </button>
        </div>

        {/* Positive Feedback Toast */}
        {feedback && (
          <div className="max-w-md mx-auto bg-white rounded-2xl p-4 border-2 border-[#75E6A6] shadow-sm text-sm font-bold text-[#26354A] animate-pop flex items-center justify-center gap-2">
            <Sparkles className="text-amber-400 w-5 h-5 shrink-0" />
            <span>{feedback}</span>
          </div>
        )}
      </div>

      {/* Phrases Grid */}
      <section className="space-y-4">
        <h3 className="font-fredoka text-xl font-bold text-[#26354A]">
          {language === 'de' ? 'Wähle einen Satz zum Üben:' : 'Choose a phrase to practice:'}
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {SPEAKING_PHRASES.map((phrase) => {
            const isCurrent = activePhrase.id === phrase.id;
            return (
              <button
                key={phrase.id}
                type="button"
                onClick={() => handleSelectPhrase(phrase)}
                className={`p-5 rounded-3xl border-2 text-left flex items-center justify-between gap-4 transition-all duration-200 cursor-pointer shadow-2xs ${
                  isCurrent
                    ? 'bg-white border-[#55B8FF] ring-4 ring-[#55B8FF]/20 shadow-md scale-102'
                    : 'bg-white hover:bg-[#FFFDF5] border-slate-100'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="text-3xl">{phrase.emoji}</span>
                  <div>
                    <h4 className="font-fredoka text-lg font-bold text-[#26354A]">
                      {phrase.german}
                    </h4>
                    <p className="text-xs text-[#26354A]/70 font-semibold">
                      {phrase.english}
                    </p>
                  </div>
                </div>

                <AudioButton text={phrase.german} size="sm" />
              </button>
            );
          })}
        </div>
      </section>
    </div>
  );
};
