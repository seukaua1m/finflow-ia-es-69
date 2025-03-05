
import React, { useState } from 'react';
import ActionButton from './common/ActionButton';
import ContinueButton from './common/ContinueButton';

interface FinancialQuestionsProps {
  onContinue: () => void;
}

const FinancialQuestions = ({ onContinue }: FinancialQuestionsProps) => {
  const [showNextStep, setShowNextStep] = useState(false);

  const handleActionClick = () => {
    setShowNextStep(true);
    // Future implementation: Show chat sequence with financial data visualization
  };

  return (
    <div className="w-full max-w-3xl bg-white px-4 py-12">
      <div className="flex justify-center mb-8">
        <div className="bg-sales-orange font-medium rounded-full transition-all duration-300 text-slate-950 px-6 py-2">
          Demonstração
        </div>
      </div>

      <div className="flex items-start mb-8">
        <div className="text-sales-orange font-bold rounded-full text-5xl mr-4 flex-shrink-0">
          2.
        </div>
        <div>
          <p className="text-xl mb-4">
            Você pode perguntar <span className="text-sales-green font-bold">TUDO SOBRE SUAS FINANÇAS.</span>
          </p>
          
          <p className="text-lg mb-8 text-[#254d39]">
            Exemplo: Digamos que você quer ver quanto gastou nos últimos dias:
          </p>
          
          <div className="flex justify-center mb-8">
            <ActionButton 
              onClick={handleActionClick} 
              text="quanto eu gastei nos últimos dias?" 
            />
          </div>
        </div>
      </div>

      {showNextStep && (
        <div className="mt-8">
          {/* Future implementation: Financial data visualization will appear here */}
          <ContinueButton onClick={onContinue} />
        </div>
      )}

      {!showNextStep && (
        <div className="mt-12">
          <ContinueButton onClick={onContinue} />
        </div>
      )}
    </div>
  );
};

export default FinancialQuestions;
