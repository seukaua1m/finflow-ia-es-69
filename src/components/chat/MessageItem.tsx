
import React from 'react';
import { CheckCheck } from 'lucide-react';
import { Message } from '@/types/chat';

interface MessageItemProps {
  message: Message;
  onAnimationEnd: () => void;
}

const MessageItem = ({ message, onAnimationEnd }: MessageItemProps) => {
  // Format message text with HTML
  const formatMessageText = (text: string) => {
    // Split by new lines first
    const lines = text.split('\n');
    return lines.map((line, lineIndex) => {
      // Check if line contains HTML
      const hasHTML = line.includes('<strong>');
      if (hasHTML) {
        // Parse simple HTML tags in the line
        const parts = line.split(/<strong>|<\/strong>/);
        return (
          <React.Fragment key={lineIndex}>
            {parts.map((part, partIndex) =>
              partIndex % 2 === 1 ? (
                // Odd indexes are between <strong> tags
                <strong key={partIndex}>{part}</strong>
              ) : (
                // Even indexes are outside <strong> tags
                <span key={partIndex}>{part}</span>
              )
            )}
            {lineIndex < lines.length - 1 && <br />}
          </React.Fragment>
        );
      } else {
        // Regular line without HTML
        return (
          <React.Fragment key={lineIndex}>
            {line}
            {lineIndex < lines.length - 1 && <br />}
          </React.Fragment>
        );
      }
    });
  };

  return (
    <div 
      className={`mb-2 flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`} 
      onAnimationEnd={onAnimationEnd}
    >
      <div 
        className={`relative py-1.5 px-3 rounded-lg message-animation ${
          message.sender === 'user' 
            ? 'bg-[#005C4B] text-white max-w-[85%]' 
            : 'bg-[#202C33] text-white w-4/5'
        }`}
      >
        <div className="text-sm">{formatMessageText(message.text)}</div>
        <div className={`text-[11px] text-gray-300 text-right mt-0.5 flex items-center justify-end`}>
          <span>{message.time}</span>
          {message.sender === 'user' && <CheckCheck size={14} className="ml-1 text-gray-300" />}
        </div>
      </div>
    </div>
  );
};

export default MessageItem;
