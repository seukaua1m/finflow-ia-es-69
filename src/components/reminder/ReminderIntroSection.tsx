
import React from 'react';

const ReminderIntroSection = () => {
  return (
    <div className="mb-8">
      <div className="flex items-start mb-4">
        <div className="text-sales-orange font-bold rounded-full text-4xl mr-3 flex-shrink-0">
          3.
        </div>
        <div>
          <p className="text-lg">
            <span className="text-sales-green font-medium">Defina lembretes para pagar contas e não esqueça de nada </span>
            <span className="text-gray-600 italic">(para uma conta única, ou frequente).</span>
          </p>
        </div>
      </div>

      <div className="mt-6 mb-8">
        <div className="flex items-start mb-4">
          <div className="text-sales-orange font-bold rounded-full text-4xl mr-3 flex-shrink-0">
            4.
          </div>
          <div>
            <p className="text-lg">
              E seja <span className="text-sales-green font-medium">lembrado com antecedência.</span>
            </p>
          </div>
        </div>
      </div>

      <div className="mt-6 mb-4">
        <div className="flex items-start mb-4">
          <div className="text-sales-orange font-bold rounded-full text-4xl mr-3 flex-shrink-0">
            5.
          </div>
          <div>
            <p className="text-lg">
              <span className="text-sales-green font-medium">Defina limites de gastos por categoria. </span>
              <span className="font-medium">Controle quanto quer gastar.</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReminderIntroSection;
