require('dotenv/config');

const BlogPostService = require('../services/blogPost.service');
const errorMap = require('../utils/errorMap');

const error500message = 'Internal error';

const getAllBlogPosts = async (_req, res) => {
  try {
    const posts = await BlogPostService.getAllBlogPosts();

    return res.status(200).json(posts);
  } catch (err) {
    return res.status(500).json({ message: error500message });
  }
};

const getById = async (req, res) => {
  try {
    const { id } = req.params;

    const { type, message } = await BlogPostService.getById(id);

    if (type) return res.status(errorMap.mapError(type)).json({ message });

    return res.status(200).json(message);
  } catch (err) {
    res.status(500).json({ message: error500message });
  }
};

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
  getAllBlogPosts,
  getById,
  createBlogPost,
};