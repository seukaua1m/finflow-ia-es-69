
import React from 'react';
import { Lightbulb } from 'lucide-react';

const ReminderNotificationSection = () => {
  return (
    <div className="mb-8 space-y-8">
      <div className="flex items-start mb-4">
        <div className="text-[#FFA35B] font-bold rounded-full text-4xl mr-3 flex-shrink-0">
          4.
        </div>
        <div>
          <p className="text-lg mb-2">
            E seja lembrado com antecedência.
          </p>
        </div>
      </div>

      {/* Chat messages for section 4 */}
      <div className="space-y-2">
        {/* Bot reminder message with light bulb */}
        <div className="mb-2 flex justify-start">
          <div className="relative py-1.5 px-3 rounded-lg bg-[#202C33] text-white max-w-[85%] md:max-w-[75%] lg:max-w-[65%]">
            <div className="flex flex-col">
              <div className="text-sm text-left flex items-center">
                <Lightbulb size={18} className="mr-2 text-yellow-400" />
                Lembrete: Boleto Carro
              </div>
              <div className="text-[10px] text-gray-300 mt-1 flex justify-end items-center">
                <span>02:04</span>
              </div>
            </div>
          </div>
        </div>

        {/* User confirmation message */}
        <div className="mb-2 flex justify-end">
          <div className="relative py-1.5 px-3 rounded-lg bg-[#005C4B] text-white max-w-[85%]">
            <div className="flex flex-col">
              <div className="text-sm text-left">paguei já</div>
              <div className="text-[10px] text-gray-300 mt-1 flex justify-end items-center">
                <span>02:04</span>
                <svg 
                  className="ml-1 w-3 h-3 text-gray-300" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path 
                    d="M20 6L9 17L4 12" 
                    stroke="currentColor" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Bot follow-up message */}
        <div className="mb-2 flex justify-start">
          <div className="relative py-1.5 px-3 rounded-lg bg-[#202C33] text-white max-w-[85%] md:max-w-[75%] lg:max-w-[65%]">
            <div className="flex flex-col">
              <div className="text-sm text-left">Te lembro de novo mês que vem ✅</div>
              <div className="text-[10px] text-gray-300 mt-1 flex justify-end items-center">
                <span>02:04</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReminderNotificationSection;
