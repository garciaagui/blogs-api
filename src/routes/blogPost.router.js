const express = require('express');
// require('express-async-errors');

const BlogPostController = require('../controllers/blogPost.controller');
const auth = require('../middlewares/auth');

const router = express.Router();

router.get('/', auth, BlogPostController.getAllPosts);

router.post('/', auth, BlogPostController.createPost);

router.get('/search', auth, BlogPostController.getPostsByName);

router.put('/:id', auth, BlogPostController.updatePost);

router.get('/:id', auth, BlogPostController.getPostById);

router.delete('/:id', auth, BlogPostController.deletePost);

module.exports = router;
