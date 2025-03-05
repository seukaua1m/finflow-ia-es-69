
import React from 'react';

interface ContinueButtonProps {
  onClick: () => void;
}

const ContinueButton = ({ onClick }: ContinueButtonProps) => {
  return (
    <button 
      onClick={onClick} 
      className="w-full bg-[#FFA35B] text-slate-950 font-semibold py-4 px-6 rounded-lg
        transition-all duration-300 hover:bg-opacity-90 hover:shadow-md
        focus:outline-none focus:ring-2 focus:ring-sales-orange focus:ring-opacity-50 animate-fade-in"
    >
      Continuar
    </button>
  );
};

export default ContinueButton;
