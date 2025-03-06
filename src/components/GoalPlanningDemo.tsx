
import React from 'react';
import { useGoalPlanningDemo } from '@/hooks/useGoalPlanningDemo';
import DemoHeader from './financial-questions/DemoHeader';
import GoalPlanningIntroSection from './goal-planning/GoalPlanningIntroSection';
import PromotionAlertSection from './promotion-alert/PromotionAlertSection';
import ContinueButton from './common/ContinueButton';
import ActionButton from './common/ActionButton';

interface GoalPlanningDemoProps {
  onContinue: () => void;
}

const GoalPlanningDemo = ({ onContinue }: GoalPlanningDemoProps) => {
  const {
    showContinueButton,
    showPromotionSection,
    sectionRef
  } = useGoalPlanningDemo(onContinue);

  return (
    <div className="w-full max-w-3xl bg-white px-4 py-12" ref={sectionRef}>
      <DemoHeader />
      
      <GoalPlanningIntroSection />
      
      {showPromotionSection && (
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
