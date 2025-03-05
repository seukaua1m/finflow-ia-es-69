
import React from 'react';
import ContinueButton from '../common/ContinueButton';

interface ComparisonTextProps {
  onContinue: () => void;
}

const ComparisonText = ({ onContinue }: ComparisonTextProps) => {
  return (
    <div className="mt-8 space-y-4 animate-fade-in">
      <div className="border-t border-gray-200 pt-6">
        <p className="text-lg mb-4">
          Viu como é fácil adicionar gastos e ver seu histórico? Veja agora como funcionam os lembretes.
        </p>

        <ContinueButton onClick={onContinue} />
      </div>
    </div>
  );
};

export default ComparisonText;
