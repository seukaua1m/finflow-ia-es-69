
import React, { useState, useEffect } from 'react';
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

  const [showIntro, setShowIntro] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [showSpendingLimits, setShowSpendingLimits] = useState(false);

  useEffect(() => {
    // Show elements sequentially with delays
    setTimeout(() => setShowIntro(true), 100);
    setTimeout(() => setShowChat(true), 800);
    setTimeout(() => setShowNotification(true), 1500);
    setTimeout(() => setShowSpendingLimits(true), 2200);
  }, []);

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="w-full max-w-3xl bg-white px-4 py-12">
      <DemoHeader />
      
      {showIntro && (
        <div className="animate-fade-in">
          <ReminderIntroSection />
        </div>
      )}
      
      {showChat && (
        <div className="animate-fade-in">
          <ChatMessages 
            messages={messages}
            isTyping={false}
            isTypingSecondMessage={false}
            isTypingThirdMessage={false}
            isTypingFourthMessage={false}
            isTypingFifthMessage={false}
            onAnimationEnd={handleAnimationEnd}
          />
        </div>
      )}

      {showNotification && (
        <div className="animate-fade-in">
          <ReminderNotificationSection />
        </div>
      )}

      {showSpendingLimits && (
        <div className="animate-fade-in">
          <SpendingLimitsSection />
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

export default ReminderDemo;
