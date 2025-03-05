import React from 'react';
const SpendingLimitsSection = () => {
  // Data for the spending limits chart
  const spendingLimitsData = [{
    name: 'Lazer',
    value: 60,
    color: '#2FA179',
    amount: 'R$ 240,00 de R$ 400,00'
  }, {
    name: 'Delivery',
    value: 84,
    color: '#2FA179',
    amount: 'R$ 254,42 de R$ 300,00'
  }, {
    name: 'Compras',
    value: 12,
    color: '#2FA179',
    amount: 'R$ 61,00 de R$ 500,00'
  }, {
    name: 'Transporte',
    value: 34,
    color: '#2FA179',
    amount: 'R$ 205,12 de R$ 600,00'
  }];
  return <div className="mb-8 space-y-8">
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

      {/* Chat messages for section 5 */}
      <div className="space-y-2">
        {/* User question message */}
        <div className="mb-2 flex justify-end">
          <div className="relative py-1.5 px-3 rounded-lg bg-[#005C4B] text-white max-w-[85%]">
            <div className="flex flex-col">
              <div className="text-sm text-left">como estão meus limites de gastos?</div>
              <div className="text-[10px] text-gray-300 mt-1 flex justify-end items-center">
                <span>02:19</span>
                <svg className="ml-1 w-3 h-3 text-gray-300" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M20 6L9 17L4 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Bot spending limits chart message */}
        <div className="mb-2 flex justify-start">
          <div className="relative py-1.5 px-3 rounded-lg bg-[#202C33] text-white max-w-[85%] md:max-w-[75%] lg:max-w-[65%]">
            <div className="flex flex-col">
              <div className="text-sm self-center w-full text-left">
                <div className="rounded-lg bg-white text-black p-4 mb-1">
                  <div className="text-center mb-2">
                    <div className="font-medium">Limite definido:</div>
                    <div className="text-sm text-gray-600">Relatório dia 21/01</div>
                  </div>
                  
                  <div className="space-y-4">
                    {spendingLimitsData.map((item, index) => <div key={index} className="space-y-1">
                        <div className="flex justify-between text-sm">
                          <span>{item.name}</span>
                          <span className="font-medium">{item.value}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div className="bg-[#2FA179] h-2 rounded-full" style={{
                        width: `${item.value}%`
                      }}></div>
                        </div>
                        <div className="text-xs text-gray-500">{item.amount}</div>
                      </div>)}
                  </div>
                </div>
              </div>
              <div className="text-[10px] text-gray-300 mt-1 flex justify-end items-center">
                <span>02:22</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bot follow-up message */}
        <div className="mb-2 flex justify-start">
          <div className="relative py-1.5 px-3 rounded-lg bg-[#202C33] text-white max-w-[85%] md:max-w-[75%] lg:max-w-[65%]">
            <div className="flex flex-col">
              <div className="text-sm text-left">Segue relatório dos seus limites de gastos 👆</div>
              <div className="text-[10px] text-gray-300 mt-1 flex justify-end items-center">
                <span>02:23</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>;
};
export default SpendingLimitsSection;