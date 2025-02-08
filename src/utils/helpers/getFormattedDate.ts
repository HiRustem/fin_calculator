export const getCreditStartDate = (date: Date): string =>
  date.toLocaleDateString("ru-RU", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
