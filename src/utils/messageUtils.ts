
// Función para obtener la hora actual en formato HH:MM
export const getCurrentTime = () => {
  const now = new Date();
  return `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
};

// Formatear fecha como DD/MM/AAAA
export const formatDate = (date = new Date()) => {
  return `${date.getDate().toString().padStart(2, '0')}/${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getFullYear()}`;
};

// Obtener el símbolo de la moneda según el país
export const getCurrencySymbol = (country?: string): string => {
  const defaultCurrency = 'R$'; // Moneda por defecto (Brasil)
  
  if (!country) {
    // Si no tenemos información del país, usamos la moneda por defecto
    return defaultCurrency;
  }
  
  // Mapa de países a símbolos de moneda
  const currencyMap: Record<string, string> = {
    'Brazil': 'R$',
    'Brasil': 'R$',
    'United States': '$',
    'Estados Unidos': '$',
    'Mexico': 'MX$',
    'México': 'MX$',
    'Spain': '€',
    'España': '€',
    'Argentina': 'AR$',
    'Chile': 'CL$',
    'Colombia': 'CO$',
    'Peru': 'S/',
    'Perú': 'S/',
    'Ecuador': '$',
    'Venezuela': 'Bs',
    'Uruguay': '$U',
    'Paraguay': '₲',
    'Bolivia': 'Bs',
  };
  
  return currencyMap[country] || defaultCurrency;
};

// Calcular límite como 1.5x el valor ingresado
export const calculateLimit = (price: string | number): number => {
  return Math.round(Number(price) * 1.5);
};

// Formatear un rango de fechas para los últimos 7 días
export const getLast7DaysRange = () => {
  const endDate = new Date();
  const startDate = new Date();
  startDate.setDate(endDate.getDate() - 6);
  
  return {
    start: startDate,
    end: endDate,
    formatted: `${formatDate(startDate)} a ${formatDate(endDate)}`
  };
};
