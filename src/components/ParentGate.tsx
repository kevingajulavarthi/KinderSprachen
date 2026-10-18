import React, { useState, useEffect } from 'react';
import { Lock, X, Check } from 'lucide-react';
import { useLearning } from '../context/LearningContext';

interface ParentGateProps {
  isOpen: boolean;
  onSuccess: () => void;
  onClose: () => void;
}

export const ParentGate: React.FC<ParentGateProps> = ({ isOpen, onSuccess, onClose }) => {
  const { playSfx, language } = useLearning();
  const [num1, setNum1] = useState(3);
  const [num2, setNum2] = useState(4);
  const [userAnswer, setUserAnswer] = useState('');
  const [error, setError] = useState(false);

  useEffect(() => {
    if (isOpen) {
      const a = Math.floor(Math.random() * 6) + 3;
      const b = Math.floor(Math.random() * 5) + 2;
      setNum1(a);
      setNum2(b);
      setUserAnswer('');
      setError(false);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleDigit = (digit: string) => {
    playSfx('click');
    if (userAnswer.length < 2) {
      setUserAnswer((prev) => prev + digit);
      setError(false);
    }
  };

  const handleClear = () => {
    playSfx('click');
    setUserAnswer('');
    setError(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const sum = num1 + num2;
    if (parseInt(userAnswer, 10) === sum) {
      playSfx('correct');
      onSuccess();
    } else {
      playSfx('wrong');
      setError(true);
      setUserAnswer('');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs animate-pop">
      <div className="bg-[#FFFDF5] rounded-3xl p-6 sm:p-8 max-w-sm w-full shadow-2xl border-4 border-[#FFD966] relative">
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute top-4 right-4 text-[#26354A]/60 hover:text-[#26354A] p-2 rounded-full hover:bg-black/5"
        >
          <X size={22} />
        </button>

        <div className="flex flex-col items-center text-center">
          <div className="w-14 h-14 rounded-full bg-[#B7A4FF]/20 text-[#B7A4FF] flex items-center justify-center mb-3">
            <Lock size={28} />
          </div>

          <h3 className="font-fredoka text-xl text-[#26354A] font-bold">
            {language === 'de' ? 'Elternbereich' : 'Parents Only'}
          </h3>
          <p className="text-sm text-[#26354A]/80 mt-1 mb-5">
            {language === 'de'
              ? 'Bitte löse die Rechenaufgabe, um fortzufahren:'
              : 'Please solve the math problem to continue:'}
          </p>

          {/* Math Problem Box */}
          <div className="bg-white rounded-2xl px-6 py-4 border-2 border-[#55B8FF]/40 mb-4 w-full flex items-center justify-center gap-3">
            <span className="font-fredoka text-3xl text-[#26354A] font-bold">
              {num1} + {num2} =
            </span>
            <div className="w-16 h-12 rounded-xl bg-[#FFFDF5] border-2 border-[#55B8FF] flex items-center justify-center font-fredoka text-2xl font-bold text-[#55B8FF]">
              {userAnswer || '?'}
            </div>
          </div>

          {error && (
            <p className="text-xs text-red-500 font-semibold mb-3">
              {language === 'de' ? 'Das war nicht ganz richtig. Bitte versuche es noch einmal!' : 'Not quite right. Please try again!'}
            </p>
          )}

          {/* Keypad */}
          <div className="grid grid-cols-3 gap-2 w-full mb-4">
            {['1', '2', '3', '4', '5', '6', '7', '8', '9'].map((digit) => (
              <button
                key={digit}
                type="button"
                onClick={() => handleDigit(digit)}
                className="py-3 bg-white hover:bg-[#FFD966]/20 active:bg-[#FFD966] text-[#26354A] font-fredoka text-xl font-bold rounded-xl border border-slate-200 transition-colors shadow-xs"
              >
                {digit}
              </button>
            ))}
            <button
              type="button"
              onClick={handleClear}
              className="py-3 bg-slate-100 hover:bg-slate-200 text-xs font-bold text-[#26354A] rounded-xl border border-slate-200"
            >
              Clear
            </button>
            <button
              type="button"
              onClick={() => handleDigit('0')}
              className="py-3 bg-white hover:bg-[#FFD966]/20 text-[#26354A] font-fredoka text-xl font-bold rounded-xl border border-slate-200 shadow-xs"
            >
              0
            </button>
            <button
              type="button"
              onClick={handleSubmit}
              disabled={!userAnswer}
              className="py-3 bg-[#75E6A6] hover:bg-[#5cd492] disabled:opacity-50 text-[#26354A] font-fredoka font-bold rounded-xl flex items-center justify-center shadow-xs"
            >
              <Check size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
