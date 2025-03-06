
import React from 'react';
import FinancialGrowthChart from './chart/FinancialGrowthChart';

interface OfferSectionProps {
  onContinue: () => void;
}

const OfferSection = ({ onContinue }: OfferSectionProps) => {
  // Chart data points adjusted to match the image:
  const chartData = [
    { name: 'Jan', value: 50 },    // Starting point (bottom)
    { name: 'Fev', value: 1900 },  // At the second line from bottom
    { name: 'Mar', value: 2200 },  // Slightly above the second line
    { name: 'Abr', value: 4200 },  // Between lines 3 and 4
    { name: 'Mai', value: 6000 },  // At the line 4
    { name: 'Jun', value: 7492 }   // At the top line (5)
  ];

  // Custom grid line positions (5 lines)
  const customYTicks = [50, 1900, 3750, 5600, 7450];

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
