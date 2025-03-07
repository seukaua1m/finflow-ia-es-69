
import React, { useState } from 'react';
import { SendHorizontal } from 'lucide-react';
import { trackUserInput } from '@/services/analyticsService';

interface ChatInputProps {
  inputValue: string;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent) => void;
  isDisabled: boolean;
  placeholder?: string;
}

const ChatInput = ({ 
  inputValue, 
  onInputChange, 
  onSubmit, 
  isDisabled,
  placeholder = "Ejemplo: ifood 44" 
}: ChatInputProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // No enviar si ya está enviando o está deshabilitado
    if (isSubmitting || isDisabled || !inputValue.trim()) {
      return;
    }
    
    // Establecer estado de envío
    setIsSubmitting(true);
    
    // Rastrear entrada del usuario si hay un valor - no bloqueante
    if (inputValue.trim()) {
      // Hacemos esto no bloqueante para acelerar el tiempo de respuesta
      trackUserInput(inputValue, 'ChatInput').catch(console.error);
    }
    
    try {
      // Llamar al manejador onSubmit original
      onSubmit(e);
    } catch (error) {
      console.error('Error al enviar mensaje:', error);
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <form onSubmit={handleSubmit} className="flex gap-4">
      <input 
        type="text" 
        placeholder={placeholder} 
        value={inputValue} 
        onChange={onInputChange} 
        className="w-full px-4 py-3 border border-gray-300 rounded-full focus:outline-none focus:ring-1 focus:ring-sales-green" 
        disabled={isDisabled || isSubmitting}
      />
      <button 
        type="submit" 
        className={`bg-[#1DA861] text-white p-3 rounded-full flex items-center justify-center min-w-[56px] h-[56px] ${(isDisabled || isSubmitting) ? 'opacity-70 cursor-not-allowed' : 'hover:bg-[#179555] transition-colors'}`}
        disabled={isDisabled || isSubmitting}
      >
        <SendHorizontal size={24} />
      </button>
    </form>
  );
};

export default ChatInput;
