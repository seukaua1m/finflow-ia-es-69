
// Function to get current time in HH:MM format
export const getCurrentTime = () => {
  const now = new Date();
  return `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
};

// Format date as DD/MM/YYYY
export const formatDate = () => {
  const now = new Date();
  return `${now.getDate().toString().padStart(2, '0')}/${(now.getMonth() + 1).toString().padStart(2, '0')}/${now.getFullYear()}`;
};

// Calculate limit as 1.5x the entered value
export const calculateLimit = (price: string | number): number => {
  return Math.round(Number(price) * 1.5);
};
