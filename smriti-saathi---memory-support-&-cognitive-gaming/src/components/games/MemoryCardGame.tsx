import React, { useState, useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';
import {
  RotateCcw,
  Trophy,
  Timer,
  Footprints,
  Sparkles,
  Volume2,
  Award,
  CheckCircle,
} from 'lucide-react';
import { soundEffects } from '../../services/sound';
import { speechService } from '../../services/speech';
import { GameScoreRecord } from '../../types';

interface CardItem {
  id: number;
  symbol: string;
  name: string;
  matched: boolean;
}

interface MemoryCardGameProps {
  onSaveScore: (scoreData: Omit<GameScoreRecord, 'id' | 'timestamp'>) => void;
  seniorName: string;
}

const THEMES = {
  nature: {
    label: 'Nature & Garden',
    icon: '🌸',
    items: [
      { symbol: '🌸', name: 'Lotus Flower' },
      { symbol: '🌻', name: 'Sunflower' },
      { symbol: '🌿', name: 'Holy Basil' },
      { symbol: '🐦', name: 'Sparrow' },
      { symbol: '🦋', name: 'Butterfly' },
      { symbol: '🥭', name: 'Sweet Mango' },
      { symbol: '🍎', name: 'Red Apple' },
      { symbol: '🦚', name: 'Peacock' },
    ],
  },
  comforts: {
    label: 'Daily Comforts',
    icon: '☕',
    items: [
      { symbol: '☕', name: 'Hot Chai Tea' },
      { symbol: '📻', name: 'Vintage Radio' },
      { symbol: '👓', name: 'Reading Glasses' },
      { symbol: '🧶', name: 'Knitting Yarn' },
      { symbol: '🕰️', name: 'Classic Clock' },
      { symbol: '🪴', name: 'House Plant' },
      { symbol: '📚', name: 'Favorite Book' },
      { symbol: '🪔', name: 'Diya Lamp' },
    ],
  },
};

export const MemoryCardGame: React.FC<MemoryCardGameProps> = ({
  onSaveScore,
  seniorName,
}) => {
  const [selectedTheme, setSelectedTheme] = useState<'nature' | 'comforts'>('nature');
  const [difficulty, setDifficulty] = useState<'easy' | 'medium'>('easy'); // easy = 6 pairs, medium = 8 pairs
  const [cards, setCards] = useState<CardItem[]>([]);
  const [flippedIndices, setFlippedIndices] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);
  const [matches, setMatches] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);
  const [gameCompleted, setGameCompleted] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const [finalScore, setFinalScore] = useState<number | null>(null);

  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const numPairs = difficulty === 'easy' ? 6 : 8;

  const initGame = () => {
    if (timerRef.current) clearInterval(timerRef.current);

    const themePool = THEMES[selectedTheme].items.slice(0, numPairs);
    const deck: CardItem[] = [];

    themePool.forEach((item, index) => {
      deck.push({ id: index * 2, symbol: item.symbol, name: item.name, matched: false });
      deck.push({ id: index * 2 + 1, symbol: item.symbol, name: item.name, matched: false });
    });

    // Shuffle deck thoroughly
    for (let i = deck.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [deck[i], deck[j]] = [deck[j], deck[i]];
    }

    setCards(deck);
    setFlippedIndices([]);
    setMoves(0);
    setMatches(0);
    setSeconds(0);
    setGameStarted(false);
    setGameCompleted(false);
    setFinalScore(null);
  };

  useEffect(() => {
    initGame();
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [selectedTheme, difficulty]);

  useEffect(() => {
    if (gameStarted && !gameCompleted) {
      timerRef.current = setInterval(() => {
        setSeconds((prev) => prev + 1);
      }, 1000);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [gameStarted, gameCompleted]);

  const handleCardClick = (index: number) => {
    if (gameCompleted) return;
    if (flippedIndices.includes(index)) return;
    if (cards[index].matched) return;
    if (flippedIndices.length === 2) return;

    if (!gameStarted) {
      setGameStarted(true);
    }

    soundEffects.playCardFlip();

    const newFlipped = [...flippedIndices, index];
    setFlippedIndices(newFlipped);

    if (newFlipped.length === 2) {
      setMoves((prev) => prev + 1);
      const [firstIdx, secondIdx] = newFlipped;
      const firstCard = cards[firstIdx];
      const secondCard = cards[secondIdx];

      if (firstCard.symbol === secondCard.symbol) {
        // Matched!
        setTimeout(() => {
          soundEffects.playMatchSuccess();
          setCards((prevCards) =>
            prevCards.map((c, i) =>
              i === firstIdx || i === secondIdx ? { ...c, matched: true } : c
            )
          );
          setMatches((prev) => {
            const nextMatches = prev + 1;
            if (nextMatches === numPairs) {
              handleGameWin();
            }
            return nextMatches;
          });
          setFlippedIndices([]);
        }, 500);
      } else {
        // Mismatch - flip back gently
        setTimeout(() => {
          soundEffects.playSoftTryAgain();
          setFlippedIndices([]);
        }, 1100);
      }
    }
  };

  const handleGameWin = () => {
    setGameCompleted(true);
    soundEffects.playCelebration();

    // Trigger celebratory confetti
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#A855F7', '#EC4899', '#3B82F6', '#F59E0B'],
      });
    } catch {
      // Confetti fallback
    }

    // Calculate score
    const totalPossibleMoves = numPairs;
    const extraMoves = Math.max(0, moves + 1 - totalPossibleMoves);
    const scoreVal = Math.max(250, 1000 - extraMoves * 30 - seconds * 4);
    const accuracy = Math.min(100, Math.round((numPairs / (moves + 1)) * 100));

    setFinalScore(scoreVal);

    onSaveScore({
      gameType: 'memory_matching',
      score: scoreVal,
      moves: moves + 1,
      totalPairs: numPairs,
      timeTakenSeconds: seconds,
      difficulty,
      accuracyPercentage: accuracy,
    });

    speechService.speak(
      `Wonderful job, ${seniorName}! You matched all ${numPairs} pairs in ${moves + 1} moves. Your memory is active and sharp!`
    );
  };

  const handleReadRules = () => {
    speechService.speak(
      'Welcome to Memory Matching. Tap any card to flip it over. Find and match two identical cards. Take as much time as you like.'
    );
  };

  return (
    <div className="space-y-6">
      {/* Game controls header */}
      <div className="p-5 rounded-3xl bg-white border border-purple-100 shadow-xs flex flex-wrap items-center justify-between gap-4">
        {/* Left: Theme & Level */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center bg-slate-100 p-1 rounded-2xl">
            <button
              type="button"
              onClick={() => setSelectedTheme('nature')}
              className={`px-3 py-1.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                selectedTheme === 'nature'
                  ? 'bg-white text-purple-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              🌸 Nature & Garden
            </button>
            <button
              type="button"
              onClick={() => setSelectedTheme('comforts')}
              className={`px-3 py-1.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                selectedTheme === 'comforts'
                  ? 'bg-white text-purple-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              ☕ Daily Comforts
            </button>
          </div>

          <div className="flex items-center bg-slate-100 p-1 rounded-2xl">
            <button
              type="button"
              onClick={() => setDifficulty('easy')}
              className={`px-3 py-1.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                difficulty === 'easy'
                  ? 'bg-purple-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Gentle (6 Pairs)
            </button>
            <button
              type="button"
              onClick={() => setDifficulty('medium')}
              className={`px-3 py-1.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                difficulty === 'medium'
                  ? 'bg-purple-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Standard (8 Pairs)
            </button>
          </div>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleReadRules}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-purple-50 hover:bg-purple-100 text-purple-800 text-xs sm:text-sm font-bold border border-purple-200"
            title="Listen to instructions"
          >
            <Volume2 className="w-4 h-4 text-purple-600" />
            <span className="hidden sm:inline">Voice Instructions</span>
          </button>

          <button
            type="button"
            onClick={initGame}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs sm:text-sm font-bold transition-colors cursor-pointer"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Restart</span>
          </button>
        </div>
      </div>

      {/* Live In-Game Metrics Bar */}
      <div className="grid grid-cols-3 gap-4">
        <div className="p-3.5 rounded-2xl bg-purple-50/70 border border-purple-200/80 flex items-center gap-3">
          <Footprints className="w-5 h-5 text-purple-600 shrink-0" />
          <div>
            <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Moves</p>
            <p className="text-xl font-extrabold text-purple-950">{moves}</p>
          </div>
        </div>

        <div className="p-3.5 rounded-2xl bg-pink-50/70 border border-pink-200/80 flex items-center gap-3">
          <Trophy className="w-5 h-5 text-pink-600 shrink-0" />
          <div>
            <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
              Matches
            </p>
            <p className="text-xl font-extrabold text-pink-950">
              {matches} / {numPairs}
            </p>
          </div>
        </div>

        <div className="p-3.5 rounded-2xl bg-indigo-50/70 border border-indigo-200/80 flex items-center gap-3">
          <Timer className="w-5 h-5 text-indigo-600 shrink-0" />
          <div>
            <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Timer</p>
            <p className="text-xl font-extrabold text-indigo-950">{seconds}s</p>
          </div>
        </div>
      </div>

      {/* Playable Card Grid */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-purple-100 shadow-xs">
        <div
          className={`grid gap-3 sm:gap-4 justify-center mx-auto max-w-2xl ${
            difficulty === 'easy'
              ? 'grid-cols-3 sm:grid-cols-4'
              : 'grid-cols-4'
          }`}
        >
          {cards.map((card, index) => {
            const isFlipped = flippedIndices.includes(index) || card.matched;
            const isMatched = card.matched;

            return (
              <button
                key={card.id}
                type="button"
                onClick={() => handleCardClick(index)}
                disabled={isMatched || flippedIndices.length === 2}
                className={`w-full aspect-square min-h-[85px] sm:min-h-[110px] rounded-2xl transition-all duration-300 transform perspective-1000 relative cursor-pointer select-none ${
                  isMatched
                    ? 'ring-4 ring-emerald-300 ring-offset-2 opacity-95 scale-[0.98]'
                    : isFlipped
                    ? 'ring-2 ring-purple-300 shadow-md'
                    : 'hover:scale-102 hover:shadow-md'
                }`}
                aria-label={isFlipped ? `${card.name}` : `Card ${index + 1}`}
              >
                <div
                  className={`w-full h-full rounded-2xl flex flex-col items-center justify-center transition-all duration-300 border ${
                    isFlipped
                      ? isMatched
                        ? 'bg-gradient-to-br from-emerald-50 to-teal-100 border-emerald-300 text-emerald-950'
                        : 'bg-gradient-to-br from-purple-100 to-pink-50 border-purple-300 text-purple-950'
                      : 'bg-gradient-to-br from-purple-600 via-indigo-600 to-purple-800 border-purple-400 text-white shadow-xs'
                  }`}
                >
                  {isFlipped ? (
                    <div className="flex flex-col items-center justify-center text-center p-2 animate-in fade-in zoom-in-75 duration-200">
                      <span className="text-3xl sm:text-5xl leading-none">{card.symbol}</span>
                      <span className="text-[10px] sm:text-xs font-extrabold mt-1.5 line-clamp-1">
                        {card.name}
                      </span>
                      {isMatched && (
                        <CheckCircle className="w-3.5 h-3.5 text-emerald-600 mt-0.5" />
                      )}
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center text-purple-200/80">
                      <Sparkles className="w-6 h-6 sm:w-8 sm:h-8" />
                      <span className="text-[10px] sm:text-xs font-bold mt-1 text-purple-200 uppercase tracking-widest">
                        Smriti
                      </span>
                    </div>
                  )}
                </div>
              </button>
            );
          })}
        </div>

        {/* Victory Celebration Modal / Overlay */}
        {gameCompleted && (
          <div className="mt-8 p-6 rounded-3xl bg-gradient-to-r from-purple-50 via-pink-50 to-amber-50 border-2 border-purple-300 text-center space-y-4 animate-in fade-in zoom-in-95 duration-300">
            <div className="w-16 h-16 rounded-3xl bg-amber-400 text-white flex items-center justify-center mx-auto shadow-md">
              <Award className="w-9 h-9" />
            </div>

            <div>
              <h3 className="text-2xl font-extrabold text-purple-950">
                Splendid Job, {seniorName}!
              </h3>
              <p className="text-sm text-slate-600 max-w-md mx-auto mt-1">
                You matched all {numPairs} pairs in <strong>{moves} moves</strong> and{' '}
                <strong>{seconds} seconds</strong>.
              </p>
            </div>

            <div className="inline-flex items-center gap-3 px-6 py-2.5 rounded-2xl bg-white border border-purple-200 shadow-xs">
              <span className="text-xs font-bold text-slate-500 uppercase">Cognitive Score:</span>
              <span className="text-2xl font-extrabold text-purple-700">{finalScore} Pts</span>
            </div>

            <div className="flex justify-center gap-3 pt-2">
              <button
                type="button"
                onClick={initGame}
                className="px-6 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-sm shadow-sm transition-all"
              >
                Play Another Round
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
