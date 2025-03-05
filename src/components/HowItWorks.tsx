
import React, { useState, useEffect, useRef } from 'react';
import { SendHorizontal, CheckCheck, CircleDollarSign } from 'lucide-react';

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'bot';
  time: string;
  isGroupMessage?: boolean;
}

// Typing indicator component
const TypingIndicator = () => {
  return (
    <div className="flex items-center justify-center bg-[#242625] text-white p-3 rounded-lg self-start mb-4 message-animation max-w-[100px]">
      <div className="flex space-x-2">
        <div className="w-3 h-3 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
        <div className="w-3 h-3 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
        <div className="w-3 h-3 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '600ms' }}></div>
      </div>
    </div>
  );
};

const HowItWorks = () => {
  const [inputValue, setInputValue] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Function to get current time in HH:MM format
  const getCurrentTime = () => {
    const now = new Date();
    return `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
  };

  // Scroll to bottom of messages
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  // Handle input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now(),
      text: inputValue,
      sender: 'user',
      time: getCurrentTime()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    
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
      
      // Format date as DD/MM/YYYY
      const now = new Date();
      const formattedDate = `${now.getDate().toString().padStart(2, '0')}/${(now.getMonth() + 1).toString().padStart(2, '0')}/${now.getFullYear()}`;
      
      // Add grouped expense info message
      const expenseMessage: Message = {
        id: Date.now() + 1,
        text: `Gasto adicionado\n\n📌 ${itemName} (Delivery)\n\nR$ ${price},00\n\n${formattedDate}`,
        sender: 'bot',
        time: currentTime,
        isGroupMessage: true
      };
      
      // Add reminder message
      const reminderMessage: Message = {
        id: Date.now() + 2,
        text: "Lembrete: Você está quase chegando no seu limite definido de R$ 66 por mês com Delivery.",
        sender: 'bot',
        time: currentTime
      };
      
      // Add messages with slight delay between them
      setTimeout(() => {
        setMessages(prev => [...prev, expenseMessage]);
        
        // Add reminder message after another delay
        setTimeout(() => {
          setMessages(prev => [...prev, reminderMessage]);
        }, 1000);
      }, 500);
    }, 2000);
  };

  // Format multi-line text with line breaks
  const formatMessageText = (text: string) => {
    return text.split('\n').map((line, i) => (
      <React.Fragment key={i}>
        {line}
        {i < text.split('\n').length - 1 && <br />}
      </React.Fragment>
    ));
  };

  return (
    <div className="w-full max-w-3xl bg-white px-4 py-12">
      <h2 className="text-sales-green text-3xl font-bold text-center mb-8">
        Como Funciona?
      </h2>

      <p className="text-center mb-8 text-lg">
        Um assistente financeiro <span className="font-bold text-[#254d39]">no seu WhatsApp</span>,{' '}
        disponível 24h para ser seu <span className="font-bold text-[#254d39]">controle financeiro interativo</span>.
      </p>

      <div className="flex justify-center mb-10">
        <button className="bg-sales-orange font-medium rounded-full transition-all duration-300 hover:bg-opacity-90 text-slate-950 px-[13px] py-[10px] mx-0 my-0">
          Demonstração
        </button>
      </div>

      <div className="mb-8">
        <div className="flex items-start mb-4">
          <div className="bg-sales-orange text-white font-bold rounded-full w-8 h-8 flex items-center justify-center mr-3 flex-shrink-0">
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

      {/* Chat area - now without the dark container */}
      <div className="mb-4 min-h-[300px]">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`mb-4 flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`relative p-3 rounded-lg max-w-[80%] message-animation ${
                message.sender === 'user'
                  ? 'bg-[#154D39] text-white'
                  : 'bg-[#242625] text-white'
              }`}
            >
              <p>{formatMessageText(message.text)}</p>
              <div className={`text-xs text-gray-300 text-right mt-1 flex items-center justify-end`}>
                <span>{message.time}</span>
                {message.sender === 'user' && (
                  <CheckCheck size={16} className="ml-1 text-gray-300" />
                )}
              </div>
            </div>
          </div>
        ))}
        
        {/* Typing indicator */}
        {isTyping && <TypingIndicator />}
        
        <div ref={messagesEndRef} />
      </div>

      {/* Message input form */}
      <form onSubmit={handleSubmit} className="flex gap-4">
        <input
          type="text"
          placeholder="Exemplo: ifood 44"
          value={inputValue}
          onChange={handleInputChange}
          className="w-full px-4 py-3 border border-gray-300 rounded-full focus:outline-none focus:ring-1 focus:ring-sales-green"
        />
        <button
          type="submit"
          className="bg-[#1DA861] text-white p-3 rounded-full flex items-center justify-center min-w-[56px] h-[56px]"
        >
          <SendHorizontal size={24} />
        </button>
      </form>
    </div>
  );
};

export default HowItWorks;
