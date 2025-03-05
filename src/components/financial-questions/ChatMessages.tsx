
import React, { useRef, useEffect } from 'react';
import MessageItem from '../chat/MessageItem';
import ChartMessage from '../chat/ChartMessage';
import TypingIndicator from '../chat/TypingIndicator';
import { Message } from '@/types/chat';

interface ChatMessagesProps {
  messages: Message[];
  isTyping: boolean;
  isTypingSecondMessage: boolean;
  isTypingThirdMessage: boolean;
  isTypingFourthMessage: boolean;
  isTypingFifthMessage: boolean;
  onAnimationEnd: () => void;
}

const ChatMessages = ({
  messages,
  isTyping,
  isTypingSecondMessage,
  isTypingThirdMessage,
  isTypingFourthMessage,
  isTypingFifthMessage,
  onAnimationEnd
}: ChatMessagesProps) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom of messages
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({
      behavior: 'smooth'
    });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping, isTypingSecondMessage, isTypingThirdMessage, isTypingFourthMessage, isTypingFifthMessage]);

  return (
    <div className="min-h-[50px]">
      {messages.map(message => {
        if (message.isChartMessage) {
          return (
            <ChartMessage 
              key={message.id} 
              messageText={message.text} 
              time={message.time} 
              onAnimationEnd={onAnimationEnd} 
              isPieChart={message.isPieChart} 
            />
          );
        }
        return (
          <MessageItem 
            key={message.id} 
            message={message} 
            onAnimationEnd={onAnimationEnd} 
          />
        );
      })}
      
      {/* Typing indicators */}
      {isTyping && <TypingIndicator />}
      {isTypingSecondMessage && <TypingIndicator />}
      {isTypingThirdMessage && <TypingIndicator />}
      {isTypingFourthMessage && <TypingIndicator />}
      {isTypingFifthMessage && <TypingIndicator />}
      
      <div ref={messagesEndRef} />
    </div>
  );
};

export default ChatMessages;
