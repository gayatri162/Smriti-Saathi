type SpeechCallback = (speaking: boolean) => void;

class SpeechService {
  private synth: SpeechSynthesis | null = null;
  private currentUtterance: SpeechSynthesisUtterance | null = null;
  private listeners: Set<SpeechCallback> = new Set();
  private isSpeaking = false;

  constructor() {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      this.synth = window.speechSynthesis;
    }
  }

  public subscribe(callback: SpeechCallback): () => void {
    this.listeners.add(callback);
    callback(this.isSpeaking);
    return () => {
      this.listeners.delete(callback);
    };
  }

  private notify(speaking: boolean) {
    this.isSpeaking = speaking;
    this.listeners.forEach((cb) => cb(speaking));
  }

  public speak(text: string, rate: number = 0.88, pitch: number = 1.0): void {
    if (!this.synth) {
      console.warn('Speech synthesis not supported in this browser.');
      return;
    }

    // Stop ongoing speech
    this.stop();

    if (!text || text.trim().length === 0) return;

    try {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = rate; // Gentle, slower tempo for elder comprehension
      utterance.pitch = pitch;
      utterance.lang = 'en-US';

      // Pick a warm voice if available
      const voices = this.synth.getVoices();
      if (voices.length > 0) {
        const preferredVoice =
          voices.find((v) => v.lang.startsWith('en') && (v.name.includes('Natural') || v.name.includes('Google') || v.name.includes('Samantha') || v.name.includes('Serena'))) ||
          voices.find((v) => v.lang.startsWith('en'));
        if (preferredVoice) {
          utterance.voice = preferredVoice;
        }
      }

      utterance.onstart = () => {
        this.notify(true);
      };

      utterance.onend = () => {
        this.notify(false);
        this.currentUtterance = null;
      };

      utterance.onerror = (e) => {
        console.error('Speech synthesis error:', e);
        this.notify(false);
        this.currentUtterance = null;
      };

      this.currentUtterance = utterance;
      this.synth.speak(utterance);
    } catch (err) {
      console.error('Speech failure:', err);
      this.notify(false);
    }
  }

  public stop(): void {
    if (this.synth) {
      this.synth.cancel();
      this.notify(false);
      this.currentUtterance = null;
    }
  }

  public speakReminder(title: string, dosage?: string, notes?: string, time?: string): void {
    let fullText = `Reminder for ${title}. `;
    if (time) fullText += `Scheduled at ${time}. `;
    if (dosage) fullText += `Details: ${dosage}. `;
    if (notes) fullText += `Note: ${notes}. `;
    fullText += `Please take your time.`;
    this.speak(fullText);
  }
}

export const speechService = new SpeechService();
