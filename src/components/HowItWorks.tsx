
import React, { useState, useEffect, useRef } from 'react';
import MessageItem from './chat/MessageItem';
import TypingIndicator from './chat/TypingIndicator';
import ChatInput from './chat/ChatInput';
import ContinueButton from './common/ContinueButton';
import FinancialQuestions from './FinancialQuestions';
import ReminderDemo from './ReminderDemo';
import GoalPlanningDemo from './GoalPlanningDemo';
import { Message } from '@/types/chat';
import { getCurrentTime, calculateLimit } from '@/utils/messageUtils';

interface HowItWorksProps {
  onContinue: () => void;
}

const HowItWorks = ({
  onContinue
}: HowItWorksProps) => {
  const [inputValue, setInputValue] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [isTypingSecondMessage, setIsTypingSecondMessage] = useState(false);
  const [showContinueButton, setShowContinueButton] = useState(false);
  const [animationComplete, setAnimationComplete] = useState(true);
  const [currentStep, setCurrentStep] = useState(1);
  const [showInput, setShowInput] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({
      behavior: 'smooth'
    });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping, isTypingSecondMessage]);

  const handleAnimationEnd = () => {
    setAnimationComplete(true);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim() || !animationComplete) return;
  
    // Ocultar o input temporalmente
    setShowInput(false);
    setAnimationComplete(false);
  
    const userMessage: Message = {
      id: Date.now(),
      text: inputValue,
      sender: 'user',
      time: getCurrentTime(),
    };
  
    setMessages(prev => [...prev, userMessage]);
    const currentInput = inputValue;
    setInputValue('');
  
    try {
      setIsTyping(true);
      
      // Call OpenAI API for personalized response
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'gpt-4o-mini',
          messages: [
            {
              role: 'system',
              content: `Eres un asistente financiero. El usuario te enviará un gasto en formato "item precio" (ejemplo: "camisa 110"). Debes responder EXACTAMENTE en este formato:

Gasto añadido
📌 [ITEM] ([categoría])
💰 $ [PRECIO]

Categorías disponibles: alimentación, transporte, ropa, entretenimiento, salud, hogar, otros.
Define libremente la categoría más apropiada para el item.
Usa SIEMPRE el símbolo $ (dólar) para el precio.

Responde solo con el formato especificado, nada más.`
            },
            {
              role: 'user',
              content: currentInput
            }
          ],
          temperature: 0.3,
          max_tokens: 100
        }),
      });

      const data = await response.json();
      const aiResponse = data.choices[0].message.content;
      
      setTimeout(() => {
        setIsTyping(false);
        
        const currentTime = getCurrentTime();
        
        // Bot message with AI response
        const botMessage: Message = {
          id: Date.now() + 1,
          text: aiResponse,
          sender: 'bot',
          time: currentTime,
          isGroupMessage: true,
        };
        
        setMessages(prev => [...prev, botMessage]);
        
        // Send second message about the limit
        setTimeout(() => {
          setIsTypingSecondMessage(true);
          setTimeout(() => {
            setIsTypingSecondMessage(false);
            
            // Extract price and category for limit calculation
            const priceMatch = currentInput.match(/\d+/);
            const price = priceMatch ? priceMatch[0] : '100';
            const limitValue = Math.round(Number(price) * 1.5);
            
            // Extract category from AI response
            const categoryMatch = aiResponse.match(/\(([^)]+)\)/);
            const category = categoryMatch ? categoryMatch[1] : 'alimentación';
            
            const reminderMessage: Message = {
              id: Date.now() + 2,
              text: `Você está quase chegando no seu <strong>limite definido de $ ${limitValue}</strong> por mês com <strong>${category}</strong>.`,
              sender: 'bot',
              time: getCurrentTime(),
            };
            
            setMessages(prev => [...prev, reminderMessage]);
            
            setTimeout(() => {
              setShowContinueButton(true);
              setAnimationComplete(true);
            }, 800);
          }, 2000);
        }, 800);
      }, 2000);
    } catch (error) {
      console.error('Error en handleSubmit:', error);
      setIsTyping(false);
      
      // Fallback response if API fails
      setTimeout(() => {
        const fallbackResponse = `Gasto añadido\n📌 ${currentInput.split(' ')[0]} (otros)\n💰 $ ${currentInput.split(' ')[1] || '0'}`;
        
        const botMessage: Message = {
          id: Date.now() + 1,
          text: fallbackResponse,
          sender: 'bot',
          time: getCurrentTime(),
          isGroupMessage: true,
        };
        
        setMessages(prev => [...prev, botMessage]);
        
        setTimeout(() => {
          const priceMatch = currentInput.match(/\d+/);
          const price = priceMatch ? priceMatch[0] : '100';
          const limitValue = Math.round(Number(price) * 1.5);
          
          const reminderMessage: Message = {
            id: Date.now() + 2,
            text: `Você está quase chegando no seu <strong>limite definido de $ ${limitValue}</strong> por mês com <strong>outros</strong>.`,
            sender: 'bot',
            time: getCurrentTime(),
          };
          
          setMessages(prev => [...prev, reminderMessage]);
          
          setTimeout(() => {
            setShowContinueButton(true);
            setAnimationComplete(true);
          }, 1000);
        }, 1000);
      }, 2000);
    }
  };

  const handleContinue = () => {
    setCurrentStep(2);
  };

  const handleFinancialQuestionsContinue = () => {
    setCurrentStep(3);
  };

  const handleReminderDemoContinue = () => {
    setCurrentStep(4);
  };

  const handleGoalPlanningDemoContinue = () => {
    onContinue();
  };

  if (currentStep === 4) {
    return <GoalPlanningDemo onContinue={handleGoalPlanningDemoContinue} />;
  } else if (currentStep === 3) {
    return <ReminderDemo onContinue={handleReminderDemoContinue} />;
  } else if (currentStep === 2) {
    return <FinancialQuestions onContinue={handleFinancialQuestionsContinue} />;
  }

  return (
    <div className="w-full max-w-3xl bg-white px-4 py-12">
      <h2 className="text-sales-green text-3xl font-bold text-center mb-8">
        ¿Cómo Funciona?
      </h2>

      <p className="text-center mb-8 text-lg">
        Un asistente financiero <span className="font-bold py-0 px-0 mx-0 my-0 width-8 text-[#254d39]">en tu WhatsApp</span>,{' '}
        disponible 24h para ser tu <span className="font-bold text-[#254d39]">control financiero interactivo</span>.
      </p>

      <div className="flex justify-center mb-10">
        <button className="bg-sales-orange font-medium rounded-full transition-all duration-300 hover:bg-opacity-90 text-slate-950 mx-0 px-[14px] my-0 py-[4px]">
          Demostración
        </button>
      </div>

      <div className="mb-8">
        <div className="flex items-start mb-4">
          <div className="text-sales-orange font-bold rounded-full text-4xl mr-3 flex-shrink-0">
            1.
          </div>
          <div>
            <p className="text-lg mb-2">
              Escribe lo que compraste y cuánto costó, por ejemplo: <span className="font-bold text-sales-green">&quot;camisa 110&quot;</span>.
            </p>
            <p className="text-lg mb-4 text-sales-green">
              Registra un gasto (real o falso) para probar.
            </p>
            <p className="text-sm text-sales-green italic">
              No te preocupes por comas, ni por poner "$", escribe a tu manera.
            </p>
          </div>
        </div>
      </div>

      <div className="min-h-[50px]">
        {messages.map(message => (
          <MessageItem 
            key={message.id} 
            message={message} 
            onAnimationEnd={handleAnimationEnd} 
          />
        ))}
        {isTyping && <TypingIndicator />}
        {isTypingSecondMessage && <TypingIndicator />}
        <div ref={messagesEndRef} />
      </div>

      <div className="mt-4">
        {showContinueButton ? (
          <ContinueButton onClick={handleContinue} />
        ) : (
          showInput && (
            <ChatInput 
              inputValue={inputValue} 
              onInputChange={handleInputChange} 
              onSubmit={handleSubmit} 
              isDisabled={!animationComplete}
              placeholder="Ejemplo: camisa 110"
            />
          )
        )}
      </div>
    </div>
  );

  const handleContinue = () => {
    setCurrentStep(2);
  };

  const handleFinancialQuestionsContinue = () => {
    setCurrentStep(3);
  };

  const handleReminderDemoContinue = () => {
    setCurrentStep(4);
  };

  const handleGoalPlanningDemoContinue = () => {
    onContinue();
  };
};

export default HowItWorks;
