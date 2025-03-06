
import React, { useState, useEffect } from 'react';
import SalesCard from '@/components/SalesCard';
import HowItWorks from '@/components/HowItWorks';
import AdditionalResources from '@/components/AdditionalResources';
import OfferSection from '@/components/OfferSection';
import { trackPageView, trackComponentInteraction } from '@/services/analyticsService';
import { usePageTracking } from '@/hooks/usePageTracking';

const Index = () => {
  const [currentStep, setCurrentStep] = useState(1);
  usePageTracking(); // Track page views
  
  // Track when user changes steps
  useEffect(() => {
    trackComponentInteraction('Index', `MovedToStep${currentStep}`);
  }, [currentStep]);
  
  const handleContinue = () => {
    setCurrentStep(2);
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };
  
  const handleGoToNextStep = () => {
    setCurrentStep(prev => prev + 1);
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
            E Apenas Com O Whatsapp.
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
                Você trabalha o mês inteiro, mas no final{' '}
                <span className="font-bold text-[#254d39]">nunca sabe onde foi parar tudo que ganhou.</span>
              </p>
            </SalesCard>

            <SalesCard title="Sem planilhas ou apps">
              <p>
                São soluções complicadas que dão preguiça de usar.{' '}
                <span className="font-bold text-[#254d39]">Aqui você resolve tudo no Whatsapp.</span>
              </p>
            </SalesCard>

            <SalesCard title="Perdido nas dívidas">
              <p>
                Não sabe quanto paga de parcela, quanto tempo falta, quem deve,{' '}
                <span className="font-bold text-[#254d39]">e não tem um plano para pagar.</span>
              </p>
            </SalesCard>

            <SalesCard title="Pagando mais caro sempre">
              <p>
                Você compra por impulso ou não pesquisa antes,{' '}
                <span className="font-bold">gastando mais e deixando de economizar.</span>
              </p>
            </SalesCard>
          </div>

          {/* Botão Continuar - with text color black */}
          <button 
            onClick={() => {
              trackComponentInteraction('ContinueButton', 'Clicked');
              handleContinue();
            }} 
            className="btn-continue animate-fade-in"
          >
            Continuar
          </button>
        </div>}
      
      {currentStep === 2 && <HowItWorks onContinue={() => {
        trackComponentInteraction('HowItWorks', 'Continued');
        handleGoToNextStep();
      }} />}
      
      {currentStep === 3 && <AdditionalResources onContinue={() => {
        trackComponentInteraction('AdditionalResources', 'Continued');
        handleGoToNextStep();
      }} />}
      
      {currentStep === 4 && <OfferSection onContinue={() => {
        trackComponentInteraction('OfferSection', 'Continued');
        handleGoToNextStep();
      }} />}
    </div>;
};

export default Index;
