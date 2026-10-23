import React, { useState, useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';
import {
  Play,
  RotateCcw,
  Sparkles,
  Trophy,
  Volume2,
  CheckCircle2,
  XCircle,
  HelpCircle,
  ArrowRight,
  Eye,
} from 'lucide-react';
import { soundEffects } from '../../services/sound';
import { speechService } from '../../services/speech';
import { GameScoreRecord } from '../../types';

interface SymbolDef {
  id: string;
  name: string;
  emoji: string;
  bgColor: string;
  borderColor: string;
  textColor: string;
}

const SYMBOLS: SymbolDef[] = [
  { id: 'lotus', name: 'Lotus', emoji: '🌸', bgColor: 'bg-pink-100 hover:bg-pink-200', borderColor: 'border-pink-300', textColor: 'text-pink-800' },
  { id: 'sun', name: 'Golden Sun', emoji: '☀️', bgColor: 'bg-amber-100 hover:bg-amber-200', borderColor: 'border-amber-300', textColor: 'text-amber-800' },
  { id: 'leaf', name: 'Fresh Leaf', emoji: '🌿', bgColor: 'bg-emerald-100 hover:bg-emerald-200', borderColor: 'border-emerald-300', textColor: 'text-emerald-800' },
  { id: 'dove', name: 'White Dove', emoji: '🕊️', bgColor: 'bg-sky-100 hover:bg-sky-200', borderColor: 'border-sky-300', textColor: 'text-sky-800' },
  { id: 'star', name: 'Shiny Star', emoji: '⭐', bgColor: 'bg-purple-100 hover:bg-purple-200', borderColor: 'border-purple-300', textColor: 'text-purple-800' },
  { id: 'bell', name: 'Temple Bell', emoji: '🔔', bgColor: 'bg-rose-100 hover:bg-rose-200', borderColor: 'border-rose-300', textColor: 'text-rose-800' },
];

interface SequenceRecallGameProps {
  onSaveScore: (scoreData: Omit<GameScoreRecord, 'id' | 'timestamp'>) => void;
  seniorName: string;
}

type GameState = 'idle' | 'showing' | 'recalling' | 'success' | 'incorrect';

export const SequenceRecallGame: React.FC<SequenceRecallGameProps> = ({
  onSaveScore,
  seniorName,
}) => {
  const [levelLength, setLevelLength] = useState<number>(3); // 3, 4, 5, 6
  const [gameState, setGameState] = useState<GameState>('idle');
  const [targetSequence, setTargetSequence] = useState<SymbolDef[]>([]);
  const [userSequence, setUserSequence] = useState<SymbolDef[]>([]);
  const [activeHighlightIndex, setActiveHighlightIndex] = useState<number | null>(null);
  const [countdown, setCountdown] = useState<number>(3);
  const [startTime, setStartTime] = useState<number>(0);
  const [scoreAchieved, setScoreAchieved] = useState<number>(0);

  const displayTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const startNewRound = (lengthToUse = levelLength) => {
    if (displayTimeoutRef.current) clearTimeout(displayTimeoutRef.current);

    // Generate random sequence
    const generated: SymbolDef[] = [];
    for (let i = 0; i < lengthToUse; i++) {
      const randomSymbol = SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)];
      generated.push(randomSymbol);
    }

    setTargetSequence(generated);
    setUserSequence([]);
    setActiveHighlightIndex(null);
    setGameState('showing');
    setStartTime(Date.now());

    // Step-by-step playback to help elderly player absorb pattern
    let step = 0;
    const interval = setInterval(() => {
      if (step < generated.length) {
        setActiveHighlightIndex(step);
        soundEffects.playSequenceTone(step);
        step++;
      } else {
        clearInterval(interval);
        setActiveHighlightIndex(null);
        // Give 2 seconds for visual memory consolidation, then switch to recall
        setTimeout(() => {
          setGameState('recalling');
          soundEffects.playCardFlip();
        }, 1200);
      }
    }, 900);
  };

  const handleSymbolInput = (sym: SymbolDef) => {
    if (gameState !== 'recalling') return;

    soundEffects.playSequenceTone(userSequence.length);
    const updated = [...userSequence, sym];
    setUserSequence(updated);

    // Check if player has inputted enough symbols
    if (updated.length === targetSequence.length) {
      validateAttempt(updated);
    }
  };

  const validateAttempt = (attempt: SymbolDef[]) => {
    const isCorrect = attempt.every(
      (sym, idx) => sym.id === targetSequence[idx].id
    );

    const timeSpent = Math.max(2, Math.round((Date.now() - startTime) / 1000));

    if (isCorrect) {
      setGameState('success');
      soundEffects.playMatchSuccess();
      try {
        confetti({
          particleCount: 60,
          spread: 60,
          origin: { y: 0.65 },
        });
      } catch {
        // Confetti fallback
      }

      const scoreVal = Math.max(300, 500 + levelLength * 150 - timeSpent * 5);
      setScoreAchieved(scoreVal);

      onSaveScore({
        gameType: 'sequence_recall',
        score: scoreVal,
        sequenceLength: levelLength,
        timeTakenSeconds: timeSpent,
        difficulty: levelLength <= 3 ? 'easy' : levelLength === 4 ? 'medium' : 'hard',
        accuracyPercentage: 100,
      });

      speechService.speak(
        `Splendid, ${seniorName}! You reproduced the entire sequence correctly. You remembered all ${levelLength} symbols!`
      );
    } else {
      setGameState('incorrect');
      soundEffects.playSoftTryAgain();

      const correctCount = attempt.filter(
        (sym, idx) => sym.id === targetSequence[idx].id
      ).length;
      const accuracy = Math.round((correctCount / targetSequence.length) * 100);

      onSaveScore({
        gameType: 'sequence_recall',
        score: 150,
        sequenceLength: levelLength,
        timeTakenSeconds: timeSpent,
        difficulty: levelLength <= 3 ? 'easy' : levelLength === 4 ? 'medium' : 'hard',
        accuracyPercentage: accuracy,
      });

      speechService.speak(
        `That was a great effort, ${seniorName}! Memory takes practice. Let's try again together.`
      );
    }
  };

  const handleUndo = () => {
    if (userSequence.length > 0 && gameState === 'recalling') {
      setUserSequence((prev) => prev.slice(0, -1));
      soundEffects.playCardFlip();
    }
  };

  const handleReadGuide = () => {
    speechService.speak(
      'Sequence Recall Instructions: Watch the symbols appear in order. Once they disappear, tap the symbols below to recreate the exact same sequence. You can undo if needed.'
    );
  };

  return (
    <div className="space-y-6">
      {/* Sequence Controls */}
      <div className="p-5 rounded-3xl bg-white border border-purple-100 shadow-xs flex flex-wrap items-center justify-between gap-4">
        {/* Sequence Length Selection */}
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-slate-500 uppercase">Sequence Length:</span>
          <div className="flex items-center bg-slate-100 p-1 rounded-2xl">
            {[3, 4, 5, 6].map((len) => (
              <button
                key={len}
                type="button"
                onClick={() => {
                  setLevelLength(len);
                  setGameState('idle');
                }}
                className={`px-3 py-1.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                  levelLength === len
                    ? 'bg-purple-600 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {len} Symbols
              </button>
            ))}
          </div>
        </div>

        {/* Audio guide & restart */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleReadGuide}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-purple-50 hover:bg-purple-100 text-purple-800 text-xs sm:text-sm font-bold border border-purple-200"
          >
            <Volume2 className="w-4 h-4 text-purple-600" />
            <span className="hidden sm:inline">Voice Guide</span>
          </button>

          <button
            type="button"
            onClick={() => startNewRound()}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-xs sm:text-sm font-bold shadow-xs cursor-pointer"
          >
            <Play className="w-4 h-4 fill-current" />
            <span>{gameState === 'idle' ? 'Start Round' : 'New Sequence'}</span>
          </button>
        </div>
      </div>

      {/* Main Play Area */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-purple-100 shadow-xs space-y-8 max-w-3xl mx-auto">
        {/* Phase Indicator */}
        <div className="text-center space-y-1">
          {gameState === 'idle' && (
            <div className="space-y-2">
              <span className="px-3.5 py-1 rounded-full text-xs font-extrabold bg-purple-100 text-purple-800">
                Ready to play
              </span>
              <h3 className="text-xl sm:text-2xl font-extrabold text-slate-800">
                Press "Start Round" to watch the pattern
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 max-w-md mx-auto">
                Smriti-Saathi will display {levelLength} symbols one after another. Pay close attention to their order!
              </p>
            </div>
          )}

          {gameState === 'showing' && (
            <div className="space-y-1">
              <span className="px-3.5 py-1 rounded-full text-xs font-extrabold bg-amber-100 text-amber-800 flex items-center justify-center gap-1.5 w-fit mx-auto animate-pulse">
                <Eye className="w-4 h-4" /> Watch & Memorize
              </span>
              <h3 className="text-xl font-extrabold text-slate-800">
                Watch the sequence carefully...
              </h3>
            </div>
          )}

          {gameState === 'recalling' && (
            <div className="space-y-1">
              <span className="px-3.5 py-1 rounded-full text-xs font-extrabold bg-emerald-100 text-emerald-800 flex items-center justify-center gap-1.5 w-fit mx-auto">
                <Sparkles className="w-4 h-4 text-emerald-600" /> Your Turn!
              </span>
              <h3 className="text-xl font-extrabold text-slate-800">
                Tap the symbols in the order you saw them ({userSequence.length}/{targetSequence.length})
              </h3>
            </div>
          )}
        </div>

        {/* Display / Input Slots Row */}
        <div className="flex items-center justify-center gap-3 sm:gap-4 flex-wrap min-h-[100px] p-4 rounded-3xl bg-slate-50 border border-slate-200/80">
          {gameState === 'showing' ? (
            targetSequence.map((sym, index) => {
              const isHighlighted = activeHighlightIndex === index;
              return (
                <div
                  key={index}
                  className={`w-16 h-16 sm:w-20 sm:h-20 rounded-2xl flex flex-col items-center justify-center border-2 transition-all transform ${
                    isHighlighted
                      ? 'scale-110 bg-white shadow-lg ring-4 ring-purple-400 border-purple-500'
                      : 'bg-white/60 border-slate-200 opacity-60'
                  }`}
                >
                  <span className="text-3xl sm:text-4xl">{sym.emoji}</span>
                  <span className="text-[10px] font-bold text-slate-500 mt-0.5">{sym.name}</span>
                </div>
              );
            })
          ) : gameState === 'recalling' ? (
            targetSequence.map((_, index) => {
              const userSym = userSequence[index];
              return (
                <div
                  key={index}
                  className={`w-16 h-16 sm:w-20 sm:h-20 rounded-2xl flex flex-col items-center justify-center border-2 transition-all ${
                    userSym
                      ? 'bg-purple-50 border-purple-300 shadow-xs animate-in zoom-in-75'
                      : 'border-dashed border-slate-300 bg-white'
                  }`}
                >
                  {userSym ? (
                    <>
                      <span className="text-3xl sm:text-4xl">{userSym.emoji}</span>
                      <span className="text-[10px] font-bold text-purple-900 mt-0.5">
                        {userSym.name}
                      </span>
                    </>
                  ) : (
                    <span className="text-xs font-bold text-slate-300">Slot {index + 1}</span>
                  )}
                </div>
              );
            })
          ) : gameState === 'success' ? (
            <div className="flex items-center gap-3">
              {targetSequence.map((sym, index) => (
                <div
                  key={index}
                  className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-emerald-50 border-2 border-emerald-300 flex flex-col items-center justify-center shadow-xs"
                >
                  <span className="text-3xl sm:text-4xl">{sym.emoji}</span>
                  <span className="text-[10px] font-bold text-emerald-800">{sym.name}</span>
                </div>
              ))}
            </div>
          ) : gameState === 'incorrect' ? (
            <div className="space-y-3 text-center">
              <p className="text-xs font-bold text-slate-500 uppercase">Correct Sequence Was:</p>
              <div className="flex items-center justify-center gap-2 flex-wrap">
                {targetSequence.map((sym, index) => (
                  <div
                    key={index}
                    className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl bg-slate-100 border border-slate-300 flex flex-col items-center justify-center"
                  >
                    <span className="text-2xl">{sym.emoji}</span>
                    <span className="text-[9px] font-semibold text-slate-600">{sym.name}</span>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="text-center py-4 text-slate-400 font-medium text-sm">
              Press "Start Round" to generate a memory sequence
            </div>
          )}
        </div>

        {/* Undo button during recall */}
        {gameState === 'recalling' && userSequence.length > 0 && (
          <div className="flex justify-center">
            <button
              type="button"
              onClick={handleUndo}
              className="px-4 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 text-xs font-bold transition-colors cursor-pointer"
            >
              Undo Last Symbol ⌫
            </button>
          </div>
        )}

        {/* Symbol Selection Keypad (elderly accessible touch buttons) */}
        <div className="space-y-2">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-wider text-center">
            Available Symbols
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
            {SYMBOLS.map((sym) => (
              <button
                key={sym.id}
                type="button"
                onClick={() => handleSymbolInput(sym)}
                disabled={gameState !== 'recalling'}
                className={`p-3.5 rounded-2xl border flex flex-col items-center justify-center gap-1 transition-all cursor-pointer ${
                  sym.bgColor
                } ${sym.borderColor} ${
                  gameState === 'recalling'
                    ? 'hover:scale-105 active:scale-95 shadow-xs'
                    : 'opacity-50 cursor-not-allowed'
                }`}
              >
                <span className="text-3xl sm:text-4xl">{sym.emoji}</span>
                <span className={`text-xs font-extrabold ${sym.textColor}`}>{sym.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Result Feedback Banner */}
        {gameState === 'success' && (
          <div className="p-6 rounded-3xl bg-emerald-50 border-2 border-emerald-300 text-center space-y-3 animate-in fade-in zoom-in-95">
            <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
            <h4 className="text-2xl font-extrabold text-emerald-950">
              Outstanding Recall, {seniorName}!
            </h4>
            <p className="text-sm text-emerald-800">
              Score: <strong>+{scoreAchieved} Pts</strong>. Your visual sequence memory is sharp and healthy!
            </p>
            <div className="flex justify-center gap-3 pt-2">
              <button
                type="button"
                onClick={() => {
                  if (levelLength < 6) setLevelLength(levelLength + 1);
                  startNewRound(Math.min(6, levelLength + 1));
                }}
                className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-xs flex items-center gap-1.5"
              >
                <span>Next Level ({Math.min(6, levelLength + 1)} Symbols)</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {gameState === 'incorrect' && (
          <div className="p-6 rounded-3xl bg-rose-50 border-2 border-rose-200 text-center space-y-3 animate-in fade-in zoom-in-95">
            <XCircle className="w-12 h-12 text-rose-500 mx-auto" />
            <h4 className="text-xl font-extrabold text-rose-950">
              Good Try, {seniorName}!
            </h4>
            <p className="text-xs sm:text-sm text-rose-800">
              Memory exercise is all about gentle repetition. Let's try again together!
            </p>
            <div className="flex justify-center gap-3 pt-2">
              <button
                type="button"
                onClick={() => startNewRound()}
                className="px-5 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-sm shadow-xs flex items-center gap-1.5"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Try Again</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
