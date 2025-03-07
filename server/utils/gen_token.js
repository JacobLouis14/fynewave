const jwt = require("jsonwebtoken");

const jwtSecret = process.env.JWTSECRET;

const generateAccessToken = (dataToEncrypt) => {
  const accessToken = jwt.sign(dataToEncrypt, jwtSecret, { expiresIn: "1d" });
  return accessToken;
};

module.exports = { generateAccessToken };
