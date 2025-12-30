
export interface ProductionVideo {
  id: string;
  title: string;
  artist: string;
  youtubeId: string;
  thumbnail?: string;
}

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}
