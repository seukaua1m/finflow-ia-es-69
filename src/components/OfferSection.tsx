
import React from 'react';
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer } from 'recharts';

interface OfferSectionProps {
  onContinue: () => void;
}

const OfferSection = ({ onContinue }: OfferSectionProps) => {
  // Chart data representing financial growth over 6 months with proper curvature
  const chartData = [
    { name: 'Jan', value: 50 },
    { name: 'Fev', value: 70 },
    { name: 'Mar', value: 150 },
    { name: 'Abr', value: 800 },
    { name: 'Mai', value: 3000 },
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
      <p className="text-center mb-16 max-w-lg text-lg">
        Essa é a sua chance de cumprir o que você tem prometido a tanto tempo.
      </p>
      
      {/* Chart section */}
      <div className="w-full mb-10 relative px-4 sm:px-12">
        {/* Chart container with relative positioning for labels */}
        <div className="relative h-80 w-full mb-4">
          {/* Starting value label - positioned at the bottom left */}
          <div className="absolute left-0 bottom-16 flex flex-col items-start">
            <span className="text-sales-green text-base mb-1 font-medium">Você hoje</span>
            <span className="font-bold text-sales-green text-3xl">R$ 50</span>
          </div>
          
          {/* End value label - positioned at the top right */}
          <div className="absolute right-0 top-0 flex flex-col items-end">
            <span className="text-sales-green text-base mb-1 font-medium">Daqui 6 meses</span>
            <span className="font-bold text-sales-green text-3xl">R$ 7492</span>
          </div>
          
          {/* Chart */}
          <div className="h-full w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData} margin={{ top: 30, right: 10, left: 10, bottom: 30 }}>
                <XAxis 
                  dataKey="name" 
                  axisLine={true}
                  tickLine={false}
                  tick={{ fill: '#727272', fontSize: 14 }}
                  dy={10}
                />
                <YAxis hide={true} />
                <Line 
                  type="monotone" 
                  dataKey="value" 
                  stroke="#FFA35B" 
                  strokeWidth={3} 
                  dot={{ fill: '#FFA35B', strokeWidth: 0, r: 6 }}
                  activeDot={{ r: 8 }}
                  isAnimationActive={true}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
      
      {/* Bottom text section */}
      <div className="text-center mt-6 mb-10 max-w-lg">
        <p className="text-lg">
          Imagine você daqui a 1 ano, <span className="font-bold text-sales-green">com dinheiro 
          sobrando</span> para viajar ou para completar pra 
          trocar de carro, <span className="font-bold text-sales-green">tudo por causa da decisão que 
          você tomou hoje.</span>
        </p>
      </div>
    </div>
  );
};

export default OfferSection;
