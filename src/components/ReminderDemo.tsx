
import React from 'react';
import { useReminderDemo } from '@/hooks/useReminderDemo';
import DemoHeader from './financial-questions/DemoHeader';
import ReminderIntroSection from './reminder-demo/ReminderIntroSection';
import ReminderNotificationSection from './reminder-demo/ReminderNotificationSection';
import SpendingLimitsSection from './reminder-demo/SpendingLimitsSection';
import ContinueButton from './common/ContinueButton';

interface ReminderDemoProps {
  onContinue: () => void;
}

const ReminderDemo = ({ onContinue }: ReminderDemoProps) => {
  const { showContinueButton } = useReminderDemo(onContinue);

  return (
    <div className="w-full max-w-3xl bg-white px-4 py-12">
      <DemoHeader />
      
      <ReminderIntroSection />
      <ReminderNotificationSection />
      <SpendingLimitsSection />

      {showContinueButton && (
        <div className="mt-6">
          <ContinueButton onClick={onContinue} />
        </div>
      )}
    </div>
  );
};

export default ReminderDemo;
