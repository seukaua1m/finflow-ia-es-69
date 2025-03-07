
import React from 'react';
import { Target, CheckCheck } from 'lucide-react';

const GoalPlanningIntroSection = () => {
  return (
    <div className="mb-8 space-y-8 animate-fade-in">
      <div className="flex items-start mb-4">
        <div className="text-[#FFA35B] font-bold rounded-full text-4xl mr-3 flex-shrink-0">
          6.
        </div>
        <div>
          <h2 className="text-[#10372B] text-xl font-medium mb-2">
            Planificación de Metas
          </h2>
          <p className="text-lg mb-2">
            Define una meta y te llevamos hasta ella.
          </p>
          <p className="text-lg mb-2 text-[#10372B] font-medium">
            Te planifica, calcula y avisa qué necesitas hacer.
          </p>
        </div>
      </div>

      {/* Chat conversation */}
      <div className="space-y-3">
        {/* User first message */}
        <div className="flex justify-end animate-fade-in" style={{animationDelay: "0.1s"}}>
          <div className="relative py-2 px-3 rounded-lg bg-[#005C4B] text-white max-w-[85%] md:max-w-[75%]">
            <div className="text-sm">
              Crea una meta para viaje en septiembre a Chile, necesito 10 mil
            </div>
            <div className="text-[10px] text-gray-300 mt-1 text-right flex items-center justify-end">
              <span>23:52</span>
              <CheckCheck size={12} className="ml-1 text-gray-300" />
            </div>
          </div>
        </div>

        {/* User second message */}
        <div className="flex justify-end animate-fade-in" style={{animationDelay: "0.2s"}}>
          <div className="relative py-2 px-3 rounded-lg bg-[#005C4B] text-white max-w-[85%] md:max-w-[75%]">
            <div className="text-sm">
              Ya guardé 2k hoy
            </div>
            <div className="text-[10px] text-gray-300 mt-1 text-right flex items-center justify-end">
              <span>23:52</span>
              <CheckCheck size={12} className="ml-1 text-gray-300" />
            </div>
          </div>
        </div>

        {/* Bot response */}
        <div className="flex justify-start animate-fade-in" style={{animationDelay: "0.3s"}}>
          <div className="relative py-2 px-3 rounded-lg bg-[#202C33] text-white max-w-[85%] md:max-w-[75%]">
            <div className="text-sm">
              Creé la meta y ya registré el valor que guardaste hoy.
            </div>
            <div className="text-[10px] text-gray-300 mt-1 text-right">
              23:52
            </div>
          </div>
        </div>

        {/* Bot goal card - now inside a message container */}
        <div className="flex justify-start animate-fade-in" style={{animationDelay: "0.4s"}}>
          <div className="relative py-2 px-3 rounded-lg bg-[#202C33] text-white max-w-[90%] md:max-w-[80%]">
            {/* Goal Card */}
            <div className="relative rounded-lg bg-white text-black border border-gray-200 shadow-sm overflow-hidden">
              <div className="p-4">
                {/* Header with target icon */}
                <div className="flex items-center mb-4">
                  <div className="bg-gray-100 p-1 rounded-full mr-2">
                    <Target className="text-red-500" size={20} />
                  </div>
                  <span className="font-medium text-lg">Nueva Meta</span>
                </div>
                
                {/* Improved progress circle */}
                <div className="flex flex-col items-center justify-center my-4 relative">
                  <div className="w-40 h-40 rounded-full bg-gray-100 flex items-center justify-center relative">
                    {/* Circular progress bar */}
                    <svg width="160" height="160" viewBox="0 0 160 160" className="absolute top-0 left-0">
                      <circle
                        cx="80"
                        cy="80"
                        r="70"
                        fill="none"
                        stroke="#f0f0f0"
                        strokeWidth="12"
                      />
                      <circle
                        cx="80"
                        cy="80"
                        r="70"
                        fill="none"
                        stroke="#FFA35B"
                        strokeWidth="12"
                        strokeDasharray="439.6"
                        strokeDashoffset="351.7"
                        strokeLinecap="round"
                        transform="rotate(-90 80 80)"
                      />
                    </svg>
                    {/* Percentage display */}
                    <div className="text-center z-10">
                      <div className="text-4xl font-bold">20%</div>
                      <div className="text-xs text-gray-500">De la meta</div>
                    </div>
                  </div>
                </div>
                
                {/* Goal details */}
                <div className="mt-2">
                  <div className="flex items-center mb-1">
                    <span className="text-md">Viaje Chile Septiembre</span>
                    <svg 
                      className="ml-1 w-4 h-4 text-[#10372B]" 
                      viewBox="0 0 24 24" 
                      fill="none" 
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path 
                        d="M18 9L12 15L6 9" 
                        stroke="currentColor" 
                        strokeWidth="2" 
                        strokeLinecap="round" 
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                  <div className="text-md font-medium">R$ 2.000,00 de R$ 10.000,00</div>
                </div>
              </div>
              <div className="text-[10px] text-gray-500 bg-gray-50 py-1 px-3 text-right">
                23:52
              </div>
            </div>
            {/* Bot message timestamp */}
            <div className="text-[10px] text-gray-300 mt-1 text-right">
              23:52
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GoalPlanningIntroSection;
