
import React, { useState, useRef, useEffect } from 'react';
import ActionButton from './common/ActionButton';
import MessageItem from './chat/MessageItem';
import TypingIndicator from './chat/TypingIndicator';
import { Message } from '@/types/chat';
import { getCurrentTime } from '@/utils/messageUtils';

interface FinancialQuestionsProps {
  onContinue: () => void;
}

const FinancialQuestions = ({ onContinue }: FinancialQuestionsProps) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [isTypingSecondMessage, setIsTypingSecondMessage] = useState(false);
  const [isTypingThirdMessage, setIsTypingThirdMessage] = useState(false);
  const [animationComplete, setAnimationComplete] = useState(true);
  const [chatStarted, setChatStarted] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom of messages
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({
      behavior: 'smooth'
    });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping, isTypingSecondMessage, isTypingThirdMessage]);

  // Handle animation end
  const handleAnimationEnd = () => {
    setAnimationComplete(true);
  };

  const handleActionClick = () => {
    if (!animationComplete || chatStarted) return;
    setChatStarted(true);
    setAnimationComplete(false);
    
    // Add user message with the text from the button
    const userMessage: Message = {
      id: Date.now(),
      text: "quanto eu gastei nos últimos dias?",
      sender: 'user',
      time: getCurrentTime()
    };
    setMessages([userMessage]);
    
    // Show typing indicator after user message
    setTimeout(() => {
      setIsTyping(true);
      
      // First bot response - chart message
      setTimeout(() => {
        setIsTyping(false);
        
        const chartMessage: Message = {
          id: Date.now() + 1,
          text: `<strong>Últimos 7 dias</strong>\n\nR$ 632,00 - 27/02 a 05/03`,
          sender: 'bot',
          time: getCurrentTime(),
          chartData: true
        };
        
        setMessages(prev => [...prev, chartMessage]);
        
        // Second typing indicator
        setTimeout(() => {
          setIsTypingSecondMessage(true);
          
          // Second bot message
          setTimeout(() => {
            setIsTypingSecondMessage(false);
            
            const percentageMessage: Message = {
              id: Date.now() + 2,
              text: "Seus gastos aumentaram em 20% essa semana",
              sender: 'bot',
              time: getCurrentTime()
            };
            
            setMessages(prev => [...prev, percentageMessage]);
            
            // Third typing indicator
            setTimeout(() => {
              setIsTypingThirdMessage(true);
              
              // Final message
              setTimeout(() => {
                setIsTypingThirdMessage(false);
                
                const finalMessage: Message = {
                  id: Date.now() + 3,
                  text: "Segue gráfico dos seus gastos dos últimos 7 dias 👍",
                  sender: 'bot',
                  time: getCurrentTime()
                };
                
                setMessages(prev => [...prev, finalMessage]);
                setAnimationComplete(true);
                
                // Continue to next step after entire sequence
                setTimeout(() => {
                  onContinue();
                }, 3000);
              }, 1500);
            }, 800);
          }, 1500);
        }, 800);
      }, 2000);
    }, 800);
  };

  return (
    <div className="w-full max-w-3xl bg-white px-4 py-12">
      <div className="flex justify-center mb-8">
        <div className="bg-sales-orange font-medium rounded-full transition-all duration-300 text-slate-950 px-[15px] py-[2px]">
          Demonstração
        </div>
      </div>

      <div className="flex items-start mb-8">
        <div className="text-sales-orange font-bold rounded-full text-5xl mr-4 flex-shrink-0">
          2.
        </div>
        <div>
          <p className="text-xl mb-4">
            Você pode perguntar <span className="text-sales-green font-bold">TUDO SOBRE SUAS FINANÇAS.</span>
          </p>
          
          <p className="text-lg mb-8 text-[#254d39]">
            Exemplo: Digamos que você quer ver quanto gastou nos últimos dias:
          </p>
          
          {!chatStarted && (
            <div className="flex justify-center mb-8">
              <ActionButton 
                onClick={handleActionClick} 
                text="quanto eu gastei nos últimos dias?" 
              />
            </div>
          )}
        </div>
      </div>

      {/* Messages area */}
      {messages.length > 0 && (
        <div className="mt-8 bg-[#0A1014] rounded-lg p-3 max-h-[500px] overflow-y-auto">
          <div className="min-h-[50px]">
            {messages.map(message => (
              <MessageItem 
                key={message.id} 
                message={message} 
                onAnimationEnd={handleAnimationEnd} 
              />
            ))}
            
            {/* Typing indicators */}
            {isTyping && <TypingIndicator />}
            {isTypingSecondMessage && <TypingIndicator />}
            {isTypingThirdMessage && <TypingIndicator />}
            
            <div ref={messagesEndRef} />
          </div>
        </div>
      )}
    </div>
  );
};

export default FinancialQuestions;
