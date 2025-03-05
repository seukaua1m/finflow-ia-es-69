
import React from 'react';
import { Send } from 'lucide-react';

interface ActionButtonProps {
  onClick: () => void;
  text: string;
}

const ActionButton = ({ onClick, text }: ActionButtonProps) => {
  return (
    <button 
      onClick={onClick} 
      className="flex items-center bg-[#2FA179] text-white font-medium py-3 px-6 rounded-full
        transition-all duration-300 hover:bg-opacity-90 hover:shadow-md
        focus:outline-none focus:ring-2 focus:ring-[#2FA179] focus:ring-opacity-50 animate-[jump_3s_ease-in-out_infinite]"
    >
      <Send size={20} className="mr-2 transform rotate-90" />
      {text}
    </button>
  );
};

export default ActionButton;
