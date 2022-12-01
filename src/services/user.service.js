const snakeize = require('snakeize');
const { User } = require('../models');
const validations = require('../validations/validateInputValues');

const getAllUsers = async () => {
  const users = await User.findAll({
    attributes: ['id', ['display_name', 'displayName'], 'email', 'image'],
  });
  return users;
};

const getById = async (id) => {
  const error = await validations.validateId(id);
  if (error.type) return error;

  const user = await User.findOne({
    attributes: ['id', ['display_name', 'displayName'], 'email', 'image'],
    where: { id },
  });

  if (!user) {
    return { type: 'NOT_FOUND', message: 'User does not exist' };
  }

  return { type: null, message: user };
};

const getByEmail = (email) => User.findOne({ where: { email } });

const checkUser = async (email, password) => {
  const error = await validations.validateLogin(email, password);
  if (error.type) return error;

  const user = await getByEmail(email);

  if (!user || user.password !== password) {
    return { type: 'UNMATCHED_FIELDS', message: 'Invalid fields' };
  }

  return { type: null, message: user };
};

const createUser = async (displayName, email, password, image) => {
  const error = await validations.validateNewUser(displayName, email, password);
  if (error.type) return error;

  const doesUserExist = await getByEmail(email);
  if (doesUserExist) return { type: 'CONFLICT', message: 'User already registered' };

  const newUser = await User.create(snakeize({ displayName, email, password, image }));
  return { type: null, message: newUser };
};

module.exports = {
  getAllUsers,
  getById,
  getByEmail,
  checkUser,
  createUser,
};
