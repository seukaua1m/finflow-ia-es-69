
import React from 'react';

const PromotionAlertSection = () => {
  return (
    <div className="mb-8 space-y-8 animate-fade-in">
      <div className="flex items-start mb-4">
        <div className="text-[#FFA35B] font-bold rounded-full text-4xl mr-3 flex-shrink-0">
          7.
        </div>
        <div>
          <h2 className="text-[#10372B] text-xl font-medium mb-2">
            Alerta de Promoções
          </h2>
          <p className="text-lg mb-2">
            Economize também nas compras, 
          </p>
          <p className="text-lg mb-2">
            nossa IA te envia as melhores 
            promoções que ela encontra.
          </p>
        </div>
      </div>

      {/* Chat conversation */}
      <div className="space-y-3">
        {/* First bot message about iPhone interest */}
        <div className="flex justify-start animate-fade-in" style={{animationDelay: "0.1s"}}>
          <div className="relative py-2 px-3 rounded-lg bg-[#202C33] text-white max-w-[85%] md:max-w-[75%]">
            <div className="text-sm">
              <span role="img" aria-label="gift">🎁</span> Você demonstrou interesse em um Iphone 16 alguns dias atrás. <strong>Encontrei uma promoção:</strong>
            </div>
            <div className="text-[10px] text-gray-300 mt-1 text-right">
              23:52
            </div>
          </div>
        </div>

        {/* Second bot message with promotion details */}
        <div className="flex justify-start animate-fade-in" style={{animationDelay: "0.2s"}}>
          <div className="relative py-2 px-3 rounded-lg bg-[#202C33] text-white max-w-[85%] md:max-w-[75%]">
            <div className="text-sm space-y-3">
              <p>
                <span className="text-yellow-400">✨</span> Apple iPhone 16 (128 GB) – Ultramarino
              </p>
              <p>
                por R$ 5.599 no pix 🔥 🔥
              </p>
              <p>
                💳 ou 10x de R$ 626,55
              </p>
              <p>
                🎟️ Use o cupom: APPLE400
              </p>
              <p>
                🛍️ Compre aqui:
              </p>
              <p className="text-green-400 blur-[3px] select-none">
                www.amazonshopping.com.br
              </p>
            </div>
            <div className="text-[10px] text-gray-300 mt-1 text-right">
              23:52
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PromotionAlertSection;
