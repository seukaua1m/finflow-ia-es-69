
import React from 'react';
import { Play } from 'lucide-react';

interface ActionButtonProps {
  text: string;
  onClick: () => void;
  disabled?: boolean;
}

const ActionButton = ({ text, onClick, disabled = false }: ActionButtonProps) => {
  return (
    <button 
      onClick={onClick} 
      className="w-full bg-[#1DA861] text-white font-medium py-3 px-6 rounded-full
        transition-all duration-300 hover:bg-opacity-90 hover:shadow-md
        focus:outline-none focus:ring-2 focus:ring-sales-green focus:ring-opacity-50 
        animate-pulse flex items-center"
      disabled={disabled}
    >
      <Play size={20} className="mr-2 animate-bounce" />
      <span>{text}</span>
    </button>
  );
};

export default ActionButton;
