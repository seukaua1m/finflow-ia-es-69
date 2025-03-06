
import { useState, useEffect } from 'react';

export const useGoalPlanningDemo = (onContinue: () => void) => {
  const [showContinueButton, setShowContinueButton] = useState(false);

  useEffect(() => {
    // Show continue button after animations complete (approx 5 seconds)
    const timer = setTimeout(() => {
      setShowContinueButton(true);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  return {
    showContinueButton
  };
};
