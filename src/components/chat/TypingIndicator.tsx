
import React from 'react';

const TypingIndicator = () => {
  return (
    <div className="flex items-center justify-center bg-[#6B6B6B] text-white p-3 rounded-full self-start mb-4 message-animation max-w-[100px]">
      <div className="flex space-x-2">
        <div 
          className="typing-dot w-2 h-2 bg-gray-300 rounded-full" 
          style={{ animationDelay: '0ms' }}
        ></div>
        <div 
          className="typing-dot w-2 h-2 bg-gray-300 rounded-full" 
          style={{ animationDelay: '300ms' }}
        ></div>
        <div 
          className="typing-dot w-2 h-2 bg-gray-300 rounded-full" 
          style={{ animationDelay: '600ms' }}
        ></div>
      </div>
    </div>
  );
};

export default TypingIndicator;
