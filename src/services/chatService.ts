
import { Message } from '@/types/chat';
import { getCurrentTime, formatDate } from '@/utils/messageUtils';

// Function to get the last 7 days as array of weekday abbreviations
const getLast7DaysLabels = () => {
  const days = ['dom', 'lun', 'mar', 'mié', 'jue', 'vie', 'sáb'];
  const result = [];
  
  for (let i = 6; i >= 0; i--) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    result.push(days[date.getDay()]);
  }
  
  return result;
};

// Function to generate date range text for the last 7 days
const getLast7DaysDateRange = () => {
  const endDate = new Date();
  const startDate = new Date();
  startDate.setDate(endDate.getDate() - 6);
  
  const formatDay = (date: Date) => {
    return `${date.getDate().toString().padStart(2, '0')}/${(date.getMonth() + 1).toString().padStart(2, '0')}`;
  };
  
  return `${formatDay(startDate)} a ${formatDay(endDate)}`;
};

// Chart data for the last 7 days
export const getExpenseChartData = () => {
  const dayLabels = getLast7DaysLabels();
  
  // Random values for demonstration
  return [
    { name: dayLabels[0], value: 155 },
    { name: dayLabels[1], value: 105 },
    { name: dayLabels[2], value: 53 },
    { name: dayLabels[3], value: 64 },
    { name: dayLabels[4], value: 131 },
    { name: dayLabels[5], value: 52 },
    { name: dayLabels[6], value: 72 }
  ];
};

// Pie chart data for expense categories
export const getExpenseCategoryData = () => [
  { name: 'Gastos Fijos', value: 229, percentage: '36%', color: '#FFA959' },
  { name: 'Cenas Fuera', value: 146, percentage: '23%', color: '#FFD059' },
  { name: 'Transporte', value: 103, percentage: '16%', color: '#5B8DEF' },
  { name: 'Alimentación', value: 87, percentage: '14%', color: '#2FA179' },
  { name: 'Ocio', value: 67, percentage: '11%', color: '#7E69AB' }
];

export const createUserMessage = (text: string): Message => ({
  id: Date.now(),
  text,
  sender: 'user',
  time: getCurrentTime()
});

export const createChartMessage = (): Message => {
  const chartData = getExpenseChartData();
  const dateRange = getLast7DaysDateRange();
  
  return {
    id: Date.now() + 1,
    text: `<chart>
      <title>Últimos 7 días</title>
      <subtitle>$ 632,00 - ${dateRange}</subtitle>
      <data>${JSON.stringify(chartData)}</data>
      <footer>↗ Tus gastos aumentaron en 20% esta semana</footer>
    </chart>`,
    sender: 'bot',
    time: getCurrentTime(),
    isChartMessage: true
  };
};

export const createPieChartMessage = (): Message => {
  const pieChartData = getExpenseCategoryData();
  const dateRange = getLast7DaysDateRange();
  
  return {
    id: Date.now() + 1,
    text: `<chart>
      <title>División de gastos</title>
      <subtitle>${dateRange}</subtitle>
      <data>${JSON.stringify(pieChartData)}</data>
      <footer>Gastos Fijos es tu mayor categoría de gastos</footer>
    </chart>`,
    sender: 'bot',
    time: getCurrentTime(),
    isChartMessage: true,
    isPieChart: true
  };
};

export const createFollowUpMessage = (): Message => ({
  id: Date.now() + 2,
  text: 'Aquí tienes el gráfico de tus gastos de los últimos 7 días 👆',
  sender: 'bot',
  time: getCurrentTime()
});

export const createPieChartFollowUpMessage = (): Message => ({
  id: Date.now() + 2,
  text: 'Aquí tienes el gráfico de la división de tus gastos por categoría 👆',
  sender: 'bot',
  time: getCurrentTime()
});
