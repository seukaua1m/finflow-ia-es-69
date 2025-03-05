import React, { useState, useEffect, useRef } from 'react';
import MessageItem from './chat/MessageItem';
import TypingIndicator from './chat/TypingIndicator';
import ChatInput from './chat/ChatInput';
import ContinueButton from './common/ContinueButton';
import { Message } from '@/types/chat';
import { getCurrentTime, formatDate, calculateLimit } from '@/utils/messageUtils';
const HowItWorks = () => {
  const [inputValue, setInputValue] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [isTypingSecondMessage, setIsTypingSecondMessage] = useState(false);
  const [showContinueButton, setShowContinueButton] = useState(false);
  const [animationComplete, setAnimationComplete] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom of messages
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({
      behavior: 'smooth'
    });
  };
  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping, isTypingSecondMessage]);

  // Handle animation end
  const handleAnimationEnd = () => {
    setAnimationComplete(true);
  };

  // Handle input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim() || !animationComplete) return;

    // Disable animations while processing
    setAnimationComplete(false);

    // Add user message
    const userMessage: Message = {
      id: Date.now(),
      text: inputValue,
      sender: 'user',
      time: getCurrentTime()
    };
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');

    // Wait for user message animation to complete (0.8s)
    setTimeout(() => {
      // Show typing indicator
      setIsTyping(true);

      // Simulate bot response after delay
      setTimeout(() => {
        setIsTyping(false);

        // Create the grouped expense message
        const currentTime = getCurrentTime();

        // Extract first word as item name and second word as price
        const parts = inputValue.split(' ');
        const itemName = parts[0].toUpperCase();
        const price = parts[1] || '0';
        const formattedDate = formatDate();
        const limit = calculateLimit(price);

        // Add expense info message with proper formatting
        const expenseMessage: Message = {
          id: Date.now() + 1,
          text: `<strong>Gasto adicionado</strong>\n\n📌 ${itemName} (Delivery)\n\n<strong>R$ ${price},00</strong>\n\n${formattedDate}`,
          sender: 'bot',
          time: currentTime,
          isGroupMessage: true
        };
        setMessages(prev => [...prev, expenseMessage]);

        // Show typing indicator again after first message
        setTimeout(() => {
          setIsTypingSecondMessage(true);

          // Wait for a moment before showing second bot message
          setTimeout(() => {
            setIsTypingSecondMessage(false);

            // Add reminder message with bold text for the limit
            const reminderMessage: Message = {
              id: Date.now() + 2,
              text: `Lembrete: Você está quase chegando no seu <strong>limite definido de R$ ${limit}</strong> por mês com <strong>Delivery</strong>.`,
              sender: 'bot',
              time: currentTime
            };
            setMessages(prev => [...prev, reminderMessage]);

            // Show continue button after all messages are displayed
            setTimeout(() => {
              setShowContinueButton(true);
              setAnimationComplete(true);
            }, 800);
          }, 2000);
        }, 800);
      }, 2000);
    }, 800);
  };

  // Handle continue button click
  const handleContinue = () => {
    // Add continue functionality here
    console.log("Continue button clicked");
  };
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

      {/* Chat area */}
      <div className="min-h-[50px]">
        {messages.map(message => <MessageItem key={message.id} message={message} onAnimationEnd={handleAnimationEnd} />)}
        
        {/* Typing indicator */}
        {isTyping && <TypingIndicator />}
        
        {/* Second typing indicator between bot messages */}
        {isTypingSecondMessage && <TypingIndicator />}
        
        <div ref={messagesEndRef} />
      </div>

      {/* Message input form or continue button */}
      <div className="mt-4">
        {!showContinueButton ? <ChatInput inputValue={inputValue} onInputChange={handleInputChange} onSubmit={handleSubmit} isDisabled={!animationComplete} /> : <ContinueButton onClick={handleContinue} />}
      </div>
    </div>;
};
export default HowItWorks;