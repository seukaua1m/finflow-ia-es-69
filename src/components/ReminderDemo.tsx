
import React from 'react';
import { useReminderDemo } from '@/hooks/useReminderDemo';
import DemoHeader from './financial-questions/DemoHeader';
import ReminderIntroSection from './reminder-demo/ReminderIntroSection';
import ReminderNotificationSection from './reminder-demo/ReminderNotificationSection';
import SpendingLimitsSection from './reminder-demo/SpendingLimitsSection';
import ChatMessages from './financial-questions/ChatMessages';
import ContinueButton from './common/ContinueButton';

interface ReminderDemoProps {
  onContinue: () => void;
}

const ReminderDemo = ({ onContinue }: ReminderDemoProps) => {
  const {
    messages,
    showContinueButton,
    animationComplete,
    handleAnimationEnd
  } = useReminderDemo(onContinue);

  return (
    <div className="w-full max-w-3xl bg-white px-4 py-12">
      <DemoHeader />
      
      <ReminderIntroSection />
      
      {/* Chat area */}
      <ChatMessages 
        messages={messages}
        isTyping={false}
        isTypingSecondMessage={false}
        isTypingThirdMessage={false}
        isTypingFourthMessage={false}
        isTypingFifthMessage={false}
        onAnimationEnd={handleAnimationEnd}
      />

      {/* New Sections */}
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
