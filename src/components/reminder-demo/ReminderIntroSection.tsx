
import React from 'react';

const ReminderIntroSection = () => {
  return (
    <div className="mb-8 space-y-8">
      <div className="flex items-start mb-4">
        <div className="text-sales-orange font-bold rounded-full text-4xl mr-3 flex-shrink-0">
          3.
        </div>
        <div>
          <p className="text-lg mb-2">
            Defina lembretes para pagar contas e não esqueça de nada{' '}
            <span className="text-sales-green italic font-semibold">(para uma conta única, ou frequente).</span>
          </p>
        </div>
      </div>

      {/* Images for section 3 instead of chat messages */}
      <div className="space-y-4">
        {/* User message - Boleto car */}
        <div className="flex justify-end">
          <img 
            src="/lovable-uploads/9f3a4f06-f5c6-40da-8582-af479cad3365.png" 
            alt="Boleto do carro mensagem" 
            className="max-w-[80%]"
          />
        </div>

        {/* Bot confirmation message */}
        <div className="flex justify-start">
          <img 
            src="/lovable-uploads/9f3a4f06-f5c6-40da-8582-af479cad3365.png" 
            alt="Lembrete adicionado mensagem" 
            className="max-w-[80%]"
          />
        </div>
      </div>
    </div>
  );
};

export default ReminderIntroSection;
