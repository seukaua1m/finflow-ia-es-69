
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
            <span className="text-sales-green font-medium italic">(para uma conta única, ou frequente).</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ReminderIntroSection;
