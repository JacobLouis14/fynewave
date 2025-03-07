export const fileToUrl = (file: File | null) => {
  if (file) {
    return URL.createObjectURL(file);
  }
};
