
import React from 'react';
import { CheckCheck } from 'lucide-react';
import { Message } from '@/types/chat';

interface MessageItemProps {
  message: Message;
  onAnimationEnd: () => void;
}

const MessageItem = ({
  message,
  onAnimationEnd
}: MessageItemProps) => {
  // Format message text with HTML
  const formatMessageText = (text: string) => {
    if (message.isGroupMessage) {
      const parts = text.split('📌');
      if (parts.length < 2) return text; // Si no hay estructura esperada, devuelve el texto normal
      
      const itemDetails = parts[1].split('💰');
      if (itemDetails.length < 2) return text;
  
      const descripcion = itemDetails[0].trim();
      const valor = itemDetails[1].trim();
      
      // Format date as DD/MM/YYYY with leading zeros
      const today = new Date();
      const day = today.getDate().toString().padStart(2, '0');
      const month = (today.getMonth() + 1).toString().padStart(2, '0');
      const year = today.getFullYear();
      const formattedDate = `${day}/${month}/${year}`;
  
      return (
        <>
          <div className="font-bold">Gasto añadido</div>
          <div>📌 {descripcion}</div>
          <div className="font-bold">💰 <strong>{valor}</strong></div>
          <br />
          <div>{formattedDate}</div> 
        </>
      );
    }
  
    // Solo devuelve el texto normal para mensajes comunes
    return <span dangerouslySetInnerHTML={{ __html: text }} />;
};
  

  return (
    <div className={`mb-2 flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`} onAnimationEnd={onAnimationEnd}>
      <div className={`relative py-1.5 px-3 rounded-lg message-animation 
        ${message.sender === 'user' 
          ? 'bg-[#005C4B] text-white max-w-[95%]' 
          : 'bg-[#202C33] text-white max-w-[80%] md:max-w-[70%] lg:max-w-[60%]'}`}>
        <div className="flex flex-col">
          <div className="text-sm text-left">{formatMessageText(message.text)}</div>
          <div className="text-[10px] text-gray-300 mt-1 flex justify-end items-center">
            <span>{message.time}</span>
            {message.sender === 'user' && <CheckCheck size={12} className="ml-1 text-gray-300" />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MessageItem;
