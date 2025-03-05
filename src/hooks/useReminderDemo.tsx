import { useState, useEffect } from 'react';
import { Message } from '@/types/chat';

export const useReminderDemo = (onContinue: () => void) => {
  const [messages, setMessages] = useState<Message[]>([
    // User message asking to set up a reminder
    {
      id: 1,
      text: "Boleto do carro todo dia 12, R$ 2400",
      sender: 'user',
      time: '02:57'
    },
    // Bot confirmation message
    {
      id: 2,
      text: "Lembrete adicionado\n📌 Boleto do carro\nData: 12\nFrequência: Mensal",
      sender: 'bot',
      time: '02:58'
    }
  ]);
  
  const [showContinueButton, setShowContinueButton] = useState(true);
  const [animationComplete, setAnimationComplete] = useState(true);

  // Handle animation end
  const handleAnimationEnd = () => {
    setAnimationComplete(true);
  };

  return {
    messages,
    isTyping: false,
    isTypingSecondMessage: false,
    isTypingThirdMessage: false,
    isTypingFourthMessage: false,
    isTypingFifthMessage: false,
    showContinueButton,
    animationComplete,
    handleAnimationEnd
  };
};
