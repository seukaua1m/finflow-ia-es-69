
import { useState, useEffect } from 'react';
import { Message } from '@/types/chat';
import { getCurrentTime } from '@/utils/messageUtils';

export const useReminderDemo = (onContinue: () => void) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [isTypingSecondMessage, setIsTypingSecondMessage] = useState(false);
  const [isTypingThirdMessage, setIsTypingThirdMessage] = useState(false);
  const [isTypingFourthMessage, setIsTypingFourthMessage] = useState(false);
  const [isTypingFifthMessage, setIsTypingFifthMessage] = useState(false);
  const [showContinueButton, setShowContinueButton] = useState(false);
  const [animationComplete, setAnimationComplete] = useState(true);

  // Initialize the demo flow on component mount
  useEffect(() => {
    startDemo();
  }, []);

  // Handle animation end
  const handleAnimationEnd = () => {
    setAnimationComplete(true);
  };

  // Start the demo sequence
  const startDemo = () => {
    // Part 3: Car payment reminder setup
    setTimeout(() => {
      // User message asking to set up a reminder
      const userMessage1: Message = {
        id: Date.now(),
        text: "Boleto do carro todo dia 12, R$ 2400",
        sender: 'user',
        time: '02:18'
      };
      setMessages(prev => [...prev, userMessage1]);

      // Show typing indicator
      setTimeout(() => {
        setIsTyping(true);
        
        // Bot confirmation message
        setTimeout(() => {
          setIsTyping(false);
          const botMessage1: Message = {
            id: Date.now() + 1,
            text: "✅ Lembrete adicionado\n📌 Boleto do carro\nData: 12\nFrequência: Mensal",
            sender: 'bot',
            time: '02:19'
          };
          setMessages(prev => [...prev, botMessage1]);
          
          // Part 4: Payment reminder notification
          setTimeout(() => {
            // Bot reminder message
            const botMessage2: Message = {
              id: Date.now() + 2,
              text: "🔔 Lembrete: Boleto Carro",
              sender: 'bot',
              time: '12:04'
            };
            setMessages(prev => [...prev, botMessage2]);
            
            // Show typing indicator for "paguei já"
            setTimeout(() => {
              setIsTypingSecondMessage(true);
              
              setTimeout(() => {
                setIsTypingSecondMessage(false);
                // User response that they paid
                const userMessage2: Message = {
                  id: Date.now() + 3,
                  text: "paguei já",
                  sender: 'user',
                  time: '12:05'
                };
                setMessages(prev => [...prev, userMessage2]);
                
                // Bot confirmation with check mark
                setTimeout(() => {
                  const botMessage3: Message = {
                    id: Date.now() + 4,
                    text: "Te lembro de novo mês que vem ✅",
                    sender: 'bot',
                    time: '12:05'
                  };
                  setMessages(prev => [...prev, botMessage3]);
                  
                  // Part 5: Spending limits feature
                  setTimeout(() => {
                    // User asking about spending limits
                    const userMessage3: Message = {
                      id: Date.now() + 5,
                      text: "como estão meus limites de gastos?",
                      sender: 'user',
                      time: '02:16'
                    };
                    setMessages(prev => [...prev, userMessage3]);
                    
                    // Show typing for spending limits report
                    setTimeout(() => {
                      setIsTypingThirdMessage(true);
                      
                      setTimeout(() => {
                        setIsTypingThirdMessage(false);
                        
                        // Bot message with limits chart
                        const botMessage4: Message = {
                          id: Date.now() + 6,
                          text: `<chart>
                            <title>Limites definidos</title>
                            <subtitle>Relatório do mês</subtitle>
                            <data>[
                              {"name":"Lazer","value":80,"color":"#2FA179"},
                              {"name":"Delivery","value":85,"color":"#2FA179"},
                              {"name":"Compras","value":12,"color":"#2FA179"},
                              {"name":"Transporte","value":54,"color":"#2FA179"}
                            ]</data>
                            <footer></footer>
                          </chart>`,
                          sender: 'bot',
                          time: '02:22',
                          isChartMessage: true
                        };
                        setMessages(prev => [...prev, botMessage4]);
                        
                        // Final bot message with report summary
                        setTimeout(() => {
                          const botMessage5: Message = {
                            id: Date.now() + 7,
                            text: "Segue relatório dos seus limites de gastos 👆",
                            sender: 'bot',
                            time: '02:23'
                          };
                          setMessages(prev => [...prev, botMessage5]);
                          
                          // Show continue button
                          setTimeout(() => {
                            setShowContinueButton(true);
                          }, 1000);
                        }, 500);
                      }, 2000);
                    }, 800);
                  }, 1000);
                }, 500);
              }, 1000);
            }, 500);
          }, 1500);
        }, 1500);
      }, 800);
    }, 800);
  };

  return {
    messages,
    isTyping,
    isTypingSecondMessage,
    isTypingThirdMessage,
    isTypingFourthMessage,
    isTypingFifthMessage,
    showContinueButton,
    animationComplete,
    handleAnimationEnd
  };
};
