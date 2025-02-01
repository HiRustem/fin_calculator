export const getCreditStartDate = (date: Date): string =>
  date.toLocaleDateString("ru-RU", {
    year: "numeric",
    month: "numeric",
    day: "numeric",
  });
