import React, { useState } from 'react';
import { Brain, Sparkles, Trophy, Footprints, History, Volume2 } from 'lucide-react';
import { MemoryCardGame } from './MemoryCardGame';
import { SequenceRecallGame } from './SequenceRecallGame';
import { GameScoreRecord, CaregiverProfile } from '../../types';

interface MemoryGamesViewProps {
  profile: CaregiverProfile;
  gameScores: GameScoreRecord[];
  onSaveScore: (scoreData: Omit<GameScoreRecord, 'id' | 'timestamp'>) => void;
}

export const MemoryGamesView: React.FC<MemoryGamesViewProps> = ({
  profile,
  gameScores,
  onSaveScore,
}) => {
  const [activeTab, setActiveTab] = useState<'matching' | 'sequence'>('matching');

  const matchingScores = gameScores.filter((s) => s.gameType === 'memory_matching');
  const sequenceScores = gameScores.filter((s) => s.gameType === 'sequence_recall');

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-6 rounded-3xl bg-gradient-to-r from-purple-100/90 via-indigo-50/70 to-pink-100/70 border border-purple-200/80">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-purple-600 text-white text-xs font-bold">
            <Brain className="w-3.5 h-3.5" />
            <span>Cognitive Gym</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-purple-950 tracking-tight">
            2. Memory Games
          </h2>
          <p className="text-xs sm:text-sm text-purple-800 max-w-xl leading-relaxed">
            Gentle cognitive exercises designed to stimulate neuroplasticity, visual recall, and working memory.
          </p>
        </div>

        {/* Game Switcher Tabs */}
        <div className="flex bg-white/90 p-1.5 rounded-2xl border border-purple-200 shadow-xs">
          <button
            type="button"
            onClick={() => setActiveTab('matching')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
              activeTab === 'matching'
                ? 'bg-purple-600 text-white shadow-xs'
                : 'text-slate-600 hover:text-purple-900'
            }`}
          >
            <Brain className="w-4 h-4" />
            <span>Memory Matching</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('sequence')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
              activeTab === 'sequence'
                ? 'bg-purple-600 text-white shadow-xs'
                : 'text-slate-600 hover:text-purple-900'
            }`}
          >
            <Sparkles className="w-4 h-4" />
            <span>Sequence Recall</span>
          </button>
        </div>
      </div>

      {/* Render Active Game */}
      {activeTab === 'matching' ? (
        <MemoryCardGame onSaveScore={onSaveScore} seniorName={profile.seniorName} />
      ) : (
        <SequenceRecallGame onSaveScore={onSaveScore} seniorName={profile.seniorName} />
      )}

      {/* Recent History Table for this category */}
      <div className="bg-white rounded-3xl p-6 border border-purple-100 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-bold text-slate-800 text-base flex items-center gap-2">
            <History className="w-4 h-4 text-purple-600" />
            <span>
              Recent {activeTab === 'matching' ? 'Card Match' : 'Sequence Recall'} Attempts
            </span>
          </h3>
          <span className="text-xs font-semibold text-slate-400">Auto-saved to storage</span>
        </div>

        {activeTab === 'matching' ? (
          matchingScores.length === 0 ? (
            <p className="text-xs text-slate-400 italic">No games played yet. Play a round above!</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {matchingScores.slice(0, 3).map((item) => (
                <div
                  key={item.id}
                  className="p-3.5 rounded-2xl bg-purple-50/50 border border-purple-100 flex items-center justify-between"
                >
                  <div>
                    <span className="text-xs font-bold text-slate-700">
                      {item.totalPairs} Pairs ({item.difficulty})
                    </span>
                    <p className="text-[11px] text-slate-400">
                      {item.moves} moves • {item.timeTakenSeconds}s
                    </p>
                  </div>
                  <div className="text-right">
                    <span className="text-sm font-extrabold text-purple-800">
                      {item.score} pts
                    </span>
                    <p className="text-[10px] text-emerald-600 font-bold">
                      {item.accuracyPercentage}% Accuracy
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )
        ) : sequenceScores.length === 0 ? (
          <p className="text-xs text-slate-400 italic">No sequence rounds played yet.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {sequenceScores.slice(0, 3).map((item) => (
              <div
                key={item.id}
                className="p-3.5 rounded-2xl bg-indigo-50/50 border border-indigo-100 flex items-center justify-between"
              >
                <div>
                  <span className="text-xs font-bold text-slate-700">
                    {item.sequenceLength} Symbols Length
                  </span>
                  <p className="text-[11px] text-slate-400">
                    {new Date(item.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
                <div className="text-right">
                  <span className="text-sm font-extrabold text-indigo-800">
                    {item.score} pts
                  </span>
                  <p className="text-[10px] text-emerald-600 font-bold">
                    {item.accuracyPercentage}% Accuracy
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
