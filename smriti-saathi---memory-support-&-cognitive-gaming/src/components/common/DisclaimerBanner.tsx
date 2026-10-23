import React from 'react';
import { ShieldAlert, Info } from 'lucide-react';

export const DisclaimerBanner: React.FC<{ compact?: boolean }> = ({ compact = false }) => {
  if (compact) {
    return (
      <div className="flex items-center gap-2 p-2.5 rounded-xl bg-slate-100/90 border border-slate-200/80 text-[11px] text-slate-500">
        <Info className="w-3.5 h-3.5 text-purple-600 shrink-0" />
        <p>
          <strong>Assistive Technology Note:</strong> Smriti-Saathi is a cognitive stimulation companion. It is not a diagnostic tool and does not treat or cure dementia or Alzheimer’s disease.
        </p>
      </div>
    );
  }

  return (
    <div className="p-4 rounded-2xl bg-gradient-to-r from-purple-50/60 via-slate-50 to-pink-50/40 border border-purple-100/80 text-xs text-slate-600 flex items-start gap-3 shadow-2xs">
      <div className="w-8 h-8 rounded-xl bg-purple-100 flex items-center justify-center shrink-0 text-purple-700">
        <ShieldAlert className="w-4 h-4" />
      </div>
      <div>
        <h4 className="font-bold text-slate-700 text-xs tracking-wide uppercase">
          Healthcare & Wellness Assistive Notice
        </h4>
        <p className="mt-0.5 leading-relaxed text-slate-500">
          Smriti-Saathi is an interactive cognitive exercising, memory prompt, and routine-support platform designed for seniors and caregivers. It is purely non-clinical and assistive; it does not claim to treat, prevent, or diagnose dementia, Alzheimer’s, or any neurological condition. Always consult qualified healthcare professionals for medical advice.
        </p>
      </div>
    </div>
  );
};
