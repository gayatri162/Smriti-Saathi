import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import {
  Heart,
  Plus,
  Sparkles,
  Volume2,
  ChevronLeft,
  ChevronRight,
  Eye,
  CheckCircle2,
  Smile,
  Edit2,
  Trash2,
  HelpCircle,
  FolderHeart,
  RotateCcw,
} from 'lucide-react';
import { PersonalMemory, CaregiverProfile } from '../../types';
import { MemoryEditorModal } from './MemoryEditorModal';
import { SpeakButton } from '../common/SpeakButton';
import { speechService } from '../../services/speech';
import { soundEffects } from '../../services/sound';

interface PersonalMemoriesViewProps {
  memories: PersonalMemory[];
  onAddMemory: (data: Omit<PersonalMemory, 'id' | 'timesRecalled' | 'timesForgotten'>) => void;
  onUpdateMemory: (data: PersonalMemory) => void;
  onDeleteMemory: (id: string) => void;
  onRecordResult: (id: string, remembered: boolean) => void;
  profile: CaregiverProfile;
}

export const PersonalMemoriesView: React.FC<PersonalMemoriesViewProps> = ({
  memories,
  onAddMemory,
  onUpdateMemory,
  onDeleteMemory,
  onRecordResult,
  profile,
}) => {
  const [activeTab, setActiveTab] = useState<'flashcards' | 'caregiver_vault'>('flashcards');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [editorOpen, setEditorOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<PersonalMemory | null>(null);

  const currentMemory = memories[currentIndex] || memories[0];

  const handleNext = () => {
    setIsFlipped(false);
    setShowHint(false);
    setCurrentIndex((prev) => (prev + 1) % memories.length);
  };

  const handlePrev = () => {
    setIsFlipped(false);
    setShowHint(false);
    setCurrentIndex((prev) => (prev - 1 + memories.length) % memories.length);
  };

  const handleRemembered = () => {
    if (!currentMemory) return;
    soundEffects.playMatchSuccess();
    try {
      confetti({
        particleCount: 45,
        spread: 60,
        origin: { y: 0.6 },
      });
    } catch {
      // Confetti fallback
    }
    onRecordResult(currentMemory.id, true);
    speechService.speak(`Wonderful memory, ${profile.seniorName}! It is so sweet to remember.`);
    setTimeout(() => {
      handleNext();
    }, 1200);
  };

  const handleGentleReminder = () => {
    if (!currentMemory) return;
    soundEffects.playSoftTryAgain();
    onRecordResult(currentMemory.id, false);
    setIsFlipped(true); // Reveal answer gently
    speechService.speak(
      `Here is the gentle answer: ${currentMemory.answer}. Love and memories stay in our hearts.`
    );
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-6 rounded-3xl bg-gradient-to-r from-pink-100/90 via-purple-50 to-rose-100/70 border border-pink-200/80">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-pink-600 text-white text-xs font-bold">
            <Heart className="w-3.5 h-3.5" />
            <span>Reminiscence Therapy</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-pink-950 tracking-tight">
            5. Personal Memories
          </h2>
          <p className="text-xs sm:text-sm text-pink-900 max-w-xl leading-relaxed">
            Personalized recall flashcards customized by family and caregivers to trigger joyful life memories.
          </p>
        </div>

        {/* View Switcher & Add */}
        <div className="flex flex-wrap items-center gap-2">
          <div className="flex bg-white/90 p-1.5 rounded-2xl border border-pink-200 shadow-xs">
            <button
              type="button"
              onClick={() => setActiveTab('flashcards')}
              className={`px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                activeTab === 'flashcards'
                  ? 'bg-pink-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-pink-900'
              }`}
            >
              Recall Flashcard
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('caregiver_vault')}
              className={`px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                activeTab === 'caregiver_vault'
                  ? 'bg-pink-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-pink-900'
              }`}
            >
              Caregiver Vault ({memories.length})
            </button>
          </div>

          <button
            type="button"
            onClick={() => {
              setEditingItem(null);
              setEditorOpen(true);
            }}
            className="flex items-center gap-1.5 px-4 py-2.5 rounded-2xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs sm:text-sm shadow-sm transition-all cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Add Memory</span>
          </button>
        </div>
      </div>

      {/* Tab 1: Senior Flashcard Interactive Experience */}
      {activeTab === 'flashcards' ? (
        memories.length === 0 ? (
          <div className="p-12 text-center rounded-3xl bg-white border border-purple-100 shadow-xs space-y-3">
            <FolderHeart className="w-12 h-12 text-purple-400 mx-auto" />
            <h4 className="text-lg font-bold text-slate-800">No Personal Memories Yet</h4>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              Caregivers can add family questions, photos, and stories using the button above.
            </p>
          </div>
        ) : (
          <div className="max-w-2xl mx-auto space-y-4">
            {/* Memory Counter Navigation */}
            <div className="flex items-center justify-between px-2">
              <span className="text-xs font-bold text-slate-500 uppercase">
                Memory {currentIndex + 1} of {memories.length}
              </span>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handlePrev}
                  className="p-2 rounded-xl bg-white border border-slate-200 hover:bg-purple-50 text-slate-700 transition-colors cursor-pointer"
                  aria-label="Previous memory"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={handleNext}
                  className="p-2 rounded-xl bg-white border border-slate-200 hover:bg-purple-50 text-slate-700 transition-colors cursor-pointer"
                  aria-label="Next memory"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Flashcard container */}
            <div className="relative bg-white rounded-3xl p-6 sm:p-10 border-2 border-purple-200/90 shadow-md space-y-6 min-h-[380px] flex flex-col justify-between">
              {/* Top metadata tags */}
              <div className="flex items-center justify-between border-b border-purple-100 pb-3">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">{currentMemory.avatarEmoji || '❤️'}</span>
                  <div>
                    <h4 className="font-extrabold text-slate-800 text-sm sm:text-base">
                      {currentMemory.personName}
                    </h4>
                    <p className="text-xs text-pink-600 font-bold">
                      {currentMemory.relationship} {currentMemory.yearOrEra && `• ${currentMemory.yearOrEra}`}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-purple-100 text-purple-800 uppercase">
                    {currentMemory.category}
                  </span>
                  <SpeakButton
                    textToSpeak={isFlipped ? currentMemory.answer : currentMemory.question}
                    label=""
                    size="sm"
                  />
                </div>
              </div>

              {/* Main Content: Question vs Answer */}
              <div className="py-4 space-y-4 text-center my-auto">
                {!isFlipped ? (
                  <div className="space-y-3">
                    <p className="text-xs font-bold uppercase tracking-wider text-purple-500">
                      Do you remember?
                    </p>
                    <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 leading-relaxed px-2">
                      "{currentMemory.question}"
                    </h3>

                    {/* Hint reveal */}
                    {showHint ? (
                      <div className="p-3.5 rounded-2xl bg-amber-50 border border-amber-200 text-xs text-amber-900 max-w-md mx-auto animate-in fade-in">
                        💡 <strong>Caregiver Hint:</strong> {currentMemory.hint}
                      </div>
                    ) : (
                      <button
                        type="button"
                        onClick={() => setShowHint(true)}
                        className="text-xs font-bold text-purple-600 hover:text-purple-800 underline inline-flex items-center gap-1"
                      >
                        <HelpCircle className="w-3.5 h-3.5" />
                        <span>Show supportive hint</span>
                      </button>
                    )}
                  </div>
                ) : (
                  <div className="space-y-3 p-5 rounded-2xl bg-gradient-to-br from-purple-50 to-pink-50 border border-purple-200 animate-in fade-in">
                    <span className="px-3 py-0.5 rounded-full text-xs font-extrabold bg-emerald-100 text-emerald-800">
                      Cherished Memory
                    </span>
                    <h3 className="text-lg sm:text-xl font-extrabold text-purple-950 leading-relaxed">
                      {currentMemory.answer}
                    </h3>
                    {currentMemory.hint && (
                      <p className="text-xs text-slate-500 italic">
                        "{currentMemory.hint}"
                      </p>
                    )}
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="space-y-3 pt-3 border-t border-purple-100">
                {!isFlipped ? (
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                    <button
                      type="button"
                      onClick={() => setIsFlipped(true)}
                      className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-purple-50 hover:bg-purple-100 text-purple-800 font-bold text-xs sm:text-sm border border-purple-200 flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <Eye className="w-4 h-4" />
                      <span>Flip / Reveal Answer</span>
                    </button>
                    <button
                      type="button"
                      onClick={handleRemembered}
                      className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm shadow-xs flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <CheckCircle2 className="w-4 h-4" />
                      <span>I Remembered!</span>
                    </button>
                    <button
                      type="button"
                      onClick={handleGentleReminder}
                      className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-pink-100 hover:bg-pink-200 text-pink-900 font-bold text-xs sm:text-sm border border-pink-200 flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <Smile className="w-4 h-4" />
                      <span>Remind Me Gently</span>
                    </button>
                  </div>
                ) : (
                  <div className="flex items-center justify-between">
                    <button
                      type="button"
                      onClick={() => setIsFlipped(false)}
                      className="text-xs font-bold text-slate-500 hover:text-slate-800 flex items-center gap-1"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span>Back to Question</span>
                    </button>
                    <button
                      type="button"
                      onClick={handleNext}
                      className="px-5 py-2 rounded-xl bg-purple-600 text-white font-bold text-xs hover:bg-purple-700 shadow-xs"
                    >
                      Next Memory ➔
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        )
      ) : (
        /* Tab 2: Caregiver Vault (List & CRUD) */
        <div className="space-y-4">
          <div className="p-4 rounded-3xl bg-white border border-purple-100 shadow-xs flex items-center justify-between">
            <div>
              <h3 className="font-bold text-slate-800 text-base">
                Caregiver Personalized Question Vault
              </h3>
              <p className="text-xs text-slate-500">
                You have created {memories.length} personalized recall prompts for {profile.seniorName}.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {memories.map((mem) => (
              <div
                key={mem.id}
                className="p-5 rounded-3xl bg-white border border-purple-100 hover:border-purple-300 shadow-2xs space-y-3 transition-all"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-2.5">
                    <span className="text-2xl p-2 rounded-xl bg-purple-50">
                      {mem.avatarEmoji || '❤️'}
                    </span>
                    <div>
                      <h4 className="font-extrabold text-slate-800 text-base">{mem.title}</h4>
                      <p className="text-xs font-semibold text-pink-600">
                        {mem.relationship} ({mem.personName})
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      onClick={() => {
                        setEditingItem(mem);
                        setEditorOpen(true);
                      }}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-purple-700 hover:bg-purple-50"
                      title="Edit question"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        if (confirm(`Delete memory "${mem.title}"?`)) {
                          onDeleteMemory(mem.id);
                        }
                      }}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50"
                      title="Delete memory"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 text-xs space-y-1.5">
                  <p className="font-bold text-slate-800">
                    <span className="text-purple-600">Q:</span> {mem.question}
                  </p>
                  <p className="text-slate-600">
                    <span className="font-bold text-emerald-600">A:</span> {mem.answer}
                  </p>
                </div>

                <div className="flex items-center justify-between text-[11px] text-slate-500 font-semibold pt-1">
                  <span>Recalled: {mem.timesRecalled} times</span>
                  <span>Review needed: {mem.timesForgotten} times</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Editor Modal */}
      <MemoryEditorModal
        isOpen={editorOpen}
        onClose={() => {
          setEditorOpen(false);
          setEditingItem(null);
        }}
        onSave={(data) => {
          if (data.id) {
            onUpdateMemory(data as PersonalMemory);
          } else {
            onAddMemory(data);
          }
        }}
        editingMemory={editingItem}
      />
    </div>
  );
};
