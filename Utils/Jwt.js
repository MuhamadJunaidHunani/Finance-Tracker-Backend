const jwt = require("jsonwebtoken");
const secretKey = process.env.JWT_SECRET;

const generateJwtToken = (payload) => {
  const oneMonthInSeconds = 30 * 24 * 60 * 60;
  return jwt.sign(payload, secretKey, { expiresIn: oneMonthInSeconds });
};

const verifyJwt = (token) => {
  const decoded = jwt.verify(token.split(".")[1], secretKey);
  return decoded;
};

module.exports = { generateJwtToken, verifyJwt };
