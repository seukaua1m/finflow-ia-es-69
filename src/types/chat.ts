
export interface Message {
  id: number;
  text: string;
  sender: 'user' | 'bot';
  time: string;
  isGroupMessage?: boolean;
  isBarChart?: boolean;
  isPieChart?: boolean;
  isAction?: boolean;
  status?: 'sent' | 'delivered' | 'read';
}
