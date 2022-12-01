const snakeize = require('snakeize');
const camelize = require('camelize');
const Sequelize = require('sequelize');
const config = require('../config/config');

const env = process.env.NODE_ENV || 'development';
const sequelize = new Sequelize(config[env]);

const { BlogPost, PostCategory, User, Category } = require('../models');
const validations = require('../validations/validateInputValues');

const getAllBlogPosts = async () => {
  const posts = await BlogPost.findAll({
    include: [{
      model: User,
      as: 'user',
      attributes: ['id', ['display_name', 'displayName'], 'email', 'image'],
    },
    {
      model: Category,
      as: 'categories',
      through: { attributes: [] },
    }],
  });
  return posts;
};

const createBlogPost = async (title, content, userId, categoryIds) => {
  const t = await sequelize.transaction();
  try {
    const error = await validations.validateNewBlogPost(title, content, categoryIds);
    if (error.type) return error;

    const date = new Date().toJSON();

    const newBlogPost = await BlogPost
      .create(snakeize({ title, content, userId, published: date, updated: date }));

    categoryIds.map(async (id) => {
      await PostCategory.create(snakeize({ postId: newBlogPost.id, categoryId: id }));
    });

    await t.commit();

    return { type: null, message: camelize(newBlogPost) };
  } catch (e) {
    await t.rollback();
    console.log(e);
    throw e;
  }
};

module.exports = {
  getAllBlogPosts,
  createBlogPost,
};
