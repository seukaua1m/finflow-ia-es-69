
import React, { useRef, useEffect } from 'react';
import { useFinancialQuestions } from '@/hooks/useFinancialQuestions';
import IntroSection from './financial-questions/IntroSection';
import ChatMessages from './financial-questions/ChatMessages';
import SuggestionSection from './financial-questions/SuggestionSection';
import ComparisonText from './financial-questions/ComparisonText';
import ContinueButton from './common/ContinueButton';
import DemoHeader from './financial-questions/DemoHeader';
import FinalMessage from './financial-questions/FinalMessage';

interface FinancialQuestionsProps {
  onContinue: () => void;
}

const FinancialQuestions = ({ onContinue }: FinancialQuestionsProps) => {
  const {
    showNextStep,
    messages,
    isTyping,
    isTypingSecondMessage,
    isTypingThirdMessage,
    isTypingFourthMessage,
    isTypingFifthMessage,
    animationComplete,
    buttonClicked,
    suggestionButtonClicked,
    showComparisonText,
    handleAnimationEnd,
    handleActionClick,
    handleSuggestionClick
  } = useFinancialQuestions(onContinue);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [
    messages,
    isTyping,
    isTypingSecondMessage,
    isTypingThirdMessage,
    isTypingFourthMessage,
    isTypingFifthMessage
  ]);

  return (
    <div className="w-full max-w-3xl px-4 py-12 bg-white">
      <DemoHeader />

      <IntroSection 
        buttonClicked={buttonClicked} 
        handleActionClick={handleActionClick} 
      />

      <ChatMessages 
        messages={messages}
        isTyping={isTyping}
        isTypingSecondMessage={isTypingSecondMessage}
        isTypingThirdMessage={isTypingThirdMessage}
        isTypingFourthMessage={isTypingFourthMessage}
        isTypingFifthMessage={isTypingFifthMessage}
        handleAnimationEnd={handleAnimationEnd}
      />

      <div ref={messagesEndRef}></div>

      {/* Only show suggestions after chart is shown and no "continue" button */}
      {buttonClicked && !suggestionButtonClicked && !showNextStep && (
        <SuggestionSection
          suggestionButtonClicked={suggestionButtonClicked}
          handleSuggestionClick={handleSuggestionClick}
        />
      )}

      {/* Final message replaced with new component */}
      <FinalMessage showComparisonText={showComparisonText} />

      {/* Show continue button after all interactions */}
      {showNextStep && <ContinueButton onClick={onContinue} />}
    </div>
  );
};

export default FinancialQuestions;
