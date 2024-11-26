const express = require('express');
const authRouter = express.Router();
const { registerUser, userLogin, userLogout } = require('../controllers/authControllers.js');

authRouter.post('/register', registerUser);
authRouter.post('/login', userLogin);
authRouter.post('/logout', userLogout);

module.exports = authRouter;