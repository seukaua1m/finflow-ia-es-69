
export interface Message {
  id: number;
  text: string;
  sender: 'user' | 'bot';
  time: string;
  isGroupMessage?: boolean;
  chartData?: boolean;
  status?: 'sent' | 'delivered' | 'read';
}
