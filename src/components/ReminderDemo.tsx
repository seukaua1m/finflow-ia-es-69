
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
  const [allElementsLoaded, setAllElementsLoaded] = useState(false);

  useEffect(() => {
    // Show elements sequentially with delays and smoother transitions
    setTimeout(() => setShowIntro(true), 400);
    setTimeout(() => setShowChat(true), 1200);
    setTimeout(() => setShowNotification(true), 2000);
    setTimeout(() => setShowSpendingLimits(true), 2800);
    
    // Set all elements loaded state after the last element appears
    setTimeout(() => setAllElementsLoaded(true), 3600);
  }, []);

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="w-full max-w-3xl bg-white px-4 py-12">
      <DemoHeader />
      
      {showIntro && (
        <div className="animate-fade-in transition-all duration-500 ease-in-out">
          <ReminderIntroSection />
        </div>
      )}
      
      {showChat && (
        <div className="animate-fade-in transition-all duration-500 ease-in-out">
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
        <div className="animate-fade-in transition-all duration-500 ease-in-out">
          <ReminderNotificationSection />
        </div>
      )}

      {showSpendingLimits && (
        <div className="animate-fade-in transition-all duration-500 ease-in-out">
          <SpendingLimitsSection />
        </div>
      )}

      {showContinueButton && allElementsLoaded && (
        <div className="mt-6 animate-fade-in transition-all duration-700 ease-in-out">
          <ContinueButton onClick={onContinue} />
        </div>
      )}
    </div>
  );
};

export default ReminderDemo;
