const stringSlugify = (str) => {
  let strCpy = str;
  strCpy = strCpy.replace(/^\s+|\s+$/g, "");
  strCpy = strCpy.toLowerCase();
  strCpy = strCpy.replace(/\s+/g, "-");

  return strCpy;
};

const spaceTohipen = (string) => {
  let stringCpy = string;
  stringCpy = stringCpy.replace(/\s+/g, "-");
  return stringCpy;
};

module.exports = { stringSlugify, spaceTohipen };
