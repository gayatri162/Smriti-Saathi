import React, { useState } from 'react';
import {
  ShieldCheck,
  User,
  Phone,
  Stethoscope,
  Activity,
  Calendar,
  CheckCircle2,
  Clock,
  Printer,
  FileText,
  Settings,
  Download,
  RotateCcw,
  AlertTriangle,
  Award,
} from 'lucide-react';
import {
  CaregiverProfile,
  ReminderItem,
  GameScoreRecord,
  AdaptiveRecallItem,
  ActivitySummary,
} from '../../types';
import { DisclaimerBanner } from '../common/DisclaimerBanner';
import { Modal } from '../common/Modal';
import { storageService } from '../../services/storage';

interface CaregiverDashboardViewProps {
  profile: CaregiverProfile;
  reminders: ReminderItem[];
  gameScores: GameScoreRecord[];
  adaptiveItems: AdaptiveRecallItem[];
  activityLogs: ActivitySummary[];
  onUpdateProfile: (profile: CaregiverProfile) => void;
  onRefreshData: () => void;
}

export const CaregiverDashboardView: React.FC<CaregiverDashboardViewProps> = ({
  profile,
  reminders,
  gameScores,
  adaptiveItems,
  activityLogs,
  onUpdateProfile,
  onRefreshData,
}) => {
  const [profileModalOpen, setProfileModalOpen] = useState(false);
  const [doctorReportOpen, setDoctorReportOpen] = useState(false);

  // Profile form state
  const [formProfile, setFormProfile] = useState<CaregiverProfile>(profile);

  const completedReminders = reminders.filter((r) => r.completed);
  const pendingReminders = reminders.filter((r) => !r.completed);

  const handleProfileSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateProfile(formProfile);
    setProfileModalOpen(false);
  };

  const handlePrintReport = () => {
    window.print();
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-6 rounded-3xl bg-gradient-to-r from-emerald-100/90 via-purple-50 to-teal-100/70 border border-emerald-200/80">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-emerald-600 text-white text-xs font-bold">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Caregiver Portal</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-emerald-950 tracking-tight">
            7. Caregiver Command Hub
          </h2>
          <p className="text-xs sm:text-sm text-emerald-900 max-w-xl leading-relaxed">
            Real-time activity logs, medication adherence tracking, clinical export summaries, and senior profile management.
          </p>
        </div>

        {/* Quick action buttons */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => setDoctorReportOpen(true)}
            className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-white border border-emerald-300 text-emerald-900 hover:bg-emerald-50 font-bold text-xs sm:text-sm shadow-xs transition-colors cursor-pointer"
          >
            <FileText className="w-4 h-4 text-emerald-600" />
            <span>Doctor Visit Report</span>
          </button>

          <button
            type="button"
            onClick={() => {
              setFormProfile(profile);
              setProfileModalOpen(true);
            }}
            className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm shadow-sm transition-all cursor-pointer"
          >
            <Settings className="w-4 h-4" />
            <span>Edit Patient Profile</span>
          </button>
        </div>
      </div>

      {/* Senior & Caregiver Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Card 1: Senior Patient Info */}
        <div className="p-6 rounded-3xl bg-white border border-purple-100 shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase text-purple-600 bg-purple-50 px-2.5 py-0.5 rounded-full">
              Care Recipient
            </span>
            <span className="text-xs text-slate-400 font-semibold">{profile.seniorAge} Years Old</span>
          </div>
          <h3 className="text-xl font-extrabold text-slate-800">{profile.seniorName}</h3>
          <p className="text-xs text-slate-500 leading-relaxed italic">
            "{profile.notes || 'No specific care notes added.'}"
          </p>
        </div>

        {/* Card 2: Caregiver Details */}
        <div className="p-6 rounded-3xl bg-white border border-purple-100 shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase text-emerald-600 bg-emerald-50 px-2.5 py-0.5 rounded-full">
              Primary Caregiver
            </span>
            <span className="text-xs text-slate-400 font-semibold">{profile.relationship}</span>
          </div>
          <h3 className="text-xl font-extrabold text-slate-800">{profile.caregiverName}</h3>
          <p className="text-xs font-bold text-purple-700 flex items-center gap-1.5">
            <Phone className="w-3.5 h-3.5" />
            <span>{profile.emergencyPhone}</span>
          </p>
        </div>

        {/* Card 3: Doctor & Clinic */}
        <div className="p-6 rounded-3xl bg-white border border-purple-100 shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase text-teal-600 bg-teal-50 px-2.5 py-0.5 rounded-full">
              Consulting Doctor
            </span>
          </div>
          <h3 className="text-xl font-extrabold text-slate-800">
            {profile.doctorName || 'Dr. Arvind Sen'}
          </h3>
          <p className="text-xs font-bold text-teal-700 flex items-center gap-1.5">
            <Stethoscope className="w-3.5 h-3.5" />
            <span>{profile.doctorPhone || '+91 98111 22334'}</span>
          </p>
        </div>
      </div>

      {/* Main Grid: Left Activity Log, Right Summary Metrics */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Chronological Activity Log */}
        <div className="lg:col-span-2 bg-white rounded-3xl p-6 border border-purple-100 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-extrabold text-slate-800 text-lg flex items-center gap-2">
                <Activity className="w-5 h-5 text-emerald-600" />
                <span>Live Activity & Event Stream</span>
              </h3>
              <p className="text-xs text-slate-400">
                Timestamped audit of senior actions, medication adherence, and cognitive scores
              </p>
            </div>
            <span className="text-xs font-semibold text-slate-500">
              {activityLogs.length} events
            </span>
          </div>

          <div className="space-y-3 max-h-[460px] overflow-y-auto pr-1">
            {activityLogs.length === 0 ? (
              <p className="text-xs text-slate-400 italic py-6 text-center">
                No events recorded yet. Complete reminders or play games to see real-time logs.
              </p>
            ) : (
              activityLogs.map((log) => {
                const isSuccess = log.status === 'completed' || log.status === 'success';
                return (
                  <div
                    key={log.id}
                    className="p-3.5 rounded-2xl bg-slate-50/80 border border-slate-200/80 flex items-start justify-between gap-3"
                  >
                    <div className="flex items-start gap-3">
                      <div
                        className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 mt-0.5 ${
                          isSuccess
                            ? 'bg-emerald-100 text-emerald-700'
                            : 'bg-amber-100 text-amber-700'
                        }`}
                      >
                        <CheckCircle2 className="w-4 h-4" />
                      </div>

                      <div className="space-y-0.5">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-extrabold text-slate-800">{log.title}</span>
                          <span className="text-[10px] font-bold px-2 py-0.2 rounded-full bg-slate-200 text-slate-700 uppercase">
                            {log.type.replace('_', ' ')}
                          </span>
                        </div>
                        <p className="text-xs text-slate-600">{log.detail}</p>
                      </div>
                    </div>

                    <div className="text-right shrink-0">
                      <span className="text-[11px] font-mono text-slate-400">
                        {new Date(log.timestamp).toLocaleTimeString([], {
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </span>
                      {log.score && (
                        <p className="text-xs font-extrabold text-purple-700">+{log.score} pts</p>
                      )}
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Right 1 Col: Quick Caregiver Checklist & Diagnostics */}
        <div className="space-y-6">
          {/* Adherence Snapshot */}
          <div className="p-6 rounded-3xl bg-white border border-purple-100 shadow-xs space-y-4">
            <h4 className="font-extrabold text-slate-800 text-sm">Today’s Routine Summary</h4>
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs font-bold">
                <span className="text-slate-600">Completed Reminders:</span>
                <span className="text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-lg">
                  {completedReminders.length}
                </span>
              </div>
              <div className="flex items-center justify-between text-xs font-bold">
                <span className="text-slate-600">Pending Reminders:</span>
                <span className="text-amber-700 bg-amber-50 px-2 py-0.5 rounded-lg">
                  {pendingReminders.length}
                </span>
              </div>
              <div className="flex items-center justify-between text-xs font-bold">
                <span className="text-slate-600">Cognitive Games Today:</span>
                <span className="text-purple-700 bg-purple-50 px-2 py-0.5 rounded-lg">
                  {gameScores.length} sessions
                </span>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100">
              <p className="text-[11px] text-slate-500 leading-relaxed">
                Consistency is key in cognitive wellness. 10-15 minutes of memory matching per day helps maintain synaptic connections.
              </p>
            </div>
          </div>

          {/* Quick Data Reset Button */}
          <div className="p-5 rounded-3xl bg-slate-50 border border-slate-200 text-xs space-y-2">
            <h5 className="font-bold text-slate-800">Demo Data Helper</h5>
            <p className="text-slate-500 text-[11px]">
              Restore Rameshwar Sharma’s demo profile and sample game logs for presentation judging.
            </p>
            <button
              type="button"
              onClick={() => {
                storageService.resetToDemoDefaults();
                onRefreshData();
                alert('Demo defaults restored!');
              }}
              className="w-full py-2 rounded-xl bg-slate-200 hover:bg-slate-300 text-slate-700 font-bold transition-colors"
            >
              Reset to Clean Sample Data
            </button>
          </div>

          {/* Medical Notice */}
          <DisclaimerBanner compact />
        </div>
      </div>

      {/* Edit Profile Modal */}
      <Modal
        isOpen={profileModalOpen}
        onClose={() => setProfileModalOpen(false)}
        title="Edit Patient & Caregiver Profile"
        subtitle="Manage care recipient details, contact info, and medical physician"
        maxWidth="md"
      >
        <form onSubmit={handleProfileSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-600 uppercase mb-1">
              Senior Full Name *
            </label>
            <input
              type="text"
              required
              value={formProfile.seniorName}
              onChange={(e) => setFormProfile({ ...formProfile, seniorName: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-purple-400 text-sm font-semibold"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-600 uppercase mb-1">
                Senior Age
              </label>
              <input
                type="number"
                value={formProfile.seniorAge}
                onChange={(e) =>
                  setFormProfile({ ...formProfile, seniorAge: parseInt(e.target.value) || 75 })
                }
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-purple-400 text-sm font-semibold"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-600 uppercase mb-1">
                Relationship
              </label>
              <input
                type="text"
                value={formProfile.relationship}
                onChange={(e) => setFormProfile({ ...formProfile, relationship: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-purple-400 text-sm font-semibold"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-600 uppercase mb-1">
              Caregiver Name *
            </label>
            <input
              type="text"
              required
              value={formProfile.caregiverName}
              onChange={(e) => setFormProfile({ ...formProfile, caregiverName: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-purple-400 text-sm font-semibold"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-600 uppercase mb-1">
              Emergency Phone Number *
            </label>
            <input
              type="tel"
              required
              value={formProfile.emergencyPhone}
              onChange={(e) => setFormProfile({ ...formProfile, emergencyPhone: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-purple-400 text-sm font-semibold"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-600 uppercase mb-1">
                Doctor Name
              </label>
              <input
                type="text"
                value={formProfile.doctorName || ''}
                onChange={(e) => setFormProfile({ ...formProfile, doctorName: e.target.value })}
                className="w-full px-3.5 py-2 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-purple-400 text-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-600 uppercase mb-1">
                Doctor Phone
              </label>
              <input
                type="tel"
                value={formProfile.doctorPhone || ''}
                onChange={(e) => setFormProfile({ ...formProfile, doctorPhone: e.target.value })}
                className="w-full px-3.5 py-2 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-purple-400 text-sm"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-600 uppercase mb-1">
              Caregiver Notes & Preferences
            </label>
            <textarea
              rows={2}
              value={formProfile.notes}
              onChange={(e) => setFormProfile({ ...formProfile, notes: e.target.value })}
              className="w-full px-3.5 py-2 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-purple-400 text-sm resize-none"
            />
          </div>

          <div className="flex items-center justify-end gap-2 pt-3 border-t border-purple-100">
            <button
              type="button"
              onClick={() => setProfileModalOpen(false)}
              className="px-4 py-2 rounded-xl bg-slate-100 text-slate-600 font-bold text-xs hover:bg-slate-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs shadow-xs"
            >
              Save Profile
            </button>
          </div>
        </form>
      </Modal>

      {/* Doctor Visit Report Modal (Printable) */}
      <Modal
        isOpen={doctorReportOpen}
        onClose={() => setDoctorReportOpen(false)}
        title="Physician & Neurologist Clinical Summary"
        subtitle="Formatted summary for regular geriatric checkups and cognitive consultations"
        maxWidth="2xl"
      >
        <div className="space-y-4 text-xs sm:text-sm text-slate-700">
          <div className="p-4 rounded-2xl bg-purple-50/60 border border-purple-200 flex items-center justify-between">
            <div>
              <h4 className="font-extrabold text-slate-800 text-base">
                Patient: {profile.seniorName} (Age: {profile.seniorAge})
              </h4>
              <p className="text-xs text-slate-500">
                Primary Caregiver: {profile.caregiverName} ({profile.relationship}) • {profile.emergencyPhone}
              </p>
            </div>
            <button
              type="button"
              onClick={handlePrintReport}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-purple-600 text-white font-bold text-xs hover:bg-purple-700 shadow-xs cursor-pointer"
            >
              <Printer className="w-4 h-4" />
              <span>Print / Save PDF</span>
            </button>
          </div>

          <div className="space-y-3">
            <h5 className="font-bold text-slate-800 uppercase text-xs">
              1. Routine & Medication Adherence
            </h5>
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
              <p>
                <strong>Medications Tracked:</strong>{' '}
                {reminders.filter((r) => r.category === 'medicine').map((r) => r.title).join(', ')}
              </p>
              <p>
                <strong>Adherence Status:</strong> {completedReminders.length} of {reminders.length}{' '}
                daily routines marked completed on schedule.
              </p>
            </div>

            <h5 className="font-bold text-slate-800 uppercase text-xs">
              2. Cognitive Stimulation & Memory Scores
            </h5>
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
              <p>
                <strong>Total Game Sessions:</strong> {gameScores.length} completed sessions.
              </p>
              <p>
                <strong>Average Recall Accuracy:</strong>{' '}
                {gameScores.length > 0
                  ? Math.round(
                      gameScores.reduce((acc, s) => acc + s.accuracyPercentage, 0) /
                        gameScores.length
                    )
                  : 0}
                % across visual matching and symbol sequences.
              </p>
              <p>
                <strong>Adaptive Spaced Retention:</strong> Current intervals span 5 min to 30 min with spaced reinforcement.
              </p>
            </div>

            <h5 className="font-bold text-slate-800 uppercase text-xs">
              3. Clinical Disclaimer
            </h5>
            <p className="text-[11px] text-slate-500 italic leading-relaxed">
              * Smriti-Saathi is an assistive digital therapy and memory exercise companion. Data recorded here reflects home routine adherence and self-paced games. It is not a diagnostic evaluation for dementia or Alzheimer's disease.
            </p>
          </div>

          <div className="pt-3 flex justify-end">
            <button
              type="button"
              onClick={() => setDoctorReportOpen(false)}
              className="px-5 py-2 rounded-xl bg-slate-200 text-slate-700 font-bold text-xs hover:bg-slate-300"
            >
              Close Summary
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};
