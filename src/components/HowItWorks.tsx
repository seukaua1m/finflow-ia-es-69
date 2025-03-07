import React, { useState, useEffect, useRef } from 'react';
import MessageItem from './chat/MessageItem';
import TypingIndicator from './chat/TypingIndicator';
import ChatInput from './chat/ChatInput';
import ContinueButton from './common/ContinueButton';
import FinancialQuestions from './FinancialQuestions';
import ReminderDemo from './ReminderDemo';
import GoalPlanningDemo from './GoalPlanningDemo';
import { Message } from '@/types/chat';
import { getCurrentTime, formatDate, calculateLimit } from '@/utils/messageUtils';
import axios from 'axios';

interface HowItWorksProps {
  onContinue: () => void;
}

// List of allowed domains for API requests
const ALLOWED_DOMAINS = ['br.finflow.shop', 'en.finflow.shop', 'es.finflow.shop'];

const fetchOpenAIResponse = async (message: string) => {
  try {
    // Check if the current domain is allowed
    const currentDomain = window.location.hostname;
    const isDomainAllowed = ALLOWED_DOMAINS.includes(currentDomain);
    
    // Allow local development
    const isLocalhost = currentDomain === 'localhost' || currentDomain === '127.0.0.1';
    
    if (!isDomainAllowed && !isLocalhost) {
      console.error('Domain not allowed for API requests:', currentDomain);
      return null;
    }
    
    const response = await axios.post('https://api.finflow.shop/api/chat/send', { 
      message,
      headers: {
        'Content-Type': 'application/json'
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching OpenAI response:', error);
    return null;
  }
};

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
  
    // Esconder o input temporariamente
    setShowInput(false);
    setAnimationComplete(false);
  
    const userMessage: Message = {
      id: Date.now(),
      text: inputValue,
      sender: 'user',
      time: getCurrentTime(),
    };
  
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
  
    try {
      setIsTyping(true);
      const apiResponse = await fetchOpenAIResponse(inputValue);
      setIsTyping(false);
  
      if (apiResponse) {
        const currentTime = getCurrentTime();
        let formattedResponse = apiResponse.response; // Mantemos a resposta original
        let isValidExpense = false;
        let category = "seus gastos"; // Categoria padrão caso não seja detectada
  
        // Verifica se a resposta segue o formato de um gasto
        if (typeof apiResponse === 'object' && apiResponse.response) {
          const parts = apiResponse.response.split('\n');
          if (parts.length >= 3 && parts[0].toLowerCase().includes("gasto adicionado")) {
            const [title, description, value] = parts;
            const [item, rawCategory] = description.split(' (');
  
            // Garante que a categoria está corretamente formatada sem parênteses extras
            category = rawCategory ? rawCategory.replace(")", "").trim() : category;
  
            formattedResponse = `${title}\n📌 ${item} (${category})\n💰 ${value}`;
            isValidExpense = true;
          }
        }
  
        // Mensagem do bot
        const botMessage: Message = {
          id: Date.now() + 1,
          text: formattedResponse,
          sender: 'bot',
          time: currentTime,
          isGroupMessage: isValidExpense,
        };
  
        setMessages(prev => [...prev, botMessage]);
  
        if (isValidExpense) {
          // Se for um gasto, envia a mensagem do lembrete de limite com a categoria correta
          setTimeout(() => {
            setIsTypingSecondMessage(true);
            setTimeout(() => {
              setIsTypingSecondMessage(false);
  
              const reminderMessage: Message = {
                id: Date.now() + 2,
                text: `Lembrete: Você está quase chegando no seu <strong>limite definido de R$ ${calculateLimit(
                  inputValue.split(' ')[1] || '0'
                )}</strong> por mês com <strong>${category}</strong>.`,
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
        } else {
          // Se não for um gasto, envia a mensagem da API e logo após "Por favor, tente novamente"
          setTimeout(() => {
            const errorMessage: Message = {
              id: Date.now() + 2,
              text: "Por favor, tente novamente.",
              sender: 'bot',
              time: getCurrentTime(),
            };
  
            setMessages(prev => [...prev, errorMessage]);
            setShowInput(true); // Reexibir input para nova tentativa
            setAnimationComplete(true);
          }, 1000);
        }
      }
    } catch (error) {
      console.error('Error in handleSubmit:', error);
      setIsTyping(false);
      setShowInput(true);
      setAnimationComplete(true);
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
        Como Funciona?
      </h2>

      <p className="text-center mb-8 text-lg">
        Um assistente financeiro <span className="font-bold py-0 px-0 mx-0 my-0 width-8 text-[#254d39]">no seu WhatsApp</span>,{' '}
        disponível 24h para ser seu <span className="font-bold text-[#254d39]">controle financeiro interativo</span>.
      </p>

      <div className="flex justify-center mb-10">
        <button className="bg-sales-orange font-medium rounded-full transition-all duration-300 hover:bg-opacity-90 text-slate-950 mx-0 px-[14px] my-0 py-[4px]">
          Demonstração
        </button>
      </div>

      <div className="mb-8">
        <div className="flex items-start mb-4">
          <div className="text-sales-orange font-bold rounded-full text-4xl mr-3 flex-shrink-0">
            1.
          </div>
          <div>
            <p className="text-lg mb-2">
              Digite o que comprou e quanto custou, por exemplo: <span className="font-bold text-sales-green">&quot;camisa 110&quot;</span>.
            </p>
            <p className="text-lg mb-4 text-sales-green">
              Registre um gasto (real ou falso) para testar.
            </p>
            <p className="text-sm text-sales-green italic">
              Não se preocupe com vírgulas, nem com por "R$", escreva do seu jeito.
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
            />
          )
        )}
      </div>
    </div>
  );
};

export default HowItWorks;
