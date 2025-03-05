
import { Message } from '@/types/chat';
import { getCurrentTime } from '@/utils/messageUtils';

// Chart data for the last 7 days
export const getExpenseChartData = () => [
  { name: 'qui', value: 155 },
  { name: 'sex', value: 105 },
  { name: 'sáb', value: 53 },
  { name: 'dom', value: 64 },
  { name: 'seg', value: 131 },
  { name: 'ter', value: 52 },
  { name: 'qua', value: 72 }
];

export const createUserMessage = (text: string): Message => ({
  id: Date.now(),
  text,
  sender: 'user',
  time: getCurrentTime()
});

export const createChartMessage = (): Message => {
  const chartData = getExpenseChartData();
  
  return {
    id: Date.now() + 1,
    text: `<chart>
      <title>Últimos 7 dias</title>
      <subtitle>R$ 632,00 - 27/02 à 05/03</subtitle>
      <data>${JSON.stringify(chartData)}</data>
      <footer>↗ Seus gastos aumentaram em 20% essa semana</footer>
    </chart>`,
    sender: 'bot',
    time: getCurrentTime(),
    isChartMessage: true
  };
};

export const createFollowUpMessage = (): Message => ({
  id: Date.now() + 2,
  text: 'Segue gráfico dos seus gastos dos últimos 7 dias 👆',
  sender: 'bot',
  time: getCurrentTime()
});
