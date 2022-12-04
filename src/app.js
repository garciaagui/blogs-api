const express = require('express');

// ...

const BlogPostController = require('./controllers/blogPost.controller');
const CategoryController = require('./controllers/category.controller');
const UserController = require('./controllers/user.controller');
const auth = require('./middlewares/auth');

const app = express();

app.use(express.json());

app.get('/categories', auth, CategoryController.getAllCategories);

app.post('/categories', auth, CategoryController.createCategory);

app.post('/login', UserController.loginUser);

app.get('/post', auth, BlogPostController.getAllPosts);

app.post('/post', auth, BlogPostController.createPost);

app.get('/post/search', auth, BlogPostController.getPostsByName);

app.put('/post/:id', auth, BlogPostController.updatePost);

app.get('/post/:id', auth, BlogPostController.getPostById);

app.delete('/post/:id', auth, BlogPostController.deletePost);

app.get('/user', auth, UserController.getAllUsers);

app.post('/user', UserController.createUser);

app.delete('/user/me', auth, UserController.deleteUser);

app.get('/user/:id', auth, UserController.getUserById);

// ...

// É importante exportar a constante `app`,
// para que possa ser utilizada pelo arquivo `src/server.js`
module.exports = app;
