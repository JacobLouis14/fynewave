export const replaceHyphenWithSpace = (rawString: String) => {
  const removedHyphen = rawString.replace(/-/g, " ");
  const formatedText =
    removedHyphen.charAt(0).toUpperCase() + removedHyphen.slice(1);

  return formatedText;
};
