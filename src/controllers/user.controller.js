require('dotenv/config');

const { JWT_SECRET } = process.env;

const UserService = require('../services/user.service');
const errorMap = require('../utils/errorMap');
const generateToken = require('../utils/generateToken');

const error500message = 'Internal error';

const getAllUsers = async (_req, res) => {
  try {
    const { message } = await UserService.getAllUsers();

    return res.status(200).json(message);
  } catch (err) {
    return res.status(500).json({ message: error500message });
  }
};

const getUserById = async (req, res) => {
  try {
    const { id } = req.params;

    const { type, message } = await UserService.getUserById(id);

    if (type) return res.status(errorMap.mapError(type)).json({ message });

    return res.status(200).json(message);
  } catch (err) {
    res.status(500).json({ message: error500message });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const { type, message } = await UserService.checkUser(email, password);

    if (type) return res.status(errorMap.mapError(type)).json({ message });

    const token = generateToken(message.id, JWT_SECRET);

    return res.status(200).json({ token });
  } catch (err) {
    return res.status(500).json({ message: error500message });
  }
};

const createUser = async (req, res) => {
  try {
    const { displayName, email, password, image } = req.body;

    const { type, message } = await UserService.createUser(displayName, email, password, image);

    if (type) return res.status(errorMap.mapError(type)).json({ message });

    const token = generateToken(message.id, JWT_SECRET);

    return res.status(201).json({ token });
  } catch (err) {
    return res.status(500).json({ message: error500message });
  }
};

const deleteUser = async (req, res) => {
  try {
    const { userId } = req.user;

    const { type, message } = await UserService.deleteUser(userId);

    if (type) return res.status(errorMap.mapError(type)).json({ message });

    return res.status(204).json(message);
  } catch (err) {
    return res.status(500).json({ message: error500message });
  }
};

module.exports = {
  getAllUsers,
  getUserById,
  loginUser,
  createUser,
  deleteUser,
};