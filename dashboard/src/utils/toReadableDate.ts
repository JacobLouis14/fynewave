export const toReadableDate = (dateVale: string): string => {
  const dateInFormat = new Date(dateVale);
  return dateInFormat.toLocaleDateString("en-IN");
};

export const toReadableDateTimeString = (dateValue: string) => {
  const date = new Date(dateValue);
  return date.toLocaleString("en-IN");
};
