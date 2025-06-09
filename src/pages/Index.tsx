
import React, { useState, useEffect } from 'react';
import SalesCard from '@/components/SalesCard';
import HowItWorks from '@/components/HowItWorks';
import AdditionalResources from '@/components/AdditionalResources';
import OfferSection from '@/components/OfferSection';

const Index = () => {
  // Always start at step 1 when the page is loaded/refreshed
  const [currentStep, setCurrentStep] = useState(1);

  const handleContinue = () => {
    setCurrentStep(2);
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const handleGoToNextStep = () => {
    const nextStep = currentStep + 1;
    setCurrentStep(nextStep);
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return <div className="min-h-screen bg-white flex flex-col items-center">
      {currentStep === 1 && <div className="w-full max-w-3xl px-4 py-12 sm:py-16 flex flex-col items-center">
          {/* Subtítulo superior */}
          <h2 className="text-sales-gray text-center text-lg mb-8 italic animate-fade-in font-medium">
            A mesma tecnologia usada por<br />gerentes de investimentos.
          </h2>

          {/* Headline principal */}
          <h1 className="text-sales-green sm:text-4xl font-bold mb-6 leading-tight animate-fade-in text-center px-[21px] text-2xl">
            Economize <span className="highlight-text font-bold">+ de 300 Reais Em 30 Dias</span> Sem Cortar Os "Luxos"<br />
            E Só Com WhatsApp.
          </h1>

          {/* Subheadline */}
          <p className="text-center text-lg mb-12 animate-fade-in">
            Não é app, nem planilha, nem Notion,<br />
            <span className="text-sales-green font-bold">é inteligência artificial de ponta.</span>
          </p>

          {/* Cards - Updated to 2x2 grid */}
          <div className="grid grid-cols-2 gap-5 w-full mb-12">
            <SalesCard title="Para onde vai seu dinheiro?">
              <p>
                Você trabalha o mês todo, mas no final{' '}
                <span className="font-bold text-[#254d39]">nunca sabe onde foi parar tudo que ganhou.</span>
              </p>
            </SalesCard>

            <SalesCard title="Sem planilhas nem apps">
              <p>
                São soluções complicadas que dá preguiça de usar.{' '}
                <span className="font-bold text-[#254d39]">Aqui você resolve tudo no WhatsApp.</span>
              </p>
            </SalesCard>

            <SalesCard title="Perdido nas dívidas">
              <p>
                Não sabe quanto paga de parcela, quanto falta, para quem deve,{' '}
                <span className="font-bold text-[#254d39]">e não tem um plano para quitar.</span>
              </p>
            </SalesCard>

            <SalesCard title="Pagando mais caro sempre">
              <p>
                Compra por impulso ou não pesquisa antes,{' '}
                <span className="font-bold">gastando mais e deixando de economizar.</span>
              </p>
            </SalesCard>
          </div>

          {/* Botão Continuar - with text color black */}
          <button onClick={handleContinue} className="btn-continue animate-fade-in">
            Continuar
          </button>
        </div>}
      
      {currentStep === 2 && <HowItWorks onContinue={handleGoToNextStep} />}
      
      {currentStep === 3 && <AdditionalResources onContinue={handleGoToNextStep} />}
      
      {currentStep === 4 && <OfferSection onContinue={handleGoToNextStep} />}
    </div>;
};

export default Index;
