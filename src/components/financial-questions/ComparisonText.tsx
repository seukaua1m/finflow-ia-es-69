
import React from 'react';
import ContinueButton from '../common/ContinueButton';

interface ComparisonTextProps {
  onContinue: () => void;
}

const ComparisonText = ({ onContinue }: ComparisonTextProps) => {
  return (
    <div className="text-center mt-8 space-y-3 animate-fade-in">
      <p className="text-lg">
        Você nunca mais vai se fazer a pergunta 
        <span className="text-sales-green font-semibold"> "onde que eu gastei tanto esse mês"</span>, sem 
        ter a resposta.
      </p>
      
      <div className="mt-8 animate-scale-in">
        <ContinueButton onClick={onContinue} />
      </div>
    </div>
  );
};

export default ComparisonText;
