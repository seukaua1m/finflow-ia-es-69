
import React from 'react';
import SalesCard from '@/components/SalesCard';
import { ArrowRight } from 'lucide-react';

const Index = () => {
  return (
    <div className="min-h-screen bg-white flex flex-col items-center">
      <div className="w-full max-w-3xl px-4 py-12 sm:py-16 flex flex-col items-center">
        {/* Subtítulo superior */}
        <h2 className="text-sales-gray text-center text-lg mb-8 italic font-light animate-fade-in">
          A mesma tecnologia usada por<br />gerentes de investimentos.
        </h2>

        {/* Headline principal */}
        <h1 className="text-sales-green text-3xl sm:text-4xl font-bold text-center mb-6 leading-tight animate-fade-in">
          Economize <span className="highlight-text">+ de 300 Reais Em 30 Dias</span> Sem Cortar Os "Luxos"<br />
          E Apenas Com O Whatsapp.
        </h1>

        {/* Subheadline */}
        <p className="text-center text-lg mb-12 animate-fade-in">
          Não é app, nem planilha, nem Notion,<br />
          <span className="text-sales-green font-bold">é inteligência artificial de ponta.</span>
        </p>

        {/* Cards - Updated to 2x2 grid */}
        <div className="grid grid-cols-2 gap-5 w-full mb-12">
          <SalesCard title="Para onde vai seu dinheiro?">
            <p>
              Você trabalha o mês inteiro, mas no final{' '}
              <span className="font-bold">nunca sabe onde foi parar tudo que ganhou.</span>
            </p>
          </SalesCard>

          <SalesCard title="Sem planilhas ou apps">
            <p>
              São soluções complicadas que dão preguiça de usar.{' '}
              <span className="font-bold">Aqui você resolve tudo no Whatsapp.</span>
            </p>
          </SalesCard>

          <SalesCard title="Perdido nas dívidas">
            <p>
              Não sabe quanto paga de parcela, quanto tempo falta, quem deve,{' '}
              <span className="font-bold">e não tem um plano para pagar.</span>
            </p>
          </SalesCard>

          <SalesCard title="Pagando mais caro sempre">
            <p>
              Você compra por impulso ou não pesquisa antes,{' '}
              <span className="font-bold">gastando mais e deixando de economizar.</span>
            </p>
          </SalesCard>
        </div>

        {/* Botão Continuar */}
        <button className="btn-continue flex items-center justify-center gap-2 animate-fade-in">
          Continuar
          <ArrowRight size={20} />
        </button>
      </div>
    </div>
  );
};

export default Index;
