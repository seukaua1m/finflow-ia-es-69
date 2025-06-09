
import React from 'react';
const PricingPlan = () => {
  return <>
      <div className="w-full max-w-lg bg-[#1A1A1A] text-white rounded-lg p-6 mb-2 relative py-[28px] mx-[27px] -my-[32px]">
        {/* Promotion tag */}
        <div className="absolute top-4 right-4">
          <div className="bg-[#FFA35B] text-black px-3 py-1 rounded-md font-semibold text-sm">
            PROMOCIÓN 50% OFF
          </div>
        </div>
        
        {/* Lock emoji (changed from icon) */}
        <div className="mb-1">
          <div className="bg-[#1A1A1A] w-8 h-8 rounded-md flex items-center justify-center">
            <span className="font-normal text-3xl">🔓</span>
          </div>
        </div>
        
        {/* Plan name and price */}
        <div className="flex justify-between items-center mb-4">
          <div>
            <h3 className="text-2xl font-bold">Plan</h3>
            <h2 className="text-3xl font-extrabold">ANUAL</h2>
          </div>
          <div className="text-right">
            <div className="text-lg">Solo</div>
            <div className="flex items-baseline">
              <span className="text-3xl font-bold mr-1">$9</span>
              <span className="text-lg">,00</span>
            </div>
            <div className="text-sm">al contado</div>
          </div>
        </div>
      </div>

      {/* Daily price equivalent */}
      <div className="text-center text-[#254D39] mb-8">
        <p className="px-0 mt-6 ml-9 mr-9">(equivalente a menos de $0,30 por día)</p>
      </div>
    </>;
};
export default PricingPlan;
