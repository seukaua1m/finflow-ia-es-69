
import React from 'react';
import { SendHorizontal } from 'lucide-react';
import { trackUserInput } from '@/services/analyticsService';

interface ChatInputProps {
  inputValue: string;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent) => void;
  isDisabled: boolean;
}

const ChatInput = ({ inputValue, onInputChange, onSubmit, isDisabled }: ChatInputProps) => {
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Track user input if there's a value
    if (inputValue.trim()) {
      await trackUserInput(inputValue, 'ChatInput');
    }
    
    // Call the original onSubmit handler
    onSubmit(e);
  };
  
  return (
    <form onSubmit={handleSubmit} className="flex gap-4">
      <input 
        type="text" 
        placeholder="Exemplo: ifood 44" 
        value={inputValue} 
        onChange={onInputChange} 
        className="w-full px-4 py-3 border border-gray-300 rounded-full focus:outline-none focus:ring-1 focus:ring-sales-green" 
      />
      <button 
        type="submit" 
        className="bg-[#1DA861] text-white p-3 rounded-full flex items-center justify-center min-w-[56px] h-[56px]" 
        disabled={isDisabled}
      >
        <SendHorizontal size={24} />
      </button>
    </form>
  );
};

export default ChatInput;
