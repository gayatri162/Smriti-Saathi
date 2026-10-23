import React, { useState } from 'react';
import {
  Bell,
  Plus,
  Pill,
  Utensils,
  Moon,
  Activity,
  CheckCircle2,
  Clock,
  Edit2,
  Trash2,
  Volume2,
  Filter,
  Check,
  AlertCircle,
} from 'lucide-react';
import { ReminderItem, ReminderCategory } from '../../types';
import { ReminderFormModal } from './ReminderFormModal';
import { SpeakButton } from '../common/SpeakButton';
import { speechService } from '../../services/speech';
import { soundEffects } from '../../services/sound';

interface RemindersViewProps {
  reminders: ReminderItem[];
  onToggleReminder: (id: string) => void;
  onAddReminder: (data: Omit<ReminderItem, 'id' | 'completed' | 'completedAt'>) => void;
  onUpdateReminder: (data: ReminderItem) => void;
  onDeleteReminder: (id: string) => void;
  seniorName: string;
}

export const RemindersView: React.FC<RemindersViewProps> = ({
  reminders,
  onToggleReminder,
  onAddReminder,
  onUpdateReminder,
  onDeleteReminder,
  seniorName,
}) => {
  const [categoryFilter, setCategoryFilter] = useState<'all' | ReminderCategory>('all');
  const [statusFilter, setStatusFilter] = useState<'all' | 'pending' | 'completed'>('all');
  const [modalOpen, setModalOpen] = useState(false);
  const [editingReminder, setEditingReminder] = useState<ReminderItem | null>(null);

  // Filter list
  const filteredReminders = reminders.filter((item) => {
    if (categoryFilter !== 'all' && item.category !== categoryFilter) return false;
    if (statusFilter === 'pending' && item.completed) return false;
    if (statusFilter === 'completed' && !item.completed) return false;
    return true;
  });

  // Sort by time ascending
  filteredReminders.sort((a, b) => a.time.localeCompare(b.time));

  const completedCount = reminders.filter((r) => r.completed).length;
  const pendingCount = reminders.length - completedCount;

  const handleReadEntireSchedule = () => {
    const pending = reminders.filter((r) => !r.completed);
    if (pending.length === 0) {
      speechService.speak(
        `Great news ${seniorName}! All your scheduled reminders for today are already complete.`
      );
      return;
    }
    const scheduleSummary = pending
      .map((r) => `At ${r.time}: ${r.title}. ${r.dosage || ''}`)
      .join('. ');
    speechService.speak(
      `Hello ${seniorName}. You have ${pending.length} reminders remaining today. ${scheduleSummary}. Take your time and stay comfortable.`
    );
  };

  const getCategoryIcon = (cat: ReminderCategory) => {
    switch (cat) {
      case 'medicine':
        return <Pill className="w-4 h-4 text-rose-600" />;
      case 'meal':
        return <Utensils className="w-4 h-4 text-amber-600" />;
      case 'sleep':
        return <Moon className="w-4 h-4 text-indigo-600" />;
      case 'activity':
        return <Activity className="w-4 h-4 text-emerald-600" />;
    }
  };

  const getCategoryBadgeClass = (cat: ReminderCategory) => {
    switch (cat) {
      case 'medicine':
        return 'bg-rose-50 text-rose-800 border-rose-200';
      case 'meal':
        return 'bg-amber-50 text-amber-800 border-amber-200';
      case 'sleep':
        return 'bg-indigo-50 text-indigo-800 border-indigo-200';
      case 'activity':
        return 'bg-emerald-50 text-emerald-800 border-emerald-200';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-6 rounded-3xl bg-gradient-to-r from-rose-100/80 via-purple-50 to-pink-100/70 border border-rose-200/80">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-rose-600 text-white text-xs font-bold">
            <Bell className="w-3.5 h-3.5" />
            <span>Daily Routine Companion</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-rose-950 tracking-tight">
            4. Daily Reminders
          </h2>
          <p className="text-xs sm:text-sm text-rose-900 max-w-xl leading-relaxed">
            Medication reminders with spoken audio guidance, meals, gentle walks, and sleep hygiene.
          </p>
        </div>

        {/* Top actions */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={handleReadEntireSchedule}
            className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-white border border-rose-200 text-rose-800 hover:bg-rose-50 font-bold text-xs sm:text-sm shadow-xs transition-colors cursor-pointer"
            title="Read all pending reminders for today"
          >
            <Volume2 className="w-4 h-4 text-rose-600" />
            <span>Read Whole Schedule Aloud</span>
          </button>

          <button
            type="button"
            onClick={() => {
              setEditingReminder(null);
              setModalOpen(true);
            }}
            className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs sm:text-sm shadow-sm shadow-rose-200 transition-all cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Add Reminder</span>
          </button>
        </div>
      </div>

      {/* Filter and stats row */}
      <div className="p-4 rounded-3xl bg-white border border-purple-100 shadow-xs flex flex-wrap items-center justify-between gap-4">
        {/* Category Filters */}
        <div className="flex flex-wrap items-center gap-1.5">
          {[
            { id: 'all', label: 'All Routines' },
            { id: 'medicine', label: 'Medicine' },
            { id: 'meal', label: 'Meals' },
            { id: 'sleep', label: 'Sleep' },
            { id: 'activity', label: 'Activity' },
          ].map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => setCategoryFilter(cat.id as typeof categoryFilter)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                categoryFilter === cat.id
                  ? 'bg-purple-600 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-purple-50 hover:text-purple-900'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Status Filters & Counters */}
        <div className="flex items-center gap-2 text-xs font-semibold">
          <span className="text-slate-400">Status:</span>
          <div className="flex bg-slate-100 p-1 rounded-xl">
            <button
              type="button"
              onClick={() => setStatusFilter('all')}
              className={`px-2.5 py-1 rounded-lg transition-all ${
                statusFilter === 'all' ? 'bg-white text-slate-900 font-bold shadow-2xs' : 'text-slate-500'
              }`}
            >
              All ({reminders.length})
            </button>
            <button
              type="button"
              onClick={() => setStatusFilter('pending')}
              className={`px-2.5 py-1 rounded-lg transition-all ${
                statusFilter === 'pending' ? 'bg-white text-rose-800 font-bold shadow-2xs' : 'text-slate-500'
              }`}
            >
              Pending ({pendingCount})
            </button>
            <button
              type="button"
              onClick={() => setStatusFilter('completed')}
              className={`px-2.5 py-1 rounded-lg transition-all ${
                statusFilter === 'completed' ? 'bg-white text-emerald-800 font-bold shadow-2xs' : 'text-slate-500'
              }`}
            >
              Done ({completedCount})
            </button>
          </div>
        </div>
      </div>

      {/* Reminders List */}
      <div className="space-y-3">
        {filteredReminders.length === 0 ? (
          <div className="p-12 text-center rounded-3xl bg-white border border-purple-100 shadow-xs space-y-3">
            <div className="w-14 h-14 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center mx-auto">
              <Check className="w-7 h-7" />
            </div>
            <h4 className="text-lg font-bold text-slate-700">No Reminders in this filter</h4>
            <p className="text-xs text-slate-400 max-w-sm mx-auto">
              All tasks for this category are either completed or have not been added yet.
            </p>
          </div>
        ) : (
          filteredReminders.map((reminder) => {
            const isDone = reminder.completed;
            const fullVoiceText = `Reminder for ${reminder.title}. Scheduled for ${reminder.time}. ${reminder.dosage || ''}. ${reminder.notes || ''}`;

            return (
              <div
                key={reminder.id}
                className={`p-4 sm:p-5 rounded-3xl border transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
                  isDone
                    ? 'bg-slate-50/80 border-slate-200/70 opacity-80'
                    : reminder.priority === 'high'
                    ? 'bg-white border-purple-200 shadow-xs hover:border-purple-300'
                    : 'bg-white border-slate-200 hover:border-purple-200 shadow-2xs'
                }`}
              >
                {/* Left section: Checkbox + Info */}
                <div className="flex items-start gap-4 min-w-0">
                  {/* Big Accessible Toggle Checkbox */}
                  <button
                    type="button"
                    onClick={() => {
                      onToggleReminder(reminder.id);
                      soundEffects.playMatchSuccess();
                    }}
                    className={`w-9 h-9 rounded-2xl flex items-center justify-center shrink-0 transition-all cursor-pointer mt-0.5 ${
                      isDone
                        ? 'bg-emerald-500 text-white shadow-xs scale-102'
                        : 'border-2 border-slate-300 hover:border-purple-500 bg-white text-transparent hover:text-purple-300'
                    }`}
                    aria-label={`Mark ${reminder.title} as ${isDone ? 'not done' : 'done'}`}
                  >
                    <CheckCircle2 className="w-6 h-6" />
                  </button>

                  <div className="space-y-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="font-extrabold text-xs px-2.5 py-0.5 rounded-lg bg-slate-100 text-slate-800 font-mono flex items-center gap-1">
                        <Clock className="w-3 h-3 text-purple-600" />
                        {reminder.time}
                      </span>

                      <span
                        className={`text-[11px] font-bold px-2 py-0.5 rounded-lg border flex items-center gap-1 ${getCategoryBadgeClass(
                          reminder.category
                        )}`}
                      >
                        {getCategoryIcon(reminder.category)}
                        <span className="capitalize">{reminder.category}</span>
                      </span>

                      {reminder.priority === 'high' && (
                        <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-lg bg-rose-100 text-rose-800">
                          High Priority
                        </span>
                      )}
                    </div>

                    <h4
                      className={`text-base sm:text-lg font-extrabold tracking-tight ${
                        isDone ? 'line-through text-slate-400' : 'text-slate-900'
                      }`}
                    >
                      {reminder.title}
                    </h4>

                    {reminder.dosage && (
                      <p className="text-xs sm:text-sm font-semibold text-purple-900">
                        📋 {reminder.dosage}
                      </p>
                    )}

                    {reminder.notes && (
                      <p className="text-xs text-slate-500 italic">
                        Note: {reminder.notes}
                      </p>
                    )}
                  </div>
                </div>

                {/* Right section: Speak button + Edit + Delete */}
                <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
                  {/* Spoken voice reading button */}
                  <SpeakButton
                    textToSpeak={fullVoiceText}
                    label="Read Aloud"
                    size="sm"
                    variant="subtle"
                  />

                  {/* Edit */}
                  <button
                    type="button"
                    onClick={() => {
                      setEditingReminder(reminder);
                      setModalOpen(true);
                    }}
                    className="p-2 rounded-xl text-slate-400 hover:text-purple-700 hover:bg-purple-50 transition-colors"
                    title="Edit reminder"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>

                  {/* Delete */}
                  <button
                    type="button"
                    onClick={() => {
                      if (confirm(`Delete reminder "${reminder.title}"?`)) {
                        onDeleteReminder(reminder.id);
                      }
                    }}
                    className="p-2 rounded-xl text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                    title="Delete reminder"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Add / Edit Form Modal */}
      <ReminderFormModal
        isOpen={modalOpen}
        onClose={() => {
          setModalOpen(false);
          setEditingReminder(null);
        }}
        onSave={(data) => {
          if (data.id) {
            onUpdateReminder(data as ReminderItem);
          } else {
            onAddReminder(data);
          }
        }}
        editingReminder={editingReminder}
      />
    </div>
  );
};
