
import React from 'react';
import { SendHorizontal } from 'lucide-react';

interface SuggestionSectionProps {
  suggestionButtonClicked: boolean;
  handleSuggestionClick: () => void;
}

const SuggestionSection = ({
  suggestionButtonClicked,
  handleSuggestionClick
}: SuggestionSectionProps) => {
  if (suggestionButtonClicked) {
    return null;
  }

  return (
    <div className="text-right">
      <p className="text-sales-green text-lg font-medium mb-3">
        Imaginando que esses gastos sejam os seus, pergunte algo ao seu assistente:
      </p>
      
      <button 
        onClick={handleSuggestionClick} 
        className="flex items-center justify-start bg-[#2FA179] text-white rounded-full px-4 py-2 hover:bg-opacity-90 transition-all duration-300 w-full max-w-lg mx-auto"
      >
        <SendHorizontal size={24} className="mr-2" />
        <span>O que eu gastei a mais essa semana?</span>
      </button>
    </div>
  );
};

export default SuggestionSection;
