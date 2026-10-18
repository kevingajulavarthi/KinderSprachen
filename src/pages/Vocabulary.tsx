import React, { useState } from 'react';
import { useLearning } from '../context/LearningContext';
import { VOCABULARY_LIST, VOCABULARY_CATEGORIES } from '../data/vocabulary';
import { VocabularyItem } from '../types';
import { AudioButton } from '../components/AudioButton';
import { Star, Search, Check, Sparkles, Filter, X } from 'lucide-react';

export const Vocabulary: React.FC = () => {
  const { progress, toggleFavoriteWord, language, playSfx, playAudio, triggerCelebration } = useLearning();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showOnlyFavorites, setShowOnlyFavorites] = useState(false);
  const [practicingWord, setPracticingWord] = useState<VocabularyItem | null>(null);
  const [practiceAnswer, setPracticeAnswer] = useState<boolean | null>(null);

  // Filter vocabulary
  const filteredWords = VOCABULARY_LIST.filter((item) => {
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    const matchesSearch =
      item.german.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.english.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFavorite = !showOnlyFavorites || progress.favoriteWords.includes(item.german);
    return matchesCategory && matchesSearch && matchesFavorite;
  });

  const handleFavoriteClick = (e: React.MouseEvent, word: string) => {
    e.stopPropagation();
    playSfx('star');
    toggleFavoriteWord(word);
  };

  const handlePracticeStart = (word: VocabularyItem) => {
    playSfx('pop');
    setPracticingWord(word);
    setPracticeAnswer(null);
    playAudio(`Wo ist ${word.german}?`);
  };

  // Generate 2 random distractors for practice modal
  const practiceDistractors = practicingWord
    ? VOCABULARY_LIST.filter((w) => w.id !== practicingWord.id)
        .sort(() => Math.random() - 0.5)
        .slice(0, 2)
    : [];

  const practiceOptions = practicingWord
    ? [practicingWord, ...practiceDistractors].sort(() => Math.random() - 0.5)
    : [];

  return (
    <div className="space-y-8 animate-pop pb-12">
      {/* Header */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-100 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <h1 className="font-fredoka text-3xl sm:text-4xl font-bold text-[#26354A]">
            {language === 'de' ? 'Wortschatz-Welt' : 'German Vocabulary World'}
          </h1>
          <p className="text-sm sm:text-base text-[#26354A]/70 mt-1">
            {language === 'de'
              ? 'Über 100 Wörter mit Aussprache, Bildern und Artikeln (der, die, das)!'
              : 'Over 100 playful words with natural German articles and pronunciation!'}
          </p>
        </div>

        {/* Search & Favorites Toggle */}
        <div className="flex items-center gap-3 w-full md:w-auto">
          <div className="relative flex-1 md:w-60">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
            <input
              type="text"
              placeholder={language === 'de' ? 'Wort suchen...' : 'Search words...'}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 rounded-2xl bg-[#FFFDF5] border border-slate-200 text-sm focus:outline-none focus:border-[#55B8FF]"
            />
          </div>

          <button
            type="button"
            onClick={() => {
              playSfx('click');
              setShowOnlyFavorites(!showOnlyFavorites);
            }}
            className={`px-4 py-2.5 rounded-2xl font-fredoka text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer shrink-0 border ${
              showOnlyFavorites
                ? 'bg-[#FFD966] text-[#26354A] border-amber-300'
                : 'bg-white text-[#26354A]/70 border-slate-200 hover:bg-slate-50'
            }`}
          >
            <Star size={16} className={showOnlyFavorites ? 'fill-current' : ''} />
            <span>{language === 'de' ? 'Favoriten' : 'Favorites'}</span>
          </button>
        </div>
      </div>

      {/* Categories Horizontal Scroll / Grid */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        <button
          type="button"
          onClick={() => { playSfx('click'); setSelectedCategory('all'); }}
          className={`px-4 py-2 rounded-2xl font-fredoka text-sm font-bold whitespace-nowrap transition-all cursor-pointer border ${
            selectedCategory === 'all'
              ? 'bg-[#55B8FF] text-white border-[#55B8FF] shadow-xs'
              : 'bg-white hover:bg-slate-50 text-[#26354A] border-slate-200'
          }`}
        >
          🌟 {language === 'de' ? 'Alle Wörter' : 'All Words'}
        </button>

        {VOCABULARY_CATEGORIES.map((cat) => (
          <button
            key={cat.id}
            type="button"
            onClick={() => { playSfx('click'); setSelectedCategory(cat.id); }}
            className={`px-3.5 py-2 rounded-2xl font-fredoka text-sm font-bold whitespace-nowrap transition-all cursor-pointer border flex items-center gap-1.5 ${
              selectedCategory === cat.id
                ? 'bg-[#55B8FF] text-white border-[#55B8FF] shadow-xs'
                : 'bg-white hover:bg-slate-50 text-[#26354A] border-slate-200'
            }`}
          >
            <span>{cat.emoji}</span>
            <span>{language === 'de' ? cat.nameDe : cat.nameEn}</span>
          </button>
        ))}
      </div>

      {/* Vocabulary Cards Grid */}
      {filteredWords.length === 0 ? (
        <div className="bg-white rounded-3xl p-12 text-center space-y-3 border border-slate-100">
          <span className="text-5xl">🔍</span>
          <h3 className="font-fredoka text-xl font-bold text-[#26354A]">
            {language === 'de' ? 'Keine Wörter gefunden' : 'No words found'}
          </h3>
          <p className="text-sm text-[#26354A]/70">
            {language === 'de' ? 'Versuche eine andere Suche.' : 'Try a different search or filter.'}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredWords.map((item) => {
            const isFav = progress.favoriteWords.includes(item.german);

            // Article color coding: der (blue), die (red/pink), das (green/yellow)
            const articleBadgeColor =
              item.article === 'der'
                ? 'bg-blue-100 text-blue-700'
                : item.article === 'die'
                ? 'bg-rose-100 text-rose-700'
                : item.article === 'das'
                ? 'bg-emerald-100 text-emerald-700'
                : 'bg-slate-100 text-slate-700';

            return (
              <div
                key={item.id}
                className="group bg-white rounded-3xl p-5 border-2 border-slate-100 hover:border-[#55B8FF] shadow-2xs hover:shadow-md transition-all duration-200 flex flex-col justify-between relative"
              >
                {/* Top Bar inside card */}
                <div className="flex items-start justify-between">
                  <span className="text-4xl group-hover:scale-110 transition-transform">
                    {item.emoji}
                  </span>

                  <button
                    type="button"
                    onClick={(e) => handleFavoriteClick(e, item.german)}
                    className="p-1.5 rounded-full hover:bg-amber-50 text-slate-300 hover:text-amber-400 transition-colors cursor-pointer"
                    title="Toggle Favorite"
                  >
                    <Star
                      size={20}
                      className={isFav ? 'fill-amber-400 text-amber-400' : ''}
                    />
                  </button>
                </div>

                {/* Word Content */}
                <div className="my-3 space-y-1">
                  {item.article && (
                    <span className={`text-[11px] font-bold px-2 py-0.5 rounded-md uppercase tracking-wider ${articleBadgeColor}`}>
                      {item.article}
                    </span>
                  )}
                  <h3 className="font-fredoka text-xl font-bold text-[#26354A] leading-tight">
                    {item.german}
                  </h3>
                  <p className="font-nunito text-sm font-semibold text-[#26354A]/70">
                    {item.english}
                  </p>
                  <p className="text-xs text-slate-400 font-mono italic">
                    [{item.phonetic}]
                  </p>
                </div>

                {/* Action Row */}
                <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                  <AudioButton text={item.german} size="sm" />

                  <button
                    type="button"
                    onClick={() => handlePracticeStart(item)}
                    className="px-3 py-1.5 rounded-xl bg-[#FFFDF5] hover:bg-[#FFD966]/30 text-xs font-fredoka font-bold text-[#26354A] border border-slate-200 transition-colors"
                  >
                    {language === 'de' ? 'Üben' : 'Practice'}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Word Practice Modal */}
      {practicingWord && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs animate-pop">
          <div className="bg-[#FFFDF5] rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl border-4 border-[#55B8FF] relative space-y-6">
            <button
              type="button"
              onClick={() => setPracticingWord(null)}
              className="absolute top-4 right-4 text-slate-400 hover:text-[#26354A] p-2"
            >
              <X size={22} />
            </button>

            <div className="text-center space-y-2">
              <span className="text-xs font-bold text-[#55B8FF] bg-[#55B8FF]/15 px-3 py-1 rounded-full uppercase">
                Mini Quiz
              </span>
              <h3 className="font-fredoka text-2xl font-bold text-[#26354A]">
                {language === 'de' ? `Wo ist ${practicingWord.german}?` : `Find: ${practicingWord.german}!`}
              </h3>
              <p className="text-xs text-slate-500 font-semibold">
                Meaning: {practicingWord.english}
              </p>
              <div className="pt-1 flex justify-center">
                <AudioButton text={practicingWord.german} size="md" />
              </div>
            </div>

            {/* 3 options */}
            <div className="grid grid-cols-3 gap-3">
              {practiceOptions.map((opt) => (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => {
                    if (opt.id === practicingWord.id) {
                      setPracticeAnswer(true);
                      triggerCelebration();
                    } else {
                      setPracticeAnswer(false);
                      playSfx('wrong');
                    }
                  }}
                  className="p-4 rounded-2xl bg-white hover:bg-[#55B8FF]/10 border-2 border-slate-200 flex flex-col items-center justify-center gap-2 cursor-pointer shadow-xs transition-transform hover:scale-105"
                >
                  <span className="text-4xl">{opt.emoji}</span>
                  <span className="font-fredoka text-xs font-bold text-[#26354A] truncate max-w-full">
                    {opt.german}
                  </span>
                </button>
              ))}
            </div>

            {practiceAnswer === true && (
              <div className="bg-[#75E6A6]/20 border border-[#75E6A6] rounded-2xl p-3 text-center text-sm font-bold text-[#26354A] animate-pop">
                Super! Richtig gelöst! 🎉
              </div>
            )}
            {practiceAnswer === false && (
              <div className="bg-red-50 border border-red-200 rounded-2xl p-3 text-center text-sm font-bold text-red-600 animate-pop">
                Fast! Versuch es gleich noch einmal! 😊
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
