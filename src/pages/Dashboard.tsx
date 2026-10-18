import React from 'react';
import { useLearning } from '../context/LearningContext';
import { LESSONS } from '../data/lessons';
import { Star, Flame, Trophy, BookOpen, CheckCircle2, Play, LockOpen, Sparkles } from 'lucide-react';
import { MascotLeo } from '../components/MascotLeo';

interface DashboardProps {
  onStartLesson: (lessonId: string) => void;
  onNavigate: (page: string) => void;
}

export const Dashboard: React.FC<DashboardProps> = ({ onStartLesson, onNavigate }) => {
  const { progress, language, playSfx } = useLearning();

  // Find next recommended lesson (first uncompleted lesson)
  const nextLesson = LESSONS.find((l) => !progress.completedLessons.includes(l.id)) || LESSONS[0];

  const handleNodeClick = (lessonId: string) => {
    playSfx('click');
    onStartLesson(lessonId);
  };

  const dailyPercent = Math.min(100, Math.round((progress.dailyWordsCount / progress.dailyGoal) * 100));

  return (
    <div className="space-y-8 animate-pop pb-12">
      {/* Top Welcome & KPI Header */}
      <section className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-100 shadow-sm">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <MascotLeo size="sm" showSpeechBubble={false} />
            <div>
              <h1 className="font-fredoka text-2xl sm:text-3xl font-bold text-[#26354A]">
                {language === 'de' ? 'Hallo, kleiner Lerner! 🌟' : 'Hallo, Little Learner! 🌟'}
              </h1>
              <p className="text-sm text-[#26354A]/70">
                {language === 'de'
                  ? `Stufe ${progress.level} · Dein Deutsch-Abenteuer geht weiter!`
                  : `Level ${progress.level} · Your German adventure continues!`}
              </p>
            </div>
          </div>

          {/* Continue Learning CTA */}
          <button
            type="button"
            onClick={() => handleNodeClick(nextLesson.id)}
            className="w-full md:w-auto px-6 py-3.5 rounded-2xl bg-[#55B8FF] hover:bg-[#3ea7f3] text-white font-fredoka font-bold text-base shadow-md hover:shadow-lg transition-transform active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
          >
            <Play className="fill-white w-5 h-5" />
            <span>
              {language === 'de'
                ? `Weiterlernen: ${nextLesson.titleDe}`
                : `Continue: ${nextLesson.titleEn}`}
            </span>
          </button>
        </div>

        {/* Learning Stats Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mt-6 pt-6 border-t border-slate-100">
          {/* Level */}
          <div className="bg-[#55B8FF]/10 rounded-2xl p-4 border border-[#55B8FF]/20 flex flex-col items-center sm:items-start">
            <div className="flex items-center gap-2 text-[#55B8FF] mb-1">
              <Trophy size={18} />
              <span className="text-xs font-bold font-fredoka uppercase tracking-wider">
                {language === 'de' ? 'Stufe' : 'Level'}
              </span>
            </div>
            <span className="font-fredoka text-2xl sm:text-3xl font-bold text-[#26354A] tabular-nums">
              {progress.level}
            </span>
          </div>

          {/* Stars */}
          <div className="bg-[#FFD966]/15 rounded-2xl p-4 border border-[#FFD966]/30 flex flex-col items-center sm:items-start">
            <div className="flex items-center gap-2 text-amber-500 mb-1">
              <Star size={18} className="fill-amber-400" />
              <span className="text-xs font-bold font-fredoka uppercase tracking-wider">
                {language === 'de' ? 'Sterne' : 'Stars'}
              </span>
            </div>
            <span className="font-fredoka text-2xl sm:text-3xl font-bold text-[#26354A] tabular-nums">
              {progress.stars}
            </span>
          </div>

          {/* Words Learned */}
          <div className="bg-[#75E6A6]/15 rounded-2xl p-4 border border-[#75E6A6]/30 flex flex-col items-center sm:items-start">
            <div className="flex items-center gap-2 text-[#2bb463] mb-1">
              <BookOpen size={18} />
              <span className="text-xs font-bold font-fredoka uppercase tracking-wider">
                {language === 'de' ? 'Wörter' : 'Words'}
              </span>
            </div>
            <span className="font-fredoka text-2xl sm:text-3xl font-bold text-[#26354A] tabular-nums">
              {progress.wordsLearned.length}
            </span>
          </div>

          {/* Streak */}
          <div className="bg-[#FF8F9C]/15 rounded-2xl p-4 border border-[#FF8F9C]/30 flex flex-col items-center sm:items-start">
            <div className="flex items-center gap-2 text-[#FF8F9C] mb-1">
              <Flame size={18} className="fill-[#FF8F9C]" />
              <span className="text-xs font-bold font-fredoka uppercase tracking-wider">
                {language === 'de' ? 'Serie' : 'Streak'}
              </span>
            </div>
            <span className="font-fredoka text-2xl sm:text-3xl font-bold text-[#26354A] tabular-nums">
              {progress.streakDays} {language === 'de' ? 'Tag' : 'Day'}
            </span>
          </div>
        </div>

        {/* Daily Goal Bar */}
        <div className="mt-6 bg-[#FFFDF5] rounded-2xl p-4 border border-amber-100 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <span className="text-2xl">🎯</span>
            <div>
              <p className="font-fredoka text-sm font-bold text-[#26354A]">
                {language === 'de' ? 'Tagesziel: 5 neue Wörter' : 'Daily Goal: 5 New Words'}
              </p>
              <p className="text-xs text-[#26354A]/70">
                {progress.dailyWordsCount} / {progress.dailyGoal}{' '}
                {language === 'de' ? 'Wörter heute geübt' : 'words practiced today'}
              </p>
            </div>
          </div>
          <div className="w-full sm:w-64 bg-slate-100 rounded-full h-4 overflow-hidden border border-slate-200">
            <div
              className="bg-gradient-to-r from-[#75E6A6] to-[#55B8FF] h-full rounded-full transition-all duration-500"
              style={{ width: `${dailyPercent}%` }}
            />
          </div>
        </div>
      </section>

      {/* Visual Adventure Map Banner */}
      <section className="relative rounded-3xl overflow-hidden shadow-sm border-2 border-[#FFD966]/30">
        <img
          src="/src/assets/images/adventure_learning_map_1792347917457.jpg"
          alt="Adventure learning map winding through hills"
          className="w-full h-48 sm:h-64 object-cover"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent flex flex-col justify-end p-6 text-white">
          <h2 className="font-fredoka text-2xl sm:text-3xl font-bold">
            {language === 'de' ? 'Dein Lernpfad durch das Zauberland' : 'Your Learning Path Through Magic Land'}
          </h2>
          <p className="text-sm text-white/90 max-w-lg">
            {language === 'de'
              ? 'Schließe Lektionen ab, um neue Stationen auf der bunten Landkarte zu meistern!'
              : 'Complete lessons to master new stops along the colorful adventure map!'}
          </p>
        </div>
      </section>

      {/* Interactive 10-Node Learning Path */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="font-fredoka text-2xl font-bold text-[#26354A]">
            {language === 'de' ? 'Alle 10 Lektionen' : 'All 10 Lessons'}
          </h2>
          <span className="text-xs font-semibold text-[#26354A]/70">
            {progress.completedLessons.length} / 10{' '}
            {language === 'de' ? 'Abgeschlossen' : 'Completed'}
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {LESSONS.map((lesson) => {
            const isCompleted = progress.completedLessons.includes(lesson.id);
            const isNext = lesson.id === nextLesson.id;

            return (
              <div
                key={lesson.id}
                onClick={() => handleNodeClick(lesson.id)}
                className={`group relative rounded-3xl p-5 border-2 transition-all duration-200 cursor-pointer flex flex-col justify-between ${
                  isNext
                    ? 'bg-white border-[#55B8FF] shadow-lg ring-4 ring-[#55B8FF]/20 scale-102'
                    : isCompleted
                    ? 'bg-[#75E6A6]/10 border-[#75E6A6]/40 hover:bg-[#75E6A6]/20 shadow-xs'
                    : 'bg-white border-slate-100 hover:border-[#FFD966] shadow-xs hover:shadow-md'
                }`}
              >
                {/* Node Badge */}
                <div className="flex items-center justify-between mb-3">
                  <div
                    className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl shadow-xs group-hover:scale-110 transition-transform"
                    style={{ backgroundColor: `${lesson.themeColor}30` }}
                  >
                    {lesson.icon}
                  </div>

                  {isCompleted ? (
                    <span className="flex items-center gap-1 text-xs font-bold text-[#2bb463]">
                      <CheckCircle2 size={16} /> Fertig
                    </span>
                  ) : isNext ? (
                    <span className="flex items-center gap-1 text-xs font-bold text-[#55B8FF] animate-pulse">
                      <Sparkles size={16} /> Next
                    </span>
                  ) : (
                    <span className="text-xs font-semibold text-slate-400">
                      <LockOpen size={14} /> Open
                    </span>
                  )}
                </div>

                {/* Lesson Title */}
                <div className="space-y-1">
                  <span className="text-xs font-bold text-[#26354A]/50">
                    {language === 'de' ? `Lektion ${lesson.number}` : `Lesson ${lesson.number}`}
                  </span>
                  <h3 className="font-fredoka font-bold text-lg text-[#26354A] group-hover:text-[#55B8FF] transition-colors leading-tight">
                    {language === 'de' ? lesson.titleDe : lesson.titleEn}
                  </h3>
                  <p className="text-xs text-[#26354A]/70 line-clamp-2">
                    {language === 'de' ? lesson.descriptionDe : lesson.descriptionEn}
                  </p>
                </div>

                {/* Action button inside card */}
                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-xs font-bold text-amber-500 flex items-center gap-1">
                    <Star size={14} className="fill-amber-400" /> +{lesson.starsAwarded}
                  </span>
                  <span className="w-8 h-8 rounded-full bg-[#55B8FF]/10 text-[#55B8FF] flex items-center justify-center group-hover:bg-[#55B8FF] group-hover:text-white transition-colors">
                    <Play size={14} className="fill-current" />
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};
