
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
        Y Más Recursos:
      </h2>
      
      <p className="text-center mb-8">
        Además de lo que ya mostramos <span className="font-bold text-sales-green">también contamos con:</span>
      </p>
      
      {/* Resource Cards Grid */}
      <div className="grid grid-cols-2 gap-4 w-full mb-6">
        {/* Card 1 */}
        <div className="bg-sales-mint rounded-lg p-4 flex flex-col">
          <div className="flex items-center mb-2">
            <CheckCircle className="text-sales-green mr-2" size={20} />
            <h3 className="font-bold text-sales-green">Categorías Automáticas</h3>
          </div>
          <p className="text-sm">
            No necesitas crear nada. La IA <span className="font-bold text-sales-green">identifica y organiza</span> todos tus gastos sola.
          </p>
        </div>
        
        {/* Card 2 */}
        <div className="bg-sales-mint rounded-lg p-4 flex flex-col">
          <div className="flex items-center mb-2">
            <CheckCircle className="text-sales-green mr-2" size={20} />
            <h3 className="font-bold text-sales-green">Sugerencias Inteligentes</h3>
          </div>
          <p className="text-sm">
            Recibe consejos como: <span className="font-bold text-sales-green">"Estás gastando más en ocio este mes. Ten cuidado."</span>
          </p>
        </div>
        
        {/* Card 3 */}
        <div className="bg-sales-mint rounded-lg p-4 flex flex-col">
          <div className="flex items-center mb-2">
            <CheckCircle className="text-sales-green mr-2" size={20} />
            <h3 className="font-bold text-sales-green">Análisis De Compras</h3>
          </div>
          <p className="text-sm">
            <span className="font-bold">Di qué quieres comprar</span> y la IA analiza tu perfil y te dice: <span className="font-bold text-sales-green">pagar en cuotas, esperar o pagar al contado.</span>
          </p>
        </div>
        
        {/* Card 4 */}
        <div className="bg-sales-mint rounded-lg p-4 flex flex-col">
          <div className="flex items-center mb-2">
            <CheckCircle className="text-sales-green mr-2" size={20} />
            <h3 className="font-bold text-sales-green">Deja De Solo Ahorrar</h3>
          </div>
          <p className="text-sm">
            Participa en nuestros desafíos con recompensas <span className="font-bold text-sales-green">donde puedes ganar hasta R$ 3.000 / mes.</span>
          </p>
        </div>
      </div>
      
      <p className="text-center text-sales-green italic mb-6 font-semibold">y otros recursos...</p>
      
      <p className="text-center mb-4 max-w-md">
        Nuestro diferencial es justamente no ser SOLO una herramienta que usarás una vez y olvidarás.
      </p>
      
      <p className="text-center mb-8">
        No solo registrar gastos, sino <span className="font-bold text-sales-green">darte el PASO A PASO para que logres tus objetivos.</span>
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
