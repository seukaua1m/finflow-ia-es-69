
import React from 'react';

const PricingPlan = () => {
  return (
    <>
      <div className="w-full max-w-lg bg-[#1A1A1A] text-white rounded-lg p-6 mb-3 relative">
        {/* Promotion tag */}
        <div className="absolute top-4 right-4">
          <div className="bg-[#FFA35B] text-black px-3 py-1 rounded-md font-semibold text-sm">
            PROMOÇÃO 50% OFF
          </div>
        </div>
        
        {/* Lock emoji (changed from icon) */}
        <div className="mb-1">
          <div className="bg-[#FFA35B] w-8 h-8 rounded-md flex items-center justify-center">
            <span className="text-xl">🔓</span>
          </div>
        </div>
        
        {/* Plan name and price */}
        <div className="flex justify-between items-center mb-4">
          <div>
            <h3 className="text-2xl font-bold">Plano</h3>
            <h2 className="text-3xl font-extrabold">ANUAL</h2>
          </div>
          <div className="text-right">
            <div className="text-lg">12x de</div>
            <div className="flex items-baseline">
              <span className="text-3xl font-bold mr-1">R$ 5</span>
              <span className="text-lg">,70</span>
            </div>
            <div className="text-sm">ou 57 à vista</div>
          </div>
        </div>
      </div>

      {/* Daily price equivalent */}
      <div className="text-center text-[#254D39] mb-8">
        <p className="px-0">(equivalente à menos de R$ 0,16 por dia)</p>
      </div>
    </>
  );
};

export default PricingPlan;
