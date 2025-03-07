export const toReadableDate = (dateVale: string): string => {
  const dateInFormat = new Date(dateVale);
  return dateInFormat.toLocaleDateString("en-GB");
};
