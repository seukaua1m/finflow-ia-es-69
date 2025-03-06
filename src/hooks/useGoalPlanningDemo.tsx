
import { useState } from 'react';

export const useGoalPlanningDemo = (onContinue: () => void) => {
  const [showContinueButton, setShowContinueButton] = useState(true);

  return {
    showContinueButton
  };
};
