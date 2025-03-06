
import React from 'react';
import FinancialGrowthChart from './chart/FinancialGrowthChart';

interface OfferSectionProps {
  onContinue: () => void;
}

const OfferSection = ({ onContinue }: OfferSectionProps) => {
  // Chart data representing financial growth over 6 months with proper curvature
  // Ensuring January is included at the beginning
  const chartData = [
    { name: 'Jan', value: 50 },
    { name: 'Fev', value: 70 },
    { name: 'Mar', value: 150 },
    { name: 'Abr', value: 800 },
    { name: 'Mai', value: 3000 },
    { name: 'Jun', value: 7492 }
  ];

  // Custom grid line positions (calculated based on log scale approximation)
  const customYTicks = [0, 50, 150, 800, 3000, 7492];

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
        <FinancialGrowthChart 
          chartData={chartData}
          customYTicks={customYTicks}
        />
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
