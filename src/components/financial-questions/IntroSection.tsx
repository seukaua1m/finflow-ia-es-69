
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
          Puedes preguntar <span className="text-sales-green font-bold">TODO SOBRE TUS FINANZAS.</span>
        </p>
        
        <p className="text-lg mb-8 text-[#254d39] font-semibold">
          Ejemplo: Digamos que quieres ver cuánto gastaste en los últimos días:
        </p>
        
        {/* Only show button if it hasn't been clicked yet */}
        {!buttonClicked && (
          <div className="flex justify-center mb-8">
            <ActionButton 
              onClick={handleActionClick} 
              text="¿cuánto gasté en los últimos días?" 
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default IntroSection;
