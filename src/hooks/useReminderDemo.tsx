
import { useState, useEffect } from 'react';
import { Message } from '@/types/chat';

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
    
    // First message - car bill (image 3, first green bubble)
    setTimeout(() => {
      const firstMessage: Message = {
        id: Date.now(),
        text: 'Boleto do carro todo dia 12, R$ 2400',
        sender: 'user',
        time: '02:57'
      };
      setMessages([firstMessage]);
      
      // Wait a bit, then show typing for response
      setTimeout(() => {
        setIsTyping(true);
        
        // After delay, show the confirmation message (image 3, black bubble)
        setTimeout(() => {
          setIsTyping(false);
          
          // Confirmation message
          const confirmationMessage: Message = {
            id: Date.now(),
            text: 'Lembrete adicionado\n📌 Boleto do carro\nData: 12\nFrequência: Mensal',
            sender: 'bot',
            time: '02:58'
          };
          setMessages(prev => [...prev, confirmationMessage]);
          
          // Wait longer before starting the reminder sequence (image 4)
          setTimeout(() => {
            // Reminder message (image 4, first black bubble)
            const reminderMessage: Message = {
              id: Date.now(),
              text: '💡 Lembrete: Boleto Carro',
              sender: 'bot',
              time: '02:04'
            };
            setMessages(prev => [...prev, reminderMessage]);
            
            // User response (image 4, green bubble)
            setTimeout(() => {
              const userResponse: Message = {
                id: Date.now(),
                text: 'paguei já',
                sender: 'user',
                time: '02:04'
              };
              setMessages(prev => [...prev, userResponse]);
              
              // Show typing for final message
              setTimeout(() => {
                setIsTypingSecondMessage(true);
                
                // Final message (image 4, last black bubble)
                setTimeout(() => {
                  setIsTypingSecondMessage(false);
                  
                  const finalMessage: Message = {
                    id: Date.now(),
                    text: 'Te lembro de novo mês que vem ✅',
                    sender: 'bot',
                    time: '02:04'
                  };
                  setMessages(prev => [...prev, finalMessage]);
                  
                  // Image 5 - Start spending limits demo
                  setTimeout(() => {
                    const spendingLimitQuery: Message = {
                      id: Date.now(),
                      text: 'como estão meus limites de gastos?',
                      sender: 'user',
                      time: '02:19'
                    };
                    setMessages(prev => [...prev, spendingLimitQuery]);
                    
                    // Show typing for spending report
                    setTimeout(() => {
                      setIsTypingThirdMessage(true);
                      
                      // Spending limits report
                      setTimeout(() => {
                        setIsTypingThirdMessage(false);
                        
                        const spendingLimitReport: Message = {
                          id: Date.now(),
                          text: `Limite definido:
Relatório dia 21/01

Lazer: 60%
R$ 240,00 de R$ 400

Delivery: 84% 
R$ 254,42 de R$ 300

Compras: 12%
R$ 61,86 de R$ 500

Transporte: 34%
R$ 204,12 de R$ 600`,
                          sender: 'bot',
                          time: '02:22'
                        };
                        setMessages(prev => [...prev, spendingLimitReport]);
                        
                        // Final comment about the report
                        setTimeout(() => {
                          setIsTypingFourthMessage(true);
                          
                          setTimeout(() => {
                            setIsTypingFourthMessage(false);
                            
                            const finalComment: Message = {
                              id: Date.now(),
                              text: 'Segue relatório dos seus limites de gastos 👆',
                              sender: 'bot',
                              time: '02:23'
                            };
                            setMessages(prev => [...prev, finalComment]);
                            
                            // Show continue button
                            setTimeout(() => {
                              setShowContinueButton(true);
                              setAnimationComplete(true);
                            }, 1000);
                          }, 1500);
                        }, 1000);
                      }, 2000);
                    }, 1000);
                  }, 2000);
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
