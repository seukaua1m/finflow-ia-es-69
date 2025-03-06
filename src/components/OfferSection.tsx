import React from 'react';
interface OfferSectionProps {
  onContinue: () => void;
}
const OfferSection = ({
  onContinue
}: OfferSectionProps) => {
  return <div className="w-full max-w-3xl px-4 py-12 sm:py-16 flex flex-col items-center bg-white">
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
      
      {/* Image section replacing the chart */}
      <div className=" w-full mb-10 relative px-0 sm:px-12 py-0 px-0 -mt-8 -mb-6">
        <img src="/lovable-uploads/175afab2-416c-46de-a47e-597f2079afe5.png" alt="Financial growth chart showing progress from R$50 to R$7492 over 6 months" className="w-full mt-0 mb-0" />
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
    </div>;
};
export default OfferSection;