import React, { useState } from 'react';
import { useLearning } from '../context/LearningContext';
import { STORIES } from '../data/stories';
import { Story, StoryPage } from '../types';
import { AudioButton } from '../components/AudioButton';
import { BookOpen, ArrowLeft, ArrowRight, Check, Volume2, Sparkles, Star, RotateCcw } from 'lucide-react';

export const Stories: React.FC = () => {
  const { language, playSfx, playAudio, triggerCelebration, recordStoryRead } = useLearning();
  const [selectedStory, setSelectedStory] = useState<Story | null>(null);
  const [currentPageIndex, setCurrentPageIndex] = useState(0);
  const [showEnglishTranslation, setShowEnglishTranslation] = useState(true);
  const [selectedWordPopup, setSelectedWordPopup] = useState<{ word: string; meaning: string } | null>(null);
  const [quizAnswered, setQuizAnswered] = useState<boolean | null>(null);

  const handleSelectStory = (story: Story) => {
    playSfx('click');
    setSelectedStory(story);
    setCurrentPageIndex(0);
    setSelectedWordPopup(null);
    setQuizAnswered(null);
    playAudio(story.titleDe);
  };

  const handleNextPage = () => {
    if (!selectedStory) return;
    playSfx('click');
    if (currentPageIndex + 1 < selectedStory.pages.length) {
      setCurrentPageIndex((prev) => prev + 1);
      setSelectedWordPopup(null);
      setQuizAnswered(null);
      playAudio(selectedStory.pages[currentPageIndex + 1].textDe);
    } else {
      // Completed story
      recordStoryRead();
    }
  };

  const handlePrevPage = () => {
    if (!selectedStory || currentPageIndex === 0) return;
    playSfx('click');
    setCurrentPageIndex((prev) => prev - 1);
    setSelectedWordPopup(null);
  };

  const handleWordTap = (word: string, meaning: string) => {
    playSfx('pop');
    setSelectedWordPopup({ word, meaning });
    playAudio(word);
  };

  return (
    <div className="space-y-8 animate-pop pb-12">
      {/* Header */}
      {!selectedStory ? (
        <>
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-100 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h1 className="font-fredoka text-3xl sm:text-4xl font-bold text-[#26354A]">
                {language === 'de' ? 'Deutsche Bilder-Geschichten' : 'German Storybooks'}
              </h1>
              <p className="text-sm sm:text-base text-[#26354A]/70 mt-1">
                {language === 'de'
                  ? 'Kuschelige kleine Geschichten zum Zuhören, Mitlesen und Verstehen.'
                  : 'Cozy illustrated stories to listen, read along, and explore new words.'}
              </p>
            </div>
          </div>

          {/* Stories Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {STORIES.map((story) => (
              <div
                key={story.id}
                onClick={() => handleSelectStory(story)}
                className="group bg-white rounded-3xl border-2 border-slate-100 hover:border-[#55B8FF] shadow-xs hover:shadow-lg transition-all duration-300 cursor-pointer overflow-hidden flex flex-col justify-between"
              >
                {/* Story Cover Image or Emoji Banner */}
                <div className="h-44 bg-gradient-to-tr from-[#55B8FF]/20 via-[#FFD966]/20 to-[#FF8F9C]/20 relative flex items-center justify-center overflow-hidden">
                  {story.coverImage ? (
                    <img
                      src={story.coverImage}
                      alt={story.titleDe}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      referrerPolicy="no-referrer"
                    />
                  ) : (
                    <span className="text-6xl group-hover:scale-110 transition-transform">
                      {story.coverEmoji}
                    </span>
                  )}
                  <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-xs px-2.5 py-1 rounded-full text-xs font-fredoka font-bold text-[#26354A] shadow-xs">
                    {story.pages.length} {language === 'de' ? 'Seiten' : 'pages'}
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 space-y-2">
                  <h3 className="font-fredoka text-xl font-bold text-[#26354A] group-hover:text-[#55B8FF] transition-colors">
                    {story.titleDe}
                  </h3>
                  <p className="font-nunito text-sm font-semibold text-[#55B8FF]">
                    {story.titleEn}
                  </p>
                  <p className="text-xs text-[#26354A]/70 line-clamp-2">
                    {story.descriptionEn}
                  </p>
                </div>

                {/* Bottom CTA */}
                <div className="p-4 border-t border-slate-100 bg-[#FFFDF5] flex items-center justify-between">
                  <span className="text-xs font-bold text-amber-500 flex items-center gap-1">
                    <Star size={14} className="fill-amber-400" /> +2 Stars
                  </span>
                  <span className="text-xs font-fredoka font-bold text-[#55B8FF] flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                    {language === 'de' ? 'Geschichte lesen' : 'Read Story'} →
                  </span>
                </div>
              </div>
            ))}
          </div>
        </>
      ) : (
        /* INTERACTIVE STORY READER */
        <div className="max-w-3xl mx-auto space-y-6">
          {/* Top Bar Navigation */}
          <div className="flex items-center justify-between gap-4">
            <button
              type="button"
              onClick={() => setSelectedStory(null)}
              className="flex items-center gap-1.5 px-4 py-2 rounded-2xl bg-white border border-slate-200 text-xs font-fredoka font-bold text-[#26354A] hover:bg-slate-50 cursor-pointer shadow-2xs"
            >
              <ArrowLeft size={16} />
              <span>{language === 'de' ? 'Alle Geschichten' : 'All Stories'}</span>
            </button>

            <div className="text-center">
              <h2 className="font-fredoka text-lg font-bold text-[#26354A]">
                {selectedStory.titleDe}
              </h2>
              <p className="text-xs text-slate-400">
                {language === 'de' ? 'Seite' : 'Page'} {currentPageIndex + 1} / {selectedStory.pages.length}
              </p>
            </div>

            {/* Translation Toggle */}
            <button
              type="button"
              onClick={() => setShowEnglishTranslation(!showEnglishTranslation)}
              className="px-3 py-1.5 rounded-xl bg-white border border-slate-200 text-xs font-bold font-fredoka text-[#26354A] hover:bg-slate-50"
            >
              🇬🇧 {showEnglishTranslation ? 'Hide EN' : 'Show EN'}
            </button>
          </div>

          {/* Book Page Card */}
          {(() => {
            const page = selectedStory.pages[currentPageIndex];
            const isLastPage = currentPageIndex === selectedStory.pages.length - 1;

            return (
              <div className="bg-white rounded-3xl p-6 sm:p-10 border-2 border-[#FFD966]/40 shadow-lg min-h-[460px] flex flex-col justify-between relative space-y-6">
                {/* Visual Artwork / Emoji Stage */}
                <div className="h-52 rounded-2xl bg-[#FFFDF5] border-2 border-dashed border-[#FFD966]/60 flex items-center justify-center relative overflow-hidden">
                  <span className="text-8xl animate-gentle-bounce">{page.emoji}</span>

                  <div className="absolute top-3 right-3">
                    <AudioButton text={page.textDe} size="md" />
                  </div>
                </div>

                {/* German Story Sentence with Tap-to-Speak Highlights */}
                <div className="space-y-4 text-center">
                  <div className="text-2xl sm:text-3xl font-fredoka font-bold text-[#26354A] leading-relaxed">
                    {page.textDe}
                  </div>

                  {showEnglishTranslation && (
                    <p className="font-nunito text-base text-[#26354A]/70 font-semibold italic">
                      &quot;{page.textEn}&quot;
                    </p>
                  )}

                  {/* Vocabulary Highlights */}
                  <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
                    <span className="text-xs font-bold text-slate-400 mr-1">
                      {language === 'de' ? 'Wortschatz:' : 'Tap words:'}
                    </span>
                    {page.highlightWords.map((hw, i) => (
                      <button
                        key={i}
                        type="button"
                        onClick={() => handleWordTap(hw.word, hw.meaning)}
                        className="px-3 py-1 rounded-full bg-[#55B8FF]/15 hover:bg-[#55B8FF] text-[#26354A] hover:text-white font-fredoka text-xs font-bold border border-[#55B8FF]/30 transition-colors cursor-pointer flex items-center gap-1"
                      >
                        <Volume2 size={12} />
                        <span>{hw.word}</span>
                      </button>
                    ))}
                  </div>

                  {selectedWordPopup && (
                    <div className="inline-block bg-[#FFFDF5] border border-[#55B8FF] rounded-2xl px-4 py-2 text-xs font-bold text-[#26354A] animate-pop shadow-xs">
                      ✨ {selectedWordPopup.word} = &quot;{selectedWordPopup.meaning}&quot;
                    </div>
                  )}

                  {/* Comprehension Quiz on Last Page */}
                  {page.question && (
                    <div className="bg-[#75E6A6]/15 rounded-2xl p-4 border border-[#75E6A6]/40 mt-4 space-y-3">
                      <p className="font-fredoka text-sm font-bold text-[#26354A]">
                        {language === 'de' ? page.question.questionDe : page.question.questionEn}
                      </p>
                      <div className="flex flex-wrap items-center justify-center gap-2">
                        {page.question.options.map((opt, i) => (
                          <button
                            key={i}
                            type="button"
                            onClick={() => {
                              if (opt.isCorrect) {
                                setQuizAnswered(true);
                                triggerCelebration();
                              } else {
                                setQuizAnswered(false);
                                playSfx('wrong');
                              }
                            }}
                            className="px-4 py-2 rounded-xl bg-white hover:bg-[#75E6A6] hover:text-white font-fredoka text-xs font-bold border border-slate-200 transition-colors shadow-2xs"
                          >
                            {opt.text}
                          </button>
                        ))}
                      </div>
                      {quizAnswered === true && (
                        <p className="text-xs font-bold text-[#2bb463]">
                          Toll gemacht! Das ist richtig! 🌟
                        </p>
                      )}
                    </div>
                  )}
                </div>

                {/* Bottom Story Controls */}
                <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                  <button
                    type="button"
                    onClick={handlePrevPage}
                    disabled={currentPageIndex === 0}
                    className="flex items-center gap-1.5 px-4 py-2.5 rounded-2xl bg-slate-100 hover:bg-slate-200 disabled:opacity-40 text-xs font-fredoka font-bold text-[#26354A]"
                  >
                    <ArrowLeft size={16} />
                    <span>{language === 'de' ? 'Zurück' : 'Previous'}</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleNextPage}
                    className="flex items-center gap-1.5 px-6 py-2.5 rounded-2xl bg-[#55B8FF] hover:bg-[#3ea7f3] text-white font-fredoka font-bold text-sm shadow-md transition-transform hover:scale-102 cursor-pointer"
                  >
                    <span>{isLastPage ? (language === 'de' ? 'Geschafft! 🎉' : 'Finish Story! 🎉') : (language === 'de' ? 'Weiter' : 'Next Page')}</span>
                    <ArrowRight size={16} />
                  </button>
                </div>
              </div>
            );
          })()}
        </div>
      )}
    </div>
  );
};
