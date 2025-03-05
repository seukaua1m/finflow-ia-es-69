
import React from 'react';
import { SendHorizontal } from 'lucide-react';

interface ChatInputProps {
  inputValue: string;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent) => void;
  isDisabled: boolean;
}

const ChatInput = ({ inputValue, onInputChange, onSubmit, isDisabled }: ChatInputProps) => {
  return (
    <form onSubmit={onSubmit} className="flex gap-4">
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
