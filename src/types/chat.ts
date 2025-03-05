
export interface Message {
  id: number;
  text: string;
  sender: 'user' | 'bot';
  time: string;
  isGroupMessage?: boolean;
  isChartMessage?: boolean;
  isPieChart?: boolean;
  status?: 'sent' | 'delivered' | 'read';
}
