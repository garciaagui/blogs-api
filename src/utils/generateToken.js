const jwt = require('jsonwebtoken');

module.exports = (userId, secret) => {
  const jwtConfig = { expiresIn: '1h', algorithm: 'HS256' };

  const payload = { userId };

  const token = jwt.sign(payload, secret, jwtConfig);

  return token;
};