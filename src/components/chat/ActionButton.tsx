
import React from 'react';
import { Play } from 'lucide-react';

interface ActionButtonProps {
  onClick: () => void;
  text: string;
}

const ActionButton = ({ onClick, text }: ActionButtonProps) => {
  return (
    <button 
      onClick={onClick} 
      className="w-full bg-[#194032] text-white font-medium py-3 px-4 rounded-lg
        transition-all duration-300 hover:bg-opacity-90 focus:outline-none
        focus:ring-2 focus:ring-sales-orange focus:ring-opacity-50 animate-fade-in
        flex items-center justify-center"
    >
      <Play size={18} className="mr-2 animate-pulse" />
      {text}
    </button>
  );
};

export default ActionButton;
