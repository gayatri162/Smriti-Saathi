import React, { useState, useEffect } from 'react';
import { Heart, Sparkles, User, HelpCircle, Loader2 } from 'lucide-react';
import { Modal } from '../common/Modal';
import { PersonalMemory } from '../../types';
import { aiService } from '../../services/aiService';

interface MemoryEditorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (memory: Omit<PersonalMemory, 'id' | 'timesRecalled' | 'timesForgotten'> & { id?: string }) => void;
  editingMemory?: PersonalMemory | null;
}

const EMOJI_OPTIONS = ['❤️', '🎓', '🐕', '🏔️', '🚂', '🥘', '🌸', '🏡', '👶', '💍', '🚗', '📻'];

export const MemoryEditorModal: React.FC<MemoryEditorModalProps> = ({
  isOpen,
  onClose,
  onSave,
  editingMemory,
}) => {
  const [title, setTitle] = useState('');
  const [relationship, setRelationship] = useState('');
  const [personName, setPersonName] = useState('');
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [hint, setHint] = useState('');
  const [category, setCategory] = useState<'family' | 'places' | 'milestones' | 'passions'>('family');
  const [avatarEmoji, setAvatarEmoji] = useState('❤️');
  const [yearOrEra, setYearOrEra] = useState('');

  // AI Story assistant state
  const [storyNote, setStoryNote] = useState('');
  const [isGeneratingWithAI, setIsGeneratingWithAI] = useState(false);
  const [showAiHelper, setShowAiHelper] = useState(false);

  useEffect(() => {
    if (editingMemory) {
      setTitle(editingMemory.title);
      setRelationship(editingMemory.relationship);
      setPersonName(editingMemory.personName);
      setQuestion(editingMemory.question);
      setAnswer(editingMemory.answer);
      setHint(editingMemory.hint);
      setCategory(editingMemory.category);
      setAvatarEmoji(editingMemory.avatarEmoji || '❤️');
      setYearOrEra(editingMemory.yearOrEra || '');
    } else {
      setTitle('');
      setRelationship('Granddaughter');
      setPersonName('');
      setQuestion('');
      setAnswer('');
      setHint('');
      setCategory('family');
      setAvatarEmoji('❤️');
      setYearOrEra('');
    }
    setStoryNote('');
    setShowAiHelper(false);
  }, [editingMemory, isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !question.trim() || !answer.trim()) return;

    onSave({
      id: editingMemory?.id,
      title: title.trim(),
      relationship: relationship.trim() || 'Loved One',
      personName: personName.trim() || 'Family',
      question: question.trim(),
      answer: answer.trim(),
      hint: hint.trim() || 'Think back to cherished times together.',
      category,
      avatarEmoji,
      yearOrEra: yearOrEra.trim() || undefined,
    });
    onClose();
  };

  const handleGenerateFromStory = async () => {
    if (!storyNote.trim()) return;
    setIsGeneratingWithAI(true);
    try {
      const generated = await aiService.generateMemoryFromStory(storyNote, relationship || 'Family');
      setTitle(generated.title);
      setQuestion(generated.question);
      setAnswer(generated.answer);
      setHint(generated.hint);
      setShowAiHelper(false);
    } catch {
      // Fallback
    } finally {
      setIsGeneratingWithAI(false);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={editingMemory ? 'Edit Personal Memory Question' : 'Add Personalized Memory Recall'}
      subtitle="Caregivers can craft custom recall questions about family, childhood, and life milestones"
      maxWidth="lg"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* AI Assistant Accordion */}
        <div className="p-3.5 rounded-2xl bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200 text-xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="font-extrabold text-purple-900 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-pink-500" />
              <span>AI Story-to-Flashcard Helper</span>
            </span>
            <button
              type="button"
              onClick={() => setShowAiHelper(!showAiHelper)}
              className="text-purple-700 font-bold hover:underline"
            >
              {showAiHelper ? 'Hide AI Helper' : 'Open AI Helper'}
            </button>
          </div>

          {showAiHelper && (
            <div className="space-y-2 pt-1">
              <p className="text-slate-600">
                Type a casual memory anecdote, and AI will turn it into a question, expected answer, and gentle hint.
              </p>
              <textarea
                rows={2}
                value={storyNote}
                onChange={(e) => setStoryNote(e.target.value)}
                placeholder="e.g. Rameshwar loves listening to old Mohammed Rafi songs with tea on Sunday mornings with granddaughter Priya."
                className="w-full p-2.5 rounded-xl border border-purple-200 bg-white text-xs resize-none focus:outline-none focus:ring-2 focus:ring-purple-400"
              />
              <button
                type="button"
                onClick={handleGenerateFromStory}
                disabled={isGeneratingWithAI || !storyNote.trim()}
                className="px-3 py-1.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs flex items-center gap-1.5 disabled:opacity-50 cursor-pointer"
              >
                {isGeneratingWithAI ? (
                  <>
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    <span>Formatting Memory...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Auto-Fill Memory Form</span>
                  </>
                )}
              </button>
            </div>
          )}
        </div>

        {/* Basic Info: Title & Category */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-bold text-slate-600 uppercase mb-1">
              Memory Title *
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Priya's Graduation, Shimla Trip"
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-purple-400 text-sm font-semibold"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-600 uppercase mb-1">
              Category
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value as typeof category)}
              className="w-full px-3 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-purple-400 text-sm font-semibold bg-white"
            >
              <option value="family">Family & Relatives</option>
              <option value="milestones">Career & Life Milestones</option>
              <option value="places">Travel & Cherished Places</option>
              <option value="passions">Passions, Food & Hobbies</option>
            </select>
          </div>
        </div>

        {/* Person / Relation & Era */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div>
            <label className="block text-xs font-bold text-slate-600 uppercase mb-1">
              Person / Subject Name
            </label>
            <input
              type="text"
              value={personName}
              onChange={(e) => setPersonName(e.target.value)}
              placeholder="e.g. Priya, Bruno, Shimla"
              className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-purple-400 text-sm font-semibold"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-600 uppercase mb-1">
              Relationship / Role
            </label>
            <input
              type="text"
              value={relationship}
              onChange={(e) => setRelationship(e.target.value)}
              placeholder="e.g. Daughter, Pet, Childhood Friend"
              className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-purple-400 text-sm font-semibold"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-600 uppercase mb-1">
              Year / Era
            </label>
            <input
              type="text"
              value={yearOrEra}
              onChange={(e) => setYearOrEra(e.target.value)}
              placeholder="e.g. 2024, Summer 1982"
              className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-purple-400 text-sm"
            />
          </div>
        </div>

        {/* Emoji Selector */}
        <div>
          <label className="block text-xs font-bold text-slate-600 uppercase mb-1">
            Memory Icon / Emoji
          </label>
          <div className="flex flex-wrap gap-2">
            {EMOJI_OPTIONS.map((emoji) => (
              <button
                key={emoji}
                type="button"
                onClick={() => setAvatarEmoji(emoji)}
                className={`w-9 h-9 rounded-xl flex items-center justify-center text-lg border transition-all cursor-pointer ${
                  avatarEmoji === emoji
                    ? 'bg-purple-100 border-purple-500 scale-110 shadow-xs'
                    : 'bg-white border-slate-200 hover:bg-slate-50'
                }`}
              >
                {emoji}
              </button>
            ))}
          </div>
        </div>

        {/* Question for the elder */}
        <div>
          <label className="block text-xs font-bold text-slate-600 uppercase mb-1">
            Prompt / Question for Senior *
          </label>
          <textarea
            rows={2}
            required
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="e.g. What special milestone did we celebrate for Ananya last summer?"
            className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-purple-400 text-sm font-medium resize-none"
          />
        </div>

        {/* Expected Answer */}
        <div>
          <label className="block text-xs font-bold text-slate-600 uppercase mb-1">
            Expected Answer *
          </label>
          <textarea
            rows={2}
            required
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            placeholder="e.g. Her graduation ceremony with a Gold Medal in Computer Science."
            className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-purple-400 text-sm font-medium resize-none"
          />
        </div>

        {/* Hint */}
        <div>
          <label className="block text-xs font-bold text-slate-600 uppercase mb-1">
            Supportive Hint
          </label>
          <input
            type="text"
            value={hint}
            onChange={(e) => setHint(e.target.value)}
            placeholder="e.g. She wore a dark blue gown and you bought her favorite sweets."
            className="w-full px-3.5 py-2 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-purple-400 text-sm"
          />
        </div>

        {/* Submit */}
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
            {editingMemory ? 'Save Changes' : 'Save Personal Memory'}
          </button>
        </div>
      </form>
    </Modal>
  );
};
