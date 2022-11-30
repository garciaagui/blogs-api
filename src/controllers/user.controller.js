require('dotenv/config');

const { JWT_SECRET } = process.env;

const UserService = require('../services/user.service');
const errorMap = require('../utils/errorMap');
const generateToken = require('../utils/generateToken');

const error500message = 'Internal error';

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const { type, message } = await UserService.checkUser(email, password);

    if (type) return res.status(errorMap.mapError(type)).json({ message });

    const token = generateToken(email, JWT_SECRET);

    return res.status(200).json({ token });
  } catch (err) {
    return res.status(500).json({ message: error500message });
  }
};

module.exports = {
  login,
};