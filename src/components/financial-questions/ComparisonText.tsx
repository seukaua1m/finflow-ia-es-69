
import React from 'react';
import ContinueButton from '../common/ContinueButton';

interface ComparisonTextProps {
  onContinue: () => void;
}

const ComparisonText = ({ onContinue }: ComparisonTextProps) => {
  return (
    <div className="mt-6 text-center">
      <p className="text-lg mb-8">
        Você nunca mais vai se fazer a pergunta <strong>"onde que eu gastei tanto esse mês"</strong>, sem ter a resposta.
      </p>
      <ContinueButton onClick={onContinue} />
    </div>
  );
};

export default ComparisonText;
