const schemas = require('./schemas');
const { Category } = require('../models');

const validateId = (id) => {
  const { error } = schemas.idSchema.validate(id);
  if (error) return { type: 'INVALID_VALUE', message: '"id" must be a number' };

  return { type: null, message: '' };
};

const validateLogin = async (email, password) => {
  const { error } = schemas.loginSchema.validate({ email, password });
  if (error) return { type: 'INVALID_VALUE', message: error.message };

  return { type: null, message: '' };
};

const validateNewUser = async (displayName, email, password) => {
  const { error } = schemas.userSchema.validate({ displayName, email, password });
  if (error) return { type: 'INVALID_VALUE', message: error.message };

  return { type: null, message: '' };
};

const validateNewCategory = async (name) => {
  const { error } = schemas.categorySchema.validate({ name });
  if (error) return { type: 'INVALID_VALUE', message: error.message };

  return { type: null, message: '' };
};

const validateNewBlogPost = async (title, content, categoryIds) => {
  const { error } = schemas.blogPostSchema.validate({ title, content, categoryIds });
  if (error) return { type: 'INVALID_VALUE', message: error.message };

  const categories = await Promise.all(
    categoryIds.map(async (id) => Category.findOne({
      where: { id },
    })),
  );

  const someCategoryIsMissing = categories.some((category) => category === null);
  if (someCategoryIsMissing) {
    return { type: 'INVALID_VALUE', message: 'one or more "categoryIds" not found' };
  }

  return { type: null, message: '' };
};

const validateBlogPostUpdate = async (title, content) => {
  const { error } = schemas.updateBlogPostSchema.validate({ title, content });
  if (error) return { type: 'INVALID_VALUE', message: error.message };

  return { type: null, message: '' };
};

module.exports = {
  validateId,
  validateLogin,
  validateNewUser,
  validateNewCategory,
  validateNewBlogPost,
  validateBlogPostUpdate,
};