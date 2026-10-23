import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import {
  Timer,
  Clock,
  Sparkles,
  CheckCircle2,
  XCircle,
  HelpCircle,
  FastForward,
  TrendingUp,
  Volume2,
  RefreshCw,
  Info,
  Calendar,
} from 'lucide-react';
import { AdaptiveRecallItem, AdaptiveIntervalMinutes, AdaptiveRecallLog } from '../../types';
import { soundEffects } from '../../services/sound';
import { speechService } from '../../services/speech';
import { SpeakButton } from '../common/SpeakButton';

interface AdaptiveRecallViewProps {
  items: AdaptiveRecallItem[];
  logs: AdaptiveRecallLog[];
  onAttempt: (
    itemId: string,
    selectedOptionIndex: number
  ) => { isCorrect: boolean; nextInterval: AdaptiveIntervalMinutes; updatedItem: AdaptiveRecallItem };
  onFastForwardAll: () => void;
  seniorName: string;
}

const INTERVAL_LADDER: AdaptiveIntervalMinutes[] = [5, 10, 15, 20, 30];

export const AdaptiveRecallView: React.FC<AdaptiveRecallViewProps> = ({
  items,
  logs,
  onAttempt,
  onFastForwardAll,
  seniorName,
}) => {
  const [selectedItemId, setSelectedItemId] = useState<string>(items[0]?.id || '');
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [showHint, setShowHint] = useState<boolean>(false);
  const [lastResult, setLastResult] = useState<{
    isCorrect: boolean;
    prevInterval: AdaptiveIntervalMinutes;
    newInterval: AdaptiveIntervalMinutes;
    correctAnswer: string;
  } | null>(null);
  const [currentTime, setCurrentTime] = useState(Date.now());

  // Keep a 1-second interval to update remaining countdowns
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(Date.now()), 1000);
    return () => clearInterval(timer);
  }, []);

  const activeItem = items.find((i) => i.id === selectedItemId) || items[0];

  const getTimeRemainingStr = (targetIso: string): { text: string; isDue: boolean; secondsLeft: number } => {
    const target = new Date(targetIso).getTime();
    const diffMs = target - currentTime;
    if (diffMs <= 0) {
      return { text: 'Ready for Recall Now', isDue: true, secondsLeft: 0 };
    }
    const minutes = Math.floor(diffMs / 60000);
    const seconds = Math.floor((diffMs % 60000) / 1000);
    return {
      text: `${minutes}m ${seconds < 10 ? '0' : ''}${seconds}s remaining`,
      isDue: false,
      secondsLeft: Math.floor(diffMs / 1000),
    };
  };

  const handleSelectOption = (idx: number) => {
    if (lastResult) return;
    setSelectedOption(idx);
    soundEffects.playCardFlip();
  };

  const handleSubmitAnswer = () => {
    if (selectedOption === null || !activeItem) return;

    const prevInterval = activeItem.currentIntervalMinutes;
    const { isCorrect, nextInterval } = onAttempt(activeItem.id, selectedOption);

    if (isCorrect) {
      soundEffects.playMatchSuccess();
      try {
        confetti({
          particleCount: 50,
          spread: 60,
          origin: { y: 0.6 },
        });
      } catch {
        // Confetti fallback
      }
      speechService.speak(
        `Correct recall, ${seniorName}! Your memory interval is now extended to ${nextInterval} minutes.`
      );
    } else {
      soundEffects.playSoftTryAgain();
      speechService.speak(
        `Not quite right. We will gently revisit this in 5 minutes to strengthen your recall.`
      );
    }

    setLastResult({
      isCorrect,
      prevInterval,
      newInterval: nextInterval,
      correctAnswer: activeItem.options[activeItem.correctOptionIndex],
    });
  };

  const handleNextQuestion = () => {
    setSelectedOption(null);
    setShowHint(false);
    setLastResult(null);

    // Pick next prompt
    const currentIndex = items.findIndex((i) => i.id === activeItem?.id);
    const nextItem = items[(currentIndex + 1) % items.length];
    if (nextItem) {
      setSelectedItemId(nextItem.id);
    }
  };

  const activeRemaining = activeItem ? getTimeRemainingStr(activeItem.nextScheduledAt) : null;

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 p-6 rounded-3xl bg-gradient-to-r from-amber-100/80 via-purple-50 to-pink-100/70 border border-amber-200/80">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-amber-600 text-white text-xs font-bold">
            <Timer className="w-3.5 h-3.5" />
            <span>Spaced Retrieval Therapy</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-amber-950 tracking-tight">
            3. Adaptive Recall System
          </h2>
          <p className="text-xs sm:text-sm text-amber-900 max-w-xl leading-relaxed">
            Scientifically modeled spaced intervals (5, 10, 15, 20 & 30 min). Intervals expand with correct recall and reset to 5 minutes on mistakes to prevent memory fatigue.
          </p>
        </div>

        {/* Demo Fast-Forward Helper */}
        <button
          type="button"
          onClick={() => {
            onFastForwardAll();
            soundEffects.playCardFlip();
          }}
          className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs sm:text-sm shadow-sm shadow-amber-200 transition-all cursor-pointer"
          title="Fast-forward all timers to 0s for immediate testing during presentation"
        >
          <FastForward className="w-4 h-4" />
          <span>Fast-Forward Timers (Demo Mode)</span>
        </button>
      </div>

      {/* Spaced Interval Progression Ladder Banner */}
      <div className="bg-white rounded-3xl p-6 border border-purple-100 shadow-xs space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="font-bold text-slate-800 text-sm flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-purple-600" />
            <span>Spaced Intervals Ladder: 5m ➔ 10m ➔ 15m ➔ 20m ➔ 30m</span>
          </h3>
          <span className="text-xs font-medium text-slate-400">
            Rules: +1 step on correct • Reset to 5m on error
          </span>
        </div>

        <div className="grid grid-cols-5 gap-2 sm:gap-4">
          {INTERVAL_LADDER.map((interval) => {
            const isCurrent = activeItem?.currentIntervalMinutes === interval;
            return (
              <div
                key={interval}
                className={`p-3 rounded-2xl text-center border-2 transition-all ${
                  isCurrent
                    ? 'bg-purple-600 text-white border-purple-700 shadow-md ring-4 ring-purple-100 scale-102 font-bold'
                    : 'bg-purple-50/50 text-slate-600 border-purple-100 font-medium'
                }`}
              >
                <p className="text-base sm:text-xl font-extrabold">{interval}m</p>
                <p className={`text-[10px] uppercase tracking-wider ${isCurrent ? 'text-purple-100' : 'text-slate-400'}`}>
                  {isCurrent ? 'Active Level' : 'Interval'}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Main Grid: Left Active Question Tester, Right Item Selection & Schedule */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Active Interactive Recall Card */}
        <div className="lg:col-span-2 space-y-6">
          {activeItem && (
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-purple-100 shadow-xs space-y-6">
              {/* Question Header & Status */}
              <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-purple-100">
                <div className="flex items-center gap-2">
                  <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-purple-100 text-purple-800">
                    Category: {activeItem.category}
                  </span>
                  <span className="px-3 py-1 rounded-full text-xs font-bold bg-slate-100 text-slate-700">
                    Interval: {activeItem.currentIntervalMinutes} mins
                  </span>
                </div>

                {/* Live Countdown */}
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-purple-600" />
                  <span
                    className={`text-xs sm:text-sm font-extrabold ${
                      activeRemaining?.isDue
                        ? 'text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-xl'
                        : 'text-amber-700 bg-amber-50 px-2.5 py-1 rounded-xl'
                    }`}
                  >
                    {activeRemaining?.text}
                  </span>
                </div>
              </div>

              {/* Prompt Text & Voice Audio */}
              <div className="space-y-3">
                <div className="flex items-start justify-between gap-4">
                  <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 leading-snug">
                    {activeItem.prompt}
                  </h3>
                  <SpeakButton textToSpeak={activeItem.prompt} label="" size="sm" />
                </div>

                {/* Hint toggle */}
                {activeItem.hint && (
                  <div className="pt-1">
                    {showHint ? (
                      <div className="p-3.5 rounded-2xl bg-amber-50/80 border border-amber-200 text-xs text-amber-900 flex items-start gap-2">
                        <Sparkles className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                        <div>
                          <strong>Caregiver Hint:</strong> {activeItem.hint}
                        </div>
                      </div>
                    ) : (
                      <button
                        type="button"
                        onClick={() => setShowHint(true)}
                        className="text-xs font-bold text-purple-700 hover:text-purple-900 flex items-center gap-1.5"
                      >
                        <HelpCircle className="w-3.5 h-3.5" />
                        <span>Need a hint? Click here</span>
                      </button>
                    )}
                  </div>
                )}
              </div>

              {/* Multiple Choice Options */}
              <div className="space-y-3">
                {activeItem.options.map((option, idx) => {
                  const isSelected = selectedOption === idx;
                  let styleClass =
                    'bg-slate-50/80 hover:bg-purple-50/70 border-slate-200 text-slate-800';

                  if (lastResult) {
                    if (idx === activeItem.correctOptionIndex) {
                      styleClass = 'bg-emerald-100 border-emerald-400 text-emerald-950 font-bold';
                    } else if (isSelected && !lastResult.isCorrect) {
                      styleClass = 'bg-rose-100 border-rose-300 text-rose-950';
                    } else {
                      styleClass = 'bg-slate-50 border-slate-200 text-slate-400 opacity-60';
                    }
                  } else if (isSelected) {
                    styleClass =
                      'bg-purple-100 border-purple-400 text-purple-950 font-bold ring-2 ring-purple-300';
                  }

                  return (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => handleSelectOption(idx)}
                      disabled={Boolean(lastResult)}
                      className={`w-full text-left p-4 rounded-2xl border-2 transition-all flex items-center justify-between cursor-pointer ${styleClass}`}
                    >
                      <div className="flex items-center gap-3">
                        <span className="w-7 h-7 rounded-xl bg-white/90 border border-slate-200 flex items-center justify-center text-xs font-bold text-slate-700">
                          {String.fromCharCode(65 + idx)}
                        </span>
                        <span className="text-sm sm:text-base font-semibold">{option}</span>
                      </div>
                      {lastResult && idx === activeItem.correctOptionIndex && (
                        <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                      )}
                      {lastResult && isSelected && !lastResult.isCorrect && (
                        <XCircle className="w-5 h-5 text-rose-500 shrink-0" />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Action Buttons: Submit / Next */}
              {!lastResult ? (
                <div className="flex items-center justify-between pt-2">
                  <span className="text-xs text-slate-400 font-medium">
                    Select an answer and click Submit
                  </span>
                  <button
                    type="button"
                    onClick={handleSubmitAnswer}
                    disabled={selectedOption === null}
                    className={`px-6 py-3 rounded-2xl font-bold text-sm sm:text-base transition-all ${
                      selectedOption !== null
                        ? 'bg-purple-600 hover:bg-purple-700 text-white shadow-md shadow-purple-200 cursor-pointer'
                        : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                    }`}
                  >
                    Submit Recall Answer
                  </button>
                </div>
              ) : (
                <div
                  className={`p-5 rounded-2xl border-2 space-y-3 ${
                    lastResult.isCorrect
                      ? 'bg-emerald-50 border-emerald-300'
                      : 'bg-rose-50 border-rose-300'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      {lastResult.isCorrect ? (
                        <CheckCircle2 className="w-6 h-6 text-emerald-600" />
                      ) : (
                        <XCircle className="w-6 h-6 text-rose-500" />
                      )}
                      <h4
                        className={`text-lg font-extrabold ${
                          lastResult.isCorrect ? 'text-emerald-950' : 'text-rose-950'
                        }`}
                      >
                        {lastResult.isCorrect
                          ? 'Excellent Recall!'
                          : 'Gentle Learning Moment'}
                      </h4>
                    </div>

                    <div className="text-right">
                      <span className="text-xs font-bold uppercase text-slate-500">
                        New Interval:
                      </span>
                      <span className="ml-1.5 px-2.5 py-0.5 rounded-lg text-sm font-extrabold bg-white border border-slate-300">
                        {lastResult.newInterval} Minutes
                      </span>
                    </div>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                    {lastResult.isCorrect
                      ? `Interval increased from ${lastResult.prevInterval}m to ${lastResult.newInterval}m. Next recall scheduled for ${new Date(
                          activeItem.nextScheduledAt
                        ).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}.`
                      : `Interval reset to 5 minutes to reinforce neural pathways without stress. Next check at ${new Date(
                          activeItem.nextScheduledAt
                        ).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}.`}
                  </p>

                  <div className="pt-2 flex justify-end">
                    <button
                      type="button"
                      onClick={handleNextQuestion}
                      className="px-5 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-sm shadow-xs"
                    >
                      Next Recall Question ➔
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Right 1 Col: List of all 5 Adaptive Items with status badges */}
        <div className="space-y-4">
          <div className="bg-white rounded-3xl p-6 border border-purple-100 shadow-xs space-y-4">
            <h4 className="font-bold text-slate-800 text-base">All Scheduled Items</h4>
            <div className="space-y-2.5">
              {items.map((item) => {
                const isSelected = item.id === activeItem?.id;
                const rem = getTimeRemainingStr(item.nextScheduledAt);
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => {
                      setSelectedItemId(item.id);
                      setSelectedOption(null);
                      setLastResult(null);
                      setShowHint(false);
                    }}
                    className={`w-full text-left p-3.5 rounded-2xl border transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-purple-100/90 border-purple-400 shadow-xs'
                        : 'bg-slate-50/70 hover:bg-purple-50/50 border-slate-200'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[11px] font-bold uppercase text-purple-700">
                        {item.category}
                      </span>
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                          rem.isDue
                            ? 'bg-emerald-100 text-emerald-800'
                            : 'bg-amber-100 text-amber-800'
                        }`}
                      >
                        {rem.isDue ? 'Due Now' : rem.text}
                      </span>
                    </div>
                    <p className="text-xs font-bold text-slate-800 line-clamp-2">
                      {item.prompt}
                    </p>
                    <div className="mt-2 flex items-center justify-between text-[11px] text-slate-500 font-semibold border-t border-slate-200/60 pt-1.5">
                      <span>Interval: {item.currentIntervalMinutes}m</span>
                      <span>Success: {item.successRate}%</span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Recent Adaptive Log History */}
          <div className="bg-white rounded-3xl p-6 border border-purple-100 shadow-xs space-y-3">
            <h4 className="font-bold text-slate-800 text-sm">Recent Adaptive Logs</h4>
            {logs.length === 0 ? (
              <p className="text-xs text-slate-400 italic">No recall tests completed yet.</p>
            ) : (
              <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                {logs.slice(0, 4).map((log) => (
                  <div
                    key={log.id}
                    className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs flex items-center justify-between"
                  >
                    <div>
                      <p className="font-bold text-slate-700 line-clamp-1">{log.prompt}</p>
                      <p className="text-[10px] text-slate-400">
                        {new Date(log.timestamp).toLocaleTimeString([], {
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </p>
                    </div>
                    <span
                      className={`px-2 py-0.5 rounded-lg text-[10px] font-extrabold ${
                        log.isCorrect
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-rose-100 text-rose-800'
                      }`}
                    >
                      {log.previousInterval}m ➔ {log.newInterval}m
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
