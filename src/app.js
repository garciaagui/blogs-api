const express = require('express');

// ...
const UserController = require('./controllers/user.controller');

const app = express();

app.use(express.json());

app.post('/login', UserController.login);

app.post('/user', UserController.createUser);

// ...

// É importante exportar a constante `app`,
// para que possa ser utilizada pelo arquivo `src/server.js`
module.exports = app;
