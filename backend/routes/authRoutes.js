const express = require('express');
const authRouter = express.Router();
const { registerUser, userLogin, userLogout } = require('../controllers/authControllers.js');

router.post('/register', registerUser);
router.post('/login', userLogin);
router.post('/logout', userLogout);

modules.export = authRouter;