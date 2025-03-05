import React from 'react';
import { Send } from 'lucide-react';
interface ActionButtonProps {
  onClick: () => void;
  text: string;
}
const ActionButton = ({
  onClick,
  text
}: ActionButtonProps) => {
  return <button onClick={onClick} className="flex items-center bg-[#2FA179] text-white rounded-full transition-all duration-300 hover:bg-opacity-90 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-[#2FA179] focus:ring-opacity-50 animate-[jump_1.5s_ease-in-out_infinite] py-[5px] px-[16px] font-semibold">
      <Send size={20} className="mr-2 transform rotate-90" />
      {text}
    </button>;
};
export default ActionButton;