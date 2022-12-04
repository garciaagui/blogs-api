const express = require('express');

// ...

const categoriesRouter = require('./routes/categories.router');
const userRouter = require('./routes/user.router');
const blogPostRouter = require('./routes/blogPost.router');

const UserController = require('./controllers/user.controller');

const app = express();

app.use(express.json());

app.use('/categories', categoriesRouter);
app.use('/post', blogPostRouter);
app.use('/user', userRouter);

app.post('/login', UserController.loginUser);

// ...

// É importante exportar a constante `app`,
// para que possa ser utilizada pelo arquivo `src/server.js`
module.exports = app;
