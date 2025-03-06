import React, { useState, useEffect } from 'react';
import { ArrowDown, Lock } from 'lucide-react';
import { Button } from './ui/button';
interface OfferSectionProps {
  onContinue: () => void;
}
const OfferSection = ({
  onContinue
}: OfferSectionProps) => {
  // State for countdown timer
  const [timeLeft, setTimeLeft] = useState({
    minutes: 3,
    seconds: 0
  });

  // Effect for the countdown timer
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prevTime => {
        if (prevTime.minutes === 0 && prevTime.seconds === 0) {
          clearInterval(timer);
          return prevTime;
        }
        if (prevTime.seconds === 0) {
          return {
            minutes: prevTime.minutes - 1,
            seconds: 59
          };
        } else {
          return {
            ...prevTime,
            seconds: prevTime.seconds - 1
          };
        }
      });
    }, 1000);

    // Cleanup timer on component unmount
    return () => clearInterval(timer);
  }, []);

  // Format time with leading zeros
  const formattedTime = `${timeLeft.minutes}:${timeLeft.seconds.toString().padStart(2, '0')}`;
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

      {/* Timer container (replacing the button) */}
      <div className="bg-[#FFA35B] text-[#254D39] px-8 py-3 rounded-full font-semibold flex items-center mt-2 mb-8">
        <span className="inline-block mr-2">⏱</span> Oferta por tempo limitado: {formattedTime}
      </div>

      {/* Testimonial */}
      <div className="w-full max-w-lg border border-gray-200 rounded-lg p-4 mb-8">
        <div className="flex items-start">
          <img src="/lovable-uploads/c5eac9be-480a-4923-b993-0f3df87dbb63.png" alt="Amanda Figueiredo profile" className="w-12 h-12 rounded-full mr-3 object-cover" />
          <div>
            <p className="font-bold text-gray-800">Amanda Figueiredo <span className="font-normal text-gray-500">@byamandafigg</span></p>
            <p className="text-gray-800">
              Gente eu sou EXTREMAMENTE desorganizada e somente com essa IA eu consegui organizar melhor o meu dinheiro
            </p>
          </div>
        </div>
      </div>

      {/* Pricing plan card */}
      <div className="w-full max-w-lg bg-[#1A1A1A] text-white rounded-lg p-6 mb-3 relative">
        {/* Promotion tag */}
        <div className="absolute top-4 right-4">
          <div className="bg-[#FFA35B] text-black px-3 py-1 rounded-md font-semibold text-sm">
            PROMOÇÃO 50% OFF
          </div>
        </div>
        
        {/* Lock icon */}
        <div className="mb-1">
          <div className="bg-[#FFA35B] w-8 h-8 rounded-md flex items-center justify-center">
            <Lock size={18} className="text-black" />
          </div>
        </div>
        
        {/* Plan name and price */}
        <div className="flex justify-between items-center mb-4">
          <div>
            <h3 className="text-2xl font-bold">Plano</h3>
            <h2 className="text-3xl font-extrabold">ANUAL</h2>
          </div>
          <div className="text-right">
            <div className="text-lg">12x de</div>
            <div className="flex items-baseline">
              <span className="text-3xl font-bold mr-1">R$ 5</span>
              <span className="text-lg">,70</span>
            </div>
            <div className="text-sm">ou 57 à vista</div>
          </div>
        </div>
      </div>

      {/* Daily price equivalent */}
      <div className="text-center text-[#254D39] mb-8">
        <p className="px-0">(equivalente à menos de R$ 0,16 por dia)</p>
      </div>

      {/* Sign up button */}
      <Button onClick={onContinue} className="w-full max-w-lg bg-[#FFA35B] hover:bg-[#FF9240] text-black font-bold text-xl rounded-lg mb-6 py-[38px]">
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
        <Lock size={18} className="mr-2" />
        <span>Pagamento Seguro</span>
      </div>
    </div>;
};
export default OfferSection;