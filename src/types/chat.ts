
export interface Message {
  id: number;
  text: string;
  sender: 'user' | 'bot';
  time: string;
  isGroupMessage?: boolean;
}
