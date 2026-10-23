import React from 'react';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  AreaChart,
  Area,
} from 'recharts';
import {
  TrendingUp,
  Brain,
  CheckCircle2,
  Trophy,
  Activity,
  Calendar,
  Sparkles,
  ArrowRight,
} from 'lucide-react';
import { GameScoreRecord, ReminderItem, AdaptiveRecallItem, PageId } from '../../types';

interface ProgressViewProps {
  gameScores: GameScoreRecord[];
  reminders: ReminderItem[];
  adaptiveItems: AdaptiveRecallItem[];
  onNavigate: (page: PageId) => void;
  seniorName: string;
}

export const ProgressView: React.FC<ProgressViewProps> = ({
  gameScores,
  reminders,
  adaptiveItems,
  onNavigate,
  seniorName,
}) => {
  // Aggregate game score chart data
  const scoreChartData = [...gameScores]
    .reverse()
    .map((record, index) => ({
      session: `Game #${index + 1}`,
      score: record.score,
      accuracy: record.accuracyPercentage,
      game: record.gameType === 'memory_matching' ? 'Matching' : 'Sequence',
      time: new Date(record.timestamp).toLocaleDateString([], { month: 'short', day: 'numeric' }),
    }));

  // Aggregate adaptive intervals distribution
  const intervalCounts: Record<number, number> = { 5: 0, 10: 0, 15: 0, 20: 0, 30: 0 };
  adaptiveItems.forEach((item) => {
    if (intervalCounts[item.currentIntervalMinutes] !== undefined) {
      intervalCounts[item.currentIntervalMinutes]++;
    }
  });

  const intervalChartData = [
    { interval: '5 Min', count: intervalCounts[5], label: 'Initial level' },
    { interval: '10 Min', count: intervalCounts[10], label: 'First step' },
    { interval: '15 Min', count: intervalCounts[15], label: 'Intermediate' },
    { interval: '20 Min', count: intervalCounts[20], label: 'Advanced' },
    { interval: '30 Min', count: intervalCounts[30], label: 'Mastery' },
  ];

  // Routine Category Completion Data
  const categories = ['medicine', 'meal', 'sleep', 'activity'] as const;
  const routineData = categories.map((cat) => {
    const total = reminders.filter((r) => r.category === cat).length;
    const completed = reminders.filter((r) => r.category === cat && r.completed).length;
    return {
      category: cat.charAt(0).toUpperCase() + cat.slice(1),
      Completed: completed,
      Pending: Math.max(0, total - completed),
    };
  });

  // Calculate summary metrics
  const totalGames = gameScores.length;
  const avgScore =
    totalGames > 0
      ? Math.round(gameScores.reduce((acc, s) => acc + s.score, 0) / totalGames)
      : 0;
  const avgAccuracy =
    totalGames > 0
      ? Math.round(gameScores.reduce((acc, s) => acc + s.accuracyPercentage, 0) / totalGames)
      : 0;
  const completedReminders = reminders.filter((r) => r.completed).length;
  const adherenceRate =
    reminders.length > 0 ? Math.round((completedReminders / reminders.length) * 100) : 0;

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-6 rounded-3xl bg-gradient-to-r from-teal-100/90 via-purple-50 to-indigo-100/70 border border-teal-200/80">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-teal-600 text-white text-xs font-bold">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>Cognitive Analytics</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-teal-950 tracking-tight">
            6. Cognitive & Routine Progress
          </h2>
          <p className="text-xs sm:text-sm text-teal-900 max-w-xl leading-relaxed">
            Real performance tracking across memory games, routine consistency, and spaced recall retention.
          </p>
        </div>
      </div>

      {/* 4 Summary Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-4 sm:p-5 rounded-3xl bg-white border border-purple-100 shadow-xs">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
              <Brain className="w-5 h-5" />
            </div>
            <span className="text-xs font-bold text-slate-400 uppercase">Games Total</span>
          </div>
          <p className="text-2xl font-extrabold text-slate-900">{totalGames}</p>
          <p className="text-[11px] text-purple-600 font-bold mt-0.5">Sessions logged</p>
        </div>

        <div className="p-4 sm:p-5 rounded-3xl bg-white border border-purple-100 shadow-xs">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
              <Trophy className="w-5 h-5" />
            </div>
            <span className="text-xs font-bold text-slate-400 uppercase">Average Score</span>
          </div>
          <p className="text-2xl font-extrabold text-slate-900">{avgScore} Pts</p>
          <p className="text-[11px] text-amber-600 font-bold mt-0.5">Performance rating</p>
        </div>

        <div className="p-4 sm:p-5 rounded-3xl bg-white border border-purple-100 shadow-xs">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center">
              <Sparkles className="w-5 h-5" />
            </div>
            <span className="text-xs font-bold text-slate-400 uppercase">Memory Accuracy</span>
          </div>
          <p className="text-2xl font-extrabold text-slate-900">{avgAccuracy}%</p>
          <p className="text-[11px] text-teal-600 font-bold mt-0.5">Pattern precision</p>
        </div>

        <div className="p-4 sm:p-5 rounded-3xl bg-white border border-purple-100 shadow-xs">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <span className="text-xs font-bold text-slate-400 uppercase">Routine Adherence</span>
          </div>
          <p className="text-2xl font-extrabold text-slate-900">{adherenceRate}%</p>
          <p className="text-[11px] text-emerald-600 font-bold mt-0.5">Today’s checklist</p>
        </div>
      </div>

      {/* Main Charts Row */}
      {totalGames === 0 ? (
        /* Empty State */
        <div className="p-12 text-center rounded-3xl bg-white border border-purple-100 shadow-xs space-y-4">
          <div className="w-16 h-16 rounded-3xl bg-purple-50 text-purple-600 flex items-center justify-center mx-auto">
            <Brain className="w-8 h-8" />
          </div>
          <h3 className="text-xl font-bold text-slate-800">No Game Activity Recorded Yet</h3>
          <p className="text-xs sm:text-sm text-slate-500 max-w-md mx-auto leading-relaxed">
            As {seniorName} completes Memory Matching or Sequence Recall rounds, visual trends, scores, and cognitive accuracy curves will populate automatically here.
          </p>
          <button
            type="button"
            onClick={() => onNavigate('games')}
            className="px-6 py-2.5 rounded-xl bg-purple-600 text-white font-bold text-sm shadow-xs hover:bg-purple-700"
          >
            Play First Memory Game
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Chart 1: Game Score Progression Over Time */}
          <div className="p-6 rounded-3xl bg-white border border-purple-100 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-extrabold text-slate-800 text-base">
                  Cognitive Score Progression
                </h3>
                <p className="text-xs text-slate-400">Points earned across recent game sessions</p>
              </div>
              <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-purple-100 text-purple-800">
                Line Trend
              </span>
            </div>

            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={scoreChartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="scoreColor" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.4} />
                      <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0.0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#F1EDF9" />
                  <XAxis dataKey="session" tick={{ fontSize: 11, fill: '#64748B' }} />
                  <YAxis tick={{ fontSize: 11, fill: '#64748B' }} domain={[0, 1100]} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#FFFFFF',
                      borderRadius: '16px',
                      border: '1px solid #E2E8F0',
                      boxShadow: '0 4px 12px rgba(0,0,0,0.06)',
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="score"
                    name="Score (Pts)"
                    stroke="#8B5CF6"
                    strokeWidth={3}
                    fillOpacity={1}
                    fill="url(#scoreColor)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Chart 2: Daily Routine Completion by Category */}
          <div className="p-6 rounded-3xl bg-white border border-purple-100 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-extrabold text-slate-800 text-base">
                  Daily Routine Adherence
                </h3>
                <p className="text-xs text-slate-400">Completed vs pending tasks by category</p>
              </div>
              <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                Care Routines
              </span>
            </div>

            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={routineData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#F1EDF9" />
                  <XAxis dataKey="category" tick={{ fontSize: 11, fill: '#64748B' }} />
                  <YAxis tick={{ fontSize: 11, fill: '#64748B' }} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#FFFFFF',
                      borderRadius: '16px',
                      border: '1px solid #E2E8F0',
                      boxShadow: '0 4px 12px rgba(0,0,0,0.06)',
                    }}
                  />
                  <Legend wrapperStyle={{ fontSize: 12, paddingTop: 6 }} />
                  <Bar dataKey="Completed" fill="#10B981" radius={[8, 8, 0, 0]} />
                  <Bar dataKey="Pending" fill="#E2E8F0" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Chart 3: Adaptive Recall Spaced Retention Level Distribution */}
          <div className="p-6 rounded-3xl bg-white border border-purple-100 shadow-xs space-y-4 lg:col-span-2">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-extrabold text-slate-800 text-base">
                  Adaptive Recall Spaced Repetition Distribution
                </h3>
                <p className="text-xs text-slate-400">
                  Number of items successfully sustained at each retention interval (5m to 30m)
                </p>
              </div>
              <button
                type="button"
                onClick={() => onNavigate('adaptive')}
                className="text-xs font-bold text-purple-700 hover:text-purple-900 flex items-center gap-1"
              >
                <span>Test Spaced Recall</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="h-56 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={intervalChartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#F1EDF9" />
                  <XAxis dataKey="interval" tick={{ fontSize: 12, fill: '#64748B' }} />
                  <YAxis tick={{ fontSize: 11, fill: '#64748B' }} allowDecimals={false} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#FFFFFF',
                      borderRadius: '16px',
                      border: '1px solid #E2E8F0',
                    }}
                  />
                  <Bar dataKey="count" name="Memory Items at this Interval" fill="#EC4899" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
