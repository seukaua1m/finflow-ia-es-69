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

const HowItWorks = () => {
  const [inputValue, setInputValue] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [isTypingSecondMessage, setIsTypingSecondMessage] = useState(false);
  const [showContinueButton, setShowContinueButton] = useState(false);
  const [animationComplete, setAnimationComplete] = useState(true);
  const [currentStep, setCurrentStep] = useState(1);
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim() || !animationComplete) return;

    setAnimationComplete(false);

    const userMessage: Message = {
      id: Date.now(),
      text: inputValue,
      sender: 'user',
      time: getCurrentTime()
    };
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');

    setTimeout(() => {
      setIsTyping(true);

      setTimeout(() => {
        setIsTyping(false);

        const currentTime = getCurrentTime();

        const parts = inputValue.split(' ');
        const itemName = parts[0].toUpperCase();
        const price = parts[1] || '0';
        const formattedDate = formatDate();
        const limit = calculateLimit(price);

        const expenseMessage: Message = {
          id: Date.now() + 1,
          text: `<strong>Gasto adicionado</strong>\n\n📌 ${itemName} (Delivery)\n\n<strong>R$ ${price},00</strong>\n\n${formattedDate}`,
          sender: 'bot',
          time: currentTime,
          isGroupMessage: true
        };
        setMessages(prev => [...prev, expenseMessage]);

        setTimeout(() => {
          setIsTypingSecondMessage(true);

          setTimeout(() => {
            setIsTypingSecondMessage(false);

            const reminderMessage: Message = {
              id: Date.now() + 2,
              text: `Lembrete: Você está quase chegando no seu <strong>limite definido de R$ ${limit}</strong> por mês com <strong>Delivery</strong>.`,
              sender: 'bot',
              time: currentTime
            };
            setMessages(prev => [...prev, reminderMessage]);

            setTimeout(() => {
              setShowContinueButton(true);
              setAnimationComplete(true);
            }, 800);
          }, 2000);
        }, 800);
      }, 2000);
    }, 800);
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
    console.log("Moving to the next step after Goal Planning Demo");
  };

  if (currentStep === 4) {
    return <GoalPlanningDemo onContinue={handleGoalPlanningDemoContinue} />;
  } else if (currentStep === 3) {
    return <ReminderDemo onContinue={handleReminderDemoContinue} />;
  } else if (currentStep === 2) {
    return <FinancialQuestions onContinue={handleFinancialQuestionsContinue} />;
  }

  return <div className="w-full max-w-3xl bg-white px-4 py-12">
      <h2 className="text-sales-green text-3xl font-bold text-center mb-8">
        Como Funciona?
      </h2>

      <p className="text-center mb-8 text-lg">
        Um assistente financeiro <span className="font-bold text-[#FFA35B] py-0 px-0 mx-0 my-0 width-8">no seu WhatsApp</span>,{' '}
        disponível 24h para ser seu <span className="font-bold text-[#254d39]">controle financeiro interativo</span>.
      </p>

      <div className="flex justify-center mb-10">
        <button className="bg-sales-orange font-medium rounded-full transition-all duration-300 hover:bg-opacity-90 text-slate-950 mx-0 py-0 px-[14px] my-[2px]">
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
        {messages.map(message => <MessageItem key={message.id} message={message} onAnimationEnd={handleAnimationEnd} />)}
        
        {isTyping && <TypingIndicator />}
        
        {isTypingSecondMessage && <TypingIndicator />}
        
        <div ref={messagesEndRef} />
      </div>

      <div className="mt-4">
        {!showContinueButton ? <ChatInput inputValue={inputValue} onInputChange={handleInputChange} onSubmit={handleSubmit} isDisabled={!animationComplete} /> : <ContinueButton onClick={handleContinue} />}
      </div>
    </div>;
};

export default HowItWorks;
