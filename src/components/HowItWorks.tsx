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
import { supabase } from '@/integrations/supabase/client';

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
      
      // Call our edge function instead of OpenAI directly
      const { data, error } = await supabase.functions.invoke('categorize-expense', {
        body: { input: currentInput }
      });

      if (error) {
        throw new Error('Error en la función de categorización');
      }

      const aiResponse = data?.result || '';
      
      setTimeout(() => {
        setIsTyping(false);
        
        const currentTime = getCurrentTime();
        
        const botMessage: Message = {
          id: Date.now() + 1,
          text: aiResponse,
          sender: 'bot',
          time: currentTime,
          isGroupMessage: true,
        };
        
        setMessages(prev => [...prev, botMessage]);
        
        setTimeout(() => {
          setIsTypingSecondMessage(true);
          setTimeout(() => {
            setIsTypingSecondMessage(false);
            
            const priceMatch = currentInput.match(/\d+/);
            const price = priceMatch ? priceMatch[0] : '100';
            const limitValue = Math.round(Number(price) * 1.5);
            
            const categoryMatch = aiResponse.match(/\(([^)]+)\)/);
            const category = categoryMatch ? categoryMatch[1] : 'alimentación';
            
            const reminderMessage: Message = {
              id: Date.now() + 2,
              text: `Estás cerca de alcanzar tu <strong>límite definido de $ ${limitValue}</strong> por mes en <strong>${category}</strong>.`,
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
        const item = currentInput.split(' ')[0] || 'item';
        const price = currentInput.split(' ')[1] || '0';
        
        let category = 'otros';
        const itemLower = item.toLowerCase();
        
        if (['pizza', 'hamburguesa', 'comida', 'café', 'bebida', 'ifood', 'rappi'].some(word => itemLower.includes(word))) {
          category = 'alimentación';
        } else if (['camisa', 'pantalón', 'zapatos', 'ropa'].some(word => itemLower.includes(word))) {
          category = 'ropa';
        } else if (['uber', 'taxi', 'gasolina', 'bus', '99'].some(word => itemLower.includes(word))) {
          category = 'transporte';
        }
        
        const fallbackResponse = `Gasto añadido\n📌 ${item} (${category})\n💰 $ ${price}`;
        
        const botMessage: Message = {
          id: Date.now() + 1,
          text: fallbackResponse,
          sender: 'bot',
          time: getCurrentTime(),
          isGroupMessage: true,
        };
        
        setMessages(prev => [...prev, botMessage]);
        
        setTimeout(() => {
          const limitValue = Math.round(Number(price) * 1.5);
          
          const reminderMessage: Message = {
            id: Date.now() + 2,
            text: `Estás cerca de alcanzar tu <strong>límite definido de $ ${limitValue}</strong> por mes en <strong>${category}</strong>.`,
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
};

export default HowItWorks;
