import { GoogleGenAI } from '@google/genai';

// Safe retrieval of API key if provided
const apiKey =
  (typeof process !== 'undefined' && process.env?.GEMINI_API_KEY) ||
  (typeof import.meta !== 'undefined' && (import.meta as unknown as { env?: Record<string, string> }).env?.VITE_GEMINI_API_KEY) ||
  '';

let aiClient: GoogleGenAI | null = null;
if (apiKey && apiKey !== 'MY_GEMINI_API_KEY') {
  try {
    aiClient = new GoogleGenAI({ apiKey });
  } catch (e) {
    console.warn('AI Client initialization skipped:', e);
  }
}

export const aiService = {
  isAvailable(): boolean {
    return Boolean(aiClient);
  },

  // Generate a gentle recall hint for a personal memory
  async generateMemoryHint(question: string, answer: string): Promise<string> {
    if (aiClient) {
      try {
        const response = await aiClient.models.generateContent({
          model: 'gemini-2.5-flash',
          contents: `You are an empathetic, geriatric memory-care assistant for an elderly Indian/global senior with mild cognitive impairment.
Generate ONE warm, gentle 1-sentence hint for the following question without giving away the answer completely:
Question: "${question}"
Answer: "${answer}"
Guidelines:
- Warm, loving, respectful tone.
- Under 25 words.
- Give a sensory, temporal, or emotional clue.`,
        });
        const text = response.text?.trim();
        if (text) return text;
      } catch (err) {
        console.warn('AI memory hint generation fallback:', err);
      }
    }

    // High quality deterministic fallback hints
    const fallbacks = [
      'Think about a warm family gathering with smiles, celebrations, and sweets.',
      'Remember the joyful morning light and the familiar voice that greeted you.',
      'It brings back peaceful memories from a cherished sunny day with family.',
      'Picture the smiling faces of your loved ones standing proudly by your side.',
    ];
    return fallbacks[Math.floor(Math.random() * fallbacks.length)];
  },

  // Generate personalized caregiver memory flashcards from a quick story
  async generateMemoryFromStory(
    storySnippet: string,
    relation: string
  ): Promise<{ title: string; question: string; answer: string; hint: string }> {
    if (aiClient) {
      try {
        const response = await aiClient.models.generateContent({
          model: 'gemini-2.5-flash',
          contents: `Convert this short caregiver memory into a simple cognitive recall flashcard for an elderly senior.
Story / Note: "${storySnippet}"
Relation: "${relation}"
Respond ONLY in valid JSON matching this schema:
{
  "title": "Short title (under 5 words)",
  "question": "Gentle, clear question for the senior",
  "answer": "Simple, clear expected answer",
  "hint": "Gentle 1-sentence supportive clue"
}`,
        });
        const clean = response.text?.replace(/```json/g, '').replace(/```/g, '').trim();
        if (clean) {
          const parsed = JSON.parse(clean);
          return {
            title: parsed.title || 'Cherished Memory',
            question: parsed.question || `Do you remember what we did together with ${relation}?`,
            answer: parsed.answer || storySnippet,
            hint: parsed.hint || 'It was a very special and happy day for all of us.',
          };
        }
      } catch (err) {
        console.warn('AI story converter fallback:', err);
      }
    }

    // Deterministic fallback
    return {
      title: `${relation}'s Special Memory`,
      question: `Do you remember the cherished moments we spent with ${relation}?`,
      answer: storySnippet.slice(0, 100),
      hint: `Think back to the time spent together with ${relation}.`,
    };
  },

  // Daily cognitive encouragement affirmation
  getDailyAffirmation(name: string): { title: string; quote: string; tip: string } {
    const affirmations = [
      {
        title: 'Morning Clarity & Peace',
        quote: `Namaste ${name}! Every day is a fresh blessing filled with love, laughter, and familiar smiles.`,
        tip: 'Taking deep, gentle breaths with your morning tea strengthens focus and calms your mind.',
      },
      {
        title: 'Joy in Small Steps',
        quote: `${name}, your lifelong wisdom and warm heart brighten everyone around you.`,
        tip: 'Listening to classical music or old nostalgic songs sparks active neural pathways and positive memories.',
      },
      {
        title: 'Strength & Serenity',
        quote: `Take each moment at your own gentle pace. You are surrounded by care and gratitude.`,
        tip: 'Flipping through cherished family photos activates visual memory recall.',
      },
      {
        title: 'Loving Connections',
        quote: `Your loved ones celebrate every smile and step you take today, ${name}.`,
        tip: 'Sipping water throughout the day keeps memory neurons sharp and energized.',
      },
    ];

    const dayIndex = new Date().getDate() % affirmations.length;
    return affirmations[dayIndex];
  },
};
