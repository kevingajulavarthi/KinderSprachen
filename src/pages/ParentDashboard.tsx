import React, { useState } from 'react';
import { useLearning } from '../context/LearningContext';
import { LESSONS } from '../data/lessons';
import {
  ShieldCheck,
  Volume2,
  RotateCcw,
  Sliders,
  Sparkles,
  BookOpen,
  Star,
  CheckCircle2,
  Globe,
  Trash2,
  Lock,
} from 'lucide-react';

interface ParentDashboardProps {
  onBackToApp: () => void;
  onNavigateToLesson: (lessonId: string) => void;
}

export const ParentDashboard: React.FC<ParentDashboardProps> = ({
  onBackToApp,
  onNavigateToLesson,
}) => {
  const { progress, settings, updateSettings, resetAllData, language, playSfx, playAudio } = useLearning();
  const [showResetConfirm, setShowResetConfirm] = useState(false);

  const handleSpeechTest = () => {
    playAudio('Hallo! Dies ist eine Probe der deutschen Stimme.');
  };

  const handleResetConfirm = () => {
    resetAllData();
    setShowResetConfirm(false);
  };

  return (
    <div className="space-y-8 animate-pop pb-12 max-w-4xl mx-auto">
      {/* Header */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-100 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-[#B7A4FF]/20 text-[#B7A4FF] flex items-center justify-center">
            <Lock size={28} />
          </div>
          <div>
            <h1 className="font-fredoka text-2xl sm:text-3xl font-bold text-[#26354A]">
              {language === 'de' ? 'Eltern-Dashboard & Einstellungen' : 'Parent Dashboard & Settings'}
            </h1>
            <p className="text-xs sm:text-sm text-[#26354A]/70 mt-0.5">
              {language === 'de'
                ? 'Lernfortschritt überwachen, Sprachgeschwindigkeit anpassen und Daten verwalten.'
                : 'Monitor learning progress, adjust audio settings, and control child preferences.'}
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={onBackToApp}
          className="px-6 py-2.5 rounded-2xl bg-[#55B8FF] hover:bg-[#3ea7f3] text-white font-fredoka font-bold text-sm shadow-md cursor-pointer transition-transform hover:scale-102"
        >
          ← {language === 'de' ? 'Zurück zum Lernen' : 'Return to Learning'}
        </button>
      </div>

      {/* Learning Overview Cards */}
      <section className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-white rounded-3xl p-5 border border-slate-100 shadow-2xs space-y-1">
          <span className="text-xs font-semibold text-slate-400">
            {language === 'de' ? 'Lektionen geschafft' : 'Lessons Finished'}
          </span>
          <p className="font-fredoka text-3xl font-bold text-[#55B8FF] tabular-nums">
            {progress.completedLessons.length} / {LESSONS.length}
          </p>
        </div>

        <div className="bg-white rounded-3xl p-5 border border-slate-100 shadow-2xs space-y-1">
          <span className="text-xs font-semibold text-slate-400">
            {language === 'de' ? 'Gelernte Wörter' : 'Words Introduced'}
          </span>
          <p className="font-fredoka text-3xl font-bold text-[#75E6A6] tabular-nums">
            {progress.wordsLearned.length}
          </p>
        </div>

        <div className="bg-white rounded-3xl p-5 border border-slate-100 shadow-2xs space-y-1">
          <span className="text-xs font-semibold text-slate-400">
            {language === 'de' ? 'Gesammelte Sterne' : 'Stars Collected'}
          </span>
          <p className="font-fredoka text-3xl font-bold text-[#FFD966] tabular-nums">
            {progress.stars}
          </p>
        </div>

        <div className="bg-white rounded-3xl p-5 border border-slate-100 shadow-2xs space-y-1">
          <span className="text-xs font-semibold text-slate-400">
            {language === 'de' ? 'Lern-Serie' : 'Day Streak'}
          </span>
          <p className="font-fredoka text-3xl font-bold text-[#FF8F9C] tabular-nums">
            {progress.streakDays} {language === 'de' ? 'Tag' : 'Day'}
          </p>
        </div>
      </section>

      {/* Suggested Next Lessons */}
      <section className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-100 shadow-sm space-y-4">
        <h2 className="font-fredoka text-xl font-bold text-[#26354A]">
          {language === 'de' ? 'Empfohlene nächste Schritte' : 'Recommended Next Steps'}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {LESSONS.filter((l) => !progress.completedLessons.includes(l.id))
            .slice(0, 2)
            .map((lesson) => (
              <div
                key={lesson.id}
                onClick={() => onNavigateToLesson(lesson.id)}
                className="p-4 rounded-2xl bg-[#FFFDF5] border border-slate-200 hover:border-[#55B8FF] flex items-center justify-between cursor-pointer transition-all"
              >
                <div className="flex items-center gap-3">
                  <span className="text-3xl">{lesson.icon}</span>
                  <div>
                    <h3 className="font-fredoka text-sm font-bold text-[#26354A]">
                      {language === 'de' ? lesson.titleDe : lesson.titleEn}
                    </h3>
                    <p className="text-xs text-slate-500">
                      {language === 'de' ? `Lektion ${lesson.number}` : `Lesson ${lesson.number}`}
                    </p>
                  </div>
                </div>
                <span className="text-xs font-fredoka font-bold text-[#55B8FF]">
                  Starten →
                </span>
              </div>
            ))}
        </div>
      </section>

      {/* Audio and Interface Settings */}
      <section className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-100 shadow-sm space-y-6">
        <div className="flex items-center gap-2">
          <Sliders className="text-[#55B8FF] w-5 h-5" />
          <h2 className="font-fredoka text-xl font-bold text-[#26354A]">
            {language === 'de' ? 'Audio & Spracheinstellungen' : 'Audio & Learning Settings'}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Speech Rate Slider */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm font-semibold text-[#26354A]">
              <span>{language === 'de' ? 'Sprechtempo (Deutsch)' : 'German Speech Speed'}</span>
              <span className="font-mono text-slate-500">{settings.speechRate.toFixed(2)}x</span>
            </div>
            <input
              type="range"
              min="0.6"
              max="1.1"
              step="0.05"
              value={settings.speechRate}
              onChange={(e) => updateSettings({ speechRate: parseFloat(e.target.value) })}
              className="w-full accent-[#55B8FF] cursor-pointer"
            />
            <p className="text-[11px] text-slate-400">
              {language === 'de'
                ? 'Empfohlen: 0.80x für 4- bis 5-jährige Sprachanfänger.'
                : 'Recommended: 0.80x for 4 to 5 year old beginners.'}
            </p>
          </div>

          {/* Sound Effects Toggle */}
          <div className="flex items-center justify-between p-4 rounded-2xl bg-[#FFFDF5] border border-slate-200">
            <div>
              <p className="font-fredoka text-sm font-bold text-[#26354A]">
                {language === 'de' ? 'Spielerische Soundeffekte' : 'Playful Sound Effects'}
              </p>
              <p className="text-xs text-slate-500">
                {language === 'de' ? 'Glocken und Fanfaren beim Lösen' : 'Chimes and celebration sounds'}
              </p>
            </div>
            <button
              type="button"
              onClick={() => updateSettings({ soundEffects: !settings.soundEffects })}
              className={`w-12 h-6 rounded-full transition-colors p-0.5 cursor-pointer flex items-center ${
                settings.soundEffects ? 'bg-[#75E6A6] justify-end' : 'bg-slate-300 justify-start'
              }`}
            >
              <div className="w-5 h-5 rounded-full bg-white shadow-xs" />
            </button>
          </div>

          {/* Daily Goal Words Selector */}
          <div className="space-y-2">
            <span className="text-sm font-semibold text-[#26354A]">
              {language === 'de' ? 'Tagesziel Wörter' : 'Daily Word Goal'}
            </span>
            <div className="flex gap-2">
              {[3, 5, 8, 10].map((num) => (
                <button
                  key={num}
                  type="button"
                  onClick={() => updateSettings({ dailyGoalWords: num })}
                  className={`flex-1 py-2 rounded-xl font-fredoka text-xs font-bold border transition-colors cursor-pointer ${
                    settings.dailyGoalWords === num
                      ? 'bg-[#55B8FF] text-white border-[#55B8FF]'
                      : 'bg-[#FFFDF5] text-[#26354A] border-slate-200'
                  }`}
                >
                  {num} {language === 'de' ? 'Wörter' : 'words'}
                </button>
              ))}
            </div>
          </div>

          {/* Test Audio Button */}
          <div className="flex items-end">
            <button
              type="button"
              onClick={handleSpeechTest}
              className="w-full py-3 rounded-2xl bg-slate-100 hover:bg-slate-200 text-[#26354A] font-fredoka text-sm font-bold flex items-center justify-center gap-2 cursor-pointer"
            >
              <Volume2 size={16} />
              <span>{language === 'de' ? 'Aussprache testen' : 'Test Speech Engine'}</span>
            </button>
          </div>
        </div>
      </section>

      {/* Child Privacy & Safety Guarantee */}
      <section className="bg-[#75E6A6]/15 rounded-3xl p-6 border border-[#75E6A6]/40 space-y-3">
        <div className="flex items-center gap-2 text-[#2bb463]">
          <ShieldCheck size={22} />
          <h3 className="font-fredoka text-lg font-bold text-[#26354A]">
            {language === 'de' ? 'Kinder-Sicherheit & Datenschutz' : 'Child Safety & Privacy Standard'}
          </h3>
        </div>
        <p className="text-xs sm:text-sm text-[#26354A]/80 leading-relaxed">
          {language === 'de'
            ? 'KinderSprachen schützt Kinder konsequent. Es werden keinerlei personenbezogene Daten, Geburtstage, Adressen oder Fotos erhoben. Es gibt keine Werbung, kein Tracking und keine offenen Chats. Alle Lernfortschritte verbleiben auf Ihrem eigenen Gerät.'
            : 'KinderSprachen is built with zero-compromise child privacy. We do not collect names, birthdates, locations, or photos. The app has zero third-party ads, zero tracking scripts, and no social features. All progress is safely stored locally in your browser.'}
        </p>
      </section>

      {/* Data Management & Reset */}
      <section className="bg-white rounded-3xl p-6 sm:p-8 border border-red-100 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h3 className="font-fredoka text-base font-bold text-red-600">
            {language === 'de' ? 'Lernfortschritt zurücksetzen' : 'Reset Learning Progress'}
          </h3>
          <p className="text-xs text-slate-500">
            {language === 'de'
              ? 'Löscht alle Sterne, Lektionen und Erfolge für einen frischen Neustart.'
              : 'Clears saved stars and completed lessons to start from lesson 1 again.'}
          </p>
        </div>

        <button
          type="button"
          onClick={() => setShowResetConfirm(true)}
          className="px-5 py-2.5 rounded-2xl bg-red-50 hover:bg-red-100 text-red-600 border border-red-200 font-fredoka font-bold text-xs flex items-center gap-2 cursor-pointer"
        >
          <Trash2 size={16} />
          <span>{language === 'de' ? 'Fortschritt löschen' : 'Reset All Data'}</span>
        </button>
      </section>

      {/* Reset Confirmation Modal */}
      {showResetConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs animate-pop">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-sm w-full shadow-2xl border-2 border-red-200 text-center space-y-4">
            <div className="w-12 h-12 mx-auto rounded-full bg-red-100 text-red-600 flex items-center justify-center">
              <Trash2 size={24} />
            </div>
            <h4 className="font-fredoka text-xl font-bold text-[#26354A]">
              {language === 'de' ? 'Wirklich zurücksetzen?' : 'Are you sure?'}
            </h4>
            <p className="text-xs text-slate-600">
              {language === 'de'
                ? 'Alle verdienten Sterne und Lektionen werden auf Anfang gesetzt.'
                : 'All stars and completed lessons will be reset to default.'}
            </p>
            <div className="flex gap-3 pt-2">
              <button
                type="button"
                onClick={() => setShowResetConfirm(false)}
                className="flex-1 py-2.5 rounded-xl bg-slate-100 text-[#26354A] font-fredoka text-xs font-bold"
              >
                Abbrechen
              </button>
              <button
                type="button"
                onClick={handleResetConfirm}
                className="flex-1 py-2.5 rounded-xl bg-red-600 text-white font-fredoka text-xs font-bold"
              >
                Ja, löschen
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
