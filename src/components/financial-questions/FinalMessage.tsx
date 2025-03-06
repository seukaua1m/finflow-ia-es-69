
import React from 'react';

interface FinalMessageProps {
  showComparisonText: boolean;
}

const FinalMessage = ({ showComparisonText }: FinalMessageProps) => {
  if (!showComparisonText) {
    return null;
  }

  return (
    <div className="mt-8 text-center">
      <p className="text-lg text-sales-green">
        Você nunca mais vai se fazer a pergunta <strong>"onde que eu gastei tanto esse mês"</strong>, sem ter a resposta.
      </p>
    </div>
  );
};

export default FinalMessage;
