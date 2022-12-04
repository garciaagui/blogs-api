const express = require('express');
// require('express-async-errors');

const UserController = require('../controllers/user.controller');
const auth = require('../middlewares/auth');

const router = express.Router();

router.get('/', auth, UserController.getAllUsers);

router.post('/', UserController.createUser);

router.delete('/me', auth, UserController.deleteUser);

router.get('/:id', auth, UserController.getUserById);

module.exports = router;
