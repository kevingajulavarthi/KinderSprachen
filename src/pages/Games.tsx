import React, { useState, useEffect, useMemo } from 'react';
import { useLearning } from '../context/LearningContext';
import { VOCABULARY_LIST } from '../data/vocabulary';
import { AudioButton } from '../components/AudioButton';
import {
  Gamepad2,
  RefreshCw,
  Star,
  CheckCircle2,
  Trophy,
  Sparkles,
  Volume2,
  ArrowRight,
} from 'lucide-react';

export const Games: React.FC = () => {
  const { language, playSfx, playAudio, triggerCelebration, recordGamePlayed } = useLearning();
  const [activeGameId, setActiveGameId] = useState<string>('game-1');

  // List of all 10 Games
  const gamesList = [
    { id: 'game-1', titleDe: 'Bilder-Zuordnung', titleEn: 'Picture Match', emoji: '🖼️', color: '#55B8FF' },
    { id: 'game-2', titleDe: 'Hören & Finden', titleEn: 'Listen & Pick', emoji: '👂', color: '#75E6A6' },
    { id: 'game-3', titleDe: 'Memory-Karten', titleEn: 'Memory Cards', emoji: '🃏', color: '#FFD966' },
    { id: 'game-4', titleDe: 'Wörter-Bauer', titleEn: 'Word Builder', emoji: '🔤', color: '#FF8F9C' },
    { id: 'game-5', titleDe: 'Farben-Suche', titleEn: 'Color Quest', emoji: '🎨', color: '#B7A4FF' },
    { id: 'game-6', titleDe: 'Zählen mit Leo', titleEn: 'Count with Leo', emoji: '🔢', color: '#55B8FF' },
    { id: 'game-7', titleDe: 'Tier-Stimmen', titleEn: 'Animal Sounds', emoji: '🦁', color: '#75E6A6' },
    { id: 'game-8', titleDe: 'Kinder-Bingo', titleEn: 'German Bingo', emoji: '🎯', color: '#FFD966' },
    { id: 'game-9', titleDe: 'Was passt nicht?', titleEn: 'Odd One Out', emoji: '🧐', color: '#FF8F9C' },
    { id: 'game-10', titleDe: 'Tages-Herausforderung', titleEn: 'Daily Challenge', emoji: '⚡', color: '#B7A4FF' },
  ];

  // ===================== GAME 1: PICTURE MATCH =====================
  const [matchTargetIndex, setMatchTargetIndex] = useState(0);
  const [matchScore, setMatchScore] = useState(0);
  const matchItems = useMemo(() => VOCABULARY_LIST.slice(0, 8), []);
  const currentMatchItem = matchItems[matchTargetIndex % matchItems.length];
  const matchOptions = useMemo(() => {
    const distractors = VOCABULARY_LIST.filter((w) => w.id !== currentMatchItem.id)
      .sort(() => Math.random() - 0.5)
      .slice(0, 2);
    return [currentMatchItem, ...distractors].sort(() => Math.random() - 0.5);
  }, [currentMatchItem]);

  const handleMatchSelect = (id: string) => {
    if (id === currentMatchItem.id) {
      playSfx('correct');
      setMatchScore((s) => s + 1);
      triggerCelebration();
      recordGamePlayed();
      setTimeout(() => setMatchTargetIndex((i) => i + 1), 1000);
    } else {
      playSfx('wrong');
    }
  };

  // ===================== GAME 2: LISTEN & PICK =====================
  const [listenTarget, setListenTarget] = useState(VOCABULARY_LIST[2]);
  const listenOptions = useMemo(() => {
    const others = VOCABULARY_LIST.filter((w) => w.id !== listenTarget.id)
      .sort(() => Math.random() - 0.5)
      .slice(0, 2);
    return [listenTarget, ...others].sort(() => Math.random() - 0.5);
  }, [listenTarget]);

  const handleListenSelect = (id: string) => {
    if (id === listenTarget.id) {
      triggerCelebration();
      recordGamePlayed();
      setTimeout(() => {
        const next = VOCABULARY_LIST[Math.floor(Math.random() * VOCABULARY_LIST.length)];
        setListenTarget(next);
        playAudio(next.german);
      }, 1200);
    } else {
      playSfx('wrong');
    }
  };

  // ===================== GAME 3: MEMORY CARDS =====================
  interface MemoryCard {
    id: number;
    pairKey: string;
    content: string;
    isWord: boolean;
    isFlipped: boolean;
    isMatched: boolean;
  }
  const [memoryCards, setMemoryCards] = useState<MemoryCard[]>([]);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);

  const initMemoryGame = () => {
    const pairs = [
      { key: 'cat', word: 'die Katze', emoji: '🐱' },
      { key: 'dog', word: 'der Hund', emoji: '🐶' },
      { key: 'apple', word: 'der Apfel', emoji: '🍎' },
      { key: 'ball', word: 'der Ball', emoji: '⚽' },
    ];
    const deck: MemoryCard[] = [];
    pairs.forEach((p, i) => {
      deck.push({ id: i * 2, pairKey: p.key, content: p.word, isWord: true, isFlipped: false, isMatched: false });
      deck.push({ id: i * 2 + 1, pairKey: p.key, content: p.emoji, isWord: false, isFlipped: false, isMatched: false });
    });
    setMemoryCards(deck.sort(() => Math.random() - 0.5));
    setFlippedCards([]);
  };

  useEffect(() => {
    if (activeGameId === 'game-3') {
      initMemoryGame();
    }
  }, [activeGameId]);

  const handleMemoryFlip = (id: number) => {
    if (flippedCards.length === 2) return;
    const card = memoryCards.find((c) => c.id === id);
    if (!card || card.isFlipped || card.isMatched) return;

    playSfx('click');
    const updated = memoryCards.map((c) => (c.id === id ? { ...c, isFlipped: true } : c));
    setMemoryCards(updated);
    const newFlipped = [...flippedCards, id];
    setFlippedCards(newFlipped);

    if (newFlipped.length === 2) {
      const first = updated.find((c) => c.id === newFlipped[0])!;
      const second = updated.find((c) => c.id === newFlipped[1])!;
      if (first.pairKey === second.pairKey) {
        // Matched!
        playSfx('correct');
        setTimeout(() => {
          setMemoryCards((prev) =>
            prev.map((c) => (c.pairKey === first.pairKey ? { ...c, isMatched: true } : c))
          );
          setFlippedCards([]);
          recordGamePlayed();
        }, 500);
      } else {
        playSfx('wrong');
        setTimeout(() => {
          setMemoryCards((prev) =>
            prev.map((c) => (newFlipped.includes(c.id) ? { ...c, isFlipped: false } : c))
          );
          setFlippedCards([]);
        }, 1100);
      }
    }
  };

  // ===================== GAME 4: WORD BUILDER =====================
  const wordBuilderTargets = [
    { word: 'BALL', emoji: '⚽', hint: 'der Ball' },
    { word: 'KATZE', emoji: '🐱', hint: 'die Katze' },
    { word: 'APFEL', emoji: '🍎', hint: 'der Apfel' },
    { word: 'HUND', emoji: '🐶', hint: 'der Hund' },
  ];
  const [builderIndex, setBuilderIndex] = useState(0);
  const currentBuilder = wordBuilderTargets[builderIndex % wordBuilderTargets.length];
  const [placedLetters, setPlacedLetters] = useState<string[]>([]);
  const [availableTiles, setAvailableTiles] = useState<string[]>([]);

  useEffect(() => {
    const letters = currentBuilder.word.split('').sort(() => Math.random() - 0.5);
    setAvailableTiles(letters);
    setPlacedLetters([]);
  }, [currentBuilder]);

  const handleTileClick = (letter: string, index: number) => {
    playSfx('click');
    const nextPlaced = [...placedLetters, letter];
    setPlacedLetters(nextPlaced);
    const remaining = [...availableTiles];
    remaining.splice(index, 1);
    setAvailableTiles(remaining);

    if (nextPlaced.join('') === currentBuilder.word) {
      triggerCelebration();
      recordGamePlayed();
      setTimeout(() => setBuilderIndex((i) => i + 1), 1200);
    } else if (nextPlaced.length === currentBuilder.word.length) {
      playSfx('wrong');
      setTimeout(() => {
        setAvailableTiles(currentBuilder.word.split('').sort(() => Math.random() - 0.5));
        setPlacedLetters([]);
      }, 900);
    }
  };

  // ===================== GAME 5: COLOR QUEST =====================
  const colorQuests = [
    { targetDe: 'rot', targetEn: 'Red', colorHex: '#EF4444' },
    { targetDe: 'blau', targetEn: 'Blue', colorHex: '#3B82F6' },
    { targetDe: 'grün', targetEn: 'Green', colorHex: '#10B981' },
    { targetDe: 'gelb', targetEn: 'Yellow', colorHex: '#F59E0B' },
  ];
  const [questIndex, setQuestIndex] = useState(0);
  const currentQuest = colorQuests[questIndex % colorQuests.length];

  // ===================== GAME 6: COUNT WITH LEO =====================
  const [countNumber, setCountNumber] = useState(3);
  const countItems = Array.from({ length: countNumber });

  // ===================== GAME 7: ANIMAL SOUNDS =====================
  const animalSounds = [
    { nameDe: 'der Hund', sound: 'Wau-wau! Woof!', emoji: '🐶' },
    { nameDe: 'die Katze', sound: 'Miau! Meow!', emoji: '🐱' },
    { nameDe: 'die Kuh', sound: 'Muh! Moo!', emoji: '🐮' },
    { nameDe: 'der Vogel', sound: 'Tschiep-tschiep!', emoji: '🐦' },
  ];
  const [soundIndex, setSoundIndex] = useState(0);
  const currentAnimal = animalSounds[soundIndex % animalSounds.length];

  // ===================== GAME 8: GERMAN BINGO =====================
  const [bingoBoard, setBingoBoard] = useState([
    { word: 'die Katze', emoji: '🐱', marked: false },
    { word: 'der Apfel', emoji: '🍎', marked: false },
    { word: 'der Ball', emoji: '⚽', marked: false },
    { word: 'das Auto', emoji: '🚗', marked: false },
    { word: 'die Sonne', emoji: '☀️', marked: false },
    { word: 'der Hund', emoji: '🐶', marked: false },
    { word: 'das Brot', emoji: '🍞', marked: false },
    { word: 'der Fisch', emoji: '🐟', marked: false },
    { word: 'das Buch', emoji: '📖', marked: false },
  ]);

  const handleBingoTap = (index: number) => {
    playSfx('pop');
    setBingoBoard((prev) =>
      prev.map((item, i) => (i === index ? { ...item, marked: !item.marked } : item))
    );
  };

  // ===================== GAME 9: ODD ONE OUT =====================
  const oddPuzzles = [
    {
      questionDe: 'Was ist kein Tier?',
      questionEn: 'Which one is NOT an animal?',
      items: [
        { name: 'die Katze', emoji: '🐱', isOdd: false },
        { name: 'der Hund', emoji: '🐶', isOdd: false },
        { name: 'der Apfel', emoji: '🍎', isOdd: true },
        { name: 'der Vogel', emoji: '🐦', isOdd: false },
      ],
    },
    {
      questionDe: 'Was ist kein Essen?',
      questionEn: 'Which one is NOT food?',
      items: [
        { name: 'die Banane', emoji: '🍌', isOdd: false },
        { name: 'das Brot', emoji: '🍞', isOdd: false },
        { name: 'der Ball', emoji: '⚽', isOdd: true },
        { name: 'der Käse', emoji: '🧀', isOdd: false },
      ],
    },
  ];
  const [oddIndex, setOddIndex] = useState(0);
  const currentOddPuzzle = oddPuzzles[oddIndex % oddPuzzles.length];

  // ===================== GAME 10: DAILY CHALLENGE =====================
  const [dailyStep, setDailyStep] = useState(0);

  return (
    <div className="space-y-8 animate-pop pb-12">
      {/* Games Header */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-100 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <h1 className="font-fredoka text-3xl sm:text-4xl font-bold text-[#26354A]">
            {language === 'de' ? 'Spiel- und Spaß-Arena' : 'Play & Learn Games'}
          </h1>
          <p className="text-sm sm:text-base text-[#26354A]/70 mt-1">
            {language === 'de'
              ? '10 lustige Lernspiele! Gewinne Sterne und übe deine deutschen Lieblingswörter.'
              : '10 playable mini-games! Earn stars and practice your German vocabulary through play.'}
          </p>
        </div>
      </div>

      {/* Games Selector Buttons Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
        {gamesList.map((g) => {
          const isActive = activeGameId === g.id;
          return (
            <button
              key={g.id}
              type="button"
              onClick={() => {
                playSfx('click');
                setActiveGameId(g.id);
              }}
              className={`p-3 rounded-2xl border-2 flex items-center gap-2 font-fredoka text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                isActive
                  ? 'bg-[#55B8FF] text-white border-[#55B8FF] shadow-sm scale-102'
                  : 'bg-white hover:bg-slate-50 border-slate-200 text-[#26354A]'
              }`}
            >
              <span className="text-xl">{g.emoji}</span>
              <span className="truncate">{language === 'de' ? g.titleDe : g.titleEn}</span>
            </button>
          );
        })}
      </div>

      {/* ACTIVE GAME CANVAS CONTAINER */}
      <div className="bg-white rounded-3xl p-6 sm:p-10 border-2 border-[#55B8FF]/20 shadow-md min-h-[440px] flex flex-col justify-between">
        {/* GAME 1: PICTURE MATCH */}
        {activeGameId === 'game-1' && (
          <div className="space-y-6 text-center my-auto">
            <span className="text-xs font-bold uppercase tracking-wider text-[#55B8FF] bg-[#55B8FF]/10 px-3 py-1 rounded-full">
              Score: {matchScore} ⭐
            </span>
            <div className="space-y-2">
              <h2 className="font-fredoka text-3xl font-bold text-[#26354A]">
                {language === 'de' ? 'Finde das Bild zu:' : 'Find the picture for:'}
              </h2>
              <p className="font-fredoka text-4xl font-extrabold text-[#55B8FF]">
                {currentMatchItem.german}
              </p>
              <div className="flex justify-center pt-1">
                <AudioButton text={currentMatchItem.german} size="md" />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4 max-w-lg mx-auto pt-4">
              {matchOptions.map((opt) => (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => handleMatchSelect(opt.id)}
                  className="p-6 rounded-3xl bg-[#FFFDF5] hover:bg-[#55B8FF]/15 border-2 border-slate-200 hover:border-[#55B8FF] flex flex-col items-center justify-center gap-2 cursor-pointer shadow-xs transition-transform hover:scale-105"
                >
                  <span className="text-5xl">{opt.emoji}</span>
                  <span className="text-xs font-bold text-[#26354A]">{opt.english}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* GAME 2: LISTEN AND PICK */}
        {activeGameId === 'game-2' && (
          <div className="space-y-6 text-center my-auto">
            <h2 className="font-fredoka text-2xl sm:text-3xl font-bold text-[#26354A]">
              {language === 'de' ? 'Höre zu und tippe auf das Bild!' : 'Listen and tap the matching picture!'}
            </h2>

            <div className="flex flex-col items-center gap-2 py-3">
              <AudioButton text={listenTarget.german} size="xl" />
              <p className="text-xs text-slate-400 font-semibold">Tap to hear again</p>
            </div>

            <div className="grid grid-cols-3 gap-4 max-w-lg mx-auto pt-2">
              {listenOptions.map((opt) => (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => handleListenSelect(opt.id)}
                  className="p-6 rounded-3xl bg-[#FFFDF5] hover:bg-[#75E6A6]/20 border-2 border-slate-200 hover:border-[#75E6A6] flex flex-col items-center justify-center gap-2 cursor-pointer shadow-xs transition-transform hover:scale-105"
                >
                  <span className="text-5xl">{opt.emoji}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* GAME 3: MEMORY CARDS */}
        {activeGameId === 'game-3' && (
          <div className="space-y-6 text-center my-auto">
            <div className="flex items-center justify-between max-w-md mx-auto">
              <h2 className="font-fredoka text-2xl font-bold text-[#26354A]">
                {language === 'de' ? 'Finde die Paare!' : 'Find the matching pairs!'}
              </h2>
              <button
                type="button"
                onClick={initMemoryGame}
                className="flex items-center gap-1 text-xs font-bold text-[#55B8FF] hover:underline"
              >
                <RefreshCw size={14} /> Reset
              </button>
            </div>

            <div className="grid grid-cols-4 gap-3 max-w-md mx-auto">
              {memoryCards.map((card) => (
                <button
                  key={card.id}
                  type="button"
                  onClick={() => handleMemoryFlip(card.id)}
                  disabled={card.isMatched || card.isFlipped}
                  className={`h-24 sm:h-28 rounded-2xl border-2 font-fredoka flex flex-col items-center justify-center p-2 text-center transition-all duration-300 cursor-pointer shadow-xs ${
                    card.isMatched
                      ? 'bg-[#75E6A6]/20 border-[#75E6A6] opacity-75'
                      : card.isFlipped
                      ? 'bg-white border-[#55B8FF] shadow-md scale-102'
                      : 'bg-[#FFD966] border-[#f4cb48] text-white hover:scale-102'
                  }`}
                >
                  {card.isFlipped || card.isMatched ? (
                    card.isWord ? (
                      <span className="text-xs sm:text-sm font-bold text-[#26354A] leading-tight">
                        {card.content}
                      </span>
                    ) : (
                      <span className="text-3xl sm:text-4xl">{card.content}</span>
                    )
                  ) : (
                    <span className="text-2xl text-[#26354A]">❓</span>
                  )}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* GAME 4: WORD BUILDER */}
        {activeGameId === 'game-4' && (
          <div className="space-y-6 text-center my-auto">
            <h2 className="font-fredoka text-2xl sm:text-3xl font-bold text-[#26354A]">
              {language === 'de' ? 'Baue das Wort zusammen!' : 'Spell the German word!'}
            </h2>

            <div className="flex flex-col items-center gap-2">
              <span className="text-6xl">{currentBuilder.emoji}</span>
              <p className="font-fredoka text-base text-[#26354A]/70">{currentBuilder.hint}</p>
            </div>

            {/* Placed Word Boxes */}
            <div className="flex items-center justify-center gap-2">
              {Array.from({ length: currentBuilder.word.length }).map((_, idx) => (
                <div
                  key={idx}
                  className="w-12 h-14 rounded-2xl border-2 border-dashed border-[#FF8F9C] bg-[#FFFDF5] flex items-center justify-center font-fredoka text-2xl font-bold text-[#26354A]"
                >
                  {placedLetters[idx] || ''}
                </div>
              ))}
            </div>

            {/* Letter Tiles to Click */}
            <div className="flex items-center justify-center gap-2 pt-2">
              {availableTiles.map((letter, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => handleTileClick(letter, idx)}
                  className="w-12 h-14 rounded-2xl bg-[#55B8FF] hover:bg-[#3ea7f3] text-white font-fredoka text-2xl font-bold shadow-md cursor-pointer transition-transform hover:scale-105 active:scale-95"
                >
                  {letter}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* GAME 5: COLOR QUEST */}
        {activeGameId === 'game-5' && (
          <div className="space-y-6 text-center my-auto">
            <h2 className="font-fredoka text-2xl sm:text-3xl font-bold text-[#26354A]">
              {language === 'de' ? `Finde die Farbe: ${currentQuest.targetDe.toUpperCase()}!` : `Find the color: ${currentQuest.targetEn}!`}
            </h2>

            <div className="flex justify-center">
              <AudioButton text={currentQuest.targetDe} size="md" />
            </div>

            {/* Color buttons */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-md mx-auto pt-4">
              {colorQuests.map((cq, idx) => (
                <button
                  key={cq.targetDe}
                  type="button"
                  onClick={() => {
                    if (cq.targetDe === currentQuest.targetDe) {
                      triggerCelebration();
                      recordGamePlayed();
                      setTimeout(() => setQuestIndex((i) => i + 1), 1000);
                    } else {
                      playSfx('wrong');
                    }
                  }}
                  style={{ backgroundColor: cq.colorHex }}
                  className="h-28 rounded-3xl shadow-md hover:scale-105 active:scale-95 transition-transform flex items-center justify-center text-white font-fredoka font-bold text-lg cursor-pointer border-4 border-white"
                >
                  {cq.targetDe}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* GAME 6: COUNT WITH LEO */}
        {activeGameId === 'game-6' && (
          <div className="space-y-6 text-center my-auto">
            <h2 className="font-fredoka text-2xl sm:text-3xl font-bold text-[#26354A]">
              {language === 'de' ? 'Wie viele Tierchen siehst du?' : 'How many animals do you see?'}
            </h2>

            {/* Display animals */}
            <div className="flex flex-wrap items-center justify-center gap-4 py-4">
              {countItems.map((_, i) => (
                <span key={i} className="text-6xl animate-gentle-bounce">
                  🦁
                </span>
              ))}
            </div>

            {/* Number Choices 1-5 */}
            <div className="flex items-center justify-center gap-3">
              {[1, 2, 3, 4, 5].map((num) => (
                <button
                  key={num}
                  type="button"
                  onClick={() => {
                    if (num === countNumber) {
                      triggerCelebration();
                      recordGamePlayed();
                      setTimeout(() => setCountNumber(Math.floor(Math.random() * 4) + 1), 1000);
                    } else {
                      playSfx('wrong');
                    }
                  }}
                  className="w-14 h-14 rounded-2xl bg-[#FFFDF5] hover:bg-[#55B8FF] hover:text-white border-2 border-slate-200 font-fredoka text-2xl font-bold text-[#26354A] shadow-xs cursor-pointer transition-all hover:scale-105"
                >
                  {num}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* GAME 7: ANIMAL SOUNDS */}
        {activeGameId === 'game-7' && (
          <div className="space-y-6 text-center my-auto">
            <h2 className="font-fredoka text-2xl sm:text-3xl font-bold text-[#26354A]">
              {language === 'de' ? 'Welches Tier macht diesen Laut?' : 'Which animal makes this sound?'}
            </h2>

            <div className="bg-[#FFFDF5] rounded-3xl p-6 border-2 border-slate-200 max-w-sm mx-auto space-y-2">
              <span className="text-3xl">🔊</span>
              <p className="font-fredoka text-2xl font-bold text-[#26354A]">
                &quot;{currentAnimal.sound}&quot;
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-md mx-auto pt-2">
              {animalSounds.map((item, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => {
                    if (item.nameDe === currentAnimal.nameDe) {
                      triggerCelebration();
                      recordGamePlayed();
                      setTimeout(() => setSoundIndex((i) => i + 1), 1000);
                    } else {
                      playSfx('wrong');
                    }
                  }}
                  className="p-4 rounded-3xl bg-white hover:bg-[#75E6A6]/20 border-2 border-slate-200 hover:border-[#75E6A6] flex flex-col items-center gap-2 cursor-pointer shadow-xs transition-transform hover:scale-105"
                >
                  <span className="text-5xl">{item.emoji}</span>
                  <span className="font-fredoka text-xs font-bold text-[#26354A]">{item.nameDe}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* GAME 8: GERMAN BINGO */}
        {activeGameId === 'game-8' && (
          <div className="space-y-6 text-center my-auto">
            <h2 className="font-fredoka text-2xl sm:text-3xl font-bold text-[#26354A]">
              {language === 'de' ? 'Kinder-Bingo! Tippe 3 in einer Reihe!' : 'Kids Bingo! Get 3 in a row!'}
            </h2>

            <div className="grid grid-cols-3 gap-3 max-w-xs mx-auto">
              {bingoBoard.map((tile, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => handleBingoTap(i)}
                  className={`h-24 rounded-2xl border-2 flex flex-col items-center justify-center p-2 cursor-pointer transition-all ${
                    tile.marked
                      ? 'bg-[#75E6A6] border-[#75E6A6] text-white shadow-md scale-95'
                      : 'bg-[#FFFDF5] border-slate-200 hover:border-[#FFD966]'
                  }`}
                >
                  <span className="text-3xl">{tile.emoji}</span>
                  <span className="text-[10px] font-bold mt-1 truncate max-w-full">
                    {tile.word}
                  </span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* GAME 9: ODD ONE OUT */}
        {activeGameId === 'game-9' && (
          <div className="space-y-6 text-center my-auto">
            <h2 className="font-fredoka text-2xl sm:text-3xl font-bold text-[#26354A]">
              {language === 'de' ? currentOddPuzzle.questionDe : currentOddPuzzle.questionEn}
            </h2>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-lg mx-auto pt-4">
              {currentOddPuzzle.items.map((item, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => {
                    if (item.isOdd) {
                      triggerCelebration();
                      recordGamePlayed();
                      setTimeout(() => setOddIndex((i) => i + 1), 1000);
                    } else {
                      playSfx('wrong');
                    }
                  }}
                  className="p-6 rounded-3xl bg-white hover:bg-[#FF8F9C]/15 border-2 border-slate-200 hover:border-[#FF8F9C] flex flex-col items-center gap-3 cursor-pointer shadow-xs transition-transform hover:scale-105"
                >
                  <span className="text-5xl">{item.emoji}</span>
                  <span className="font-fredoka text-sm font-bold text-[#26354A]">{item.name}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* GAME 10: DAILY CHALLENGE */}
        {activeGameId === 'game-10' && (
          <div className="space-y-6 text-center my-auto max-w-md mx-auto">
            <span className="text-xs font-bold text-[#B7A4FF] bg-[#B7A4FF]/15 px-3 py-1 rounded-full uppercase">
              Daily Challenge · Frage {dailyStep + 1} / 3
            </span>

            {dailyStep === 0 && (
              <div className="space-y-4">
                <h3 className="font-fredoka text-2xl font-bold text-[#26354A]">
                  Wie heißt &quot;Hello&quot; auf Deutsch?
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  {['Hallo!', 'Tschüss!'].map((ans) => (
                    <button
                      key={ans}
                      type="button"
                      onClick={() => {
                        if (ans === 'Hallo!') {
                          playSfx('correct');
                          setDailyStep(1);
                        } else {
                          playSfx('wrong');
                        }
                      }}
                      className="py-4 bg-[#FFFDF5] hover:bg-[#55B8FF] hover:text-white rounded-2xl border-2 font-fredoka font-bold text-lg"
                    >
                      {ans}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {dailyStep === 1 && (
              <div className="space-y-4">
                <h3 className="font-fredoka text-2xl font-bold text-[#26354A]">
                  Welche Farbe ist &quot;rot&quot;?
                </h3>
                <div className="flex justify-center gap-4">
                  <button
                    type="button"
                    onClick={() => {
                      playSfx('correct');
                      setDailyStep(2);
                    }}
                    className="w-20 h-20 rounded-2xl bg-red-500 shadow-md"
                  />
                  <button
                    type="button"
                    onClick={() => playSfx('wrong')}
                    className="w-20 h-20 rounded-2xl bg-blue-500 shadow-md"
                  />
                </div>
              </div>
            )}

            {dailyStep === 2 && (
              <div className="space-y-4">
                <h3 className="font-fredoka text-2xl font-bold text-[#26354A]">
                  Wie heißt 🐱 auf Deutsch?
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  {['die Katze', 'der Hund'].map((ans) => (
                    <button
                      key={ans}
                      type="button"
                      onClick={() => {
                        if (ans === 'die Katze') {
                          triggerCelebration();
                          recordGamePlayed();
                          setDailyStep(0);
                        } else {
                          playSfx('wrong');
                        }
                      }}
                      className="py-4 bg-[#FFFDF5] hover:bg-[#75E6A6] hover:text-white rounded-2xl border-2 font-fredoka font-bold text-lg"
                    >
                      {ans}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Footer info within active game */}
        <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-[#26354A]/60">
          <span>🎮 KinderSprachen Game Arena</span>
          <span className="flex items-center gap-1 font-bold text-amber-500">
            <Star size={14} className="fill-amber-400" /> Reward: +1 Star on win!
          </span>
        </div>
      </div>
    </div>
  );
};
