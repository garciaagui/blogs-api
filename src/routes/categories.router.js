const express = require('express');
// require('express-async-errors');

const CategoryController = require('../controllers/category.controller');
const auth = require('../middlewares/auth');

const router = express.Router();

router.get('/', auth, CategoryController.getAllCategories);

router.post('/', auth, CategoryController.createCategory);

module.exports = router;
