const snakeize = require('snakeize');
const camelize = require('camelize');
const Sequelize = require('sequelize');
const config = require('../config/config');

const env = process.env.NODE_ENV || 'development';
const sequelize = new Sequelize(config[env]);

const { BlogPost, PostCategory, User, Category } = require('../models');
const validations = require('../validations/validateInputValues');

const postAttributes = ['id', 'title', 'content', ['user_id', 'userId'], 'published', 'updated'];
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

const getAllPosts = async () => {
  const posts = await BlogPost.findAll({
    include: includeContent,
  });

  return { type: null, message: posts };
};

const getPostById = async (id) => {
  const error = await validations.validateId(id);
  if (error.type) return error;

  const post = await BlogPost.findOne({
    where: { id },
    attributes: postAttributes,
    include: includeContent,
  });

  if (!post) return { type: 'NOT_FOUND', message: 'Post does not exist' };

  return { type: null, message: post };
};

const getPostsByName = async (searchTerm) => {
  const posts = await BlogPost.findAll({
    where: {
      [Sequelize.Op.or]:
        [{ content: { [Sequelize.Op.like]: searchTerm } },
        { title: { [Sequelize.Op.like]: searchTerm } }],
    },
    attributes: postAttributes,
    include: includeContent,
  });

  return { type: null, message: posts };
};

const createPost = async (title, content, userId, categoryIds) => {
  const error = await validations.validateNewBlogPost(title, content, categoryIds);
  if (error.type) return error;

  const result = await sequelize.transaction(async (t) => {
    const date = new Date().toJSON();

    const newPost = await BlogPost
      .create(snakeize({ title, content, userId, published: date, updated: date }),
        { transaction: t });

    const inserts = categoryIds.map(async (id) => {
      await PostCategory.create(snakeize({ postId: newPost.id, categoryId: id }),
        { transaction: t });
    });

    await Promise.all(inserts);

    return { type: null, message: camelize(newPost) };
  });

  return result;
};

const updatePost = async (id, title, content, userId) => {
  const error = await validations.validateBlogPostUpdate(title, content);
  if (error.type) return error;

  const { type, message } = await getPostById(id);

  if (!type && message.dataValues.userId !== userId) {
    return { type: 'UNAUTHORIZED', message: 'Unauthorized user' };
  }

  if (type) {
    return { type, message };
  }

  const updatedDate = new Date().toJSON();

  await BlogPost.update(
    snakeize({ title, content, updated: updatedDate }),
    { where: { id } },
  );

  const updatedBlogPost = await getPostById(id);

  return { type: null, message: updatedBlogPost.message };
};

const deletePost = async (id, userId) => {
  const { type, message } = await getPostById(id);

  if (!type && message.dataValues.userId !== userId) {
    return { type: 'UNAUTHORIZED', message: 'Unauthorized user' };
  }

  if (type) {
    return { type, message };
  }

  const deletedPost = await BlogPost.destroy({ where: { id } });

  return { type: null, message: deletedPost };
};

module.exports = {
  getAllPosts,
  getPostById,
  getPostsByName,
  createPost,
  updatePost,
  deletePost,
};
