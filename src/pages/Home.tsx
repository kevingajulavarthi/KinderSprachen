import React from 'react';
import { useLearning } from '../context/LearningContext';
import { MascotLeo } from '../components/MascotLeo';
import { AudioButton } from '../components/AudioButton';
import { Play, Sparkles, Volume2, Gamepad2, Compass, Award, Shield } from 'lucide-react';

interface HomeProps {
  onNavigate: (page: string, params?: { lessonId?: string }) => void;
}

export const Home: React.FC<HomeProps> = ({ onNavigate }) => {
  const { language, playSfx, playAudio } = useLearning();

  const previewCards = [
    { id: 'alphabet', titleDe: 'ABC & Alphabet', titleEn: 'ABC & Alphabet', sampleDe: 'A wie Apfel 🍎', audio: 'A wie Apfel', color: '#FFD966', emoji: '🔤' },
    { id: 'numbers', titleDe: 'Zahlen 1 bis 10', titleEn: 'Numbers 1 to 10', sampleDe: 'Eins, zwei, drei! 🔢', audio: 'Eins, zwei, drei!', color: '#75E6A6', emoji: '🔢' },
    { id: 'colors', titleDe: 'Bunte Farben', titleEn: 'Colors', sampleDe: 'Rot, blau, gelb 🎨', audio: 'Rot, blau, gelb', color: '#55B8FF', emoji: '🎨' },
    { id: 'animals', titleDe: 'Lustige Tiere', titleEn: 'Animals', sampleDe: 'Die Katze schnurrt 🐱', audio: 'die Katze', color: '#FF8F9C', emoji: '🐱' },
    { id: 'food', titleDe: 'Leckeres Essen', titleEn: 'Yummy Food', sampleDe: 'Der Apfel ist süß 🍎', audio: 'der Apfel', color: '#FFD966', emoji: '🥪' },
    { id: 'family', titleDe: 'Meine Familie', titleEn: 'My Family', sampleDe: 'Mama und Papa 👨‍👩‍👧', audio: 'die Mama und der Papa', color: '#B7A4FF', emoji: '👨‍👩‍👧' },
    { id: 'toys', titleDe: 'Tolles Spielzeug', titleEn: 'Fun Toys', sampleDe: 'Der Ball springt ⚽', audio: 'der Ball', color: '#55B8FF', emoji: '🧸' },
    { id: 'speaking', titleDe: 'Erste Sätze', titleEn: 'First Phrases', sampleDe: 'Hallo! Wie gehts? 👋', audio: 'Hallo! Wie geht es dir?', color: '#75E6A6', emoji: '💬' },
  ];

  const handleCardClick = (card: typeof previewCards[0]) => {
    playSfx('pop');
    playAudio(card.audio);
  };

  return (
    <div className="space-y-12 sm:space-y-16 pb-12 animate-pop">
      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-b from-[#55B8FF]/15 via-[#FFD966]/15 to-[#FFFDF5] p-6 sm:p-10 border-2 border-[#55B8FF]/20 shadow-sm">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Hero Left Content */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            {/* Leo Mascot Hello */}
            <div className="flex justify-center lg:justify-start">
              <MascotLeo
                messageDe="Hallo! Ich bin Leo der Löwe! Komm, lass uns Deutsch lernen!"
                messageEn="Hello! I am Leo the lion! Come, let's learn German together!"
                size="md"
              />
            </div>

            <div className="space-y-2">
              <h1 className="font-fredoka text-3xl sm:text-5xl font-extrabold text-[#26354A] tracking-tight leading-tight">
                {language === 'de' ? (
                  <>
                    Hallo! <span className="text-[#55B8FF]">Lass uns</span> Deutsch lernen!
                  </>
                ) : (
                  <>
                    Hallo! <span className="text-[#55B8FF]">Let&apos;s Learn</span> German!
                  </>
                )}
              </h1>
              <p className="font-nunito text-lg sm:text-xl text-[#26354A]/80 max-w-xl">
                {language === 'de'
                  ? 'Entdecke neue Wörter, spiele spannende Spiele und werde spielerisch zum kleinen Deutsch-Profi!'
                  : 'Discover new words, play exciting games, and become a little German speaker through joyful play!'}
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2">
              <button
                type="button"
                onClick={() => {
                  playSfx('fanfare');
                  onNavigate('dashboard');
                }}
                className="px-7 py-4 rounded-2xl bg-[#55B8FF] hover:bg-[#3ea7f3] text-white font-fredoka font-bold text-lg shadow-lg hover:shadow-xl transition-all duration-200 transform hover:-translate-y-0.5 active:translate-y-0 flex items-center gap-3 cursor-pointer"
              >
                <Play className="fill-white w-5 h-5" />
                <span>{language === 'de' ? 'Jetzt Lernen starten' : 'Start Learning'}</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  playSfx('pop');
                  onNavigate('games');
                }}
                className="px-6 py-4 rounded-2xl bg-[#FFD966] hover:bg-[#f6cf4c] text-[#26354A] font-fredoka font-bold text-lg shadow-md hover:shadow-lg transition-all duration-200 transform hover:-translate-y-0.5 active:translate-y-0 flex items-center gap-2 cursor-pointer"
              >
                <Gamepad2 className="w-5 h-5 text-[#26354A]" />
                <span>{language === 'de' ? 'Spiele entdecken' : 'Explore Games'}</span>
              </button>
            </div>

            {/* Quick trust notes for parents & kids */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 text-xs font-semibold text-[#26354A]/70 pt-2">
              <span className="flex items-center gap-1.5">
                <Sparkles size={14} className="text-[#55B8FF]" /> 3–7 Min. Mini-Lessons
              </span>
              <span aria-hidden="true">·</span>
              <span className="flex items-center gap-1.5">
                <Volume2 size={14} className="text-[#75E6A6]" /> Real German Audio
              </span>
              <span aria-hidden="true">·</span>
              <span className="flex items-center gap-1.5">
                <Shield size={14} className="text-[#FF8F9C]" /> Safe for 4–7 Year Olds
              </span>
            </div>
          </div>

          {/* Hero Right Visual: Leo Storybook Artwork */}
          <div className="lg:col-span-5 relative flex justify-center">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white rotate-1 hover:rotate-0 transition-transform duration-300 max-w-md w-full bg-white">
              <img
                src="/src/assets/images/hero_german_kids_1792347917484.jpg"
                alt="Leo the Lion with friends learning German"
                className="w-full h-auto object-cover"
                referrerPolicy="no-referrer"
              />
              {/* Floating Audio Play Tag */}
              <div className="absolute bottom-3 left-3 right-3 bg-white/95 backdrop-blur-xs p-3 rounded-2xl shadow-md border border-amber-100 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">🦁</span>
                  <div>
                    <p className="font-fredoka text-sm font-bold text-[#26354A]">Leo sagt: Hallo!</p>
                    <p className="text-xs text-[#26354A]/70">Tap speaker to listen</p>
                  </div>
                </div>
                <AudioButton text="Hallo! Ich heiße Leo!" size="sm" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section: What Will You Learn? */}
      <section className="space-y-6">
        <div className="text-center space-y-2">
          <h2 className="font-fredoka text-2xl sm:text-4xl font-bold text-[#26354A]">
            {language === 'de' ? 'Was wirst du lernen?' : 'What Will You Learn?'}
          </h2>
          <p className="text-sm sm:text-base text-[#26354A]/75 max-w-xl mx-auto">
            {language === 'de'
              ? 'Tippe auf eine Karte, um das deutsche Wort anzuhören!'
              : 'Tap on any card to hear the German pronunciation!'}
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {previewCards.map((card) => (
            <div
              key={card.id}
              onClick={() => handleCardClick(card)}
              className="group bg-white rounded-3xl p-5 border-2 border-slate-100 hover:border-[#55B8FF] shadow-xs hover:shadow-lg transition-all duration-200 cursor-pointer flex flex-col justify-between relative overflow-hidden"
            >
              <div
                className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl shadow-xs group-hover:scale-110 transition-transform mb-3"
                style={{ backgroundColor: `${card.color}30` }}
              >
                {card.emoji}
              </div>

              <div className="space-y-1">
                <h3 className="font-fredoka font-bold text-base sm:text-lg text-[#26354A] group-hover:text-[#55B8FF] transition-colors">
                  {language === 'de' ? card.titleDe : card.titleEn}
                </h3>
                <p className="text-xs sm:text-sm text-[#26354A]/70 font-medium">
                  {card.sampleDe}
                </p>
              </div>

              <div className="mt-3 flex items-center justify-between pt-2 border-t border-slate-100">
                <span className="text-xs font-semibold text-[#55B8FF] flex items-center gap-1">
                  <Volume2 size={14} /> {language === 'de' ? 'Anhören' : 'Listen'}
                </span>
                <span className="text-xs text-slate-400 group-hover:translate-x-1 transition-transform">
                  →
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Feature Pillars */}
      <section className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-100 shadow-sm">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex flex-col items-center text-center space-y-2">
            <div className="w-16 h-16 rounded-2xl bg-[#55B8FF]/20 text-[#55B8FF] flex items-center justify-center text-3xl mb-1">
              🎨
            </div>
            <h3 className="font-fredoka font-bold text-lg text-[#26354A]">
              {language === 'de' ? 'Lernen durch Bilder' : 'Learn Through Pictures'}
            </h3>
            <p className="text-sm text-[#26354A]/70">
              {language === 'de'
                ? 'Kein Auswendiglernen! Kinder verbinden bunte Bilder direkt mit den deutschen Begriffen.'
                : 'No dry grammar! Children connect friendly colorful pictures directly with German words.'}
            </p>
          </div>

          <div className="flex flex-col items-center text-center space-y-2">
            <div className="w-16 h-16 rounded-2xl bg-[#75E6A6]/20 text-[#75E6A6] flex items-center justify-center text-3xl mb-1">
              ⭐
            </div>
            <h3 className="font-fredoka font-bold text-lg text-[#26354A]">
              {language === 'de' ? 'Positives Feedback' : 'Gentle & Encouraging'}
            </h3>
            <p className="text-sm text-[#26354A]/70">
              {language === 'de'
                ? 'Fehler sind normal! Leo lobt jeden Versuch mit Sternen, Konfetti und freundlichen Worten.'
                : 'Mistakes are normal! Leo rewards every effort with stars, confetti, and joyful cheer.'}
            </p>
          </div>

          <div className="flex flex-col items-center text-center space-y-2">
            <div className="w-16 h-16 rounded-2xl bg-[#FFD966]/25 text-[#FFD966] flex items-center justify-center text-3xl mb-1">
              ⏰
            </div>
            <h3 className="font-fredoka font-bold text-lg text-[#26354A]">
              {language === 'de' ? 'Kurze Lerneinheiten' : 'Bite-Sized Lessons'}
            </h3>
            <p className="text-sm text-[#26354A]/70">
              {language === 'de'
                ? '3 bis 7 Minuten pro Tag reichen vollkommen aus, um spielerisch Deutsch zu lernen.'
                : '3 to 7 minutes of playful learning each day helps build natural, lasting vocabulary.'}
            </p>
          </div>
        </div>
      </section>

      {/* Direct Play Banner */}
      <section className="bg-gradient-to-r from-[#FFD966] via-[#FF8F9C] to-[#B7A4FF] p-1 rounded-3xl shadow-lg">
        <div className="bg-[#FFFDF5] rounded-[22px] p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center sm:text-left">
            <h3 className="font-fredoka text-2xl font-bold text-[#26354A]">
              {language === 'de' ? 'Bereit für deine erste Lektion?' : 'Ready for your first lesson?'}
            </h3>
            <p className="text-sm text-[#26354A]/75">
              {language === 'de'
                ? 'Lerne "Hallo", "Tschüss", "Danke" und feiere mit Leo!'
                : 'Learn "Hallo", "Tschüss", "Danke" and celebrate with Leo!'}
            </p>
          </div>
          <button
            type="button"
            onClick={() => onNavigate('lesson-player', { lessonId: 'lesson-1' })}
            className="px-8 py-3.5 rounded-2xl bg-[#55B8FF] hover:bg-[#3ea7f3] text-white font-fredoka font-bold text-base shadow-md hover:shadow-lg transition-transform active:scale-95 cursor-pointer whitespace-nowrap"
          >
            {language === 'de' ? 'Lektion 1 starten 👋' : 'Start Lesson 1 👋'}
          </button>
        </div>
      </section>
    </div>
  );
};
