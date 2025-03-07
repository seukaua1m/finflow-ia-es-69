
import React from 'react';
import ContinueButton from '../common/ContinueButton';

interface ComparisonTextProps {
  onContinue: () => void;
}

const ComparisonText = ({ onContinue }: ComparisonTextProps) => {
  return (
    <div className="mt-6 text-center">
      <p className="text-lg mb-8">
        Nunca más te harás la pregunta <strong>"¿dónde gasté tanto este mes?"</strong>, sin tener la respuesta.
      </p>
      <ContinueButton onClick={onContinue} />
    </div>
  );
};

export default ComparisonText;
