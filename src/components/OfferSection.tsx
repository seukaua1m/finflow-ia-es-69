import React from 'react';
import { ArrowDown } from 'lucide-react';
import { Button } from './ui/button';
import TestimonialCarousel from './offer/TestimonialCarousel';
import CountdownTimer from './offer/CountdownTimer';
import PricingPlan from './offer/PricingPlan';
import { testimonialImages } from './offer/testimonialData';
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
      <div className="w-full mb-10 relative px-0 sm:px-12 py-0 px-0 -mt-8 -mb-6">
        <img src="/lovable-uploads/175afab2-416c-46de-a47e-597f2079afe5.png" alt="Financial growth chart showing progress from R$50 to R$7492 over 6 months" className="w-full mt-0 mb-0" />
      </div>
      
      {/* First paragraph */}
      <div className="text-center mb-10 max-w-lg">
        <p className="text-lg">
          Imagine você daqui a 1 ano, <span className="font-bold text-sales-green">com dinheiro 
          sobrando</span> para viajar ou para completar pra 
          trocar de carro, <span className="font-bold text-sales-green">tudo por causa da decisão que 
          você tomou hoje.</span>
        </p>
      </div>

      {/* Second paragraph */}
      <div className="text-center mb-6 max-w-lg">
        <p className="text-lg text-[#254D39]">
          Todos os nossos recursos foram 
          desenvolvidos em conjunto por 
          programadores e analistas financeiros.
        </p>
      </div>

      {/* Bold statement */}
      <div className="text-center mb-8 max-w-lg">
        <p className="text-xl font-bold text-[#254D39]">
          E tudo isso tem um custo.
        </p>
      </div>

      {/* Arrow down icon */}
      <div className="text-center mb-8">
        <ArrowDown size={28} className="text-[#254D39]" />
      </div>

      {/* Price comparison */}
      <div className="text-center mb-8 max-w-lg">
        <p className="text-lg text-[#254D39]">
          Poder<span className="text-[#254d39]">íamos</span> cobrar de você o justo, R$ 400 
          reais por ANO, pela economia que vamos 
          te trazer.
        </p>
      </div>

      {/* But no... */}
      <div className="text-center mb-8 max-w-lg">
        <p className="text-lg font-bold text-[#254D39]">
          Mas não, não faria sentido cobrarmos 
          tanto de você sendo que o que 
          queremos é a sua <span className="text-[#254D39] font-extrabold">LIBERDADE 
          FINANCEIRA.</span>
        </p>
      </div>

      {/* Limited time offer */}
      <div className="text-center mb-8 max-w-lg">
        <p className="text-lg text-[#254D39]">
          Sendo assim, por tempo limitado vamos 
          liberar para você nossa <span className="text-[#254d39] font-normal">inteligencia 
          artificial</span> por apenas:
        </p>
      </div>

      {/* Timer */}
      <CountdownTimer initialMinutes={7} initialSeconds={0} />

      {/* Testimonial Carousel */}
      <TestimonialCarousel testimonialImages={testimonialImages} />

      {/* Pricing plan */}
      <PricingPlan />

      {/* Sign up button */}
      <Button
          onClick={() => window.location.href = "https://pay.kiwify.com.br/afzxczS"}
          className="w-full max-w-lg bg-[#FFA35B] hover:bg-[#FF9240] text-black font-bold text-xl rounded-lg mb-6 py-[28px]"
      >
          Quero assinar
      </Button>

      {/* After signing up text */}
      <div className="text-center max-w-lg mb-6">
        <p className="text-[#254D39] font-semibold">
          Após assinar você receberá o contato<br />
          da IA para começar a usar.
        </p>
      </div>

      {/* Secure payment */}
      <div className="flex items-center justify-center text-[#254D39] mb-4">
        <span>🔒</span>
        <span className="ml-2">Pagamento Seguro</span>
      </div>
    </div>;
};
export default OfferSection;
