
import React from 'react';
import { SendHorizontal } from 'lucide-react';

interface ActionButtonProps {
  onClick: () => void;
  text: string;
  className?: string;
}

const ActionButton = ({
  onClick,
  text,
  className = ""
}: ActionButtonProps) => {
  return (
    <button 
      onClick={onClick} 
      className={`flex items-center justify-start bg-[#2FA179] text-white rounded-full transition-all duration-300 hover:bg-opacity-90 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-[#2FA179] focus:ring-opacity-50 font-semibold my-0 px-[19px] py-[12px] ${className}`}
    >
      <SendHorizontal size={24} className="mr-2" />
      {text}
    </button>
  );
};

export default ActionButton;
