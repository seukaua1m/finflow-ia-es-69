
// Função para obter a hora atual em formato HH:MM
export const getCurrentTime = () => {
  const now = new Date();
  return `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
};

// Formatear fecha como DD/MM/AAAA
export const formatDate = (date = new Date()) => {
  return `${date.getDate().toString().padStart(2, '0')}/${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getFullYear()}`;
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
