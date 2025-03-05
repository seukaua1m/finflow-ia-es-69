import React, { useState } from 'react';
import { ArrowRight } from 'lucide-react';
const HowItWorks = () => {
  const [inputValue, setInputValue] = useState('');
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };
  return <div className="w-full max-w-3xl bg-white px-4 py-12">
      <h2 className="text-sales-green text-3xl font-bold text-center mb-8">
        Como Funciona?
      </h2>

      <p className="text-center mb-8 text-lg">
        Um assistente financeiro <span className="font-bold text-[#254d39]">no seu WhatsApp</span>,{' '}
        disponível 24h para ser seu <span className="font-bold text-[#254d39]">controle financeiro interativo</span>.
      </p>

      <div className="flex justify-center mb-10">
        <button className="bg-sales-orange font-medium py-2 px-6 rounded-full transition-all duration-300 hover:bg-opacity-90 text-slate-950">
          Demonstração
        </button>
      </div>

      <div className="mb-8">
        <div className="flex items-start mb-4">
          <div className="bg-sales-orange text-white font-bold rounded-full w-8 h-8 flex items-center justify-center mr-3 flex-shrink-0">
            1.
          </div>
          <div>
            <p className="text-lg mb-2">
              Digite o que comprou e quanto custou, por exemplo:
            </p>
            <p className="text-lg font-bold mb-4 text-sales-green">
              "camisa 110".
            </p>
            <p className="text-lg mb-2 text-sales-green">
              Registre um gasto (real ou falso) para testar.
            </p>
            <p className="text-sm text-sales-green italic">
              Não se preocupe com vírgulas, nem com por "R$", escreva do seu jeito.
            </p>
          </div>
        </div>
      </div>

      <div className="flex mt-10">
        <input type="text" placeholder="Exemplo: ifood 44" value={inputValue} onChange={handleInputChange} className="w-full px-4 py-3 border border-gray-300 rounded-l-full focus:outline-none focus:ring-1 focus:ring-sales-green" />
        <button className="bg-green-500 text-white p-3 rounded-r-full flex items-center justify-center">
          <ArrowRight size={24} />
        </button>
      </div>
    </div>;
};
export default HowItWorks;