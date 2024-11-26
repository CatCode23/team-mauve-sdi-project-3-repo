// authRoutes.js
const { Router } = require('express');
const authRouter = Router();
const { registerUser, userLogin, userLogout } = require('../controllers/authControllers');

// Define routes
authRouter.post('/register', registerUser);
authRouter.post('/login', userLogin);
authRouter.post('/logout', userLogout);

module.exports = authRouter;


