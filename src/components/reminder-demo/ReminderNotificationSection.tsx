
import React from 'react';

const ReminderNotificationSection = () => {
  return (
    <div className="mb-8 space-y-8">
      <div className="flex items-start mb-4">
        <div className="text-[#FFA35B] font-bold rounded-full text-4xl mr-3 flex-shrink-0">
          4.
        </div>
        <div>
          <p className="text-lg mb-2">
            E seja lembrado com antecedência.
          </p>
        </div>
      </div>

      {/* Images for section 4 instead of chat messages */}
      <div className="space-y-4">
        <div className="flex justify-center">
          <img 
            src="/lovable-uploads/fa5ae072-5083-4020-b2b5-f4d7ae6ff7b4.png" 
            alt="Lembretes e confirmação de pagamento" 
            className="max-w-[80%]"
          />
        </div>
      </div>
    </div>
  );
};

export default ReminderNotificationSection;
