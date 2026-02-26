const express = require('express');
const { registerController, loginController } = require('../controllers/auth.controller');


const authRouter = express.Router();


/**
 * Register User
 * POST /api/auth/register
 */
authRouter.post('/register', registerController);

/**
 * Login User
 * POST /api/auth/login
 */
authRouter.post('/login', loginController)


module.exports = authRouter;