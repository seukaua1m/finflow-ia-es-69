
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

// Pie chart data for expense categories
export const getExpenseCategoryData = () => [
  { name: 'Contas Fixas', value: 229, percentage: '36%', color: '#FFA959' },
  { name: 'Jantar fora', value: 146, percentage: '23%', color: '#FFD059' },
  { name: 'Transporte', value: 103, percentage: '16%', color: '#5B8DEF' },
  { name: 'Alimentação', value: 87, percentage: '14%', color: '#2FA179' },
  { name: 'Lazer', value: 67, percentage: '11%', color: '#7E69AB' }
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

export const createPieChartMessage = (): Message => {
  const pieChartData = getExpenseCategoryData();
  
  return {
    id: Date.now() + 1,
    text: `<chart>
      <title>Divisão de gastos</title>
      <subtitle>27/02 à 05/03</subtitle>
      <data>${JSON.stringify(pieChartData)}</data>
      <footer>Contas Fixas é sua maior categoria de gastos</footer>
    </chart>`,
    sender: 'bot',
    time: getCurrentTime(),
    isChartMessage: true,
    isPieChart: true
  };
};

export const createFollowUpMessage = (): Message => ({
  id: Date.now() + 2,
  text: 'Segue gráfico dos seus gastos dos últimos 7 dias 👆',
  sender: 'bot',
  time: getCurrentTime()
});

export const createPieChartFollowUpMessage = (): Message => ({
  id: Date.now() + 2,
  text: 'Segue o gráfico da divisão dos seus gastos por categoria 👆',
  sender: 'bot',
  time: getCurrentTime()
});
