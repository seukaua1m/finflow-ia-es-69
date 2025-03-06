
import React, { useState, useEffect } from 'react';
import { useGoalPlanningDemo } from '@/hooks/useGoalPlanningDemo';
import DemoHeader from './financial-questions/DemoHeader';
import GoalPlanningIntroSection from './goal-planning/GoalPlanningIntroSection';
import PromotionAlertSection from './promotion-alert/PromotionAlertSection';
import ContinueButton from './common/ContinueButton';

interface GoalPlanningDemoProps {
  onContinue: () => void;
}

const GoalPlanningDemo = ({ onContinue }: GoalPlanningDemoProps) => {
  const {
    showContinueButton,
    showPromotionSection,
    sectionRef
  } = useGoalPlanningDemo(onContinue);

  const [showIntro, setShowIntro] = useState(false);
  const [showPromotion, setShowPromotion] = useState(false);

  useEffect(() => {
    // Show elements sequentially with delays
    setTimeout(() => setShowIntro(true), 100);
    setTimeout(() => setShowPromotion(true), 800);
  }, []);

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="w-full max-w-3xl bg-white px-4 py-12" ref={sectionRef}>
      <DemoHeader />
      
      {showIntro && (
        <div className="animate-fade-in">
          <GoalPlanningIntroSection />
        </div>
      )}
      
      {showPromotionSection && showPromotion && (
        <div className="animate-fade-in">
          <PromotionAlertSection />
        </div>
      )}
      
      {showContinueButton && (
        <div className="mt-6 animate-fade-in">
          <ContinueButton onClick={onContinue} />
        </div>
      )}
    </div>
  );
};

export default GoalPlanningDemo;
