import React, { useState } from 'react';
import { useLearning } from '../context/LearningContext';
import { Volume2, Sparkles } from 'lucide-react';

interface MascotLeoProps {
  messageDe?: string;
  messageEn?: string;
  size?: 'sm' | 'md' | 'lg';
  showSpeechBubble?: boolean;
  className?: string;
}

export const MascotLeo: React.FC<MascotLeoProps> = ({
  messageDe,
  messageEn,
  size = 'md',
  showSpeechBubble = true,
  className = '',
}) => {
  const { mascotMessage, playAudio, playSfx, language } = useLearning();
  const [isWaving, setIsWaving] = useState(false);

  const activeDe = messageDe || mascotMessage?.de || 'Hallo mein kleiner Freund!';
  const activeEn = messageEn || mascotMessage?.en || 'Hello my little friend!';

  const handleLeoTap = () => {
    setIsWaving(true);
    playSfx('pop');
    playAudio(activeDe);
    setTimeout(() => setIsWaving(false), 1200);
  };

  const dimensions = {
    sm: 'w-16 h-16',
    md: 'w-24 h-24 sm:w-28 sm:h-28',
    lg: 'w-36 h-36 sm:w-44 sm:h-44',
  };

  return (
    <div className={`relative flex items-center gap-3 ${className}`}>
      {/* Leo Mascot Avatar Button */}
      <button
        type="button"
        onClick={handleLeoTap}
        aria-label="Leo the Lion mascot. Tap to hear Leo speak!"
        className={`relative group shrink-0 rounded-full p-1 bg-gradient-to-tr from-[#FFD966] to-[#FF8F9C] shadow-lg transition-transform hover:scale-105 active:scale-95 cursor-pointer focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#55B8FF] ${
          isWaving ? 'animate-bounce' : ''
        }`}
      >
        <div className={`rounded-full overflow-hidden bg-[#FFFDF5] border-2 border-white ${dimensions[size]}`}>
          <img
            src="/src/assets/images/leo_mascot_friendly_1792347916481.jpg"
            alt="Leo the Lion"
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
            referrerPolicy="no-referrer"
          />
        </div>
        <div className="absolute -bottom-1 -right-1 bg-[#55B8FF] text-white p-1 rounded-full shadow border-2 border-white">
          <Volume2 size={14} />
        </div>
      </button>

      {/* Speech Bubble */}
      {showSpeechBubble && (
        <div className="relative bg-white rounded-2xl p-3 sm:p-4 shadow-md border-2 border-[#FFD966]/50 max-w-xs animate-pop">
          {/* Triangular Tail pointing to Leo */}
          <div className="absolute top-1/2 -left-2 -translate-y-1/2 w-0 h-0 border-y-8 border-y-transparent border-r-8 border-r-white drop-shadow-sm" />

          <div className="flex items-start gap-2">
            <div>
              <p className="font-fredoka font-semibold text-sm sm:text-base text-[#26354A] leading-snug">
                {language === 'de' ? activeDe : activeEn}
              </p>
              <p className="text-xs text-[#26354A]/70 mt-0.5">
                {language === 'de' ? activeEn : activeDe}
              </p>
            </div>
            <button
              type="button"
              onClick={handleLeoTap}
              className="text-[#55B8FF] hover:text-[#3ea7f3] p-1 shrink-0"
              title="Hear Leo speak"
            >
              <Sparkles size={16} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
