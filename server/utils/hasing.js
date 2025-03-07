const bcrypt = require("bcrypt");

const hashHandler = async (valueToHash) => {
  const saltRound = 10;
  const hashedValue = await bcrypt.hash(valueToHash, saltRound);
  return hashedValue;
};

const hashCompare = async (valueToCompare, hashedValue) => {
  const isMatch = await bcrypt.compare(valueToCompare, hashedValue);
  return isMatch;
};

module.exports = { hashCompare, hashHandler };
