import React from 'react';
import { useLearning } from '../context/LearningContext';
import { ShieldCheck, Volume2, VolumeX, Heart, Sparkles } from 'lucide-react';

interface FooterProps {
  onOpenParent: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenParent }) => {
  const { settings, updateSettings, language, playSfx } = useLearning();

  const toggleSound = () => {
    playSfx('click');
    updateSettings({ soundEffects: !settings.soundEffects });
  };

  return (
    <footer className="mt-16 border-t border-[#FFD966]/40 bg-white/70 py-8 px-4 text-center">
      <div className="max-w-4xl mx-auto flex flex-col items-center gap-4">
        {/* Child Safety Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#75E6A6]/20 border border-[#75E6A6]/40 text-xs font-semibold text-[#26354A]">
          <ShieldCheck size={16} className="text-[#3ea76b]" />
          <span>
            {language === 'de'
              ? '100% Kindersicher · Keine Werbung · Keine Datenspeicherung'
              : '100% Child-Safe · No Ads · Zero Tracking · Safe for Kids'}
          </span>
        </div>

        {/* Audio Toggle & Parent Area */}
        <div className="flex flex-wrap items-center justify-center gap-4 text-sm text-[#26354A]/80 font-fredoka">
          <button
            type="button"
            onClick={toggleSound}
            className="flex items-center gap-1.5 hover:text-[#55B8FF] transition-colors cursor-pointer"
          >
            {settings.soundEffects ? <Volume2 size={16} /> : <VolumeX size={16} />}
            <span>
              {language === 'de'
                ? settings.soundEffects ? 'Sound-Effekte: An' : 'Sound-Effekte: Aus'
                : settings.soundEffects ? 'Sound Effects: On' : 'Sound Effects: Off'}
            </span>
          </button>

          <span aria-hidden="true" className="text-slate-300">·</span>

          <button
            type="button"
            onClick={onOpenParent}
            className="hover:text-[#B7A4FF] transition-colors cursor-pointer"
          >
            {language === 'de' ? 'Elternbereich' : 'Parents Area'}
          </button>

          <span aria-hidden="true" className="text-slate-300">·</span>

          <span className="flex items-center gap-1 text-xs text-[#26354A]/60 font-nunito">
            KinderSprachen <Sparkles size={12} className="text-[#FFD966]" /> Learn German through Play
          </span>
        </div>
      </div>
    </footer>
  );
};
