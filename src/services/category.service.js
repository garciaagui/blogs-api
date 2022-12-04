const { Category } = require('../models');
const validations = require('../validations/validateInputValues');

const getAllCategories = async () => {
  const categories = await Category.findAll();

  return { type: null, message: categories };
};

const getCategoryByName = (name) => Category.findOne({ where: { name } });

const createCategory = async (name) => {
  const error = await validations.validateNewCategory(name);
  if (error.type) return error;

  const doesCategoryExist = await getCategoryByName(name);
  if (doesCategoryExist) return { type: 'CONFLICT', message: 'Category already registered' };

  const newCategory = await Category.create({ name });
  return { type: null, message: newCategory };
};

module.exports = {
  getAllCategories,
  getCategoryByName,
  createCategory,
};
