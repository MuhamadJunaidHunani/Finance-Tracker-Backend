const jwt = require('jsonwebtoken');

const generateJwtToken = (payload) => {
  const secretKey = process.env.JWT_SECRET;
  const oneMonthInSeconds = 30 * 24 * 60 * 60;
  return jwt.sign(payload, secretKey, { expiresIn: oneMonthInSeconds });
};

module.exports = generateJwtToken;