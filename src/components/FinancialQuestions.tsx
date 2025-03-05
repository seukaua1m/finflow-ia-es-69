
import React, { useState } from 'react';
import ActionButton from './common/ActionButton';
import MessageItem from './chat/MessageItem';
import TypingIndicator from './chat/TypingIndicator';
import { Message } from '@/types/chat';
import { getCurrentTime } from '@/utils/messageUtils';
import FinancialChart from './charts/FinancialChart';

interface FinancialQuestionsProps {
  onContinue: () => void;
}

const FinancialQuestions = ({ onContinue }: FinancialQuestionsProps) => {
  const [showNextStep, setShowNextStep] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [isTypingSecondMessage, setIsTypingSecondMessage] = useState(false);
  const [isTypingThirdMessage, setIsTypingThirdMessage] = useState(false);
  const [animationComplete, setAnimationComplete] = useState(true);

  const handleActionClick = () => {
    setShowNextStep(true);
    setAnimationComplete(false);
    
    // Add user message
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

  // Handle animation end for messages
  const handleAnimationEnd = () => {
    setAnimationComplete(true);
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
          
          <div className="flex justify-center mb-8">
            <ActionButton onClick={handleActionClick} text="quanto eu gastei nos últimos dias?" />
          </div>
        </div>
      </div>

      {showNextStep && (
        <div className="mt-8 bg-[#0A1014] rounded-lg p-3 max-h-[500px] overflow-y-auto">
          {/* Messages area */}
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
          </div>
        </div>
      )}
    </div>
  );
};

export default FinancialQuestions;
