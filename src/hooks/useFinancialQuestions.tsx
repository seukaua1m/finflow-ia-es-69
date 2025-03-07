
import { useState, useEffect } from 'react';
import { Message } from '@/types/chat';
import { 
  createUserMessage, 
  createChartMessage, 
  createFollowUpMessage, 
  createPieChartMessage, 
  createPieChartFollowUpMessage 
} from '@/services/chatService';
import { getCurrencySymbol } from '@/utils/messageUtils';

export const useFinancialQuestions = (onContinue: () => void) => {
  const [showNextStep, setShowNextStep] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [isTypingSecondMessage, setIsTypingSecondMessage] = useState(false);
  const [isTypingThirdMessage, setIsTypingThirdMessage] = useState(false);
  const [isTypingFourthMessage, setIsTypingFourthMessage] = useState(false);
  const [isTypingFifthMessage, setIsTypingFifthMessage] = useState(false);
  const [animationComplete, setAnimationComplete] = useState(true);
  const [buttonClicked, setButtonClicked] = useState(false);
  const [suggestionButtonClicked, setSuggestionButtonClicked] = useState(false);
  const [showComparisonText, setShowComparisonText] = useState(false);
  const [currencySymbol, setCurrencySymbol] = useState<string>('R$');

  // Obtener el símbolo de moneda según el país del usuario
  useEffect(() => {
    const storedCountry = localStorage.getItem('visitor_country') || 'Brasil';
    setCurrencySymbol(getCurrencySymbol(storedCountry));
  }, []);

  // Handle animation end
  const handleAnimationEnd = () => {
    setAnimationComplete(true);
  };
  
  const handleActionClick = () => {
    // Hide the button
    setButtonClicked(true);

    // Disable animations while processing
    setAnimationComplete(false);

    // Create user message with button text
    const buttonText = "¿cuánto he gastado en los últimos días?";
    const userMessage = createUserMessage(buttonText);

    // Add user message to chat
    setMessages(prev => [...prev, userMessage]);

    // Show typing indicator after a brief delay
    setTimeout(() => {
      setIsTyping(true);

      // After 2 seconds, show the chart response
      setTimeout(() => {
        setIsTyping(false);

        // First bot message with chart
        const chartMessage = createChartMessage();
        setMessages(prev => [...prev, chartMessage]);

        // Show typing indicator for second message
        setTimeout(() => {
          setIsTypingSecondMessage(true);

          // After another delay, show the second bot message
          setTimeout(() => {
            setIsTypingSecondMessage(false);

            // Second bot message with call to action
            const followUpMessage: Message = {
              id: Date.now() + 1,
              text: `Has gastado un total de ${currencySymbol} 780 en los últimos 7 días. ¿Quieres ver un análisis detallado de tus gastos?`,
              sender: 'bot',
              time: '18:15'
            };
            setMessages(prev => [...prev, followUpMessage]);

            // Add user message asking for expense breakdown
            setTimeout(() => {
              const categoryQuestionMessage = createUserMessage("muéstrame la división de mis gastos por categoría");
              setMessages(prev => [...prev, categoryQuestionMessage]);

              // Show typing indicator for the pie chart response
              setTimeout(() => {
                setIsTypingThirdMessage(true);

                // After delay, show the pie chart response
                setTimeout(() => {
                  setIsTypingThirdMessage(false);

                  // Third bot message with pie chart
                  const pieChartMessage = createPieChartMessage();
                  setMessages(prev => [...prev, pieChartMessage]);

                  // Show typing indicator for the final follow-up message
                  setTimeout(() => {
                    setIsTypingFourthMessage(true);

                    // After final delay, show the last follow-up message
                    setTimeout(() => {
                      setIsTypingFourthMessage(false);

                      // Fourth bot message with call to action for pie chart
                      const pieChartFollowUpMessage: Message = {
                        id: Date.now() + 1,
                        text: `Aquí está el desglose de tus gastos por categoría. La categoría con mayor gasto es "Alimentación" con ${currencySymbol} 320 (41%), seguida por "Transporte" con ${currencySymbol} 180 (23%).`,
                        sender: 'bot',
                        time: '18:17'
                      };
                      setMessages(prev => [...prev, pieChartFollowUpMessage]);
                      setAnimationComplete(true);

                      // Show next step
                      setShowNextStep(true);
                    }, 1500);
                  }, 1000);
                }, 2000);
              }, 800);
            }, 1500);
          }, 1500);
        }, 1000);
      }, 2000);
    }, 800);
  };
  
  const handleSuggestionClick = () => {
    // Hide the suggestion button
    setSuggestionButtonClicked(true);

    // Create user message with suggestion text
    const suggestionText = "¿Qué gasté de más esta semana?";
    const userMessage = createUserMessage(suggestionText);

    // Add user message to chat
    setMessages(prev => [...prev, userMessage]);

    // Show typing indicator after a brief delay
    setTimeout(() => {
      setIsTypingFifthMessage(true);

      // After delay, show the comparison response
      setTimeout(() => {
        setIsTypingFifthMessage(false);

        // Bot message with expense comparison
        const comparisonMessage: Message = {
          id: Date.now() + 1,
          text: `Los gastos aumentaron esta semana en comparación con la semana pasada, con un total de ${currencySymbol} 100 adicionales.\n\nLa razón principal fue la compra de <strong>gas para cocina, realizada el lunes (20/01), por valor de ${currencySymbol} 100</strong>, lo que no ocurrió la semana anterior.`,
          sender: 'bot',
          time: '18:19'
        };
        setMessages(prev => [...prev, comparisonMessage]);

        // Show comparison text after a delay
        setTimeout(() => {
          setShowComparisonText(true);
        }, 2000);
      }, 2000);
    }, 800);
  };

  return {
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
    handleSuggestionClick,
    onContinue
  };
};
