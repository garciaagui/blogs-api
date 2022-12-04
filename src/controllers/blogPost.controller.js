require('dotenv/config');

const BlogPostService = require('../services/blogPost.service');
const errorMap = require('../utils/errorMap');

const error500message = 'Internal error';

const getAllPosts = async (_req, res) => {
  try {
    const { message } = await BlogPostService.getAllPosts();

    return res.status(200).json(message);
  } catch (err) {
    return res.status(500).json({ message: error500message });
  }
};

const getPostById = async (req, res) => {
  try {
    const { id } = req.params;

    const { type, message } = await BlogPostService.getPostById(id);

    if (type) return res.status(errorMap.mapError(type)).json({ message });

    return res.status(200).json(message);
  } catch (err) {
    res.status(500).json({ message: error500message });
  }
};

const getPostsByName = async (req, res) => {
  try {
    const { q } = req.query;

    if (!q.length) {
      const { message } = await BlogPostService.getAllPosts();

      return res.status(200).json(message);
    }

    const searchTerm = `%${q}%`;
    const { message } = await BlogPostService.getPostsByName(searchTerm);

    return res.status(200).json(message);
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: error500message });
  }
};

const createPost = async (req, res) => {
  try {
    const { title, content, categoryIds } = req.body;
    const { userId } = req.user;

    const { type, message } = await BlogPostService
      .createPost(title, content, userId, categoryIds);
    if (type) return res.status(errorMap.mapError(type)).json({ message });

    return res.status(201).json(message.dataValues);
  } catch (err) {
    return res.status(500).json({ message: error500message });
  }
};

const updatePost = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, content } = req.body;
    const { userId } = req.user;

    const { type, message } = await BlogPostService
      .updatePost(id, title, content, userId);

    if (type) return res.status(errorMap.mapError(type)).json({ message });

    return res.status(200).json(message);
  } catch (err) {
    return res.status(500).json({ message: error500message });
  }
};

const deletePost = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId } = req.user;

    const { type, message } = await BlogPostService
      .deletePost(id, userId);

    if (type) return res.status(errorMap.mapError(type)).json({ message });

    return res.status(204).json(message);
  } catch (err) {
    return res.status(500).json({ message: error500message });
  }
};

module.exports = {
  getAllPosts,
  getPostById,
  getPostsByName,
  createPost,
  updatePost,
  deletePost,
};