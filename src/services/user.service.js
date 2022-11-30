const snakeize = require('snakeize');
const { User } = require('../models');
const validations = require('../validations/validateInputValues');

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

  const newUser = User.create(snakeize({ displayName, email, password, image }));
  return { type: null, message: newUser };
};

module.exports = {
  getByEmail,
  checkUser,
  createUser,
};
