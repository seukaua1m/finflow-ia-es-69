
import React from 'react';
import { useFinancialQuestions } from '@/hooks/useFinancialQuestions';
import DemoHeader from './financial-questions/DemoHeader';
import IntroSection from './financial-questions/IntroSection';
import ChatMessages from './financial-questions/ChatMessages';
import SuggestionSection from './financial-questions/SuggestionSection';
import ComparisonText from './financial-questions/ComparisonText';

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

  return (
    <div className="w-full max-w-3xl bg-white px-4 py-12">
      <DemoHeader />
      <IntroSection buttonClicked={buttonClicked} handleActionClick={handleActionClick} />

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

      {showNextStep && (
        <div className="mt-8 space-y-6">
          {/* Suggestion section */}
          <SuggestionSection 
            suggestionButtonClicked={suggestionButtonClicked}
            handleSuggestionClick={handleSuggestionClick}
          />
          
          {/* Show comparison text after responding to suggestion */}
          {showComparisonText && <ComparisonText onContinue={onContinue} />}
        </div>
      )}
    </div>
  );
};

export default FinancialQuestions;
