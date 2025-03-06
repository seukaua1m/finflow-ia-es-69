
import React from 'react';
import { LineChart, Line, XAxis, ResponsiveContainer } from 'recharts';

interface OfferSectionProps {
  onContinue: () => void;
}

const OfferSection = ({ onContinue }: OfferSectionProps) => {
  // Chart data representing financial growth over 6 months
  const chartData = [
    { name: 'Jan', value: 50 },
    { name: 'Fev', value: 100 },
    { name: 'Mar', value: 300 },
    { name: 'Abr', value: 1500 },
    { name: 'Mai', value: 4000 },
    { name: 'Jun', value: 7492 }
  ];

  return (
    <div className="w-full max-w-3xl px-4 py-12 sm:py-16 flex flex-col items-center bg-white">
      {/* Main Headline */}
      <h2 className="text-sales-green text-3xl font-bold text-center mb-2">
        Oferta Por
      </h2>
      <h2 className="text-sales-green text-3xl font-bold text-center mb-8">
        Tempo Limitado
      </h2>
      
      {/* Subheadline */}
      <p className="text-center mb-12 max-w-md">
        Essa é a sua chance de cumprir o que você tem prometido a tanto tempo.
      </p>
      
      {/* Chart section */}
      <div className="w-full mb-4 relative">
        {/* Starting value label */}
        <div className="absolute left-0 bottom-16 flex flex-col items-center">
          <span className="text-sales-gray text-sm">Você hoje</span>
          <span className="font-bold text-sales-green text-xl">R$ 50</span>
        </div>
        
        {/* End value label */}
        <div className="absolute right-0 bottom-16 flex flex-col items-center">
          <span className="text-sales-gray text-sm">Daqui 6 meses</span>
          <span className="font-bold text-sales-green text-xl">R$ 7492</span>
        </div>
        
        {/* Chart */}
        <div className="h-40 w-full mb-2">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <XAxis 
                dataKey="name" 
                axisLine={false}
                tickLine={false}
                tick={{ fill: '#727272', fontSize: 12 }}
              />
              <Line 
                type="monotone" 
                dataKey="value" 
                stroke="#FFA35B" 
                strokeWidth={3} 
                dot={{ fill: '#FFA35B', strokeWidth: 0, r: 5 }}
                activeDot={{ r: 8 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
      
      {/* Bottom text section */}
      <div className="text-center mt-8 mb-6 max-w-lg">
        <p className="mb-4">
          Imagine você daqui a 1 ano, <span className="font-bold text-sales-green">com dinheiro sobrando</span> para viajar ou para completar pra trocar de carro, <span className="font-bold text-sales-green">tudo por causa da decisão que você tomou hoje.</span>
        </p>
      </div>
    </div>
  );
};

export default OfferSection;
