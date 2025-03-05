
import React from 'react';
import { useReminderDemo } from '@/hooks/useReminderDemo';
import DemoHeader from './financial-questions/DemoHeader';
import ReminderIntroSection from './reminder/ReminderIntroSection';
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
    showContinueButton,
    animationComplete,
    handleAnimationEnd,
  } = useReminderDemo();

  return (
    <div className="w-full max-w-3xl bg-white px-4 py-12">
      <DemoHeader />
      
      {/* Intro section with title */}
      <ReminderIntroSection />

      {/* Chat area */}
      <ChatMessages 
        messages={messages}
        isTyping={isTyping}
        isTypingSecondMessage={isTypingSecondMessage}
        isTypingThirdMessage={isTypingThirdMessage}
        isTypingFourthMessage={isTypingFourthMessage}
        isTypingFifthMessage={false}
        onAnimationEnd={handleAnimationEnd}
      />

      {/* Continue button shown at the end */}
      {showContinueButton && (
        <div className="mt-8 animate-fade-in">
          <ContinueButton onClick={onContinue} />
        </div>
      )}
    </div>
  );
};

export default ReminderDemo;
