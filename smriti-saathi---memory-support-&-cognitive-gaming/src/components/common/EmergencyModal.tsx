import React from 'react';
import { Phone, UserCheck, Stethoscope, AlertTriangle, MessageSquare } from 'lucide-react';
import { Modal } from './Modal';
import { CaregiverProfile } from '../../types';
import { speechService } from '../../services/speech';

interface EmergencyModalProps {
  isOpen: boolean;
  onClose: () => void;
  profile: CaregiverProfile;
}

export const EmergencyModal: React.FC<EmergencyModalProps> = ({
  isOpen,
  onClose,
  profile,
}) => {
  const handleAnnounceHelpline = () => {
    speechService.speak(
      `Calling your primary caregiver, ${profile.caregiverName}. Phone number is ${profile.emergencyPhone}. Help is right here.`
    );
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Caregiver & Doctor Quick Help"
      subtitle="Immediate contacts for safety, medicine checks, or assistance"
      maxWidth="md"
    >
      <div className="space-y-4">
        {/* Urgent caregiver card */}
        <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200">
          <div className="flex items-center justify-between mb-2">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-rose-200/70 text-rose-800 flex items-center gap-1">
              <AlertTriangle className="w-3.5 h-3.5" /> Primary Caregiver
            </span>
            <button
              type="button"
              onClick={handleAnnounceHelpline}
              className="text-xs font-bold text-rose-700 underline hover:text-rose-900"
            >
              Hear Audio Info
            </button>
          </div>
          <h4 className="text-lg font-extrabold text-slate-800">{profile.caregiverName}</h4>
          <p className="text-xs text-slate-600 font-medium mb-3">{profile.relationship}</p>

          <a
            href={`tel:${profile.emergencyPhone.replace(/\s+/g, '')}`}
            className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-base shadow-sm transition-all"
          >
            <Phone className="w-5 h-5 animate-bounce" />
            <span>Call {profile.emergencyPhone}</span>
          </a>
        </div>

        {/* Doctor / Specialist card */}
        {profile.doctorName && (
          <div className="p-4 rounded-2xl bg-purple-50/70 border border-purple-200">
            <div className="flex items-center gap-2 mb-2">
              <Stethoscope className="w-4 h-4 text-purple-700" />
              <span className="text-xs font-bold text-purple-900">Attending Physician</span>
            </div>
            <h5 className="font-bold text-slate-800 text-base">{profile.doctorName}</h5>
            <p className="text-xs text-slate-500 mb-2">Phone: {profile.doctorPhone || 'On File'}</p>
            {profile.doctorPhone && (
              <a
                href={`tel:${profile.doctorPhone.replace(/\s+/g, '')}`}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-purple-600 text-white text-xs font-bold hover:bg-purple-700 transition-colors"
              >
                <Phone className="w-3.5 h-3.5" /> Call Clinic
              </a>
            )}
          </div>
        )}

        {/* Quick reassuring guidance for elderly */}
        <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-600 space-y-1">
          <p className="font-semibold text-slate-700">Need reassurance or quiet time?</p>
          <p className="text-[11px] leading-relaxed">
            Take a deep breath and sit comfortably with a glass of water. Priya and your family are always close by and notified of your daily routines.
          </p>
        </div>

        <button
          type="button"
          onClick={onClose}
          className="w-full py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-sm transition-colors"
        >
          Close Help Panel
        </button>
      </div>
    </Modal>
  );
};
