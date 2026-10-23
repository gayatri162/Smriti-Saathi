import {
  ReminderItem,
  PersonalMemory,
  AdaptiveRecallItem,
  AdaptiveRecallLog,
  GameScoreRecord,
  CaregiverProfile,
  ActivitySummary,
  AdaptiveIntervalMinutes,
} from '../types';

const STORAGE_KEYS = {
  REMINDERS: 'smriti_reminders_v1',
  MEMORIES: 'smriti_personal_memories_v1',
  ADAPTIVE_ITEMS: 'smriti_adaptive_items_v1',
  ADAPTIVE_LOGS: 'smriti_adaptive_logs_v1',
  GAME_SCORES: 'smriti_game_scores_v1',
  CAREGIVER_PROFILE: 'smriti_caregiver_profile_v1',
  ACTIVITY_LOGS: 'smriti_activity_logs_v1',
  CUSTOM_SETTINGS: 'smriti_settings_v1',
};

// Initial default seed data tailored for an elderly individual (e.g., Rameshwar Sharma / "Dadaji")
const DEFAULT_CAREGIVER_PROFILE: CaregiverProfile = {
  seniorName: 'Rameshwar Sharma',
  seniorAge: 76,
  caregiverName: 'Priya Sharma (Daughter)',
  relationship: 'Daughter & Primary Caregiver',
  emergencyPhone: '+91 98765 43210',
  doctorName: 'Dr. Arvind Sen (Neurologist)',
  doctorPhone: '+91 98111 22334',
  notes: 'Mild cognitive slowing noted. Prefers spoken reminders and cheerful family photo prompts. Enjoys mornings with tea and old songs.',
  fontSizePreference: 'large',
  soundEnabled: true,
  speechRate: 0.88,
  dailyGoalGames: 3,
};

const DEFAULT_REMINDERS: ReminderItem[] = [
  {
    id: 'rem-1',
    title: 'Morning Blood Pressure Medication',
    category: 'medicine',
    time: '08:30',
    dosage: '1 Tablet Amlodipine 5mg with warm water',
    notes: 'Take strictly after light breakfast',
    completed: true,
    completedAt: new Date(Date.now() - 3 * 3600 * 1000).toISOString(),
    priority: 'high',
    recurringDays: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
  },
  {
    id: 'rem-2',
    title: 'Nutritious Breakfast & Green Tea',
    category: 'meal',
    time: '09:00',
    dosage: 'Oatmeal porridge with almonds and soaked raisins',
    notes: 'Priya prepared fresh fruits on the dining table',
    completed: true,
    completedAt: new Date(Date.now() - 2 * 3600 * 1000).toISOString(),
    priority: 'normal',
    recurringDays: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
  },
  {
    id: 'rem-3',
    title: 'Gentle Balcony Walk & Sunlight',
    category: 'activity',
    time: '11:00',
    dosage: '15 minutes strolling with walking stick',
    notes: 'Water the basil (Tulsi) plants and breathe fresh air',
    completed: false,
    priority: 'medium',
    recurringDays: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
  },
  {
    id: 'rem-4',
    title: 'Lunch & Multivitamin',
    category: 'meal',
    time: '13:30',
    dosage: 'Lentil soup (Dal), steamed rice, spinach subzi + 1 Vitamin B12 tablet',
    notes: 'Keep water jug nearby',
    completed: false,
    priority: 'high',
    recurringDays: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
  },
  {
    id: 'rem-5',
    title: 'Afternoon Rest & Power Nap',
    category: 'sleep',
    time: '15:00',
    dosage: 'Rest comfortably for 40 minutes in quiet room',
    notes: 'Turn off loud TV sounds',
    completed: false,
    priority: 'normal',
    recurringDays: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
  },
  {
    id: 'rem-6',
    title: 'Evening Memory Practice & Brain Games',
    category: 'activity',
    time: '17:30',
    dosage: 'Play Smriti-Saathi Memory Matching for 10 mins',
    notes: 'Granddaughter Ananya will join on video call',
    completed: false,
    priority: 'medium',
    recurringDays: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
  },
  {
    id: 'rem-7',
    title: 'Night Thyroid & Cholesterol Capsule',
    category: 'medicine',
    time: '21:00',
    dosage: '1 Atorvastatin tablet with half cup warm milk',
    notes: 'Before going to bed',
    completed: false,
    priority: 'high',
    recurringDays: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
  },
];

const DEFAULT_MEMORIES: PersonalMemory[] = [
  {
    id: 'mem-1',
    title: "Granddaughter Ananya's College Graduation",
    relationship: 'Granddaughter',
    personName: 'Ananya',
    question: 'What special event did we celebrate for Ananya last summer in Delhi?',
    answer: 'Her graduation ceremony with a Gold Medal in Computer Science.',
    hint: 'She wore a dark blue gown and you bought her a sweet box of Kaju Katli.',
    category: 'milestones',
    avatarEmoji: '🎓',
    yearOrEra: '2024',
    lastRecalledAt: new Date(Date.now() - 24 * 3600 * 1000).toISOString(),
    timesRecalled: 6,
    timesForgotten: 1,
  },
  {
    id: 'mem-2',
    title: 'Our Family Golden Retriever Dog',
    relationship: 'Family Pet',
    personName: 'Bruno',
    question: 'What is the name of our loyal golden dog who loves to fetch the morning paper?',
    answer: 'Bruno, who has been with us for 8 years.',
    hint: 'His name begins with B and he always wags his tail when you say hello.',
    category: 'family',
    avatarEmoji: '🐕',
    yearOrEra: 'Since 2018',
    lastRecalledAt: new Date(Date.now() - 48 * 3600 * 1000).toISOString(),
    timesRecalled: 10,
    timesForgotten: 0,
  },
  {
    id: 'mem-3',
    title: 'Favorite Holiday in Shimla Hills',
    relationship: 'Family Vacation',
    personName: 'Shimla Trip',
    question: 'Where did our whole family travel by toy train in the pine mountains?',
    answer: 'Shimla, staying near Mall Road and watching the snow peaks.',
    hint: 'A cool hill station in Himachal Pradesh known for its heritage toy train.',
    category: 'places',
    avatarEmoji: '🏔️',
    yearOrEra: 'October 2019',
    lastRecalledAt: new Date(Date.now() - 72 * 3600 * 1000).toISOString(),
    timesRecalled: 4,
    timesForgotten: 2,
  },
  {
    id: 'mem-4',
    title: 'Beloved Career as Senior Railway Engineer',
    relationship: 'Life Work',
    personName: 'Northern Railways',
    question: 'Which esteemed organization did you dedicate 35 years to as Chief Engineer?',
    answer: 'Indian Railways (Northern Railway division).',
    hint: 'You designed bridge crossings and received a golden medal of honor upon retirement.',
    category: 'milestones',
    avatarEmoji: '🚂',
    yearOrEra: '1974 - 2009',
    lastRecalledAt: new Date(Date.now() - 12 * 3600 * 1000).toISOString(),
    timesRecalled: 12,
    timesForgotten: 0,
  },
  {
    id: 'mem-5',
    title: 'Priya’s Favorite Homemade Dish',
    relationship: 'Daughter Priya',
    personName: 'Priya',
    question: 'What special vegetable dish do you love preparing together with Priya on Sundays?',
    answer: 'Paneer Butter Masala with homemade garlic rotis.',
    hint: 'A rich North Indian cottage cheese curry in smooth tomato gravy.',
    category: 'passions',
    avatarEmoji: '🥘',
    yearOrEra: 'Family Tradition',
    lastRecalledAt: new Date(Date.now() - 36 * 3600 * 1000).toISOString(),
    timesRecalled: 5,
    timesForgotten: 1,
  },
];

const DEFAULT_ADAPTIVE_ITEMS: AdaptiveRecallItem[] = [
  {
    id: 'adapt-1',
    prompt: 'What time is your scheduled morning Blood Pressure medicine?',
    options: ['8:30 AM with water', '1:00 PM after lunch', '10:00 PM before sleep', 'No medicine today'],
    correctOptionIndex: 0,
    category: 'routine',
    currentIntervalMinutes: 10,
    lastTestedAt: new Date(Date.now() - 4 * 60 * 1000).toISOString(),
    nextScheduledAt: new Date(Date.now() + 6 * 60 * 1000).toISOString(),
    totalAttempts: 5,
    consecutiveCorrect: 2,
    successRate: 80,
    hint: 'It is taken right after your 8:00 AM light morning breakfast.',
  },
  {
    id: 'adapt-2',
    prompt: 'What is the current season of the year right now?',
    options: ['Autumn / Fall', 'Peak Monsoons', 'Heavy Winter Snow', 'Dry Desert Heat'],
    correctOptionIndex: 0,
    category: 'orientation',
    currentIntervalMinutes: 15,
    lastTestedAt: new Date(Date.now() - 12 * 60 * 1000).toISOString(),
    nextScheduledAt: new Date(Date.now() + 3 * 60 * 1000).toISOString(),
    totalAttempts: 6,
    consecutiveCorrect: 3,
    successRate: 85,
    hint: 'Golden leaves are fluttering and the evenings are pleasantly breezy.',
  },
  {
    id: 'adapt-3',
    prompt: 'What is the name of your caring daughter who helps coordinate your appointments?',
    options: ['Priya Sharma', 'Sunita Rao', 'Kavita Verma', 'Rekha Gupta'],
    correctOptionIndex: 0,
    category: 'personal',
    currentIntervalMinutes: 20,
    lastTestedAt: new Date(Date.now() - 8 * 60 * 1000).toISOString(),
    nextScheduledAt: new Date(Date.now() + 12 * 60 * 1000).toISOString(),
    totalAttempts: 7,
    consecutiveCorrect: 4,
    successRate: 100,
    hint: 'Her name means "beloved" and starts with the letter P.',
  },
  {
    id: 'adapt-4',
    prompt: 'Where did you put your walking reading glasses this morning?',
    options: ['On the bedside wooden tray', 'In the refrigerator', 'Outside in the garden', 'Under the sofa cushion'],
    correctOptionIndex: 0,
    category: 'routine',
    currentIntervalMinutes: 5,
    lastTestedAt: new Date(Date.now() - 6 * 60 * 1000).toISOString(),
    nextScheduledAt: new Date(Date.now() - 1 * 60 * 1000).toISOString(), // Ready now!
    totalAttempts: 3,
    consecutiveCorrect: 0,
    successRate: 66,
    hint: 'Priya placed them in the soft cloth case next to your bedside lamp.',
  },
  {
    id: 'adapt-5',
    prompt: 'What was your beloved pet dog’s name who greets you every morning?',
    options: ['Bruno', 'Rocky', 'Sheru', 'Tiger'],
    correctOptionIndex: 0,
    category: 'personal',
    currentIntervalMinutes: 20,
    lastTestedAt: new Date(Date.now() - 15 * 60 * 1000).toISOString(),
    nextScheduledAt: new Date(Date.now() + 5 * 60 * 1000).toISOString(),
    totalAttempts: 9,
    consecutiveCorrect: 4,
    successRate: 100,
    hint: 'He is a golden retriever with a fluffy tail.',
  },
];

const DEFAULT_GAME_SCORES: GameScoreRecord[] = [
  {
    id: 'gs-1',
    gameType: 'memory_matching',
    score: 850,
    moves: 14,
    totalPairs: 6,
    timeTakenSeconds: 52,
    difficulty: 'easy',
    timestamp: new Date(Date.now() - 2 * 3600 * 1000).toISOString(),
    accuracyPercentage: 86,
  },
  {
    id: 'gs-2',
    gameType: 'sequence_recall',
    score: 920,
    sequenceLength: 4,
    timeTakenSeconds: 38,
    difficulty: 'easy',
    timestamp: new Date(Date.now() - 5 * 3600 * 1000).toISOString(),
    accuracyPercentage: 92,
  },
  {
    id: 'gs-3',
    gameType: 'memory_matching',
    score: 780,
    moves: 18,
    totalPairs: 8,
    timeTakenSeconds: 74,
    difficulty: 'medium',
    timestamp: new Date(Date.now() - 26 * 3600 * 1000).toISOString(),
    accuracyPercentage: 80,
  },
  {
    id: 'gs-4',
    gameType: 'sequence_recall',
    score: 840,
    sequenceLength: 5,
    timeTakenSeconds: 46,
    difficulty: 'medium',
    timestamp: new Date(Date.now() - 28 * 3600 * 1000).toISOString(),
    accuracyPercentage: 84,
  },
  {
    id: 'gs-5',
    gameType: 'memory_matching',
    score: 910,
    moves: 12,
    totalPairs: 6,
    timeTakenSeconds: 45,
    difficulty: 'easy',
    timestamp: new Date(Date.now() - 50 * 3600 * 1000).toISOString(),
    accuracyPercentage: 94,
  },
];

const DEFAULT_ACTIVITY_LOGS: ActivitySummary[] = [
  {
    id: 'act-1',
    type: 'reminder',
    title: 'Morning Blood Pressure Medication',
    detail: 'Marked completed on time at 08:32 AM',
    timestamp: new Date(Date.now() - 3 * 3600 * 1000).toISOString(),
    status: 'completed',
  },
  {
    id: 'act-2',
    type: 'game',
    title: 'Memory Matching (Nature Theme)',
    detail: 'Completed 6 pairs in 14 moves (Score: 850)',
    timestamp: new Date(Date.now() - 2 * 3600 * 1000).toISOString(),
    status: 'success',
    score: 850,
  },
  {
    id: 'act-3',
    type: 'adaptive_recall',
    title: 'Adaptive Spaced Recall: Daughter Priya',
    detail: 'Correct recall! Next interval expanded to 20 minutes.',
    timestamp: new Date(Date.now() - 8 * 60 * 1000).toISOString(),
    status: 'success',
  },
  {
    id: 'act-4',
    type: 'memory_quiz',
    title: 'Personal Memory: Bruno the Retriever',
    detail: 'Successfully recalled family pet name with no hints needed.',
    timestamp: new Date(Date.now() - 24 * 3600 * 1000).toISOString(),
    status: 'reviewed',
  },
];

export const storageService = {
  // Reminders
  getReminders(): ReminderItem[] {
    const raw = localStorage.getItem(STORAGE_KEYS.REMINDERS);
    if (!raw) {
      this.saveReminders(DEFAULT_REMINDERS);
      return DEFAULT_REMINDERS;
    }
    try {
      return JSON.parse(raw);
    } catch {
      return DEFAULT_REMINDERS;
    }
  },

  saveReminders(reminders: ReminderItem[]): void {
    localStorage.setItem(STORAGE_KEYS.REMINDERS, JSON.stringify(reminders));
  },

  addReminder(reminder: Omit<ReminderItem, 'id' | 'completed' | 'completedAt'>): ReminderItem {
    const list = this.getReminders();
    const newItem: ReminderItem = {
      ...reminder,
      completed: false,
      id: `rem-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
    };
    list.unshift(newItem);
    this.saveReminders(list);
    this.addActivityLog({
      type: 'reminder',
      title: `Added reminder: ${newItem.title}`,
      detail: `Scheduled for ${newItem.time} (${newItem.category})`,
      status: 'completed',
    });
    return newItem;
  },

  updateReminder(updated: ReminderItem): void {
    const list = this.getReminders().map((item) => (item.id === updated.id ? updated : item));
    this.saveReminders(list);
  },

  deleteReminder(id: string): void {
    const list = this.getReminders().filter((item) => item.id !== id);
    this.saveReminders(list);
  },

  toggleReminder(id: string): ReminderItem | undefined {
    const list = this.getReminders();
    let toggled: ReminderItem | undefined;
    const updated = list.map((item) => {
      if (item.id === id) {
        const nextState = !item.completed;
        toggled = {
          ...item,
          completed: nextState,
          completedAt: nextState ? new Date().toISOString() : undefined,
        };
        return toggled;
      }
      return item;
    });
    this.saveReminders(updated);
    if (toggled && toggled.completed) {
      this.addActivityLog({
        type: 'reminder',
        title: `Completed: ${toggled.title}`,
        detail: `Checked off at ${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`,
        status: 'completed',
      });
    }
    return toggled;
  },

  // Personal Memories
  getPersonalMemories(): PersonalMemory[] {
    const raw = localStorage.getItem(STORAGE_KEYS.MEMORIES);
    if (!raw) {
      this.savePersonalMemories(DEFAULT_MEMORIES);
      return DEFAULT_MEMORIES;
    }
    try {
      return JSON.parse(raw);
    } catch {
      return DEFAULT_MEMORIES;
    }
  },

  savePersonalMemories(memories: PersonalMemory[]): void {
    localStorage.setItem(STORAGE_KEYS.MEMORIES, JSON.stringify(memories));
  },

  addPersonalMemory(memory: Omit<PersonalMemory, 'id' | 'timesRecalled' | 'timesForgotten'>): PersonalMemory {
    const list = this.getPersonalMemories();
    const newItem: PersonalMemory = {
      ...memory,
      id: `mem-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
      timesRecalled: 0,
      timesForgotten: 0,
    };
    list.unshift(newItem);
    this.savePersonalMemories(list);
    this.addActivityLog({
      type: 'memory_quiz',
      title: `Created family memory: ${newItem.title}`,
      detail: `Relation: ${newItem.relationship} (${newItem.personName})`,
      status: 'reviewed',
    });
    return newItem;
  },

  updatePersonalMemory(updated: PersonalMemory): void {
    const list = this.getPersonalMemories().map((item) => (item.id === updated.id ? updated : item));
    this.savePersonalMemories(list);
  },

  deletePersonalMemory(id: string): void {
    const list = this.getPersonalMemories().filter((item) => item.id !== id);
    this.savePersonalMemories(list);
  },

  recordMemoryRecallResult(id: string, remembered: boolean): void {
    const list = this.getPersonalMemories().map((item) => {
      if (item.id === id) {
        return {
          ...item,
          timesRecalled: remembered ? item.timesRecalled + 1 : item.timesRecalled,
          timesForgotten: !remembered ? item.timesForgotten + 1 : item.timesForgotten,
          lastRecalledAt: new Date().toISOString(),
        };
      }
      return item;
    });
    this.savePersonalMemories(list);
  },

  // Adaptive Spaced Recall
  getAdaptiveItems(): AdaptiveRecallItem[] {
    const raw = localStorage.getItem(STORAGE_KEYS.ADAPTIVE_ITEMS);
    if (!raw) {
      this.saveAdaptiveItems(DEFAULT_ADAPTIVE_ITEMS);
      return DEFAULT_ADAPTIVE_ITEMS;
    }
    try {
      return JSON.parse(raw);
    } catch {
      return DEFAULT_ADAPTIVE_ITEMS;
    }
  },

  saveAdaptiveItems(items: AdaptiveRecallItem[]): void {
    localStorage.setItem(STORAGE_KEYS.ADAPTIVE_ITEMS, JSON.stringify(items));
  },

  getAdaptiveLogs(): AdaptiveRecallLog[] {
    const raw = localStorage.getItem(STORAGE_KEYS.ADAPTIVE_LOGS);
    if (!raw) return [];
    try {
      return JSON.parse(raw);
    } catch {
      return [];
    }
  },

  processAdaptiveAttempt(
    itemId: string,
    selectedOptionIndex: number
  ): { isCorrect: boolean; nextInterval: AdaptiveIntervalMinutes; updatedItem: AdaptiveRecallItem } {
    const items = this.getAdaptiveItems();
    const itemIndex = items.findIndex((i) => i.id === itemId);
    if (itemIndex === -1) {
      throw new Error(`Adaptive item not found: ${itemId}`);
    }

    const item = items[itemIndex];
    const isCorrect = selectedOptionIndex === item.correctOptionIndex;
    const intervalSequence: AdaptiveIntervalMinutes[] = [5, 10, 15, 20, 30];
    const currentIdx = intervalSequence.indexOf(item.currentIntervalMinutes);

    let nextInterval: AdaptiveIntervalMinutes;
    let nextConsecutive: number;

    if (isCorrect) {
      // Step up interval: 5 -> 10 -> 15 -> 20 -> 30 (cap at 30)
      const nextIdx = Math.min(intervalSequence.length - 1, currentIdx + 1);
      nextInterval = intervalSequence[nextIdx];
      nextConsecutive = item.consecutiveCorrect + 1;
    } else {
      // Per hackathon prompt specification: "Increase the interval after correct answers and reset to 5 minutes after incorrect answers."
      nextInterval = 5;
      nextConsecutive = 0;
    }

    const totalAttempts = item.totalAttempts + 1;
    const correctCount = Math.round((item.successRate / 100) * item.totalAttempts) + (isCorrect ? 1 : 0);
    const newSuccessRate = Math.round((correctCount / totalAttempts) * 100);

    const now = new Date();
    const nextScheduled = new Date(now.getTime() + nextInterval * 60 * 1000);

    const updatedItem: AdaptiveRecallItem = {
      ...item,
      currentIntervalMinutes: nextInterval,
      consecutiveCorrect: nextConsecutive,
      totalAttempts,
      successRate: newSuccessRate,
      lastTestedAt: now.toISOString(),
      nextScheduledAt: nextScheduled.toISOString(),
    };

    items[itemIndex] = updatedItem;
    this.saveAdaptiveItems(items);

    // Save recall log
    const logs = this.getAdaptiveLogs();
    const logEntry: AdaptiveRecallLog = {
      id: `alog-${Date.now()}`,
      itemId: item.id,
      prompt: item.prompt,
      selectedAnswer: item.options[selectedOptionIndex] || 'None',
      correctAnswer: item.options[item.correctOptionIndex],
      isCorrect,
      previousInterval: item.currentIntervalMinutes,
      newInterval: nextInterval,
      timestamp: now.toISOString(),
    };
    logs.unshift(logEntry);
    localStorage.setItem(STORAGE_KEYS.ADAPTIVE_LOGS, JSON.stringify(logs.slice(0, 100)));

    this.addActivityLog({
      type: 'adaptive_recall',
      title: `Recall Test: ${isCorrect ? 'Correct! (+Interval)' : 'Incorrect (Reset to 5m)'}`,
      detail: `Prompt: "${item.prompt.substring(0, 35)}..." | Interval now: ${nextInterval} min`,
      status: isCorrect ? 'success' : 'missed',
    });

    return { isCorrect, nextInterval, updatedItem };
  },

  // Quick testing helper for hackathon judges: Fast-forward all adaptive timers so they can test immediately
  fastForwardAdaptiveTimers(): void {
    const items = this.getAdaptiveItems().map((item) => ({
      ...item,
      nextScheduledAt: new Date(Date.now() - 1000).toISOString(),
    }));
    this.saveAdaptiveItems(items);
  },

  // Game Scores & History
  getGameScores(): GameScoreRecord[] {
    const raw = localStorage.getItem(STORAGE_KEYS.GAME_SCORES);
    if (!raw) {
      this.saveGameScores(DEFAULT_GAME_SCORES);
      return DEFAULT_GAME_SCORES;
    }
    try {
      return JSON.parse(raw);
    } catch {
      return DEFAULT_GAME_SCORES;
    }
  },

  saveGameScores(scores: GameScoreRecord[]): void {
    localStorage.setItem(STORAGE_KEYS.GAME_SCORES, JSON.stringify(scores));
  },

  recordGameScore(scoreData: Omit<GameScoreRecord, 'id' | 'timestamp'>): GameScoreRecord {
    const scores = this.getGameScores();
    const record: GameScoreRecord = {
      ...scoreData,
      id: `score-${Date.now()}`,
      timestamp: new Date().toISOString(),
    };
    scores.unshift(record);
    this.saveGameScores(scores);

    const gameName = scoreData.gameType === 'memory_matching' ? 'Memory Matching Cards' : 'Sequence Recall';
    this.addActivityLog({
      type: 'game',
      title: `${gameName} Completed`,
      detail: `Score: ${scoreData.score} | Accuracy: ${scoreData.accuracyPercentage}% | Time: ${scoreData.timeTakenSeconds}s`,
      status: 'success',
      score: scoreData.score,
    });

    return record;
  },

  // Caregiver Profile
  getCaregiverProfile(): CaregiverProfile {
    const raw = localStorage.getItem(STORAGE_KEYS.CAREGIVER_PROFILE);
    if (!raw) {
      this.saveCaregiverProfile(DEFAULT_CAREGIVER_PROFILE);
      return DEFAULT_CAREGIVER_PROFILE;
    }
    try {
      return JSON.parse(raw);
    } catch {
      return DEFAULT_CAREGIVER_PROFILE;
    }
  },

  saveCaregiverProfile(profile: CaregiverProfile): void {
    localStorage.setItem(STORAGE_KEYS.CAREGIVER_PROFILE, JSON.stringify(profile));
  },

  // Activity Summaries
  getActivityLogs(): ActivitySummary[] {
    const raw = localStorage.getItem(STORAGE_KEYS.ACTIVITY_LOGS);
    if (!raw) {
      this.saveActivityLogs(DEFAULT_ACTIVITY_LOGS);
      return DEFAULT_ACTIVITY_LOGS;
    }
    try {
      return JSON.parse(raw);
    } catch {
      return DEFAULT_ACTIVITY_LOGS;
    }
  },

  saveActivityLogs(logs: ActivitySummary[]): void {
    localStorage.setItem(STORAGE_KEYS.ACTIVITY_LOGS, JSON.stringify(logs));
  },

  addActivityLog(log: Omit<ActivitySummary, 'id' | 'timestamp'>): void {
    const logs = this.getActivityLogs();
    const newLog: ActivitySummary = {
      ...log,
      id: `act-${Date.now()}`,
      timestamp: new Date().toISOString(),
    };
    logs.unshift(newLog);
    this.saveActivityLogs(logs.slice(0, 50));
  },

  // Reset demo data to default realistic presentation state
  resetToDemoDefaults(): void {
    localStorage.setItem(STORAGE_KEYS.REMINDERS, JSON.stringify(DEFAULT_REMINDERS));
    localStorage.setItem(STORAGE_KEYS.MEMORIES, JSON.stringify(DEFAULT_MEMORIES));
    localStorage.setItem(STORAGE_KEYS.ADAPTIVE_ITEMS, JSON.stringify(DEFAULT_ADAPTIVE_ITEMS));
    localStorage.setItem(STORAGE_KEYS.ADAPTIVE_LOGS, JSON.stringify([]));
    localStorage.setItem(STORAGE_KEYS.GAME_SCORES, JSON.stringify(DEFAULT_GAME_SCORES));
    localStorage.setItem(STORAGE_KEYS.CAREGIVER_PROFILE, JSON.stringify(DEFAULT_CAREGIVER_PROFILE));
    localStorage.setItem(STORAGE_KEYS.ACTIVITY_LOGS, JSON.stringify(DEFAULT_ACTIVITY_LOGS));
  },

  clearAllData(): void {
    localStorage.removeItem(STORAGE_KEYS.REMINDERS);
    localStorage.removeItem(STORAGE_KEYS.MEMORIES);
    localStorage.removeItem(STORAGE_KEYS.ADAPTIVE_ITEMS);
    localStorage.removeItem(STORAGE_KEYS.ADAPTIVE_LOGS);
    localStorage.removeItem(STORAGE_KEYS.GAME_SCORES);
    localStorage.removeItem(STORAGE_KEYS.CAREGIVER_PROFILE);
    localStorage.removeItem(STORAGE_KEYS.ACTIVITY_LOGS);
  },

  // Export & Import helpers for hackathon demos & future database sync
  exportAllDataAsJSON(): string {
    const backup = {
      version: '1.0.0',
      exportedAt: new Date().toISOString(),
      caregiverProfile: this.getCaregiverProfile(),
      reminders: this.getReminders(),
      memories: this.getPersonalMemories(),
      adaptiveItems: this.getAdaptiveItems(),
      adaptiveLogs: this.getAdaptiveLogs(),
      gameScores: this.getGameScores(),
      activityLogs: this.getActivityLogs(),
    };
    return JSON.stringify(backup, null, 2);
  },

  importDataFromJSON(jsonString: string): boolean {
    try {
      const data = JSON.parse(jsonString);
      if (data.reminders) this.saveReminders(data.reminders);
      if (data.memories) this.savePersonalMemories(data.memories);
      if (data.adaptiveItems) this.saveAdaptiveItems(data.adaptiveItems);
      if (data.gameScores) this.saveGameScores(data.gameScores);
      if (data.caregiverProfile) this.saveCaregiverProfile(data.caregiverProfile);
      if (data.activityLogs) this.saveActivityLogs(data.activityLogs);
      return true;
    } catch {
      return false;
    }
  },
};
