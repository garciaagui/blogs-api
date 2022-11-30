const jwt = require('jsonwebtoken');

module.exports = (email, secret) => {
  const jwtConfig = { expiresIn: '1h', algorithm: 'HS256' };

  const payload = { email };

  const token = jwt.sign(payload, secret, jwtConfig);

  return token;
};