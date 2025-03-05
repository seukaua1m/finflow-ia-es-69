
import React from 'react';
import { ArrowRight } from 'lucide-react';

interface ActionButtonProps {
  onClick: () => void;
  text: string;
}

const ActionButton = ({ onClick, text }: ActionButtonProps) => {
  return (
    <button 
      onClick={onClick} 
      className="flex items-center bg-[#3ABB8D] text-white font-medium py-4 px-6 rounded-full
        transition-all duration-300 hover:bg-opacity-90 hover:shadow-md
        focus:outline-none focus:ring-2 focus:ring-[#3ABB8D] focus:ring-opacity-50 animate-[jump_1s_ease-in-out_infinite]"
    >
      <ArrowRight size={20} className="mr-2" />
      {text}
    </button>
  );
};

export default ActionButton;
