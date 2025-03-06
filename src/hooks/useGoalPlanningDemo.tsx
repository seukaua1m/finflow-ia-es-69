
import { useState, useEffect, useRef } from 'react';

export const useGoalPlanningDemo = (onContinue: () => void) => {
  const [showContinueButton, setShowContinueButton] = useState(false);
  const [showPromotionSection, setShowPromotionSection] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Show promotion section after animations complete (approx 5 seconds)
    const timer = setTimeout(() => {
      setShowPromotionSection(true);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    // Setup scroll detection to show continue button
    const handleScroll = () => {
      if (!sectionRef.current) return;
      
      const { bottom } = sectionRef.current.getBoundingClientRect();
      const isNearBottom = window.innerHeight - bottom > -100;
      
      if (isNearBottom && showPromotionSection) {
        setShowContinueButton(true);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [showPromotionSection]);

  return {
    showContinueButton,
    showPromotionSection,
    sectionRef
  };
};
