
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
  // Format message text with HTML
  const formatMessageText = (text: string) => {
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
      <div className={`relative py-1.5 px-3 rounded-lg message-animation ${message.sender === 'user' ? 'bg-[#005C4B] text-white max-w-[95%]' : 'bg-[#202C33] text-white w-4/5'}`}>
        <div className="flex flex-col">
          <div className="text-sm text-left">{formatMessageText(message.text)}</div>
          <div className="text-[10px] text-gray-300 mt-1 flex justify-end items-center">
            <span>{message.time}</span>
            {message.sender === 'user' && <CheckCheck size={12} className="ml-1 text-gray-300" />}
          </div>
        </div>
      </div>
    </div>;
};
export default MessageItem;
