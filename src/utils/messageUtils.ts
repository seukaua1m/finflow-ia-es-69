
// Function to get current time in HH:MM format
export const getCurrentTime = () => {
  const now = new Date();
  return `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
};

// Format date as DD/MM/YYYY
export const formatDate = (date = new Date()) => {
  return `${date.getDate().toString().padStart(2, '0')}/${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getFullYear()}`;
};

// Calculate limit as 1.5x the entered value
export const calculateLimit = (price: string | number): number => {
  return Math.round(Number(price) * 1.5);
};

// Format a date range for the last 7 days
export const getLast7DaysRange = () => {
  const endDate = new Date();
  const startDate = new Date();
  startDate.setDate(endDate.getDate() - 6);
  
  return {
    start: startDate,
    end: endDate,
    formatted: `${formatDate(startDate)} à ${formatDate(endDate)}`
  };
};
