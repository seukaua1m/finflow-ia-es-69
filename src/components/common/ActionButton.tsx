
import React from 'react';
import { SendHorizontal } from 'lucide-react';

interface ActionButtonProps {
  onClick: () => void;
  text: string;
}

const ActionButton = ({
  onClick,
  text
}: ActionButtonProps) => {
  return (
    <button 
      onClick={onClick} 
      className="flex items-right bg-[#2FA179] text-white rounded-full transition-all duration-300 hover:bg-opacity-90 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-[#2FA179] focus:ring-opacity-50 animate-[jump_4s_ease-in-out_infinite] py-[5px] px-[16px] font-semibold"
    >
      <SendHorizontal size={20} className="mr-2" />
      {text}
    </button>
  );
};

export default ActionButton;
