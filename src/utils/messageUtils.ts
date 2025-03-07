
import getSymbolFromCurrency from 'currency-symbol-map';

// Función para obtener la hora actual en formato HH:MM
export const getCurrentTime = () => {
  const now = new Date();
  return `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
};

// Formatear fecha como DD/MM/AAAA
export const formatDate = (date = new Date()) => {
  return `${date.getDate().toString().padStart(2, '0')}/${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getFullYear()}`;
};

// Mapa para convertir países a códigos ISO de moneda
const countryCurrencyMap: Record<string, string> = {
  'Brazil': 'BRL',
  'Brasil': 'BRL',
  'United States': 'USD',
  'Estados Unidos': 'USD',
  'Mexico': 'MXN',
  'México': 'MXN',
  'Spain': 'EUR',
  'España': 'EUR',
  'Argentina': 'ARS',
  'Chile': 'CLP',
  'Colombia': 'COP',
  'Peru': 'PEN',
  'Perú': 'PEN',
  'Ecuador': 'USD',
  'Venezuela': 'VES',
  'Uruguay': 'UYU',
  'Paraguay': 'PYG',
  'Bolivia': 'BOB',
  'United Kingdom': 'GBP',
  'Reino Unido': 'GBP',
  'Germany': 'EUR',
  'Alemania': 'EUR',
  'France': 'EUR',
  'Francia': 'EUR',
  'Italy': 'EUR',
  'Italia': 'EUR',
  'Canada': 'CAD',
  'Canadá': 'CAD',
  'Australia': 'AUD',
  'Japan': 'JPY',
  'Japón': 'JPY',
  'China': 'CNY',
  'India': 'INR',
  'Russia': 'RUB',
  'Rusia': 'RUB'
};

// Obtener el símbolo de la moneda según el país
export const getCurrencySymbol = (country?: string): string => {
  const defaultCurrency = '$'; // Moneda por defecto (dólar)
  
  if (!country) {
    // Si no tenemos información del país, usamos la moneda por defecto
    return defaultCurrency;
  }
  
  // Obtener el código ISO de la moneda según el país
  const currencyCode = countryCurrencyMap[country];
  
  if (!currencyCode) {
    return defaultCurrency;
  }
  
  // Obtener el símbolo de la moneda según el código ISO
  const currencySymbol = getSymbolFromCurrency(currencyCode);
  
  return currencySymbol || defaultCurrency;
};

// Mapa de divisas populares a su símbolo correspondiente
export const getCurrencyFormatted = (amount: number, currencyCode?: string): string => {
  if (!currencyCode) {
    return `$ ${amount}`;
  }
  
  try {
    // Intentar formatear el número según la configuración regional de la moneda
    return new Intl.NumberFormat('es-ES', {
      style: 'currency',
      currency: currencyCode,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  } catch (error) {
    // Si hay un error, mostrar el formato básico
    const symbol = getSymbolFromCurrency(currencyCode) || '$';
    return `${symbol} ${amount}`;
  }
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

// Obtener código de moneda a partir del país
export const getCurrencyCodeFromCountry = (country?: string): string => {
  if (!country) {
    return 'USD'; // Código por defecto
  }
  
  return countryCurrencyMap[country] || 'USD';
};
