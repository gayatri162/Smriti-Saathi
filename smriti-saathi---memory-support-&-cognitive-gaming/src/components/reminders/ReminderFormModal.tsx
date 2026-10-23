import React, { useState, useEffect } from 'react';
import { Pill, Utensils, Moon, Activity, Clock, FileText } from 'lucide-react';
import { Modal } from '../common/Modal';
import { ReminderItem, ReminderCategory } from '../../types';

interface ReminderFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (reminder: Omit<ReminderItem, 'id' | 'completed' | 'completedAt'> & { id?: string }) => void;
  editingReminder?: ReminderItem | null;
}

export const ReminderFormModal: React.FC<ReminderFormModalProps> = ({
  isOpen,
  onClose,
  onSave,
  editingReminder,
}) => {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<ReminderCategory>('medicine');
  const [time, setTime] = useState('09:00');
  const [dosage, setDosage] = useState('');
  const [notes, setNotes] = useState('');
  const [priority, setPriority] = useState<'high' | 'medium' | 'normal'>('normal');

  useEffect(() => {
    if (editingReminder) {
      setTitle(editingReminder.title);
      setCategory(editingReminder.category);
      setTime(editingReminder.time);
      setDosage(editingReminder.dosage || '');
      setNotes(editingReminder.notes || '');
      setPriority(editingReminder.priority || 'normal');
    } else {
      setTitle('');
      setCategory('medicine');
      setTime('09:00');
      setDosage('');
      setNotes('');
      setPriority('normal');
    }
  }, [editingReminder, isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    onSave({
      id: editingReminder?.id,
      title: title.trim(),
      category,
      time,
      dosage: dosage.trim() || undefined,
      notes: notes.trim() || undefined,
      priority,
    });
    onClose();
  };

  const categories: { id: ReminderCategory; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
    { id: 'medicine', label: 'Medicine', icon: Pill },
    { id: 'meal', label: 'Meal', icon: Utensils },
    { id: 'sleep', label: 'Sleep & Rest', icon: Moon },
    { id: 'activity', label: 'Activity & Walk', icon: Activity },
  ];

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={editingReminder ? 'Edit Routine Reminder' : 'Add New Daily Reminder'}
      subtitle="Caregiver schedule for medications, meals, and cognitive activities"
      maxWidth="md"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Category Picker */}
        <div>
          <label className="block text-xs font-bold text-slate-600 uppercase mb-1.5">
            Reminder Category
          </label>
          <div className="grid grid-cols-2 gap-2">
            {categories.map((cat) => {
              const Icon = cat.icon;
              const isSelected = category === cat.id;
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setCategory(cat.id)}
                  className={`flex items-center gap-2 p-2.5 rounded-xl border text-xs font-bold transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-purple-600 text-white border-purple-700 shadow-xs'
                      : 'bg-slate-50 text-slate-700 hover:bg-purple-50 border-slate-200'
                  }`}
                >
                  <Icon className="w-4 h-4 shrink-0" />
                  <span>{cat.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Title */}
        <div>
          <label className="block text-xs font-bold text-slate-600 uppercase mb-1">
            Reminder Title *
          </label>
          <input
            type="text"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g. Blood Pressure Pill, Morning Walk, Evening Tea"
            className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-purple-400 text-sm font-semibold"
          />
        </div>

        {/* Time & Priority */}
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-bold text-slate-600 uppercase mb-1 flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-purple-600" />
              <span>Time *</span>
            </label>
            <input
              type="time"
              required
              value={time}
              onChange={(e) => setTime(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-purple-400 text-sm font-semibold"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-600 uppercase mb-1">
              Priority
            </label>
            <select
              value={priority}
              onChange={(e) => setPriority(e.target.value as typeof priority)}
              className="w-full px-3 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-purple-400 text-sm font-semibold bg-white"
            >
              <option value="normal">Normal</option>
              <option value="medium">Medium</option>
              <option value="high">High (Medication)</option>
            </select>
          </div>
        </div>

        {/* Dosage or Instructions */}
        <div>
          <label className="block text-xs font-bold text-slate-600 uppercase mb-1">
            Dosage / Detail
          </label>
          <input
            type="text"
            value={dosage}
            onChange={(e) => setDosage(e.target.value)}
            placeholder="e.g. 1 Tablet with warm water, 20 minutes strolling"
            className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-purple-400 text-sm"
          />
        </div>

        {/* Notes */}
        <div>
          <label className="block text-xs font-bold text-slate-600 uppercase mb-1">
            Caregiver Notes
          </label>
          <textarea
            rows={2}
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="e.g. Keep walking stick ready, drink half glass water first"
            className="w-full px-3.5 py-2 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-purple-400 text-sm resize-none"
          />
        </div>

        {/* Submit & Cancel */}
        <div className="flex items-center justify-end gap-2 pt-3 border-t border-purple-100">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-slate-100 text-slate-600 font-bold text-xs hover:bg-slate-200"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-5 py-2 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs shadow-xs"
          >
            {editingReminder ? 'Save Changes' : 'Create Reminder'}
          </button>
        </div>
      </form>
    </Modal>
  );
};
