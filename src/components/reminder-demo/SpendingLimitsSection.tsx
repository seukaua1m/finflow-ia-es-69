
import React from 'react';

const SpendingLimitsSection = () => {
  return (
    <div className="mb-8 space-y-8">
      <div className="flex items-start mb-4">
        <div className="text-[#FFA35B] font-bold rounded-full text-4xl mr-3 flex-shrink-0">
          5.
        </div>
        <div>
          <p className="text-lg mb-2">
            Defina <span className="text-[#254d39] font-bold">limites de gastos</span> por categoria. <span className="text-[#10372B] font-bold">Controle quanto quer gastar.</span>
          </p>
        </div>
      </div>

      {/* Image for section 5 instead of chat messages */}
      <div className="space-y-4">
        <div className="flex justify-center">
          <img 
            src="/lovable-uploads/ed012606-85d0-41f1-9650-ced9929e8676.png" 
            alt="Limites de gastos" 
            className="max-w-[85%]"
          />
        </div>
      </div>
    </div>
  );
};

export default SpendingLimitsSection;
