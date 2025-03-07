
import React, { useEffect, useState } from 'react';
import { CheckCheck } from 'lucide-react';
import { Message } from '@/types/chat';
import { getCurrencySymbol } from '@/utils/messageUtils';

interface MessageItemProps {
  message: Message;
  onAnimationEnd: () => void;
}

const MessageItem = ({
  message,
  onAnimationEnd
}: MessageItemProps) => {
  const [currencySymbol, setCurrencySymbol] = useState<string>('$');

  useEffect(() => {
    // Obtener el símbolo de moneda del país del usuario
    const storedCountry = localStorage.getItem('visitor_country') || '';
    setCurrencySymbol(getCurrencySymbol(storedCountry));
  }, []);

  // Format message text with HTML
  const formatMessageText = (text: string) => {
    if (message.isGroupMessage) {
      const parts = text.split('📌');
      if (parts.length < 2) return text; // Si no hay estructura esperada, devuelve el texto normal
      
      const itemDetails = parts[1].split('💰');
      if (itemDetails.length < 2) return text;
  
      const descripcion = itemDetails[0].trim();
      let valor = itemDetails[1].trim();
      
      // Reemplazar R$ o cualquier otro símbolo de moneda por el símbolo actual
      valor = valor.replace(/[\$\€\£\¥\₹\₽\₿\R\$\S\/\₲\Bs\$U\MX\$\AR\$\CL\$\CO\$][\s]*/g, `${currencySymbol} `);
      
      const today = new Date().toLocaleDateString('es-ES');
  
      return (
        <>
          <div className="font-bold">Gasto añadido</div>
          <div>📌 {descripcion}</div>
          <div className="font-bold">💰 <strong>{valor}</strong></div>
          <br />
          <div>{today}</div> 
        </>
      );
    }
  
    // Reemplazar ocurrencias de símbolos de moneda en mensajes regulares
    let formattedText = text;
    if (typeof formattedText === 'string') {
      // Reemplazar R$ u otros símbolos seguidos de un número
      formattedText = formattedText.replace(/[\$\€\£\¥\₹\₽\₿\R\$\S\/\₲\Bs\$U\MX\$\AR\$\CL\$\CO\$][\s]*(\d+)/g, 
        (match, number) => `${currencySymbol} ${number}`);
    }
  
    // Solo devuelve el texto normal para mensajes comunes
    return <span dangerouslySetInnerHTML={{ __html: formattedText }} />;
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
