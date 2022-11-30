const { Category } = require('../models');
const validations = require('../validations/validateInputValues');

const getByName = (name) => Category.findOne({ where: { name } });

const createCategory = async (name) => {
  const error = await validations.validateNewCategory(name);
  if (error.type) return error;

  const doesCategoryExist = await getByName(name);
  if (doesCategoryExist) return { type: 'CONFLICT', message: 'Category already registered' };

  const newCategory = await Category.create({ name });
  return { type: null, message: newCategory };
};

module.exports = {
  getByName,
  createCategory,
};
