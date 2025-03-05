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
import { ArrowRight, SendHorizontal } from 'lucide-react';
import ContinueButton from './common/ContinueButton';

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
  const [isTypingFifthMessage, setIsTypingFifthMessage] = useState(false);
  const [animationComplete, setAnimationComplete] = useState(true);
  const [buttonClicked, setButtonClicked] = useState(false);
  const [suggestionButtonClicked, setSuggestionButtonClicked] = useState(false);
  const [showComparisonText, setShowComparisonText] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom of messages
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({
      behavior: 'smooth'
    });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping, isTypingSecondMessage, isTypingThirdMessage, isTypingFourthMessage, isTypingFifthMessage, showComparisonText]);

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

  const handleSuggestionClick = () => {
    // Hide the suggestion button
    setSuggestionButtonClicked(true);
    
    // Create user message with suggestion text
    const suggestionText = "O que eu gastei a mais essa semana?";
    const userMessage = createUserMessage(suggestionText);
    
    // Add user message to chat
    setMessages(prev => [...prev, userMessage]);
    
    // Show typing indicator after a brief delay
    setTimeout(() => {
      setIsTypingFifthMessage(true);
      
      // After delay, show the comparison response
      setTimeout(() => {
        setIsTypingFifthMessage(false);
        
        // Bot message with expense comparison
        const comparisonMessage: Message = {
          id: Date.now() + 1,
          text: `Os gastos aumentaram nesta semana em comparação com a semana passada, totalizando R$100 a mais.\n\nO principal motivo foi a compra de <strong>gás de cozinha, realizada na segunda-feira (20/01), no valor de R$100</strong>, o que não ocorreu na semana anterior.`,
          sender: 'bot',
          time: '18:19'
        };
        setMessages(prev => [...prev, comparisonMessage]);
        
        // Show comparison text after a delay
        setTimeout(() => {
          setShowComparisonText(true);
        }, 2000);
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
        {isTypingFifthMessage && <TypingIndicator />}
        
        <div ref={messagesEndRef} />
      </div>

      {showNextStep && (
        <div className="mt-8 space-y-6">
          {/* Suggestion section from the image */}
          <div className="text-center">
            <p className="text-sales-green text-lg font-medium mb-3">
              Imaginando que esses gastos sejam os seus, pergunte algo ao seu assistente:
            </p>
            
            {!suggestionButtonClicked && (
              <button 
                onClick={handleSuggestionClick}
                className="flex items-center justify-center bg-[#2FA179] text-white rounded-full px-4 py-2 hover:bg-opacity-90 transition-all duration-300 w-full max-w-lg mx-auto animate-[jump_2s_ease-in-out_infinite]"
              >
                <SendHorizontal size={24} className="mr-2" />
                <span>O que eu gastei a mais essa semana?</span>
              </button>
            )}
          </div>
          
          {/* Show comparison text after responding to suggestion */}
          {showComparisonText && (
            <div className="text-center mt-8 space-y-3">
              <p className="text-lg">
                Você nunca mais vai se fazer a pergunta 
                <span className="text-sales-green font-semibold"> "onde que eu gastei tanto esse mês"</span>, sem 
                ter a resposta.
              </p>
              
              <div className="mt-8">
                <ContinueButton onClick={onContinue} />
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default FinancialQuestions;
