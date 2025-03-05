
import { useState, useEffect } from 'react';
import { Message } from '@/types/chat';
import { getCurrentTime } from '@/utils/messageUtils';

export const useReminderDemo = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [isTypingSecondMessage, setIsTypingSecondMessage] = useState(false);
  const [isTypingThirdMessage, setIsTypingThirdMessage] = useState(false);
  const [isTypingFourthMessage, setIsTypingFourthMessage] = useState(false);
  const [showContinueButton, setShowContinueButton] = useState(false);
  const [animationComplete, setAnimationComplete] = useState(true);

  // Handle animation end
  const handleAnimationEnd = () => {
    setAnimationComplete(true);
  };

  // Initialize demo chat sequence on component mount
  useEffect(() => {
    startDemoSequence();
  }, []);

  const startDemoSequence = () => {
    // Disable animations while processing
    setAnimationComplete(false);
    
    // First message - car bill
    setTimeout(() => {
      const firstMessage: Message = {
        id: Date.now(),
        text: 'Boleto do carro todo dia 12, R$ 2400',
        sender: 'bot',
        time: '02:57'
      };
      setMessages([firstMessage]);
      
      // Wait a bit, then show typing for response
      setTimeout(() => {
        setIsTyping(true);
        
        // After delay, show the confirmation message
        setTimeout(() => {
          setIsTyping(false);
          
          // Confirmation message
          const confirmationMessage: Message = {
            id: Date.now(),
            text: 'Lembrete adicionado\n📌 Boleto do carro\nData: 12\nFrequência: Mensal',
            sender: 'user',
            time: '02:58'
          };
          setMessages(prev => [...prev, confirmationMessage]);
          
          // Wait longer before starting the reminder sequence
          setTimeout(() => {
            // Reminder message
            const reminderMessage: Message = {
              id: Date.now(),
              text: '💡 Lembrete: Boleto Carro',
              sender: 'user',
              time: '02:04'
            };
            setMessages(prev => [...prev, reminderMessage]);
            
            // User response
            setTimeout(() => {
              const userResponse: Message = {
                id: Date.now(),
                text: 'paguei já',
                sender: 'bot',
                time: '02:04'
              };
              setMessages(prev => [...prev, userResponse]);
              
              // Show typing for final message
              setTimeout(() => {
                setIsTypingSecondMessage(true);
                
                // Final message
                setTimeout(() => {
                  setIsTypingSecondMessage(false);
                  
                  const finalMessage: Message = {
                    id: Date.now(),
                    text: 'Te lembro de novo mês que vem ✅',
                    sender: 'user',
                    time: '02:04'
                  };
                  setMessages(prev => [...prev, finalMessage]);
                  
                  // Show continue button
                  setTimeout(() => {
                    setShowContinueButton(true);
                    setAnimationComplete(true);
                  }, 1000);
                }, 1500);
              }, 1000);
            }, 1500);
          }, 2000);
        }, 1500);
      }, 1000);
    }, 500);
  };

  return {
    messages,
    isTyping,
    isTypingSecondMessage,
    isTypingThirdMessage,
    isTypingFourthMessage,
    showContinueButton,
    animationComplete,
    handleAnimationEnd,
  };
};
