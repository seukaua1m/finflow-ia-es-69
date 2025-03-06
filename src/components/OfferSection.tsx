
import React from 'react';
import FinancialGrowthChart from './chart/FinancialGrowthChart';

interface OfferSectionProps {
  onContinue: () => void;
}

const OfferSection = ({ onContinue }: OfferSectionProps) => {
  // Chart data with specific values to match grid line requirements:
  // 1st point: 1px below line 2 (1900-1 = 1899)
  // 2nd point: 2px above line 2 (1900+2 = 1902) 
  // 3rd point: 4px above line 2 (1900+4 = 1904)
  // 4th point: between line 3 and 4 (~4675)
  // 5th point: at middle of line 4 and 5 (~4675)
  // 6th point: exactly at line 5 (7450)
  const chartData = [
    { name: 'Jan', value: 50 },    // Starting point
    { name: 'Fev', value: 1899 },  // 1px below line 2
    { name: 'Mar', value: 1902 },  // 2px above line 2
    { name: 'Abr', value: 1904 },  // 4px above line 2
    { name: 'Mai', value: 4675 },  // Between line 3 and 4
    { name: 'Jun', value: 5600 },  // Middle of line 4 and 5
    { name: 'Jul', value: 7450 }   // Exactly at line 5 (top)
  ];

  // Custom grid line positions
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
