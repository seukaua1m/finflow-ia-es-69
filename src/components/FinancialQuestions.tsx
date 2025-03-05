
import React, { useState, useRef, useEffect } from 'react';
import ActionButton from './common/ActionButton';
import MessageItem from './chat/MessageItem';
import ChartMessage from './chat/ChartMessage';
import TypingIndicator from './chat/TypingIndicator';
import { Message } from '@/types/chat';
import { 
  createUserMessage, 
  createChartMessage, 
  createFollowUpMessage,
  createPieChartMessage,
  createPieChartFollowUpMessage 
} from '@/services/chatService';

interface FinancialQuestionsProps {
  onContinue: () => void;
}

const FinancialQuestions = ({
  onContinue
}: FinancialQuestionsProps) => {
  const [showNextStep, setShowNextStep] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [isTypingSecondMessage, setIsTypingSecondMessage] = useState(false);
  const [isTypingThirdMessage, setIsTypingThirdMessage] = useState(false);
  const [isTypingFourthMessage, setIsTypingFourthMessage] = useState(false);
  const [animationComplete, setAnimationComplete] = useState(true);
  const [buttonClicked, setButtonClicked] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom of messages
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({
      behavior: 'smooth'
    });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping, isTypingSecondMessage, isTypingThirdMessage, isTypingFourthMessage]);

  // Handle animation end
  const handleAnimationEnd = () => {
    setAnimationComplete(true);
  };

  const handleActionClick = () => {
    // Hide the button
    setButtonClicked(true);
    
    // Disable animations while processing
    setAnimationComplete(false);
    
    // Create user message with button text
    const buttonText = "quanto eu gastei nos últimos dias?";
    const userMessage = createUserMessage(buttonText);
    
    // Add user message to chat
    setMessages(prev => [...prev, userMessage]);
    
    // Show typing indicator after a brief delay
    setTimeout(() => {
      setIsTyping(true);
      
      // After 2 seconds, show the chart response
      setTimeout(() => {
        setIsTyping(false);
        
        // First bot message with chart
        const chartMessage = createChartMessage();
        setMessages(prev => [...prev, chartMessage]);
        
        // Show typing indicator for second message
        setTimeout(() => {
          setIsTypingSecondMessage(true);
          
          // After another delay, show the second bot message
          setTimeout(() => {
            setIsTypingSecondMessage(false);
            
            // Second bot message with call to action
            const followUpMessage = createFollowUpMessage();
            setMessages(prev => [...prev, followUpMessage]);
            
            // Add user message asking for expense breakdown
            setTimeout(() => {
              const categoryQuestionMessage = createUserMessage("me mostre a divisão dos meus gastos por categoria");
              setMessages(prev => [...prev, categoryQuestionMessage]);
              
              // Show typing indicator for the pie chart response
              setTimeout(() => {
                setIsTypingThirdMessage(true);
                
                // After delay, show the pie chart response
                setTimeout(() => {
                  setIsTypingThirdMessage(false);
                  
                  // Third bot message with pie chart
                  const pieChartMessage = createPieChartMessage();
                  setMessages(prev => [...prev, pieChartMessage]);
                  
                  // Show typing indicator for the final follow-up message
                  setTimeout(() => {
                    setIsTypingFourthMessage(true);
                    
                    // After final delay, show the last follow-up message
                    setTimeout(() => {
                      setIsTypingFourthMessage(false);
                      
                      // Fourth bot message with call to action for pie chart
                      const pieChartFollowUpMessage = createPieChartFollowUpMessage();
                      setMessages(prev => [...prev, pieChartFollowUpMessage]);
                      setAnimationComplete(true);
                      
                      // Show next step and continue to next component after a delay
                      setShowNextStep(true);
                      setTimeout(() => {
                        onContinue();
                      }, 5000);
                    }, 1500);
                  }, 1000);
                }, 2000);
              }, 800);
            }, 1500);
          }, 1500);
        }, 1000);
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

      <div className="flex items-start mb-4">
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
          
          {/* Only show button if it hasn't been clicked yet */}
          {!buttonClicked && (
            <div className="flex justify-center mb-8">
              <ActionButton onClick={handleActionClick} text="quanto eu gastei nos últimos dias?" />
            </div>
          )}
        </div>
      </div>

      {/* Chat area */}
      <div className="min-h-[50px]">
        {messages.map(message => {
          if (message.isChartMessage) {
            return (
              <ChartMessage 
                key={message.id}
                messageText={message.text}
                time={message.time}
                onAnimationEnd={handleAnimationEnd}
                isPieChart={message.isPieChart}
              />
            );
          }
          return <MessageItem key={message.id} message={message} onAnimationEnd={handleAnimationEnd} />;
        })}
        
        {/* Typing indicators */}
        {isTyping && <TypingIndicator />}
        {isTypingSecondMessage && <TypingIndicator />}
        {isTypingThirdMessage && <TypingIndicator />}
        {isTypingFourthMessage && <TypingIndicator />}
        
        <div ref={messagesEndRef} />
      </div>

      {showNextStep && <div className="mt-8">
          {/* Future implementation: Financial data visualization will appear here */}
        </div>}
    </div>
  );
};

export default FinancialQuestions;
