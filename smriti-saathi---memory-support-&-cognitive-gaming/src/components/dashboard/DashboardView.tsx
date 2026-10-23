import React from 'react';
import {
  Sparkles,
  Calendar,
  Clock,
  Heart,
  Brain,
  CheckCircle2,
  Bell,
  Play,
  ArrowRight,
  TrendingUp,
  Volume2,
  Flame,
  ShieldAlert,
  Sun,
  Smile,
} from 'lucide-react';
import {
  CaregiverProfile,
  ReminderItem,
  GameScoreRecord,
  AdaptiveRecallItem,
  PageId,
} from '../../types';
import { SpeakButton } from '../common/SpeakButton';
import { DisclaimerBanner } from '../common/DisclaimerBanner';
import { aiService } from '../../services/aiService';

interface DashboardViewProps {
  profile: CaregiverProfile;
  reminders: ReminderItem[];
  gameScores: GameScoreRecord[];
  adaptiveItems: AdaptiveRecallItem[];
  onToggleReminder: (id: string) => void;
  onNavigate: (page: PageId) => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  profile,
  reminders,
  gameScores,
  adaptiveItems,
  onToggleReminder,
  onNavigate,
}) => {
  const completedReminders = reminders.filter((r) => r.completed);
  const pendingReminders = reminders.filter((r) => !r.completed);
  const now = new Date();
  const dueAdaptiveItems = adaptiveItems.filter(
    (item) => new Date(item.nextScheduledAt).getTime() <= now.getTime()
  );

  const affirmation = aiService.getDailyAffirmation(profile.seniorName);

  // Time of day greeting
  const hour = now.getHours();
  const timeGreeting =
    hour < 12 ? 'Good Morning' : hour < 17 ? 'Good Afternoon' : 'Good Evening';

  const todayDateStr = now.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });

  return (
    <div className="space-y-6">
      {/* Top Welcome Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-purple-700 via-indigo-600 to-pink-600 text-white p-6 sm:p-8 shadow-md shadow-purple-200">
        {/* Soft background ambient shapes */}
        <div className="absolute -right-10 -bottom-10 w-64 h-64 rounded-full bg-white/10 blur-2xl pointer-events-none" />
        <div className="absolute right-24 top-4 w-32 h-32 rounded-full bg-pink-400/20 blur-xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-xs font-bold text-white border border-white/30">
              <Sun className="w-3.5 h-3.5 text-amber-300 animate-spin" />
              <span>{todayDateStr}</span>
            </div>

            <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
              {timeGreeting}, {profile.seniorName}!
            </h1>
            <p className="text-purple-100 text-sm sm:text-base max-w-xl leading-relaxed">
              Welcome back to your cognitive sanctuary. Take your time, enjoy gentle exercises, and stay connected with loved ones today.
            </p>
          </div>

          {/* Quick Affirmation Card */}
          <div className="w-full lg:w-80 p-4 rounded-2xl bg-white/15 backdrop-blur-md border border-white/25 text-white space-y-2">
            <div className="flex items-center justify-between text-xs font-bold text-pink-200">
              <span className="flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-amber-300" />
                <span>Today’s Thought</span>
              </span>
              <SpeakButton
                textToSpeak={`${affirmation.quote} ${affirmation.tip}`}
                label=""
                size="sm"
                variant="pill"
                className="bg-white/20 hover:bg-white/30 text-white border-none py-1 px-2"
              />
            </div>
            <p className="text-xs sm:text-sm font-semibold leading-relaxed">
              "{affirmation.quote}"
            </p>
            <p className="text-[11px] text-purple-200 border-t border-white/20 pt-1.5">
              💡 {affirmation.tip}
            </p>
          </div>
        </div>
      </div>

      {/* 4 Stat Overview Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Streak */}
        <div className="p-4 sm:p-5 rounded-3xl bg-white border border-purple-100 shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0 border border-amber-100">
            <Flame className="w-6 h-6 animate-bounce" />
          </div>
          <div>
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
              Routine Streak
            </p>
            <h3 className="text-xl sm:text-2xl font-extrabold text-slate-800">5 Days</h3>
            <p className="text-[11px] text-amber-600 font-bold">Consistent & active</p>
          </div>
        </div>

        {/* Reminders Done */}
        <div className="p-4 sm:p-5 rounded-3xl bg-white border border-purple-100 shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 border border-emerald-100">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
              Reminders Taken
            </p>
            <h3 className="text-xl sm:text-2xl font-extrabold text-slate-800">
              {completedReminders.length}/{reminders.length}
            </h3>
            <p className="text-[11px] text-emerald-600 font-bold">
              {pendingReminders.length === 0 ? 'All done today!' : `${pendingReminders.length} remaining`}
            </p>
          </div>
        </div>

        {/* Brain Games */}
        <div className="p-4 sm:p-5 rounded-3xl bg-white border border-purple-100 shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center shrink-0 border border-purple-100">
            <Brain className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
              Games Played
            </p>
            <h3 className="text-xl sm:text-2xl font-extrabold text-slate-800">
              {gameScores.length}
            </h3>
            <p className="text-[11px] text-purple-600 font-bold">
              Target: {profile.dailyGoalGames} daily
            </p>
          </div>
        </div>

        {/* Adaptive Recall Status */}
        <div className="p-4 sm:p-5 rounded-3xl bg-white border border-purple-100 shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-pink-50 text-pink-600 flex items-center justify-center shrink-0 border border-pink-100">
            <Clock className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
              Adaptive Recall
            </p>
            <h3 className="text-xl sm:text-2xl font-extrabold text-slate-800">
              {dueAdaptiveItems.length > 0 ? `${dueAdaptiveItems.length} Due` : 'Up to Date'}
            </h3>
            <p className="text-[11px] text-pink-600 font-bold">
              5 - 30 min intervals
            </p>
          </div>
        </div>
      </div>

      {/* Main Grid: Left Quick Actions & Reminders, Right Cognitive Hub */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Interactive Actions & Today's Schedule */}
        <div className="lg:col-span-2 space-y-6">
          {/* Quick Action Cards */}
          <div className="bg-white rounded-3xl p-6 border border-purple-100 shadow-xs">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-lg font-bold text-slate-800">Today’s Cognitive Actions</h3>
                <p className="text-xs text-slate-500">Pick a gentle activity to keep your mind stimulated</p>
              </div>
              <span className="text-xs font-bold text-purple-600 bg-purple-50 px-3 py-1 rounded-full">
                Interactive
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Memory Match Game Action */}
              <button
                type="button"
                onClick={() => onNavigate('games')}
                className="text-left p-5 rounded-2xl bg-gradient-to-br from-purple-50/80 to-indigo-50/40 border border-purple-200/80 hover:border-purple-400 hover:shadow-md transition-all group cursor-pointer"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="w-11 h-11 rounded-xl bg-purple-600 text-white flex items-center justify-center shadow-xs group-hover:scale-105 transition-transform">
                    <Brain className="w-5 h-5" />
                  </div>
                  <span className="text-xs font-extrabold text-purple-700 bg-purple-100/70 px-2.5 py-0.5 rounded-full">
                    Play Now
                  </span>
                </div>
                <h4 className="font-extrabold text-slate-800 text-base group-hover:text-purple-900 transition-colors">
                  Memory Card Match
                </h4>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                  Flip familiar cards (nature, fruits, household) to exercise visual recall and focus.
                </p>
                <div className="mt-3 flex items-center text-xs font-bold text-purple-700 gap-1">
                  <span>Start Game</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </button>

              {/* Sequence Recall Game Action */}
              <button
                type="button"
                onClick={() => onNavigate('games')}
                className="text-left p-5 rounded-2xl bg-gradient-to-br from-indigo-50/80 to-pink-50/40 border border-indigo-200/80 hover:border-indigo-400 hover:shadow-md transition-all group cursor-pointer"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="w-11 h-11 rounded-xl bg-indigo-600 text-white flex items-center justify-center shadow-xs group-hover:scale-105 transition-transform">
                    <Sparkles className="w-5 h-5" />
                  </div>
                  <span className="text-xs font-extrabold text-indigo-700 bg-indigo-100/70 px-2.5 py-0.5 rounded-full">
                    Recall Test
                  </span>
                </div>
                <h4 className="font-extrabold text-slate-800 text-base group-hover:text-indigo-900 transition-colors">
                  Sequence Recall
                </h4>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                  Watch a glowing sequence of cheerful symbols and reproduce them in the right order.
                </p>
                <div className="mt-3 flex items-center text-xs font-bold text-indigo-700 gap-1">
                  <span>Test Pattern</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </button>

              {/* Adaptive Spaced Recall Action */}
              <button
                type="button"
                onClick={() => onNavigate('adaptive')}
                className="text-left p-5 rounded-2xl bg-gradient-to-br from-amber-50/80 to-rose-50/40 border border-amber-200/80 hover:border-amber-400 hover:shadow-md transition-all group cursor-pointer"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="w-11 h-11 rounded-xl bg-amber-500 text-white flex items-center justify-center shadow-xs group-hover:scale-105 transition-transform">
                    <Clock className="w-5 h-5" />
                  </div>
                  {dueAdaptiveItems.length > 0 ? (
                    <span className="text-xs font-extrabold text-amber-800 bg-amber-200/80 px-2.5 py-0.5 rounded-full animate-pulse">
                      {dueAdaptiveItems.length} Ready
                    </span>
                  ) : (
                    <span className="text-xs font-bold text-slate-500 bg-slate-100 px-2.5 py-0.5 rounded-full">
                      Scheduled
                    </span>
                  )}
                </div>
                <h4 className="font-extrabold text-slate-800 text-base group-hover:text-amber-900 transition-colors">
                  Adaptive Recall (5 - 30 min)
                </h4>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                  Spaced-repetition cognitive intervals that expand with correct recall for lasting retention.
                </p>
                <div className="mt-3 flex items-center text-xs font-bold text-amber-800 gap-1">
                  <span>Open Recall Session</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </button>

              {/* Personal Memories Action */}
              <button
                type="button"
                onClick={() => onNavigate('memories')}
                className="text-left p-5 rounded-2xl bg-gradient-to-br from-pink-50/80 to-purple-50/40 border border-pink-200/80 hover:border-pink-400 hover:shadow-md transition-all group cursor-pointer"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="w-11 h-11 rounded-xl bg-pink-500 text-white flex items-center justify-center shadow-xs group-hover:scale-105 transition-transform">
                    <Heart className="w-5 h-5" />
                  </div>
                  <span className="text-xs font-extrabold text-pink-700 bg-pink-100/70 px-2.5 py-0.5 rounded-full">
                    Family Vault
                  </span>
                </div>
                <h4 className="font-extrabold text-slate-800 text-base group-hover:text-pink-900 transition-colors">
                  Personal Memories
                </h4>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                  Reflect on family stories, daughter Priya, pet Bruno, and joyful milestones.
                </p>
                <div className="mt-3 flex items-center text-xs font-bold text-pink-700 gap-1">
                  <span>View Flashcards</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </button>
            </div>
          </div>

          {/* Today's Priority Reminders with 1-click Checkmark and Audio */}
          <div className="bg-white rounded-3xl p-6 border border-purple-100 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                  <Bell className="w-5 h-5 text-purple-600" />
                  <span>Today’s Care & Medication Schedule</span>
                </h3>
                <p className="text-xs text-slate-500">
                  Click the speaker to hear any reminder aloud, or tap checkmark when completed.
                </p>
              </div>
              <button
                type="button"
                onClick={() => onNavigate('reminders')}
                className="text-xs font-bold text-purple-700 hover:text-purple-900 underline"
              >
                View Full Routine
              </button>
            </div>

            <div className="space-y-3">
              {reminders.slice(0, 4).map((reminder) => {
                const isDone = reminder.completed;
                return (
                  <div
                    key={reminder.id}
                    className={`flex items-center justify-between p-3.5 sm:p-4 rounded-2xl border transition-all ${
                      isDone
                        ? 'bg-slate-50/70 border-slate-200/60 opacity-75'
                        : reminder.priority === 'high'
                        ? 'bg-purple-50/40 border-purple-200/90 shadow-2xs'
                        : 'bg-white border-slate-200/80 hover:border-purple-200'
                    }`}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      {/* Checkbox */}
                      <button
                        type="button"
                        onClick={() => onToggleReminder(reminder.id)}
                        className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 transition-all cursor-pointer ${
                          isDone
                            ? 'bg-emerald-500 text-white shadow-xs'
                            : 'border-2 border-slate-300 hover:border-purple-500 bg-white text-transparent'
                        }`}
                        aria-label={`Mark reminder ${reminder.title} as ${isDone ? 'incomplete' : 'complete'}`}
                      >
                        <CheckCircle2 className="w-5 h-5" />
                      </button>

                      <div className="truncate">
                        <div className="flex items-center gap-2">
                          <span className="font-extrabold text-xs px-2 py-0.5 rounded-lg bg-slate-100 text-slate-700 font-mono">
                            {reminder.time}
                          </span>
                          <span
                            className={`font-bold text-sm sm:text-base truncate ${
                              isDone ? 'line-through text-slate-400' : 'text-slate-800'
                            }`}
                          >
                            {reminder.title}
                          </span>
                        </div>
                        {reminder.dosage && (
                          <p className="text-xs text-slate-500 mt-0.5 truncate">
                            {reminder.dosage}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0 ml-2">
                      <SpeakButton
                        textToSpeak={`Reminder for ${reminder.title}. Scheduled for ${reminder.time}. ${reminder.dosage || ''}. ${reminder.notes || ''}`}
                        label=""
                        size="sm"
                        variant="subtle"
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right 1 Col: Caregiver & Cognitive Health Summary */}
        <div className="space-y-6">
          {/* Caregiver Connected Card */}
          <div className="bg-gradient-to-br from-purple-50 via-pink-50/30 to-white rounded-3xl p-6 border border-purple-200/70 shadow-xs space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-purple-600 to-pink-500 text-white flex items-center justify-center font-bold text-lg shadow-sm">
                {profile.caregiverName.charAt(0)}
              </div>
              <div>
                <p className="text-xs font-bold text-purple-700 uppercase tracking-wider">
                  Connected Caregiver
                </p>
                <h4 className="font-extrabold text-slate-800 text-base">
                  {profile.caregiverName}
                </h4>
                <p className="text-xs text-slate-500">{profile.relationship}</p>
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-white border border-purple-100 text-xs space-y-1.5">
              <p className="font-semibold text-slate-700">Caregiver Note for Dadaji:</p>
              <p className="text-slate-600 italic leading-relaxed">
                "{profile.notes}"
              </p>
            </div>

            <div className="pt-2 border-t border-purple-100/80 flex items-center justify-between text-xs">
              <span className="text-slate-500">Helpline:</span>
              <a
                href={`tel:${profile.emergencyPhone.replace(/\s+/g, '')}`}
                className="font-bold text-purple-700 hover:text-purple-900"
              >
                {profile.emergencyPhone}
              </a>
            </div>

            <button
              type="button"
              onClick={() => onNavigate('caregiver')}
              className="w-full py-2.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs shadow-xs transition-colors"
            >
              Open Caregiver Portal
            </button>
          </div>

          {/* Cognitive Activity Snapshot */}
          <div className="bg-white rounded-3xl p-6 border border-purple-100 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="font-bold text-slate-800 text-sm">Recent Game Scores</h4>
              <button
                type="button"
                onClick={() => onNavigate('progress')}
                className="text-xs font-bold text-purple-700 hover:text-purple-900 underline"
              >
                Full Analytics
              </button>
            </div>

            <div className="space-y-2.5">
              {gameScores.slice(0, 3).map((score) => (
                <div
                  key={score.id}
                  className="p-3 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between"
                >
                  <div>
                    <p className="text-xs font-bold text-slate-700 capitalize">
                      {score.gameType.replace('_', ' ')}
                    </p>
                    <p className="text-[11px] text-slate-400">
                      {new Date(score.timestamp).toLocaleTimeString([], {
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                      {' • '}
                      {score.timeTakenSeconds}s
                    </p>
                  </div>
                  <div className="text-right">
                    <span className="text-sm font-extrabold text-purple-700">
                      {score.score} pts
                    </span>
                    <p className="text-[10px] font-semibold text-emerald-600">
                      {score.accuracyPercentage}% Accuracy
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Medical Notice */}
          <DisclaimerBanner compact />
        </div>
      </div>
    </div>
  );
};
