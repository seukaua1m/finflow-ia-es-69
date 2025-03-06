import React from 'react';
import { CheckCircle } from 'lucide-react';
import ActionButton from './common/ActionButton';
interface AdditionalResourcesProps {
  onContinue: () => void;
}
const AdditionalResources = ({
  onContinue
}: AdditionalResourcesProps) => {
  return <div className="w-full max-w-3xl px-4 py-12 sm:py-16 flex flex-col items-center bg-white">
      <h2 className="text-sales-green text-3xl font-bold text-center mb-6">
        E Mais Recursos:
      </h2>
      
      <p className="text-center mb-8">
        Além do que já mostramos <span className="font-bold text-sales-green">também contamos com:</span>
      </p>
      
      {/* Resource Cards Grid */}
      <div className="grid grid-cols-2 gap-4 w-full mb-6">
        {/* Card 1 */}
        <div className="bg-sales-mint rounded-lg p-4 flex flex-col">
          <div className="flex items-center mb-2">
            <CheckCircle className="text-sales-green mr-2" size={20} />
            <h3 className="font-bold text-sales-green">Categorias Automáticas</h3>
          </div>
          <p className="text-sm">
            Você não precisa criar nada. A IA <span className="font-bold text-sales-green">identifica e organiza</span> todos os seus gastos sozinha.
          </p>
        </div>
        
        {/* Card 2 */}
        <div className="bg-sales-mint rounded-lg p-4 flex flex-col">
          <div className="flex items-center mb-2">
            <CheckCircle className="text-sales-green mr-2" size={20} />
            <h3 className="font-bold text-sales-green">Sugestões Inteligentes</h3>
          </div>
          <p className="text-sm">
            Acompanhe dicas como: <span className="font-bold text-sales-green">"Você está gastando mais em lazer este mês. Fique de olho."</span>
          </p>
        </div>
        
        {/* Card 3 */}
        <div className="bg-sales-mint rounded-lg p-4 flex flex-col">
          <div className="flex items-center mb-2">
            <CheckCircle className="text-sales-green mr-2" size={20} />
            <h3 className="font-bold text-sales-green">Análise De Compras</h3>
          </div>
          <p className="text-sm">
            <span className="font-bold">Diga o que quer comprar</span> e a IA analisa seu perfil e te diz: <span className="font-bold text-sales-green">parcelar, esperar ou pagar à vista.</span>
          </p>
        </div>
        
        {/* Card 4 */}
        <div className="bg-sales-mint rounded-lg p-4 flex flex-col">
          <div className="flex items-center mb-2">
            <CheckCircle className="text-sales-green mr-2" size={20} />
            <h3 className="font-bold text-sales-green">Pare De Só Economizar</h3>
          </div>
          <p className="text-sm">
            Participe dos nossos desafios com recompensas <span className="font-bold text-sales-green">onde você pode ganhar até R$ 3.000 / mês.</span>
          </p>
        </div>
      </div>
      
      <p className="text-center text-sales-green italic mb-6 font-semibold">e outros recursos...</p>
      
      <p className="text-center mb-4 max-w-md">
        Nosso diferencial é justamente não ser SÓ uma ferramenta que você vai usar uma vez e esquecer.
      </p>
      
      <p className="text-center mb-8">
        Não só registrar gastos, mas sim <span className="font-bold text-sales-green">te dar o PASSO A PASSO para você realizar seus objetivos.</span>
      </p>
      
      <div className="w-full max-w-sm">
        <button onClick={onContinue} className="w-full bg-sales-orange text-slate-950 font-semibold py-4 px-6 rounded-lg
            transition-all duration-300 hover:bg-opacity-90 hover:shadow-md
            focus:outline-none focus:ring-2 focus:ring-sales-orange focus:ring-opacity-50">
          Continuar
        </button>
      </div>
    </div>;
};
export default AdditionalResources;