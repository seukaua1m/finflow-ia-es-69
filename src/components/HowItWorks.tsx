
import React, { useState, useEffect, useRef } from 'react';
import MessageItem from './chat/MessageItem';
import TypingIndicator from './chat/TypingIndicator';
import ChatInput from './chat/ChatInput';
import ContinueButton from './common/ContinueButton';
import ActionButton from './chat/ActionButton';
import { Message } from '@/types/chat';
import { getCurrentTime, formatDate, calculateLimit } from '@/utils/messageUtils';

const HowItWorks = () => {
  const [inputValue, setInputValue] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [isTypingSecondMessage, setIsTypingSecondMessage] = useState(false);
  const [isTypingThirdMessage, setIsTypingThirdMessage] = useState(false);
  const [isTypingFourthMessage, setIsTypingFourthMessage] = useState(false);
  const [showContinueButton, setShowContinueButton] = useState(false);
  const [showActionButton, setShowActionButton] = useState(false);
  const [showSecondActionButton, setShowSecondActionButton] = useState(false);
  const [animationComplete, setAnimationComplete] = useState(true);
  const [step, setStep] = useState(1);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom of messages
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({
      behavior: 'smooth'
    });
  };
  
  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping, isTypingSecondMessage, isTypingThirdMessage, isTypingFourthMessage]);

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
    setShowContinueButton(false);
    setShowActionButton(true);
    setStep(2);
  };

  // Handle action button click
  const handleActionClick = () => {
    if (!animationComplete) return;
    setAnimationComplete(false);
    setShowActionButton(false);

    // Add user action message
    const actionMessage: Message = {
      id: Date.now(),
      text: "quanto eu gastei nos últimos dias?",
      sender: 'user',
      time: "14:12",
      isAction: true
    };
    setMessages(prev => [...prev, actionMessage]);

    // Wait for user message animation to complete (0.8s)
    setTimeout(() => {
      setIsTyping(true);

      // Simulate bot response after delay
      setTimeout(() => {
        setIsTyping(false);

        // Bar chart message
        const barChartMessage: Message = {
          id: Date.now() + 1,
          text: "Últimos 7 dias\n\nR$ 632,00 - 27/02 a 05/03",
          sender: 'bot',
          time: "14:12",
          isBarChart: true
        };
        setMessages(prev => [...prev, barChartMessage]);

        // Show typing indicator for trend message
        setTimeout(() => {
          setIsTypingSecondMessage(true);

          setTimeout(() => {
            setIsTypingSecondMessage(false);

            // Trend message
            const trendMessage: Message = {
              id: Date.now() + 2,
              text: "Seus gastos aumentaram em 20% essa semana",
              sender: 'bot',
              time: "14:12"
            };
            setMessages(prev => [...prev, trendMessage]);

            // Show action button for pie chart
            setTimeout(() => {
              setIsTypingThirdMessage(true);

              setTimeout(() => {
                setIsTypingThirdMessage(false);

                // Second action button message
                const secondActionMessage: Message = {
                  id: Date.now() + 3,
                  text: "Segue gráfico dos seus gastos dos últimos 7 dias 👈",
                  sender: 'bot',
                  time: "14:12",
                  isAction: true
                };
                setMessages(prev => [...prev, secondActionMessage]);

                setTimeout(() => {
                  setIsTypingFourthMessage(true);

                  setTimeout(() => {
                    setIsTypingFourthMessage(false);

                    // Pie chart message
                    const pieChartMessage: Message = {
                      id: Date.now() + 4,
                      text: "Divisão de gastos\n\n27/02 a 05/03",
                      sender: 'bot',
                      time: "14:12",
                      isPieChart: true
                    };
                    setMessages(prev => [...prev, pieChartMessage]);

                    // Show final action button
                    setTimeout(() => {
                      const finalActionMessage: Message = {
                        id: Date.now() + 5,
                        text: "Segue o gráfico da divisão dos seus gastos por categoria 👈",
                        sender: 'bot',
                        time: "14:12",
                        isAction: true
                      };
                      setMessages(prev => [...prev, finalActionMessage]);
                      setAnimationComplete(true);
                    }, 800);
                  }, 2000);
                }, 800);
              }, 2000);
            }, 800);
          }, 2000);
        }, 800);
      }, 2000);
    }, 800);
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

      {step === 1 && (
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
      )}

      {step === 2 && (
        <div className="mb-8">
          <div className="flex items-start mb-4">
            <div className="text-sales-orange font-bold rounded-full text-4xl mr-3 flex-shrink-0">
              2.
            </div>
            <div>
              <p className="text-lg mb-2">
                Veja seus gastos e relatórios em tempo real.
              </p>
              <p className="text-lg mb-4 text-sales-green">
                Teste perguntando <span className="font-bold">"quanto eu gastei nos últimos dias?"</span>
              </p>
              <p className="text-sm text-sales-green italic">
                Você pode perguntar de várias formas diferentes e a IA irá entender.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Chat area */}
      <div className="min-h-[50px]">
        {messages.map(message => <MessageItem key={message.id} message={message} onAnimationEnd={handleAnimationEnd} />)}
        
        {/* Typing indicator */}
        {isTyping && <TypingIndicator />}
        
        {/* Second typing indicator between bot messages */}
        {isTypingSecondMessage && <TypingIndicator />}

        {/* Third typing indicator for trend message */}
        {isTypingThirdMessage && <TypingIndicator />}

        {/* Fourth typing indicator for pie chart */}
        {isTypingFourthMessage && <TypingIndicator />}
        
        <div ref={messagesEndRef} />
      </div>

      {/* Message input form or continue button */}
      <div className="mt-4">
        {!showContinueButton && !showActionButton && !messages.length ? (
          <ChatInput inputValue={inputValue} onInputChange={handleInputChange} onSubmit={handleSubmit} isDisabled={!animationComplete} />
        ) : showContinueButton ? (
          <ContinueButton onClick={handleContinue} />
        ) : showActionButton ? (
          <ActionButton text="quanto eu gastei nos últimos dias?" onClick={handleActionClick} />
        ) : null}
      </div>
    </div>;
};

export default HowItWorks;
