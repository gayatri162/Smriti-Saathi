import React, { useState } from 'react';
import { Download, Upload, Copy, Check, Terminal, Database, Sparkles, BookOpen } from 'lucide-react';
import { Modal } from '../common/Modal';
import { storageService } from '../../services/storage';

interface SetupGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
  onDataImported: () => void;
}

export const SetupGuideModal: React.FC<SetupGuideModalProps> = ({
  isOpen,
  onClose,
  onDataImported,
}) => {
  const [activeTab, setActiveTab] = useState<'walkthrough' | 'setup' | 'architecture' | 'export'>('walkthrough');
  const [copiedCmd, setCopiedCmd] = useState(false);
  const [copiedSql, setCopiedSql] = useState(false);
  const [importStatus, setImportStatus] = useState<string | null>(null);

  const handleCopy = (text: string, type: 'cmd' | 'sql') => {
    navigator.clipboard.writeText(text);
    if (type === 'cmd') {
      setCopiedCmd(true);
      setTimeout(() => setCopiedCmd(false), 2000);
    } else {
      setCopiedSql(true);
      setTimeout(() => setCopiedSql(false), 2000);
    }
  };

  const handleExportJSON = () => {
    const json = storageService.exportAllDataAsJSON();
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `smriti-saathi-data-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleImportJSON = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const text = event.target?.result as string;
        const ok = storageService.importDataFromJSON(text);
        if (ok) {
          setImportStatus('Data successfully loaded!');
          onDataImported();
          setTimeout(() => setImportStatus(null), 3000);
        } else {
          setImportStatus('Error: Invalid JSON format.');
        }
      } catch {
        setImportStatus('Failed to read file.');
      }
    };
    reader.readAsText(file);
  };

  const supabaseSchemaCode = `-- SMRITI-SAATHI PostgreSQL / Supabase Schema Blueprint
-- Future migration when converting from localStorage to Cloud Postgres

CREATE TABLE IF NOT EXISTS caregiver_profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  senior_name TEXT NOT NULL,
  senior_age INT NOT NULL,
  caregiver_name TEXT NOT NULL,
  relationship TEXT NOT NULL,
  emergency_phone TEXT NOT NULL,
  doctor_name TEXT,
  doctor_phone TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS reminders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES caregiver_profiles(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  category TEXT CHECK (category IN ('medicine', 'meal', 'sleep', 'activity')),
  reminder_time TIME NOT NULL,
  dosage TEXT,
  notes TEXT,
  completed BOOLEAN DEFAULT false,
  completed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS adaptive_recall_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES caregiver_profiles(id),
  prompt TEXT NOT NULL,
  options JSONB NOT NULL,
  correct_option_index INT NOT NULL,
  current_interval_minutes INT DEFAULT 5 CHECK (current_interval_minutes IN (5, 10, 15, 20, 30)),
  last_tested_at TIMESTAMPTZ,
  next_scheduled_at TIMESTAMPTZ,
  consecutive_correct INT DEFAULT 0,
  total_attempts INT DEFAULT 0
);

CREATE TABLE IF NOT EXISTS game_scores (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  game_type TEXT NOT NULL,
  score INT NOT NULL,
  accuracy_percentage NUMERIC(5,2),
  time_taken_seconds INT,
  created_at TIMESTAMPTZ DEFAULT now()
);`;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Hackathon Presentation & Setup Guide"
      subtitle="Complete documentation, demo walkthrough, and export tooling"
      maxWidth="3xl"
    >
      <div className="space-y-4">
        {/* Navigation tabs */}
        <div className="flex border-b border-purple-100 gap-2 pb-2">
          {[
            { id: 'walkthrough', label: '1. Judge Walkthrough', icon: Sparkles },
            { id: 'setup', label: '2. Local Setup & Export', icon: Terminal },
            { id: 'architecture', label: '3. PostgreSQL / Supabase', icon: Database },
            { id: 'export', label: '4. Backup & Seed Data', icon: Download },
          ].map((tab) => {
            const Icon = tab.icon;
            const active = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id as typeof activeTab)}
                className={`flex items-center gap-1.5 px-3 py-2 text-xs sm:text-sm font-bold rounded-xl transition-all cursor-pointer ${
                  active
                    ? 'bg-purple-600 text-white shadow-xs'
                    : 'text-slate-600 hover:bg-purple-50 hover:text-purple-900'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Tab 1: Walkthrough for Judges */}
        {activeTab === 'walkthrough' && (
          <div className="space-y-4 text-xs sm:text-sm text-slate-600 leading-relaxed">
            <div className="p-4 rounded-2xl bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200">
              <h4 className="font-extrabold text-purple-950 text-base mb-1">
                How to Demonstrate SMRITI-SAATHI in 3 Minutes:
              </h4>
              <p className="text-xs text-purple-800">
                A seamless flow showcasing elderly cognitive assistance and caregiver peace of mind.
              </p>
            </div>

            <ol className="list-decimal list-inside space-y-3 font-medium">
              <li className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                <strong className="text-purple-900">Spoken Reminders:</strong> Open{' '}
                <strong>Daily Reminders</strong>, click the <em>"Read Aloud"</em> or voice button on the Blood Pressure medication. Notice the browser’s Web Speech Synthesis reading at an elder-friendly gentle pace (0.88x speed). Check it off to see the instant live streak update.
              </li>
              <li className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                <strong className="text-purple-900">Play Memory Matching & Sequence Recall:</strong> Open{' '}
                <strong>Memory Games</strong>. Flip matching pairs (Nature, Sweets, Everyday Items). Check move counter, scoring, and the celebratory confetti trigger upon victory! Then switch to Sequence Recall to test visual symbol reproduction.
              </li>
              <li className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                <strong className="text-purple-900">Adaptive Spaced Recall (5m ➔ 30m):</strong> Open{' '}
                <strong>Adaptive Recall</strong>. Answer a prompt correctly: watch the interval step up from 5m ➔ 10m ➔ 15m ➔ 20m ➔ 30m. Miss an answer intentionally to demonstrate the safety reset to 5m. Use the <em>"Fast-Forward Timers (Demo Mode)"</em> button to test prompts immediately.
              </li>
              <li className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                <strong className="text-purple-900">Personal Family Memories:</strong> Open{' '}
                <strong>Personal Memories</strong>. Switch between the interactive senior flashcard mode and the Caregiver Add/Edit form.
              </li>
              <li className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                <strong className="text-purple-900">Caregiver Dashboard & Progress Analytics:</strong> Review the interactive Recharts graphs in <strong>Progress</strong>, and generate a printable Family Doctor Clinical Summary from the <strong>Caregiver Dashboard</strong>.
              </li>
            </ol>
          </div>
        )}

        {/* Tab 2: Local Setup */}
        {activeTab === 'setup' && (
          <div className="space-y-4 text-xs sm:text-sm text-slate-600">
            <div>
              <h4 className="font-bold text-slate-800 text-sm mb-1">Local Development & Export</h4>
              <p className="text-xs text-slate-500">
                To run this project on any computer or export to a GitHub repository:
              </p>
            </div>

            <div className="relative p-4 rounded-2xl bg-slate-900 text-slate-200 font-mono text-xs overflow-x-auto">
              <pre>{`# 1. Clone or extract the zip export
cd smriti-saathi

# 2. Install dependencies
npm install

# 3. Start local development server
npm run dev

# 4. Open in browser:
http://localhost:3000`}</pre>
              <button
                type="button"
                onClick={() =>
                  handleCopy(
                    `# Install and run SMRITI-SAATHI\nnpm install\nnpm run dev`,
                    'cmd'
                  )
                }
                className="absolute top-3 right-3 px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-purple-300 flex items-center gap-1 text-xs"
              >
                {copiedCmd ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedCmd ? 'Copied!' : 'Copy'}</span>
              </button>
            </div>

            <div className="p-3.5 rounded-xl bg-purple-50 border border-purple-200 text-xs">
              <strong className="text-purple-900">Required Environment:</strong> Node.js 18+ or 20+. All dependencies (React 19, Vite 8, Tailwind v4, Lucide, Recharts) are specified in <code>package.json</code>.
            </div>
          </div>
        )}

        {/* Tab 3: Supabase & PostgreSQL Migration Architecture */}
        {activeTab === 'architecture' && (
          <div className="space-y-4 text-xs sm:text-sm text-slate-600">
            <div>
              <h4 className="font-bold text-slate-800 text-sm mb-1">Ready for Supabase & PostgreSQL</h4>
              <p className="text-xs text-slate-500 leading-relaxed">
                The storage service in <code>src/services/storage.ts</code> is built with an abstraction layer mirroring database rows. Simply swap the localStorage calls with <code>@supabase/supabase-js</code> client queries.
              </p>
            </div>

            <div className="relative p-4 rounded-2xl bg-slate-900 text-slate-200 font-mono text-[11px] overflow-x-auto max-h-60">
              <pre>{supabaseSchemaCode}</pre>
              <button
                type="button"
                onClick={() => handleCopy(supabaseSchemaCode, 'sql')}
                className="absolute top-3 right-3 px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-purple-300 flex items-center gap-1 text-xs"
              >
                {copiedSql ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedSql ? 'Copied SQL!' : 'Copy Schema'}</span>
              </button>
            </div>
          </div>
        )}

        {/* Tab 4: Export & Reset */}
        {activeTab === 'export' && (
          <div className="space-y-4 text-xs sm:text-sm text-slate-600">
            <div className="p-4 rounded-2xl bg-purple-50/70 border border-purple-200 space-y-3">
              <h4 className="font-bold text-purple-950">Data Portability & Backup</h4>
              <p className="text-xs text-purple-800">
                Export current senior patient data, reminder routines, and game scores to a clean JSON file, or restore default presentation presets.
              </p>
              <div className="flex flex-wrap gap-2 pt-1">
                <button
                  type="button"
                  onClick={handleExportJSON}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs shadow-xs"
                >
                  <Download className="w-4 h-4" />
                  <span>Download Backup JSON</span>
                </button>

                <label className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white border border-purple-300 hover:bg-purple-50 text-purple-900 font-bold text-xs cursor-pointer shadow-xs">
                  <Upload className="w-4 h-4 text-purple-600" />
                  <span>Restore from JSON</span>
                  <input
                    type="file"
                    accept=".json"
                    onChange={handleImportJSON}
                    className="hidden"
                  />
                </label>
              </div>
              {importStatus && (
                <p className="text-xs font-semibold text-emerald-700">{importStatus}</p>
              )}
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between">
              <div>
                <h5 className="font-bold text-slate-800 text-xs">Reset to Clean Demo Defaults</h5>
                <p className="text-[11px] text-slate-500">
                  Reloads Rameshwar Sharma Dadaji’s realistic profile, reminders, memories, and initial game scores.
                </p>
              </div>
              <button
                type="button"
                onClick={() => {
                  storageService.resetToDemoDefaults();
                  onDataImported();
                  alert('Demo sample data restored successfully!');
                }}
                className="px-3 py-1.5 rounded-xl bg-slate-200 hover:bg-slate-300 text-slate-800 font-bold text-xs"
              >
                Reset Demo Data
              </button>
            </div>
          </div>
        )}

        <div className="pt-2 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-purple-600 text-white font-bold text-sm hover:bg-purple-700 shadow-sm"
          >
            Got It, Back to App
          </button>
        </div>
      </div>
    </Modal>
  );
};
