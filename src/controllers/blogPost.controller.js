require('dotenv/config');

const BlogPostService = require('../services/blogPost.service');
const errorMap = require('../utils/errorMap');

const error500message = 'Internal error';

const createBlogPost = async (req, res) => {
  try {
    const { title, content, categoryIds } = req.body;
    const { userId } = req.user;

    const { type, message } = await BlogPostService
      .createBlogPost(title, content, userId, categoryIds);
    if (type) return res.status(errorMap.mapError(type)).json({ message });

    // const { id, user_id, published, updated } = message;

    return res.status(201).json(message.dataValues);
  } catch (err) {
    return res.status(500).json({ message: error500message });
  }
};

module.exports = {
  createBlogPost,
};