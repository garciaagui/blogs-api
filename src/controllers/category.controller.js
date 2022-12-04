require('dotenv/config');

const CategoryService = require('../services/category.service');
const errorMap = require('../utils/errorMap');

const error500message = 'Internal error';

const getAllCategories = async (_req, res) => {
  try {
    const { message } = await CategoryService.getAllCategories();

    return res.status(200).json(message);
  } catch (err) {
    return res.status(500).json({ message: error500message });
  }
};

const createCategory = async (req, res) => {
  try {
    const { name } = req.body;

    const { type, message } = await CategoryService.createCategory(name);

    if (type) return res.status(errorMap.mapError(type)).json({ message });

    return res.status(201).json(message);
  } catch (err) {
    return res.status(500).json({ message: error500message });
  }
};

module.exports = {
  getAllCategories,
  createCategory,
};