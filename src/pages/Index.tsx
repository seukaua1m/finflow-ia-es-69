
import React, { useState, useEffect } from 'react';
import SalesCard from '@/components/SalesCard';
import HowItWorks from '@/components/HowItWorks';
import AdditionalResources from '@/components/AdditionalResources';
import OfferSection from '@/components/OfferSection';
import { trackPageView, trackComponentInteraction, getCurrentFunnelStep, saveFunnelStep } from '@/services/analyticsService';
import { usePageTracking } from '@/hooks/usePageTracking';

const Index = () => {
  // Always start at step 1 when the page is loaded/refreshed
  const [currentStep, setCurrentStep] = useState(1);
  
  usePageTracking(); // Track page views

  // Track when user changes steps and save to localStorage
  useEffect(() => {
    trackComponentInteraction('Index', `MovedToStep${currentStep}`);
    saveFunnelStep(currentStep);

    // Calculate funnel progress percentage
    const funnelProgress = Math.round(currentStep / 4 * 100);
    console.log(`Progreso del embudo: ${funnelProgress}%`);
  }, [currentStep]);

  const handleContinue = () => {
    setCurrentStep(2);
    trackComponentInteraction('ContinueButton', 'Clicked');
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const handleGoToNextStep = () => {
    const nextStep = currentStep + 1;
    setCurrentStep(nextStep);
    trackComponentInteraction('Index', `ProgressedToStep${nextStep}`);
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return <div className="min-h-screen bg-white flex flex-col items-center">
      {currentStep === 1 && <div className="w-full max-w-3xl px-4 py-12 sm:py-16 flex flex-col items-center">
          {/* Subtítulo superior */}
          <h2 className="text-sales-gray text-center text-lg mb-8 italic animate-fade-in font-medium">
            La misma tecnología usada por<br />gerentes de inversiones.
          </h2>

          {/* Headline principal */}
          <h1 className="text-sales-green sm:text-4xl font-bold mb-6 leading-tight animate-fade-in text-center px-[21px] text-2xl">
            Ahorra <span className="highlight-text font-bold">+ de 300 Reales En 30 Días</span> Sin Cortar Los "Lujos"<br />
            Y Solo Con WhatsApp.
          </h1>

          {/* Subheadline */}
          <p className="text-center text-lg mb-12 animate-fade-in">
            No es app, ni hoja de cálculo, ni Notion,<br />
            <span className="text-sales-green font-bold">es inteligencia artificial de vanguardia.</span>
          </p>

          {/* Cards - Updated to 2x2 grid */}
          <div className="grid grid-cols-2 gap-5 w-full mb-12">
            <SalesCard title="¿A dónde va tu dinero?">
              <p>
                Trabajas todo el mes, pero al final{' '}
                <span className="font-bold text-[#254d39]">nunca sabes dónde fue a parar todo lo que ganaste.</span>
              </p>
            </SalesCard>

            <SalesCard title="Sin hojas de cálculo ni apps">
              <p>
                Son soluciones complicadas que dan pereza usar.{' '}
                <span className="font-bold text-[#254d39]">Aquí resuelves todo en WhatsApp.</span>
              </p>
            </SalesCard>

            <SalesCard title="Perdido en las deudas">
              <p>
                No sabes cuánto pagas de cuota, cuánto tiempo falta, a quién debes,{' '}
                <span className="font-bold text-[#254d39]">y no tienes un plan para pagar.</span>
              </p>
            </SalesCard>

            <SalesCard title="Pagando más caro siempre">
              <p>
                Compras por impulso o no investigas antes,{' '}
                <span className="font-bold">gastando más y dejando de ahorrar.</span>
              </p>
            </SalesCard>
          </div>

          {/* Botón Continuar - with text color black */}
          <button onClick={handleContinue} className="btn-continue animate-fade-in">
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
