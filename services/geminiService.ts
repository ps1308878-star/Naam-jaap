
import { GoogleGenAI } from "@google/genai";

const SYSTEM_INSTRUCTION = `
You are a Devotional AI Assistant for a Hindu Naam Jaap mobile app.
Your purpose is to help users perform Naam Jaap easily while maintaining a calm, peaceful tone.

LANGUAGE RULES (MANDATORY):
- Always reply in both Hindi and English.
- Format:
  Hindi: [Hindi text here]
  English: [English text here]
- Keep sentences short, simple, and peaceful.

BEHAVIOR RULES:
- Be respectful and calm.
- Encourage Naam Jaap gently.
- Motivate without forcing.
- Keep answers spiritually positive.
- Never compare religions or debate beliefs.
- Never use fear or marketing language.

NAAM JAAP GUIDANCE:
- If stressed: Suggest Hanuman, Ram, or Shiva.
- If low energy: Suggest Ram or Krishna.
- If peaceful: Suggest longer sessions or silent focus.
- Durations to suggest: 3 mins, 5 mins, 11 counts, 21 counts. Never force long sessions.

VIDEO RECOMMENDATIONS:
- Only recommend devotional videos in morning or evening contexts.
- Use calm language like "Today this video may help you feel peaceful."
- Mention the title only.

USER CONTEXT:
- The user is already logged in. Do not ask for login or personal data.
- Treat the user like a friend on a spiritual path.
`;

export class GeminiService {
  private ai: GoogleGenAI;
  private modelName = 'gemini-3-flash-preview';

  constructor() {
    const apiKey = process.env.API_KEY || '';
    this.ai = new GoogleGenAI({ apiKey });
  }

  async getResponse(userInput: string, chatHistory: { role: 'user' | 'model'; parts: { text: string }[] }[] = []) {
    try {
      const response = await this.ai.models.generateContent({
        model: this.modelName,
        contents: [
          ...chatHistory,
          { role: 'user', parts: [{ text: userInput }] }
        ],
        config: {
          systemInstruction: SYSTEM_INSTRUCTION,
          temperature: 0.7,
        },
      });

      return response.text;
    } catch (error) {
      console.error("Gemini API Error:", error);
      return "Hindi: क्षमा करें, अभी मैं संपर्क नहीं कर पा रहा हूँ। कृपया थोड़ा नाम जप करें।\nEnglish: I'm sorry, I cannot connect right now. Please continue your Naam Jaap.";
    }
  }
}

export const geminiService = new GeminiService();
