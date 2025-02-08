export const getISOFormattedString = (value: string): string => {
  const [day, month, year] = value.split(".").map(Number);
  return `${year}.${month}.${day}`;
};
