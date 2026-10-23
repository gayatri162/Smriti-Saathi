import React from 'react';
import { Volume2, VolumeX, Sparkles, Heart, Phone, HelpCircle, Menu, X } from 'lucide-react';
import { CaregiverProfile } from '../../types';
import { soundEffects } from '../../services/sound';

interface NavbarProps {
  profile: CaregiverProfile;
  fontSize: 'normal' | 'large' | 'xlarge';
  onFontSizeChange: (size: 'normal' | 'large' | 'xlarge') => void;
  soundEnabled: boolean;
  onToggleSound: () => void;
  onOpenEmergency: () => void;
  onOpenSetupGuide: () => void;
  mobileMenuOpen: boolean;
  onToggleMobileMenu: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  profile,
  fontSize,
  onFontSizeChange,
  soundEnabled,
  onToggleSound,
  onOpenEmergency,
  onOpenSetupGuide,
  mobileMenuOpen,
  onToggleMobileMenu,
}) => {
  return (
    <header className="sticky top-0 z-30 bg-white/90 backdrop-blur-md border-b border-purple-100 shadow-xs px-4 lg:px-8 py-3 transition-colors">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Brand & Identity */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onToggleMobileMenu}
            className="lg:hidden p-2 rounded-xl text-slate-600 hover:bg-purple-50 transition-colors"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6 text-purple-700" /> : <Menu className="w-6 h-6" />}
          </button>

          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-purple-600 via-indigo-500 to-pink-500 flex items-center justify-center text-white shadow-md shadow-purple-200">
              <Sparkles className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-xl tracking-tight bg-gradient-to-r from-purple-800 via-indigo-900 to-pink-700 bg-clip-text text-transparent">
                  SMRITI-SAATHI
                </span>
                <span className="hidden sm:inline-block px-2 py-0.5 text-xs font-semibold bg-purple-100 text-purple-800 rounded-full">
                  स्मृति साथी
                </span>
              </div>
              <p className="text-xs text-slate-500 hidden sm:block font-medium">
                Cognitive Memory Companion & Care Hub
              </p>
            </div>
          </div>
        </div>

        {/* Right side controls */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Senior greeting chip */}
          <div className="hidden md:flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-50/80 border border-purple-200/70 text-purple-900 text-sm">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
            <span className="font-medium text-xs sm:text-sm">
              Care Recipient: <strong className="font-semibold">{profile.seniorName}</strong>
            </span>
          </div>

          {/* Text Size Resizer for Seniors */}
          <div className="flex items-center bg-slate-100/90 rounded-xl p-1 border border-slate-200" title="Adjust text size for easier reading">
            <button
              type="button"
              onClick={() => onFontSizeChange('normal')}
              className={`px-2 py-1 text-xs font-bold rounded-lg transition-all ${
                fontSize === 'normal'
                  ? 'bg-white text-purple-800 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
              aria-label="Standard text size"
            >
              A
            </button>
            <button
              type="button"
              onClick={() => onFontSizeChange('large')}
              className={`px-2.5 py-1 text-sm font-bold rounded-lg transition-all ${
                fontSize === 'large'
                  ? 'bg-white text-purple-800 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
              aria-label="Large text size"
            >
              A+
            </button>
            <button
              type="button"
              onClick={() => onFontSizeChange('xlarge')}
              className={`px-2.5 py-1 text-base font-extrabold rounded-lg transition-all ${
                fontSize === 'xlarge'
                  ? 'bg-white text-purple-800 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
              aria-label="Extra large text size"
            >
              A++
            </button>
          </div>

          {/* Sound Mute/Unmute */}
          <button
            type="button"
            onClick={() => {
              onToggleSound();
              soundEffects.playCardFlip();
            }}
            className={`p-2.5 rounded-xl border transition-all ${
              soundEnabled
                ? 'bg-purple-50 border-purple-200 text-purple-700 hover:bg-purple-100'
                : 'bg-slate-100 border-slate-200 text-slate-400 hover:bg-slate-200'
            }`}
            title={soundEnabled ? 'Sound is on (Click to mute)' : 'Sound is muted (Click to enable)'}
            aria-label="Toggle game audio"
          >
            {soundEnabled ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
          </button>

          {/* Emergency / Caregiver call button */}
          <button
            type="button"
            onClick={onOpenEmergency}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 font-semibold text-xs sm:text-sm shadow-xs transition-colors"
            title="Emergency Caregiver Helpline"
          >
            <Phone className="w-4 h-4 text-rose-600 animate-bounce" />
            <span className="hidden sm:inline">Help / Call</span>
          </button>

          {/* Hackathon Setup & Export Guide */}
          <button
            type="button"
            onClick={onOpenSetupGuide}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-semibold text-xs sm:text-sm shadow-sm shadow-purple-200 transition-all hover:scale-102"
            title="Hackathon Setup, Architecture & Export Instructions"
          >
            <HelpCircle className="w-4 h-4" />
            <span className="hidden md:inline">Hackathon Guide</span>
          </button>
        </div>
      </div>
    </header>
  );
};
