import React, { useState } from 'react';
import { Volume2 } from 'lucide-react';
import { useLearning } from '../context/LearningContext';

interface AudioButtonProps {
  text: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  label?: string;
  variant?: 'primary' | 'secondary' | 'bubble';
}

export const AudioButton: React.FC<AudioButtonProps> = ({
  text,
  size = 'md',
  className = '',
  label,
  variant = 'primary',
}) => {
  const { playAudio, playSfx } = useLearning();
  const [isPlaying, setIsPlaying] = useState(false);

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsPlaying(true);
    playSfx('pop');
    playAudio(text, {
      onEnd: () => setIsPlaying(false),
      onError: () => setIsPlaying(false),
    });
    // Auto reset animation if audio ended quickly
    setTimeout(() => setIsPlaying(false), 1400);
  };

  const sizeStyles = {
    sm: 'w-9 h-9 text-xs',
    md: 'w-12 h-12 text-sm',
    lg: 'w-16 h-16 text-base',
    xl: 'w-20 h-20 text-lg',
  };

  const iconSizes = {
    sm: 18,
    md: 22,
    lg: 30,
    xl: 38,
  };

  const variantStyles = {
    primary: 'bg-[#55B8FF] hover:bg-[#3ea7f3] text-white shadow-md hover:shadow-lg active:scale-95',
    secondary: 'bg-[#FFD966] hover:bg-[#f8cf4f] text-[#26354A] shadow-md hover:shadow-lg active:scale-95',
    bubble: 'bg-white text-[#55B8FF] border-2 border-[#55B8FF]/30 hover:border-[#55B8FF] shadow-sm hover:shadow active:scale-95',
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-label={`Listen to German pronunciation: ${text}`}
      className={`inline-flex items-center justify-center rounded-full font-fredoka font-semibold transition-all duration-200 cursor-pointer ${sizeStyles[size]} ${variantStyles[variant]} ${
        isPlaying ? 'ring-4 ring-[#75E6A6] scale-105 animate-pulse' : ''
      } ${className}`}
    >
      <Volume2 size={iconSizes[size]} className={isPlaying ? 'animate-wiggle' : ''} />
      {label && <span className="ml-2 whitespace-nowrap">{label}</span>}
    </button>
  );
};
