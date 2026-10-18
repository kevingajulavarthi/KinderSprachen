import React, { useState } from 'react';
import { useLearning } from '../context/LearningContext';
import { BASIC_ALPHABET, SPECIAL_LETTERS, ALL_ALPHABET } from '../data/alphabet';
import { AudioButton } from '../components/AudioButton';
import { Sparkles, Gamepad2, Volume2, Check, RefreshCw, Star } from 'lucide-react';

export const Alphabet: React.FC = () => {
  const { language, playSfx, playAudio, triggerCelebration } = useLearning();
  const [selectedLetter, setSelectedLetter] = useState(BASIC_ALPHABET[0]);
  const [activeTab, setActiveTab] = useState<'cards' | 'game1' | 'game2' | 'game3'>('cards');

  // Mini-game 1: Find Missing Letter state
  const [missingQuiz, setMissingQuiz] = useState({
    before: 'A',
    missing: 'B',
    after: 'C',
    options: ['B', 'D', 'M'],
    solved: false,
  });

  // Mini-game 2: Match Upper & Lowercase
  const [matchGame, setMatchGame] = useState<{ upper: string; options: string[]; answer: string; solved: boolean }>({
    upper: 'G',
    answer: 'g',
    options: ['g', 'q', 'p'],
    solved: false,
  });

  // Mini-game 3: Listen & Select Letter
  const [listenGame, setListenGame] = useState<{ target: typeof ALL_ALPHABET[0]; options: string[]; solved: boolean }>({
    target: BASIC_ALPHABET[4], // E
    options: ['E', 'I', 'A'],
    solved: false,
  });

  const handleSelectLetter = (item: typeof ALL_ALPHABET[0]) => {
    setSelectedLetter(item);
    playSfx('pop');
    playAudio(`${item.letter}. ${item.wordDe}`);
  };

  // Generate new Find Missing Letter quiz
  const generateMissingQuiz = () => {
    const idx = Math.floor(Math.random() * (BASIC_ALPHABET.length - 2)) + 1;
    const before = BASIC_ALPHABET[idx - 1].letter;
    const missing = BASIC_ALPHABET[idx].letter;
    const after = BASIC_ALPHABET[idx + 1].letter;

    const wrong1 = BASIC_ALPHABET[(idx + 4) % BASIC_ALPHABET.length].letter;
    const wrong2 = BASIC_ALPHABET[(idx + 7) % BASIC_ALPHABET.length].letter;
    const options = [missing, wrong1, wrong2].sort(() => Math.random() - 0.5);

    setMissingQuiz({ before, missing, after, options, solved: false });
  };

  // Generate Match Upper/Lower
  const generateMatchQuiz = () => {
    const item = BASIC_ALPHABET[Math.floor(Math.random() * BASIC_ALPHABET.length)];
    const upper = item.letter;
    const answer = upper.toLowerCase();
    const wrong1 = BASIC_ALPHABET[Math.floor(Math.random() * BASIC_ALPHABET.length)].letter.toLowerCase();
    const wrong2 = BASIC_ALPHABET[Math.floor(Math.random() * BASIC_ALPHABET.length)].letter.toLowerCase();
    const options = Array.from(new Set([answer, wrong1, wrong2]));
    while (options.length < 3) {
      options.push('z');
    }
    options.sort(() => Math.random() - 0.5);
    setMatchGame({ upper, answer, options, solved: false });
  };

  // Generate Listen & Select
  const generateListenQuiz = () => {
    const target = ALL_ALPHABET[Math.floor(Math.random() * ALL_ALPHABET.length)];
    const wrong1 = ALL_ALPHABET[Math.floor(Math.random() * ALL_ALPHABET.length)].letter;
    const wrong2 = ALL_ALPHABET[Math.floor(Math.random() * ALL_ALPHABET.length)].letter;
    const options = Array.from(new Set([target.letter, wrong1, wrong2]));
    while (options.length < 3) {
      options.push('A');
    }
    options.sort(() => Math.random() - 0.5);
    setListenGame({ target, options, solved: false });
    playAudio(target.letter);
  };

  return (
    <div className="space-y-8 animate-pop pb-12">
      {/* Header */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-100 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <h1 className="font-fredoka text-3xl sm:text-4xl font-bold text-[#26354A]">
            {language === 'de' ? 'Das deutsche Alphabet' : 'The German Alphabet'}
          </h1>
          <p className="text-sm sm:text-base text-[#26354A]/70 mt-1">
            {language === 'de'
              ? 'Tippe auf einen Buchstaben, um seinen Klang und ein schönes deutsches Wort zu hören!'
              : 'Tap any letter to hear its German name and a friendly German word!'}
          </p>
        </div>

        {/* Tab switcher: Exploration vs Games */}
        <div className="flex items-center gap-1.5 p-1.5 bg-[#FFFDF5] rounded-2xl border border-slate-200">
          <button
            type="button"
            onClick={() => { playSfx('click'); setActiveTab('cards'); }}
            className={`px-4 py-2 rounded-xl font-fredoka text-sm font-bold transition-all cursor-pointer ${
              activeTab === 'cards'
                ? 'bg-[#55B8FF] text-white shadow-xs'
                : 'text-[#26354A]/70 hover:text-[#26354A]'
            }`}
          >
            🔤 {language === 'de' ? 'Alle Buchstaben' : 'All Letters'}
          </button>
          <button
            type="button"
            onClick={() => { playSfx('click'); setActiveTab('game1'); }}
            className={`px-4 py-2 rounded-xl font-fredoka text-sm font-bold transition-all cursor-pointer ${
              activeTab === 'game1'
                ? 'bg-[#FFD966] text-[#26354A] shadow-xs'
                : 'text-[#26354A]/70 hover:text-[#26354A]'
            }`}
          >
            🎮 {language === 'de' ? 'Buchstaben-Quiz' : 'Letter Games'}
          </button>
        </div>
      </div>

      {activeTab === 'cards' ? (
        <>
          {/* Active Featured Letter Showcase */}
          <div className="bg-gradient-to-r from-[#55B8FF]/15 via-[#FFD966]/20 to-[#75E6A6]/20 rounded-3xl p-6 sm:p-8 border-2 border-[#55B8FF]/30 shadow-md flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-6">
              <div className="w-28 h-28 sm:w-36 sm:h-36 rounded-3xl bg-white border-4 border-[#55B8FF] flex flex-col items-center justify-center shadow-lg">
                <span className="font-fredoka text-5xl sm:text-6xl font-extrabold text-[#55B8FF]">
                  {selectedLetter.letter}
                </span>
                <span className="text-xs font-semibold text-slate-400">
                  {selectedLetter.letter.toLowerCase()}
                </span>
              </div>

              <div className="space-y-1 text-left">
                <span className="text-xs uppercase font-bold text-[#55B8FF] tracking-wider">
                  {selectedLetter.isSpecial ? 'Besonderer deutscher Buchstabe' : 'Buchstabe'}
                </span>
                <h2 className="font-fredoka text-3xl sm:text-4xl font-bold text-[#26354A] flex items-center gap-2">
                  <span>{selectedLetter.wordDe}</span>
                  <span className="text-3xl">{selectedLetter.emoji}</span>
                </h2>
                <p className="font-nunito text-base text-[#26354A]/75 font-semibold">
                  Meaning: {selectedLetter.wordEn}
                </p>
                {selectedLetter.exampleSentence && (
                  <p className="text-xs sm:text-sm text-slate-500 italic pt-1">
                    &quot;{selectedLetter.exampleSentence}&quot;
                  </p>
                )}
              </div>
            </div>

            <div className="flex flex-col items-center gap-2">
              <AudioButton
                text={`${selectedLetter.letter}. ${selectedLetter.wordDe}`}
                size="xl"
              />
              <span className="text-xs font-bold text-[#26354A]/70">
                Aussprache: [{selectedLetter.phonetic}]
              </span>
            </div>
          </div>

          {/* 26 Standard Letters Grid */}
          <section className="space-y-3">
            <h3 className="font-fredoka text-xl font-bold text-[#26354A]">
              {language === 'de' ? 'Das Grund-Alphabet (A bis Z)' : 'Standard Alphabet (A to Z)'}
            </h3>
            <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-9 gap-3">
              {BASIC_ALPHABET.map((item) => {
                const isCurrent = selectedLetter.letter === item.letter;
                return (
                  <button
                    key={item.letter}
                    type="button"
                    onClick={() => handleSelectLetter(item)}
                    className={`p-3.5 rounded-2xl flex flex-col items-center justify-center gap-1 border-2 transition-all duration-200 cursor-pointer shadow-2xs hover:scale-105 active:scale-95 ${
                      isCurrent
                        ? 'bg-[#55B8FF] text-white border-[#55B8FF] shadow-md ring-4 ring-[#55B8FF]/30'
                        : 'bg-white hover:bg-[#55B8FF]/10 text-[#26354A] border-slate-200'
                    }`}
                  >
                    <span className="font-fredoka text-2xl font-bold">{item.letter}</span>
                    <span className="text-lg">{item.emoji}</span>
                    <span className={`text-[10px] font-semibold truncate max-w-[50px] ${isCurrent ? 'text-white' : 'text-slate-500'}`}>
                      {item.wordDe.replace(/^(der|die|das)\s+/i, '')}
                    </span>
                  </button>
                );
              })}
            </div>
          </section>

          {/* Dedicated Special German Letters Section (Ä, Ö, Ü, ß) */}
          <section className="bg-amber-50/60 rounded-3xl p-6 border-2 border-amber-200/60 space-y-4">
            <div className="flex items-center gap-2">
              <Sparkles className="text-amber-500 w-5 h-5" />
              <div>
                <h3 className="font-fredoka text-xl font-bold text-[#26354A]">
                  {language === 'de'
                    ? 'Besondere deutsche Buchstaben: Die Umlaute & das Eszett!'
                    : 'Special German Characters: The Umlauts & Eszett!'}
                </h3>
                <p className="text-xs sm:text-sm text-[#26354A]/70">
                  {language === 'de'
                    ? 'Ä, Ö und Ü haben zwei kleine Pünktchen oben! Und ß (scharfes S) klingt wie ein zischendes S.'
                    : 'In German, Ä, Ö, and Ü have two little magic dots! And ß sounds like a sharp hissing snake.'}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {SPECIAL_LETTERS.map((item) => {
                const isCurrent = selectedLetter.letter === item.letter;
                return (
                  <button
                    key={item.letter}
                    type="button"
                    onClick={() => handleSelectLetter(item)}
                    className={`p-4 rounded-3xl border-3 flex flex-col items-center justify-center gap-2 transition-all cursor-pointer shadow-xs ${
                      isCurrent
                        ? 'bg-amber-400 text-[#26354A] border-amber-500 ring-4 ring-amber-300 scale-105'
                        : 'bg-white hover:bg-amber-100/50 border-amber-200 text-[#26354A]'
                    }`}
                  >
                    <span className="font-fredoka text-3xl font-bold text-amber-900">
                      {item.letter}
                    </span>
                    <span className="text-3xl">{item.emoji}</span>
                    <span className="font-fredoka text-sm font-bold">{item.wordDe}</span>
                    <span className="text-[11px] text-[#26354A]/70 italic font-mono">
                      {item.nameDe}
                    </span>
                  </button>
                );
              })}
            </div>
          </section>
        </>
      ) : (
        /* ALPHABET MINI GAMES */
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Game 1: Missing Letter */}
          <div className="bg-white rounded-3xl p-6 border-2 border-slate-100 shadow-sm flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-[#55B8FF] bg-[#55B8FF]/10 px-2.5 py-1 rounded-full">
                  Game 1
                </span>
                <button
                  type="button"
                  onClick={generateMissingQuiz}
                  className="text-slate-400 hover:text-[#26354A] p-1"
                >
                  <RefreshCw size={16} />
                </button>
              </div>
              <h3 className="font-fredoka text-lg font-bold text-[#26354A]">
                {language === 'de' ? 'Welcher Buchstabe fehlt?' : 'Find the Missing Letter!'}
              </h3>

              {/* Puzzle Display */}
              <div className="bg-[#FFFDF5] rounded-2xl p-4 border border-slate-200 flex items-center justify-center gap-3">
                <span className="font-fredoka text-3xl font-bold text-[#26354A]">{missingQuiz.before}</span>
                <span className="w-12 h-12 rounded-xl bg-white border-2 border-dashed border-[#55B8FF] flex items-center justify-center font-fredoka text-3xl font-bold text-[#55B8FF]">
                  {missingQuiz.solved ? missingQuiz.missing : '?'}
                </span>
                <span className="font-fredoka text-3xl font-bold text-[#26354A]">{missingQuiz.after}</span>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-2 mt-6">
              {missingQuiz.options.map((opt) => (
                <button
                  key={opt}
                  type="button"
                  onClick={() => {
                    if (opt === missingQuiz.missing) {
                      setMissingQuiz((prev) => ({ ...prev, solved: true }));
                      triggerCelebration();
                    } else {
                      playSfx('wrong');
                    }
                  }}
                  className={`py-3 rounded-2xl font-fredoka text-xl font-bold border-2 transition-all cursor-pointer ${
                    missingQuiz.solved && opt === missingQuiz.missing
                      ? 'bg-[#75E6A6] border-[#75E6A6] text-white'
                      : 'bg-white hover:bg-[#55B8FF]/15 border-slate-200 text-[#26354A]'
                  }`}
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>

          {/* Game 2: Upper and Lowercase Match */}
          <div className="bg-white rounded-3xl p-6 border-2 border-slate-100 shadow-sm flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-[#FFD966] bg-[#FFD966]/20 px-2.5 py-1 rounded-full">
                  Game 2
                </span>
                <button
                  type="button"
                  onClick={generateMatchQuiz}
                  className="text-slate-400 hover:text-[#26354A] p-1"
                >
                  <RefreshCw size={16} />
                </button>
              </div>
              <h3 className="font-fredoka text-lg font-bold text-[#26354A]">
                {language === 'de' ? 'Groß- und Kleinbuchstabe' : 'Match Upper & Lowercase!'}
              </h3>

              <div className="bg-[#FFFDF5] rounded-2xl p-4 border border-slate-200 flex flex-col items-center justify-center">
                <span className="text-xs text-slate-400">Großbuchstabe:</span>
                <span className="font-fredoka text-4xl font-extrabold text-[#26354A] mt-1">
                  {matchGame.upper}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-2 mt-6">
              {matchGame.options.map((opt) => (
                <button
                  key={opt}
                  type="button"
                  onClick={() => {
                    if (opt === matchGame.answer) {
                      setMatchGame((prev) => ({ ...prev, solved: true }));
                      triggerCelebration();
                    } else {
                      playSfx('wrong');
                    }
                  }}
                  className={`py-3 rounded-2xl font-fredoka text-xl font-bold border-2 transition-all cursor-pointer ${
                    matchGame.solved && opt === matchGame.answer
                      ? 'bg-[#75E6A6] border-[#75E6A6] text-white'
                      : 'bg-white hover:bg-[#FFD966]/20 border-slate-200 text-[#26354A]'
                  }`}
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>

          {/* Game 3: Listen & Pick */}
          <div className="bg-white rounded-3xl p-6 border-2 border-slate-100 shadow-sm flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-[#75E6A6] bg-[#75E6A6]/20 px-2.5 py-1 rounded-full">
                  Game 3
                </span>
                <button
                  type="button"
                  onClick={generateListenQuiz}
                  className="text-slate-400 hover:text-[#26354A] p-1"
                >
                  <RefreshCw size={16} />
                </button>
              </div>
              <h3 className="font-fredoka text-lg font-bold text-[#26354A]">
                {language === 'de' ? 'Hören und Finden' : 'Listen and Select!'}
              </h3>

              <div className="flex justify-center py-2">
                <AudioButton text={listenGame.target.letter} size="lg" />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-2 mt-6">
              {listenGame.options.map((opt) => (
                <button
                  key={opt}
                  type="button"
                  onClick={() => {
                    if (opt === listenGame.target.letter) {
                      setListenGame((prev) => ({ ...prev, solved: true }));
                      triggerCelebration();
                    } else {
                      playSfx('wrong');
                    }
                  }}
                  className={`py-3 rounded-2xl font-fredoka text-xl font-bold border-2 transition-all cursor-pointer ${
                    listenGame.solved && opt === listenGame.target.letter
                      ? 'bg-[#75E6A6] border-[#75E6A6] text-white'
                      : 'bg-white hover:bg-[#75E6A6]/20 border-slate-200 text-[#26354A]'
                  }`}
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
