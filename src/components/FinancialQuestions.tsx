
import React, { useState, useRef, useEffect } from 'react';
import ActionButton from './common/ActionButton';
import MessageItem from './chat/MessageItem';
import TypingIndicator from './chat/TypingIndicator';
import { Message } from '@/types/chat';
import { getCurrentTime } from '@/utils/messageUtils';
import { BarChart, Bar, XAxis, Cell, ResponsiveContainer } from 'recharts';

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
  const [animationComplete, setAnimationComplete] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom of messages
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({
      behavior: 'smooth'
    });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping, isTypingSecondMessage]);

  // Handle animation end
  const handleAnimationEnd = () => {
    setAnimationComplete(true);
  };

  // Chart data for the last 7 days
  const chartData = [
    { name: 'qui', value: 155 },
    { name: 'sex', value: 105 },
    { name: 'sáb', value: 53 },
    { name: 'dom', value: 64 },
    { name: 'seg', value: 131 },
    { name: 'ter', value: 52 },
    { name: 'qua', value: 72 }
  ];

  const handleActionClick = () => {
    // Disable animations while processing
    setAnimationComplete(false);
    
    // Create user message with button text
    const buttonText = "quanto eu gastei nos últimos dias?";
    const userMessage: Message = {
      id: Date.now(),
      text: buttonText,
      sender: 'user',
      time: getCurrentTime()
    };
    
    // Add user message to chat
    setMessages(prev => [...prev, userMessage]);
    
    // Show typing indicator after a brief delay
    setTimeout(() => {
      setIsTyping(true);
      
      // After 2 seconds, show the chart response
      setTimeout(() => {
        setIsTyping(false);
        
        // First bot message with chart
        const chartMessage: Message = {
          id: Date.now() + 1,
          text: `<chart>
            <title>Últimos 7 dias</title>
            <subtitle>R$ 632,00 - 27/02 à 05/03</subtitle>
            <data>${JSON.stringify(chartData)}</data>
            <footer>↗ Seus gastos aumentaram em 20% essa semana</footer>
          </chart>`,
          sender: 'bot',
          time: getCurrentTime(),
          isChartMessage: true
        };
        
        setMessages(prev => [...prev, chartMessage]);
        
        // Show typing indicator for second message
        setTimeout(() => {
          setIsTypingSecondMessage(true);
          
          // After another delay, show the second bot message
          setTimeout(() => {
            setIsTypingSecondMessage(false);
            
            // Second bot message with call to action
            const followUpMessage: Message = {
              id: Date.now() + 2,
              text: 'Segue gráfico dos seus gastos dos últimos 7 dias 👆',
              sender: 'bot',
              time: getCurrentTime()
            };
            
            setMessages(prev => [...prev, followUpMessage]);
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
  };

  // Render chart from message content
  const renderChart = (messageText: string) => {
    try {
      // Extract chart data from message text
      const titleMatch = messageText.match(/<title>(.*?)<\/title>/);
      const subtitleMatch = messageText.match(/<subtitle>(.*?)<\/subtitle>/);
      const dataMatch = messageText.match(/<data>(.*?)<\/data>/);
      const footerMatch = messageText.match(/<footer>(.*?)<\/footer>/);
      
      const title = titleMatch ? titleMatch[1] : '';
      const subtitle = subtitleMatch ? subtitleMatch[1] : '';
      const chartData = dataMatch ? JSON.parse(dataMatch[1]) : [];
      const footer = footerMatch ? footerMatch[1] : '';
      
      return (
        <div className="w-full rounded-lg overflow-hidden border border-[#202C33] bg-white p-4">
          <div className="mb-1">
            <h3 className="text-xl font-bold text-black">{title}</h3>
            <p className="text-gray-600 text-sm">{subtitle}</p>
          </div>
          
          <div className="h-40 my-2">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <XAxis 
                  dataKey="name" 
                  axisLine={false} 
                  tickLine={false}
                  tick={{ fill: '#2FA179' }}
                />
                <Bar 
                  dataKey="value" 
                  radius={[10, 10, 10, 10]} 
                  barSize={30}
                >
                  {chartData.map((entry, index) => (
                    <Cell 
                      key={`cell-${index}`} 
                      fill="#D8E9E3" 
                      stroke="#2FA179" 
                      strokeWidth={1}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
          
          <div className="flex items-center gap-2 border-t border-gray-200 pt-2 mt-2">
            <div className="text-black font-medium">{footer}</div>
          </div>
        </div>
      );
    } catch (error) {
      console.error("Error rendering chart:", error);
      return <div>Error rendering chart</div>;
    }
  };

  return <div className="w-full max-w-3xl bg-white px-4 py-12">
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
          
          <div className="flex justify-center mb-8">
            <ActionButton onClick={handleActionClick} text="quanto eu gastei nos últimos dias?" />
          </div>
        </div>
      </div>

      {/* Chat area */}
      <div className="min-h-[50px]">
        {messages.map(message => {
          if (message.isChartMessage) {
            return (
              <div key={message.id} className={`mb-2 flex justify-start`} onAnimationEnd={handleAnimationEnd}>
                <div className={`relative py-1.5 px-3 rounded-lg message-animation bg-[#202C33] text-white w-4/5`}>
                  <div className="flex items-end justify-between gap-2">
                    <div className="text-sm self-center w-full">{renderChart(message.text)}</div>
                    <div className="text-[10px] text-gray-300 flex items-center whitespace-nowrap self-end">
                      <span>{message.time}</span>
                    </div>
                  </div>
                </div>
              </div>
            );
          }
          return <MessageItem key={message.id} message={message} onAnimationEnd={handleAnimationEnd} />;
        })}
        
        {/* Typing indicator */}
        {isTyping && <TypingIndicator />}
        
        {/* Second typing indicator between bot messages */}
        {isTypingSecondMessage && <TypingIndicator />}
        
        <div ref={messagesEndRef} />
      </div>

      {showNextStep && <div className="mt-8">
          {/* Future implementation: Financial data visualization will appear here */}
        </div>}
    </div>;
};

export default FinancialQuestions;
