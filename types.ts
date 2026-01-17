
export type Mood = 'stressed' | 'low-energy' | 'peaceful' | 'devotional';

export interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export interface JaapSession {
  deity: string;
  count: number;
  timestamp: Date;
}

export interface VideoRecommendation {
  title: string;
  url: string;
  context: 'morning' | 'evening';
}
