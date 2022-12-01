const snakeize = require('snakeize');
const camelize = require('camelize');
const Sequelize = require('sequelize');
const config = require('../config/config');

const env = process.env.NODE_ENV || 'development';
const sequelize = new Sequelize(config[env]);

const { BlogPost, PostCategory, User, Category } = require('../models');
const validations = require('../validations/validateInputValues');

const includeContent = [{
  model: User,
  as: 'user',
  attributes: ['id', ['display_name', 'displayName'], 'email', 'image'],
},
{
  model: Category,
  as: 'categories',
  through: { attributes: [] },
}];

const getAllBlogPosts = async () => {
  const posts = await BlogPost.findAll({
    include: includeContent,
  });
  return posts;
};

const getById = async (id) => {
  const error = await validations.validateId(id);
  if (error.type) return error;

  const post = await BlogPost.findOne({
    where: { id },
    attributes: ['id', 'title', 'content', ['user_id', 'userId'], 'published', 'updated'],
    include: includeContent,
  });

  if (!post) return { type: 'NOT_FOUND', message: 'Post does not exist' };

  return { type: null, message: post };
};

const getByName = async (searchTerm) => {
  const posts = await BlogPost.findAll({
    where: {
      [Sequelize.Op.or]:
        [{ content: { [Sequelize.Op.like]: searchTerm } },
        { title: { [Sequelize.Op.like]: searchTerm } }],
    },
    attributes: ['id', 'title', 'content', ['user_id', 'userId'], 'published', 'updated'],
    include: includeContent,
  });
  return { type: null, message: posts };
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

const updateBlogPost = async (id, title, content, userId) => {
  const error = await validations.validateBlogPostUpdate(title, content);
  if (error.type) return error;

  const blogPost = await getById(id);

  if (!blogPost || blogPost.message.dataValues.userId !== userId) {
    return { type: 'UNAUTHORIZED', message: 'Unauthorized user' };
  }

  const updatedDate = new Date().toJSON();

  await BlogPost.update(
    snakeize({ title, content, updated: updatedDate }),
    { where: { id } },
  );

  const updatedBlogPost = await getById(id);

  return { type: null, message: updatedBlogPost.message };
};

const deleteBlogPost = async (id, userId) => {
  const { type, message } = await getById(id);

  if (type) return { type: 'NOT_FOUND', message: 'Post does not exist' };

  if (message.dataValues.userId !== userId) {
    return { type: 'UNAUTHORIZED', message: 'Unauthorized user' };
  }

  const deletedPost = await BlogPost.destroy({ where: { id } });

  return { type: null, message: deletedPost };
};

module.exports = {
  getAllBlogPosts,
  getById,
  getByName,
  createBlogPost,
  updateBlogPost,
  deleteBlogPost,
};
