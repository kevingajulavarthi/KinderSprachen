import React, { useState } from 'react';
import { useLearning } from '../context/LearningContext';
import { Sparkles, Star, Lock, Menu, X, BookOpen, Mic, Trophy } from 'lucide-react';
import { ParentGate } from './ParentGate';

interface NavbarProps {
  currentPage: string;
  onNavigate: (page: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentPage, onNavigate }) => {
  const { progress, language, setLanguage, playSfx } = useLearning();
  const [isParentGateOpen, setIsParentGateOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { id: 'dashboard', labelDe: 'Lernpfad', labelEn: 'Map' },
    { id: 'lessons', labelDe: 'Lektionen', labelEn: 'Lessons' },
    { id: 'alphabet', labelDe: 'Alphabet', labelEn: 'Alphabet' },
    { id: 'vocabulary', labelDe: 'Wörter', labelEn: 'Words' },
    { id: 'games', labelDe: 'Spiele', labelEn: 'Games' },
  ];

  const secondaryLinks = [
    { id: 'stories', labelDe: 'Geschichten', labelEn: 'Stories', icon: BookOpen },
    { id: 'speaking', labelDe: 'Sprechen', labelEn: 'Speaking', icon: Mic },
    { id: 'achievements', labelDe: 'Erfolge', labelEn: 'Stars', icon: Trophy },
  ];

  const handleNav = (pageId: string) => {
    playSfx('click');
    onNavigate(pageId);
    setMobileMenuOpen(false);
  };

  const handleParentAccess = () => {
    setIsParentGateOpen(false);
    onNavigate('parent');
    setMobileMenuOpen(false);
  };

  const toggleLanguage = () => {
    playSfx('click');
    setLanguage(language === 'de' ? 'en' : 'de');
  };

  return (
    <>
      <header className="sticky top-0 z-40 bg-[#FFFDF5]/95 backdrop-blur-md border-b border-[#FFD966]/40 px-4 sm:px-8 py-3 transition-colors">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4 sm:gap-8">
          {/* Zone 1: Brand Wordmark */}
          <button
            type="button"
            onClick={() => handleNav('home')}
            className="flex items-center gap-2 group cursor-pointer text-left whitespace-nowrap shrink-0"
          >
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-[#55B8FF] to-[#75E6A6] flex items-center justify-center text-white font-fredoka font-bold text-xl shadow-sm group-hover:scale-105 transition-transform">
              🦁
            </div>
            <span className="font-fredoka text-xl sm:text-2xl font-bold tracking-tight text-[#26354A]">
              Kinder<span className="text-[#55B8FF]">Sprachen</span>
            </span>
          </button>

          {/* Zone 2: Primary Single-Line Text Nav Links */}
          <nav className="hidden lg:flex items-center gap-6 text-base font-fredoka font-medium text-[#26354A]/80">
            {navLinks.map((link) => {
              const isActive = currentPage === link.id;
              return (
                <button
                  key={link.id}
                  type="button"
                  onClick={() => handleNav(link.id)}
                  className={`relative py-1 whitespace-nowrap shrink-0 transition-colors cursor-pointer ${
                    isActive ? 'text-[#55B8FF] font-bold' : 'hover:text-[#26354A]'
                  }`}
                >
                  {language === 'de' ? link.labelDe : link.labelEn}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 w-full h-1 bg-[#55B8FF] rounded-full" />
                  )}
                </button>
              );
            })}

            {/* Extra fun sections */}
            <div className="flex items-center gap-4 pl-2 border-l border-slate-200">
              {secondaryLinks.map((item) => {
                const isActive = currentPage === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => handleNav(item.id)}
                    className={`py-1 whitespace-nowrap shrink-0 transition-colors cursor-pointer text-sm ${
                      isActive ? 'text-[#FF8F9C] font-bold' : 'hover:text-[#26354A]'
                    }`}
                  >
                    {language === 'de' ? item.labelDe : item.labelEn}
                  </button>
                );
              })}
            </div>
          </nav>

          {/* Zone 3: Primary Action Cluster */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            {/* Stars Display */}
            <button
              type="button"
              onClick={() => handleNav('achievements')}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#FFD966]/25 border border-[#FFD966] text-[#26354A] font-fredoka font-bold text-sm shadow-2xs hover:bg-[#FFD966]/40 transition-colors"
              title="Stars earned"
            >
              <Star className="w-4 h-4 fill-[#FFD966] text-[#FFD966]" />
              <span className="tabular-nums">{progress.stars}</span>
            </button>

            {/* Language Switch */}
            <button
              type="button"
              onClick={toggleLanguage}
              className="px-2.5 py-1.5 rounded-xl bg-white border border-slate-200 text-xs font-bold font-fredoka hover:bg-slate-50 transition-colors text-[#26354A]"
              title="Switch language / Sprache wechseln"
            >
              {language === 'de' ? '🇩🇪 DE' : '🇬🇧 EN'}
            </button>

            {/* Parent Gate Lock */}
            <button
              type="button"
              onClick={() => setIsParentGateOpen(true)}
              className="p-2 rounded-xl bg-white hover:bg-[#B7A4FF]/15 text-[#26354A]/70 hover:text-[#B7A4FF] border border-slate-200 transition-colors"
              title="Parent Dashboard (Protected)"
              aria-label="Parent Dashboard"
            >
              <Lock size={16} />
            </button>

            {/* Mobile Hamburger Button */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl bg-white border border-slate-200 text-[#26354A]"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Nav Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden mt-3 pt-3 border-t border-[#FFD966]/30 grid grid-cols-2 gap-2 animate-pop">
            {[...navLinks, ...secondaryLinks].map((link) => (
              <button
                key={link.id}
                type="button"
                onClick={() => handleNav(link.id)}
                className={`p-3 rounded-2xl text-left font-fredoka text-sm transition-all ${
                  currentPage === link.id
                    ? 'bg-[#55B8FF] text-white font-bold shadow-xs'
                    : 'bg-white hover:bg-[#FFD966]/20 text-[#26354A] border border-slate-100'
                }`}
              >
                {language === 'de' ? link.labelDe : link.labelEn}
              </button>
            ))}
            <button
              type="button"
              onClick={() => {
                setIsParentGateOpen(true);
                setMobileMenuOpen(false);
              }}
              className="col-span-2 p-3 rounded-2xl bg-[#B7A4FF]/20 text-[#26354A] font-fredoka text-sm flex items-center justify-center gap-2 border border-[#B7A4FF]/40 font-bold"
            >
              <Lock size={16} />
              {language === 'de' ? 'Elternbereich (Geschützt)' : 'Parent Area (Protected)'}
            </button>
          </div>
        )}
      </header>

      {/* Parent Gate Modal */}
      <ParentGate
        isOpen={isParentGateOpen}
        onSuccess={handleParentAccess}
        onClose={() => setIsParentGateOpen(false)}
      />
    </>
  );
};
