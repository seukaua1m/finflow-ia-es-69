
import React from 'react';
import { CheckCheck, TrendingUp } from 'lucide-react';
import { Message } from '@/types/chat';
import FinancialChart from '../charts/FinancialChart';

interface MessageItemProps {
  message: Message;
  onAnimationEnd: () => void;
}

const MessageItem = ({
  message,
  onAnimationEnd
}: MessageItemProps) => {
  // Format message text with HTML
  const formatMessageText = (text: string) => {
    // Check if it's a message that should include a financial chart
    if (message.chartData) {
      // Parse the financial data message with specific layout
      const parts = text.split('\n\n');
      return (
        <>
          {/* Title - "Últimos 7 dias" */}
          <div className="font-bold text-lg">{parts[0].replace(/<strong>|<\/strong>/g, '')}</div>
          
          {/* Total amount */}
          <div className="mb-2">
            <span className="text-[#2FA179] font-bold">{parts[1].split(' - ')[0]}</span>
            <span className="text-sm ml-1">{parts[1].split(' - ')[1]}</span>
          </div>
          
          {/* Chart */}
          <FinancialChart />
        </>
      );
    }
    
    // For expense group message with specific formatting
    if (message.isGroupMessage) {
      // Parse the expense message with specific layout
      const parts = text.split('\n\n');
      return (
        <>
          {/* Title - "Gasto adicionado" */}
          <div className="font-bold">{parts[0].replace(/<strong>|<\/strong>/g, '')}</div>
          
          {/* Item name - no line space */}
          <div>{parts[1]}</div>
          
          {/* Price - no line space */}
          <div className="font-bold">{parts[2].replace(/<strong>|<\/strong>/g, '')}</div>
          
          {/* Date - with line space above */}
          <div className="mt-4 py-px my-0">{parts[3]}</div>
        </>
      );
    }

    // Check for trending message
    if (text.includes("aumentaram em")) {
      return (
        <div className="flex items-center">
          <TrendingUp size={16} className="mr-1" />
          <span>{text}</span>
        </div>
      );
    }
    
    // Check for thumbs up message
    if (text.includes("👍")) {
      return text;
    }

    // For regular messages, split by new lines first
    const lines = text.split('\n');
    return lines.map((line, lineIndex) => {
      // Check if line contains HTML
      const hasHTML = line.includes('<strong>');
      if (hasHTML) {
        // Parse simple HTML tags in the line
        const parts = line.split(/<strong>|<\/strong>/);
        return <React.Fragment key={lineIndex}>
            {parts.map((part, partIndex) => partIndex % 2 === 1 ?
          // Odd indexes are between <strong> tags
          <strong key={partIndex}>{part}</strong> :
          // Even indexes are outside <strong> tags
          <span key={partIndex}>{part}</span>)}
            {lineIndex < lines.length - 1 && <br />}
          </React.Fragment>;
      } else {
        // Regular line without HTML
        return <React.Fragment key={lineIndex}>
            {line}
            {lineIndex < lines.length - 1 && <br />}
          </React.Fragment>;
      }
    });
  };

  return (
    <div 
      className={`mb-3 flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`} 
      onAnimationEnd={onAnimationEnd}
    >
      <div 
        className={`relative py-2 px-3 rounded-lg message-animation ${
          message.sender === 'user' 
            ? 'bg-[#005C4B] text-white max-w-[85%]' 
            : message.chartData || message.text.includes("aumentaram em")
              ? 'bg-white border border-gray-200 text-black w-[85%]'
              : message.text.includes("👍") 
                ? 'bg-[#202C33] text-white w-[85%]' 
                : 'bg-white border border-gray-200 text-black w-[85%]'
        }`}
      >
        <div className="flex items-end justify-between gap-2">
          <div className={`text-sm ${message.chartData ? 'w-full' : 'self-center'}`}>
            {formatMessageText(message.text)}
          </div>
          <div className="text-[10px] text-gray-500 flex items-center whitespace-nowrap self-end">
            <span>{message.time}</span>
            {message.sender === 'user' && <CheckCheck size={12} className="ml-1 text-gray-400" />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MessageItem;
