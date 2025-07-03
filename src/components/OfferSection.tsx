
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

const OfferSection = ({ onContinue }: OfferSectionProps) => {
  return (
    <div className="w-full max-w-3xl px-4 py-12 sm:py-16 flex flex-col items-center bg-white">
      {/* Main Headline */}
      <h2 className="text-sales-green text-3xl font-bold text-center mb-2">
        Oferta Por
      </h2>
      <h2 className="text-sales-green text-3xl font-bold text-center mb-8">
        Tiempo Limitado
      </h2>
      
      {/* Subheadline */}
      <p className="text-center mb-16 max-w-lg text-lg">
        Esta es tu oportunidad de cumplir lo que has prometido desde hace tanto tiempo.
      </p>
      
      {/* Image section replacing the chart */}
      <div className="w-full mb-10 relative px-0 sm:px-12 py-0 px-0 -mt-8 -mb-6">
        <img src="/lovable-uploads/175afab2-416c-46de-a47e-597f2079afe5.png" alt="Gráfico de crecimiento financiero mostrando el progreso de R$50 a R$7492 en 6 meses" className="w-full mt-0 mb-0" />
      </div>
      
      {/* First paragraph */}
      <div className="text-center mb-10 max-w-lg">
        <p className="text-lg">
          Imagínate dentro de 1 año, <span className="font-bold text-sales-green">con dinero 
          sobrando</span> para viajar o completar para 
          cambiar de coche, <span className="font-bold text-sales-green">todo por la decisión que 
          tomaste hoy.</span>
        </p>
      </div>

      {/* Second paragraph */}
      <div className="text-center mb-6 max-w-lg">
        <p className="text-lg text-[#254D39]">
          Todos nuestros recursos fueron 
          desarrollados en conjunto por 
          programadores y analistas financieros.
        </p>
      </div>

      {/* Bold statement */}
      <div className="text-center mb-8 max-w-lg">
        <p className="text-xl font-bold text-[#254D39]">
          Y todo esto tiene un costo.
        </p>
      </div>

      {/* Arrow down icon */}
      <div className="text-center mb-8">
        <ArrowDown size={28} className="text-[#254D39]" />
      </div>

      {/* Price comparison */}
      <div className="text-center mb-8 max-w-lg">
        <p className="text-lg text-[#254D39]">
          Podríamos cobrarte lo justo, R$ 400 
          reales por AÑO, por el ahorro que vamos 
          a generarte.
        </p>
      </div>

      {/* But no... */}
      <div className="text-center mb-8 max-w-lg">
        <p className="text-lg font-bold text-[#254D39]">
          Pero no, no tendría sentido cobrarte 
          tanto siendo que lo que 
          queremos es tu <span className="text-[#254D39] font-extrabold">LIBERTAD 
          FINANCIERA.</span>
        </p>
      </div>

      {/* Limited time offer */}
      <div className="text-center mb-8 max-w-lg">
        <p className="text-lg text-[#254D39]">
          Por lo tanto, por tiempo limitado vamos 
          a liberarte nuestra <span className="text-[#254d39] font-normal">inteligencia 
          artificial</span> por solo:
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
        onClick={() => window.open("https://pay.hotmart.com/F100621713W?checkoutMode=10", "_blank")}
        className="w-full max-w-lg bg-[#FFA35B] hover:bg-[#FF9240] text-black font-bold text-xl rounded-lg mb-6 py-[28px]"
      >
        Quiero suscribirme
      </Button>

      {/* After signing up text */}
      <div className="text-center max-w-lg mb-6">
        <p className="text-[#254D39] font-semibold">
          Después de suscribirte recibirás el contacto<br />
          de la IA para empezar a usarla.
        </p>
      </div>

      {/* Secure payment */}
      <div className="flex items-center justify-center text-[#254D39] mb-4">
        <span>🔒</span>
        <span className="ml-2">Pago Seguro</span>
      </div>
    </div>
  );
};

export default OfferSection;
