
import React from 'react';
import { CheckCheck } from 'lucide-react';
import { Message } from '@/types/chat';

interface MessageItemProps {
  message: Message;
  onAnimationEnd: () => void;
}

const MessageItem = ({
  message,
  onAnimationEnd
}: MessageItemProps) => {
  // Render chart message
  const renderChartMessage = () => {
    const lines = message.text.split('\n');
    
    // Extract title and period
    const title = lines[0];
    const period = lines[1];
    
    // Extract values and days - assuming the format in the example
    const values = [
      parseInt(lines[3] || '0'),
      parseInt(lines[4] || '0'),
      parseInt(lines[5] || '0'),
      parseInt(lines[6] || '0'),
      parseInt(lines[7] || '0'),
      parseInt(lines[8] || '0'),
      parseInt(lines[9] || '0'),
    ];
    
    const days = [
      lines[11],
      lines[12],
      lines[13],
      lines[14],
      lines[15],
      lines[16],
      lines[17],
    ];
    
    // Extract trend text
    const trendText = lines[19] || '';
    
    const maxValue = Math.max(...values);
    
    return (
      <div className="bg-white p-4 rounded-lg border border-gray-200 w-full">
        <div className="font-bold mb-1">{title}</div>
        <div className="text-sm text-gray-600 mb-4">{period}</div>
        
        <div className="flex h-32 items-end justify-between mb-2">
          {values.map((value, index) => (
            <div key={index} className="flex flex-col items-center">
              <div 
                className="w-10 bg-gradient-to-t from-white to-[#A3CEBC] rounded-t-sm"
                style={{ 
                  height: `${(value / maxValue) * 100}%`,
                  minHeight: '10px'
                }}
              ></div>
            </div>
          ))}
        </div>
        
        <div className="flex justify-between mb-4">
          {days.map((day, index) => (
            <div key={index} className="text-xs text-gray-500 w-10 text-center">
              {day}
            </div>
          ))}
        </div>
        
        <div className="text-sm border-t pt-2">
          {formatMessageText(trendText)}
        </div>
      </div>
    );
  };

  // Render pie chart message
  const renderPieChartMessage = () => {
    const lines = message.text.split('\n');
    
    // Extract title and period
    const title = lines[0];
    const period = lines[1];
    
    // Extract legend items
    const legendItems = [
      { color: '🔵', label: lines[5]?.replace('🔵 ', '') },
      { color: '🟦', label: lines[6]?.replace('🟦 ', '') },
      { color: '🟪', label: lines[7]?.replace('🟪 ', '') },
      { color: '🟧', label: lines[8]?.replace('🟧 ', '') },
      { color: '🟨', label: lines[9]?.replace('🟨 ', '') },
    ];
    
    return (
      <div className="bg-white p-4 rounded-lg border border-gray-200 w-full">
        <div className="font-bold mb-1">{title}</div>
        <div className="text-sm text-gray-600 mb-4">{period}</div>
        
        <div className="flex justify-center items-center mb-4">
          <div className="w-32 h-32 rounded-full overflow-hidden relative">
            <svg viewBox="0 0 100 100" className="w-full h-full">
              <circle cx="50" cy="50" r="45" fill="#00BCD4" clipPath="polygon(50% 50%, 100% 0, 100% 50%)" />
              <circle cx="50" cy="50" r="45" fill="#2196F3" clipPath="polygon(50% 50%, 100% 50%, 100% 100%, 75% 100%)" />
              <circle cx="50" cy="50" r="45" fill="#9C27B0" clipPath="polygon(50% 50%, 75% 100%, 50% 100%)" />
              <circle cx="50" cy="50" r="45" fill="#FF9800" clipPath="polygon(50% 50%, 50% 100%, 0 100%, 0  50%)" />
              <circle cx="50" cy="50" r="45" fill="#FFEB3B" clipPath="polygon(50% 50%, 0 50%, 0 0, 50% 0)" />
            </svg>
          </div>
        </div>
        
        <div className="text-sm space-y-1">
          {legendItems.map((item, index) => (
            <div key={index} className="flex items-center">
              <span className="mr-2">{item.color}</span>
              <span>{item.label}</span>
            </div>
          ))}
        </div>
      </div>
    );
  };

  // Format message text with HTML
  const formatMessageText = (text: string) => {
    // For chart messages
    if (message.isChartMessage) {
      return renderChartMessage();
    }
    
    // For pie chart messages
    if (message.isPieChartMessage) {
      return renderPieChartMessage();
    }
    
    // For button messages
    if (message.isButtonMessage) {
      return <div className="font-medium">{text}</div>;
    }
    
    // Check if it's an expense message with specific formatting
    if (message.isGroupMessage) {
      // Parse the expense message with specific layout
      const parts = text.split('\n\n');
      return <>
          {/* Title - "Gasto adicionado" */}
          <div className="font-bold">{parts[0].replace(/<strong>|<\/strong>/g, '')}</div>
          
          {/* Item name - no line space */}
          <div>{parts[1]}</div>
          
          {/* Price - no line space */}
          <div className="font-bold">{parts[2].replace(/<strong>|<\/strong>/g, '')}</div>
          
          {/* Date - with line space above */}
          <div className="mt-4 py-px my-0">{parts[3]}</div>
        </>;
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
  
  return <div className={`mb-2 flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`} onAnimationEnd={onAnimationEnd}>
      <div className={`relative py-1.5 px-3 rounded-lg message-animation ${
        message.sender === 'user' 
          ? 'bg-[#005C4B] text-white max-w-[95%]' 
          : message.isButtonMessage 
            ? 'bg-[#1E1E1E] text-white w-full' 
            : message.isChartMessage || message.isPieChartMessage 
              ? 'bg-transparent p-0 w-full' 
              : 'bg-[#202C33] text-white w-4/5'
      }`}>
        <div className="flex items-end justify-between gap-2">
          <div className={`text-sm self-center ${message.isChartMessage || message.isPieChartMessage ? 'w-full' : ''}`}>
            {formatMessageText(message.text)}
          </div>
          {!message.isChartMessage && !message.isPieChartMessage && (
            <div className="text-[10px] text-gray-300 flex items-center whitespace-nowrap self-end">
              <span>{message.time}</span>
              {message.sender === 'user' && <CheckCheck size={12} className="ml-1 text-gray-300" />}
            </div>
          )}
        </div>
      </div>
    </div>;
};

export default MessageItem;
