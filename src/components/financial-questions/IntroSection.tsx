
import React from 'react';
import ActionButton from '../common/ActionButton';

interface IntroSectionProps {
  buttonClicked: boolean;
  handleActionClick: () => void;
}

const IntroSection = ({ buttonClicked, handleActionClick }: IntroSectionProps) => {
  return (
    <div className="flex items-start mb-4">
      <div className="text-sales-orange font-bold rounded-full text-5xl mr-4 flex-shrink-0">
        2.
      </div>
      <div>
        <p className="text-xl mb-4">
          Você pode perguntar <span className="text-sales-green font-bold">TUDO SOBRE SUAS FINANÇAS.</span>
        </p>
        
        <p className="text-lg mb-8 text-[#254d39] font-semibold">
          Exemplo: Digamos que você quer ver quanto gastou nos últimos dias:
        </p>
        
        {/* Only show button if it hasn't been clicked yet */}
        {!buttonClicked && (
          <div className="flex justify-start mb-8">
            <ActionButton 
              onClick={handleActionClick} 
              text="quanto eu gastei nos últimos dias?" 
              className="animate-jump text-left justify-start"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default IntroSection;
