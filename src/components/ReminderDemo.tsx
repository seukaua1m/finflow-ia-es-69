
import React from 'react';
import { useReminderDemo } from '@/hooks/useReminderDemo';
import DemoHeader from './financial-questions/DemoHeader';
import ReminderIntroSection from './reminder-demo/ReminderIntroSection';
import ChatMessages from './financial-questions/ChatMessages';
import ContinueButton from './common/ContinueButton';

interface ReminderDemoProps {
  onContinue: () => void;
}

const ReminderDemo = ({ onContinue }: ReminderDemoProps) => {
  const {
    messages,
    isTyping,
    isTypingSecondMessage,
    isTypingThirdMessage,
    isTypingFourthMessage,
    isTypingFifthMessage,
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
        isTyping={isTyping}
        isTypingSecondMessage={isTypingSecondMessage}
        isTypingThirdMessage={isTypingThirdMessage}
        isTypingFourthMessage={isTypingFourthMessage}
        isTypingFifthMessage={isTypingFifthMessage}
        onAnimationEnd={handleAnimationEnd}
      />

      {showContinueButton && (
        <div className="mt-6">
          <ContinueButton onClick={onContinue} />
        </div>
      )}
    </div>
  );
};

export default ReminderDemo;
