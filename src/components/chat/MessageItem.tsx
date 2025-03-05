
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
      className={`mb-4 flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`} 
      onAnimationEnd={onAnimationEnd}
    >
      <div 
        className={`relative p-3 rounded-lg message-animation ${
          message.sender === 'user' 
            ? 'bg-[#154D39] text-white' 
            : 'bg-[#242625] text-white w-4/5'
        }`}
      >
        <div>{formatMessageText(message.text)}</div>
        <div className={`text-xs text-gray-300 text-right mt-1 flex items-center justify-end`}>
          <span>{message.time}</span>
          {message.sender === 'user' && <CheckCheck size={16} className="ml-1 text-gray-300" />}
        </div>
      </div>
    </div>
  );
};

export default MessageItem;
