
import { Message } from '@/types/chat';
import { getCurrentTime } from '@/utils/messageUtils';

export const createUserMessage = (text: string): Message => ({
  id: Date.now(),
  text,
  sender: 'user',
  time: getCurrentTime()
});

export const createChartMessage = (): Message => ({
  id: Date.now() + 1,
  text: `<title>Gastos últimos días</title><subtitle>Resumen de tus gastos recientes</subtitle><data>[
    {"name": "Lun", "value": 45},
    {"name": "Mar", "value": 78},
    {"name": "Mié", "value": 32},
    {"name": "Jue", "value": 95},
    {"name": "Vie", "value": 67},
    {"name": "Sáb", "value": 123},
    {"name": "Dom", "value": 89}
  ]</data><footer>Total de la semana: $ 529</footer>`,
  sender: 'bot',
  time: getCurrentTime(),
  isChartMessage: true
});

export const createFollowUpMessage = (): Message => ({
  id: Date.now() + 2,
  text: 'Puedo ayudarte a entender mejor tus gastos y crear estrategias de ahorro personalizadas.',
  sender: 'bot',
  time: getCurrentTime()
});

export const createPieChartMessage = (): Message => ({
  id: Date.now() + 3,
  text: `<title>Gastos por categoría</title><subtitle>Distribución de tus gastos</subtitle><data>[
    {"name": "Alimentación", "value": 156, "percentage": "30%", "color": "#2FA179"},
    {"name": "Transporte", "value": 124, "percentage": "24%", "color": "#FFA35B"},
    {"name": "Entretenimiento", "value": 98, "percentage": "19%", "color": "#FF6B6B"},
    {"name": "Ropa", "value": 87, "percentage": "17%", "color": "#4ECDC4"},
    {"name": "Otros", "value": 52, "percentage": "10%", "color": "#95A5A6"}
  ]</data><footer>Total del mes: $ 517</footer>`,
  sender: 'bot',
  time: getCurrentTime(),
  isChartMessage: true,
  isPieChart: true
});

export const createPieChartFollowUpMessage = (): Message => ({
  id: Date.now() + 4,
  text: 'Como puedes ver, la alimentación representa el 30% de tus gastos. ¿Te gustaría que te ayude a optimizar esta categoría?',
  sender: 'bot',
  time: getCurrentTime()
});
