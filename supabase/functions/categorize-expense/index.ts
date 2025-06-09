
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const openAIApiKey = Deno.env.get('OPENAI_API_KEY');

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { input } = await req.json();

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          {
            role: 'system',
            content: `Eres un asistente financiero. El usuario te enviará un gasto en formato "item precio" (ejemplo: "camisa 110").

Analiza cuidadosamente el item y categorízalo según estas categorías específicas:

ALIMENTACIÓN: comida, pizza, hamburguesa, sandwich, café, bebidas, gaseosa, agua, jugo, cerveza, vino, restaurant, delivery, supermercado, snacks, dulces, pan, leche, huevos, carne, pollo, pescado, verduras, frutas, ifood, rappi, uber eats

TRANSPORTE: uber, taxi, gasolina, combustible, bus, metro, tren, estacionamiento, peajes, pasaje, boleto, viaje en auto, 99

ROPA: camisa, pantalón, zapatos, zapatillas, vestido, falda, chaqueta, abrigo, ropa interior, calcetines, medias, sombrero, gorra, bolso, cartera, accesorios

ENTRETENIMIENTO: cine, película, concierto, juego, videojuego, streaming, netflix, spotify, salida nocturna, bar, discoteca, teatro, museo

SALUD: medicina, medicamento, consulta médica, doctor, dentista, gimnasio, productos de cuidado personal, shampoo, jabón, crema

HOGAR: productos de limpieza, detergente, decoración, muebles, electrodomésticos, cocina, baño, dormitorio

EDUCACIÓN: curso, libro, materiales de estudio, universidad, colegio, clases

VIAJES: hotel, vuelo, avión, tour, equipaje, hospedaje, turismo

OTROS: solo para gastos que realmente no encajan en ninguna categoría anterior

EJEMPLOS ESPECÍFICOS:
- "camisa 50" → ROPA
- "pizza 25" → ALIMENTACIÓN  
- "uber 15" → TRANSPORTE
- "netflix 12" → ENTRETENIMIENTO
- "ifood 343" → ALIMENTACIÓN
- "gasolina 80" → TRANSPORTE
- "shampoo 15" → SALUD

Debes responder EXACTAMENTE en este formato:

Gasto añadido
📌 [ITEM] ([categoría])
💰 $ [PRECIO]

Usa SIEMPRE el símbolo $ (dólar) para el precio.
La categoría debe ser en minúsculas.
Responde solo con el formato especificado, nada más.`
          },
          {
            role: 'user',
            content: input
          }
        ],
        temperature: 0.1,
        max_tokens: 100
      }),
    });

    if (!response.ok) {
      throw new Error('Error en la respuesta de OpenAI');
    }

    const data = await response.json();
    const result = data.choices?.[0]?.message?.content || '';
    
    return new Response(JSON.stringify({ result }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error in categorize-expense function:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
