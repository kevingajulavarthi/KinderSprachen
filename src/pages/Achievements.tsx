import React from 'react';
import { useLearning } from '../context/LearningContext';
import { computeAchievements } from '../data/achievements';
import { Trophy, Star, Sparkles, CheckCircle2, Lock } from 'lucide-react';
import { MascotLeo } from '../components/MascotLeo';

export const Achievements: React.FC = () => {
  const { progress, language, playSfx, triggerCelebration } = useLearning();
  const achievements = computeAchievements(progress);

  const unlockedCount = achievements.filter((a) => a.isUnlocked).length;

  const handleBadgeClick = (isUnlocked: boolean) => {
    if (isUnlocked) {
      triggerCelebration();
    } else {
      playSfx('pop');
    }
  };

  return (
    <div className="space-y-8 animate-pop pb-12">
      {/* Header */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-100 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-[#FFD966]/25 text-amber-500 flex items-center justify-center text-3xl">
            🏆
          </div>
          <div>
            <h1 className="font-fredoka text-3xl sm:text-4xl font-bold text-[#26354A]">
              {language === 'de' ? 'Deine Erfolge & Sterne' : 'Your Stars & Badges'}
            </h1>
            <p className="text-sm sm:text-base text-[#26354A]/70 mt-1">
              {language === 'de'
                ? `${unlockedCount} von ${achievements.length} Abzeichen freigeschaltet!`
                : `${unlockedCount} of ${achievements.length} badges unlocked!`}
            </p>
          </div>
        </div>

        {/* Total Stars Pill */}
        <div className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-[#FFD966]/20 border-2 border-[#FFD966] text-[#26354A]">
          <Star size={24} className="fill-amber-400 text-amber-500" />
          <span className="font-fredoka text-2xl font-bold tabular-nums">
            {progress.stars} {language === 'de' ? 'Sterne gesammelt' : 'Stars Earned'}
          </span>
        </div>
      </div>

      {/* Encouragement from Leo */}
      <div className="bg-gradient-to-r from-[#75E6A6]/20 to-[#55B8FF]/20 rounded-3xl p-6 border border-[#75E6A6]/30 flex flex-col sm:flex-row items-center gap-4">
        <MascotLeo size="sm" showSpeechBubble={false} />
        <div>
          <h3 className="font-fredoka text-lg font-bold text-[#26354A]">
            {language === 'de' ? 'Leo ist mächtig stolz auf dich!' : 'Leo is super proud of you!'}
          </h3>
          <p className="text-sm text-[#26354A]/75">
            {language === 'de'
              ? 'Jedes einzelne Wort, das du lernst, macht dich stärker. Mach in deinem ganz eigenen Tempo weiter!'
              : 'Every single German word you learn makes you stronger. Keep going at your own happy pace!'}
          </p>
        </div>
      </div>

      {/* Badges Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {achievements.map((ach) => {
          const percent = Math.min(100, Math.round((ach.currentCount / ach.targetCount) * 100));

          return (
            <div
              key={ach.id}
              onClick={() => handleBadgeClick(ach.isUnlocked)}
              className={`rounded-3xl p-6 border-2 flex flex-col justify-between transition-all duration-200 cursor-pointer ${
                ach.isUnlocked
                  ? 'bg-white border-[#75E6A6] shadow-md hover:scale-102 ring-2 ring-[#75E6A6]/20'
                  : 'bg-white/60 border-slate-200 opacity-80'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div
                    className={`w-14 h-14 rounded-2xl flex items-center justify-center text-3xl shadow-xs ${
                      ach.isUnlocked ? 'bg-[#75E6A6]/20' : 'bg-slate-100 grayscale'
                    }`}
                  >
                    {ach.icon}
                  </div>

                  {ach.isUnlocked ? (
                    <span className="flex items-center gap-1 text-xs font-bold text-[#2bb463] bg-[#75E6A6]/15 px-2.5 py-1 rounded-full">
                      <CheckCircle2 size={14} /> Freigeschaltet
                    </span>
                  ) : (
                    <span className="flex items-center gap-1 text-xs font-semibold text-slate-400 bg-slate-100 px-2.5 py-1 rounded-full">
                      <Lock size={12} /> Noch offen
                    </span>
                  )}
                </div>

                <h3 className="font-fredoka text-lg font-bold text-[#26354A]">
                  {language === 'de' ? ach.titleDe : ach.titleEn}
                </h3>
                <p className="text-xs text-[#26354A]/70 mt-1">
                  {language === 'de' ? ach.descriptionDe : ach.descriptionEn}
                </p>
              </div>

              {/* Progress bar inside badge */}
              <div className="mt-5 pt-3 border-t border-slate-100">
                <div className="flex items-center justify-between text-[11px] font-semibold text-[#26354A]/60 mb-1.5">
                  <span>{language === 'de' ? 'Fortschritt' : 'Progress'}</span>
                  <span className="tabular-nums">
                    {ach.currentCount} / {ach.targetCount}
                  </span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-300 ${
                      ach.isUnlocked ? 'bg-[#75E6A6]' : 'bg-[#55B8FF]'
                    }`}
                    style={{ width: `${percent}%` }}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
