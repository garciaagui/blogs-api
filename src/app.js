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

app.post('/login', UserController.login);

app.get('/post', auth, BlogPostController.getAllBlogPosts);

app.post('/post', auth, BlogPostController.createBlogPost);

app.get('/user', auth, UserController.getAllUsers);

app.post('/user', UserController.createUser);

app.get('/user/:id', auth, UserController.getById);

// ...

// É importante exportar a constante `app`,
// para que possa ser utilizada pelo arquivo `src/server.js`
module.exports = app;
