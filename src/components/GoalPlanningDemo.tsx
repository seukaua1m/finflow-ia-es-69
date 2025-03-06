
import React from 'react';
import { useGoalPlanningDemo } from '@/hooks/useGoalPlanningDemo';
import DemoHeader from './financial-questions/DemoHeader';
import GoalPlanningIntroSection from './goal-planning/GoalPlanningIntroSection';
import ContinueButton from './common/ContinueButton';

interface GoalPlanningDemoProps {
  onContinue: () => void;
}

const GoalPlanningDemo = ({ onContinue }: GoalPlanningDemoProps) => {
  const {
    showContinueButton
  } = useGoalPlanningDemo(onContinue);

  return (
    <div className="w-full max-w-3xl bg-white px-4 py-12">
      <DemoHeader />
      
      <GoalPlanningIntroSection />
      
      {showContinueButton && (
        <div className="mt-6">
          <ContinueButton onClick={onContinue} />
        </div>
      )}
    </div>
  );
};

export default GoalPlanningDemo;
