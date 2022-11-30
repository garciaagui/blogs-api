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

module.exports = {
  getByEmail,
  checkUser,
};
