export type PageId =
  | 'dashboard'
  | 'games'
  | 'adaptive'
  | 'reminders'
  | 'memories'
  | 'progress'
  | 'caregiver';

export type ReminderCategory = 'medicine' | 'meal' | 'sleep' | 'activity';

export interface ReminderItem {
  id: string;
  title: string;
  category: ReminderCategory;
  time: string; // "08:30"
  dosage?: string; // e.g. "1 Tablet with water"
  notes?: string;
  completed: boolean;
  completedAt?: string;
  recurringDays?: string[]; // e.g. ["Mon", "Tue", "Wed"]
  priority?: 'high' | 'medium' | 'normal';
}

export type AdaptiveIntervalMinutes = 5 | 10 | 15 | 20 | 30;

export interface AdaptiveRecallItem {
  id: string;
  prompt: string;
  options: string[];
  correctOptionIndex: number;
  category: 'orientation' | 'personal' | 'routine' | 'recent_event';
  currentIntervalMinutes: AdaptiveIntervalMinutes;
  lastTestedAt: string; // ISO string
  nextScheduledAt: string; // ISO string
  totalAttempts: number;
  consecutiveCorrect: number;
  successRate: number; // percentage 0-100
  hint: string;
}

export interface AdaptiveRecallLog {
  id: string;
  itemId: string;
  prompt: string;
  selectedAnswer: string;
  correctAnswer: string;
  isCorrect: boolean;
  previousInterval: AdaptiveIntervalMinutes;
  newInterval: AdaptiveIntervalMinutes;
  timestamp: string;
}

export interface PersonalMemory {
  id: string;
  title: string;
  relationship: string; // e.g. "Granddaughter", "Spouse", "Son", "Childhood Friend"
  personName: string;
  question: string;
  answer: string;
  hint: string;
  category: 'family' | 'places' | 'milestones' | 'passions';
  imageUrl?: string;
  avatarEmoji?: string;
  yearOrEra?: string;
  lastRecalledAt?: string;
  timesRecalled: number;
  timesForgotten: number;
}

export interface GameScoreRecord {
  id: string;
  gameType: 'memory_matching' | 'sequence_recall';
  score: number;
  moves?: number;
  totalPairs?: number;
  sequenceLength?: number;
  timeTakenSeconds: number;
  difficulty: 'easy' | 'medium' | 'hard';
  timestamp: string;
  accuracyPercentage: number;
}

export interface CaregiverProfile {
  seniorName: string;
  seniorAge: number;
  caregiverName: string;
  relationship: string;
  emergencyPhone: string;
  doctorName?: string;
  doctorPhone?: string;
  notes: string;
  fontSizePreference: 'normal' | 'large' | 'xlarge';
  soundEnabled: boolean;
  speechRate: number; // 0.8 to 1.1
  dailyGoalGames: number;
}

export interface ActivitySummary {
  id: string;
  type: 'game' | 'reminder' | 'adaptive_recall' | 'memory_quiz';
  title: string;
  detail: string;
  timestamp: string;
  status: 'completed' | 'success' | 'missed' | 'reviewed';
  score?: number;
}
