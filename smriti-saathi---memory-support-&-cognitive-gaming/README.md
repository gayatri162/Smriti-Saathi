# SMRITI-SAATHI (स्मृति साथी)
### AI-Assisted Cognitive Support & Memory Companion for Seniors & Caregivers

Built for College Hackathon 2026.

---

## 🌟 Overview & Purpose
**SMRITI-SAATHI** is a responsive healthcare and wellness web application engineered for elderly individuals experiencing mild memory difficulties, age-associated cognitive decline, or early forgetfulness, as well as their dedicated family caregivers.

The platform bridges cognitive stimulation with compassionate daily routine assistance through:
1. **Interactive Cognitive Games**: Playable Memory Matching Cards & Sequence Pattern Recall with positive reinforcement and celebratory feedback.
2. **Adaptive Spaced Recall System**: Spaced-retrieval therapy across 5, 10, 15, 20, and 30-minute intervals that dynamically scale with correct recall and reset to 5 minutes upon errors to reinforce neural pathways without cognitive stress.
3. **Daily Routine & Medication Reminders**: Spoken voice synthesis (Web Speech API) with gentle pacing (0.88x speed) that reads medication dosages, meal times, and rest routines aloud.
4. **Caregiver Personal Memory Vault**: Custom reminiscence flashcards crafted with loved ones' photos, relations, questions, and hints.
5. **Cognitive Progress Analytics**: Visualized trends using **Recharts** for cognitive score progression, adherence rates, and spaced retention distribution.
6. **Caregiver Command Hub & Doctor Visit Summary**: Real-time audit logs of elder activities and a 1-click printable clinical summary for neurologists or geriatrician visits.

*Note: Smriti-Saathi is an assistive wellness companion and non-clinical aid; it does not claim to diagnose, treat, or cure dementia or Alzheimer's disease.*

---

## 🛠️ Technology Stack
- **Framework**: React 19, TypeScript
- **Styling**: Tailwind CSS v4, custom elder-friendly soft lavender & pastel rose wellness palette
- **Charts & Data Visualization**: Recharts
- **Icons**: Lucide React
- **Sound Effects**: Synthesized Web Audio API (zero external audio asset latency)
- **Voice Synthesis**: Web Speech API (`SpeechSynthesis`)
- **Celebratory Effects**: Canvas Confetti
- **Storage Layer**: Modular TypeScript interface with persistent LocalStorage, with architectural schema designed for immediate migration to **Supabase & PostgreSQL**.

---

## 🚀 Quick Start / Local Setup

### Prerequisites
- Node.js (version 18 or 20+)
- npm or yarn

### Installation
```bash
# 1. Clone or extract the project repository
cd smriti-saathi

# 2. Install all dependencies
npm install

# 3. Start local development server
npm run dev
```

The application will be live at:
`http://localhost:3000`

---

## 🧭 Page Architecture & Flow
1. **1. Dashboard**: Warm personalized morning/evening greeting, daily cognitive thought/tip with voice audio, 4 quick stat cards (Streak, Reminders taken, Brain games played, Adaptive recall status), today's priority schedule with 1-click completion and voice buttons, and quick game launch shortcuts.
2. **2. Memory Games**:
   - **Memory Matching**: 3D flip card match with Nature & Everyday Comfort themes, selectable difficulty (Gentle 6 pairs vs Standard 8 pairs), live move counter, timer, score calculation, sound effects, and confetti celebration.
   - **Sequence Recall**: Step-by-step glowing symbol sequence playback with audio cues, memory retention phase, touch input keypad, undo capability, scoring, and level advancement.
3. **3. Adaptive Recall**:
   - Scientific spaced repetition engine with intervals of **5, 10, 15, 20, and 30 minutes**.
   - Correct recall advances the interval ladder; incorrect recall resets back to 5 minutes.
   - Live remaining time countdowns for every item.
   - **Fast-Forward Timers (Demo Mode)** button for instant judging and testing without waiting 30 minutes.
4. **4. Daily Reminders**:
   - Category filtering (Medicine, Meals, Sleep, Activity) and completion filtering (All, Pending, Completed).
   - "Read Aloud" voice button for every reminder.
   - "Read Whole Schedule Aloud" master voice summary.
   - Add, Edit, Delete, and Toggle completion states.
5. **5. Personal Memories**:
   - Elder **Recall Flashcard** mode with 3D flip, caregiver hints, "I Remembered!" celebration, and "Remind Me Gently".
   - **Caregiver Vault** management table with AI Story-to-Flashcard assistant to convert family stories into recall questions.
6. **6. Progress**:
   - Visualized using Recharts:
     - AreaChart of Cognitive Score Progression over time.
     - BarChart of Routine Adherence by category.
     - BarChart of Adaptive Spaced Interval Retention distribution.
   - Clean empty states when data is cleared.
7. **7. Caregiver Dashboard**:
   - Patient overview for Rameshwar Sharma (Dadaji, 76) & Priya Sharma (Daughter).
   - Real-time timestamped event stream (medication taken, game scores, recall attempts).
   - Printable Physician & Neurologist Clinical Summary report.
   - Patient profile editor & demo data restore button.

---

## 🗄️ Database Architecture: Ready for Supabase & PostgreSQL
The storage layer in `src/services/storage.ts` is intentionally decoupled from React components. To connect a cloud database like Supabase/PostgreSQL:

```sql
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
);
```

---

## ♿ Accessibility & Senior-Friendly Design
- **Text Resizer**: Instant header toggle for `A` (standard), `A+` (large), and `A++` (extra-large) high-contrast readability.
- **Sound Toggle**: Instant game sound mute / unmute button in header.
- **Emergency Helpline**: Red shortcut button with instant telephone link and speech synthesis call guidance.
- **High Contrast & Soft Colors**: White and lavender backgrounds, pastel purple and pink accents, rounded cards (`rounded-3xl`), and soft drop shadows avoiding visual clutter.
