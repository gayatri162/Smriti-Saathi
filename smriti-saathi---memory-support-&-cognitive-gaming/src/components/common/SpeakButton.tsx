import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { speechService } from '../../services/speech';

interface SpeakButtonProps {
  textToSpeak: string;
  label?: string;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'primary' | 'subtle' | 'pill';
  className?: string;
}

export const SpeakButton: React.FC<SpeakButtonProps> = ({
  textToSpeak,
  label = 'Read Aloud',
  size = 'md',
  variant = 'subtle',
  className = '',
}) => {
  const [isSpeakingThis, setIsSpeakingThis] = useState(false);

  useEffect(() => {
    const unsubscribe = speechService.subscribe((isSpeaking) => {
      if (!isSpeaking) {
        setIsSpeakingThis(false);
      }
    });
    return () => unsubscribe();
  }, []);

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isSpeakingThis) {
      speechService.stop();
      setIsSpeakingThis(false);
    } else {
      setIsSpeakingThis(true);
      speechService.speak(textToSpeak);
    }
  };

  const sizeClasses = {
    sm: 'px-2.5 py-1 text-xs gap-1.5',
    md: 'px-3.5 py-1.5 text-sm gap-2',
    lg: 'px-5 py-2.5 text-base font-bold gap-2.5',
  }[size];

  const variantClasses = {
    primary: isSpeakingThis
      ? 'bg-rose-500 text-white shadow-md ring-2 ring-rose-200'
      : 'bg-purple-600 hover:bg-purple-700 text-white shadow-sm shadow-purple-200',
    subtle: isSpeakingThis
      ? 'bg-purple-200 text-purple-900 border border-purple-300 ring-2 ring-purple-300'
      : 'bg-purple-50 hover:bg-purple-100 text-purple-800 border border-purple-200/80',
    pill: isSpeakingThis
      ? 'bg-pink-100 text-pink-900 border border-pink-300'
      : 'bg-white hover:bg-purple-50 text-purple-700 border border-purple-200 shadow-2xs',
  }[variant];

  return (
    <button
      type="button"
      onClick={handleClick}
      className={`inline-flex items-center justify-center rounded-xl font-semibold transition-all cursor-pointer ${sizeClasses} ${variantClasses} ${className}`}
      title={isSpeakingThis ? 'Click to stop reading' : 'Read aloud with gentle voice'}
      aria-label={isSpeakingThis ? 'Stop speaking' : `Read aloud: ${label || textToSpeak}`}
    >
      {isSpeakingThis ? (
        <>
          <VolumeX className="w-4 h-4 animate-spin text-current" />
          {label && <span>Stop Audio</span>}
        </>
      ) : (
        <>
          <Volume2 className="w-4 h-4 text-current" />
          {label && <span>{label}</span>}
        </>
      )}
      {isSpeakingThis && (
        <span className="flex gap-0.5 items-center ml-1">
          <span className="w-1 h-3 bg-current rounded-full animate-pulse" />
          <span className="w-1 h-4 bg-current rounded-full animate-pulse delay-75" />
          <span className="w-1 h-2 bg-current rounded-full animate-pulse delay-150" />
        </span>
      )}
    </button>
  );
};
