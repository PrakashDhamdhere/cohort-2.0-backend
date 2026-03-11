const express = require('express');
const { registerController, loginController, getmeController } = require('../controllers/auth.controller');
const { identifyUser } = require('../middlewares/auth.middleware');


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

/**
 * @route /api/auth/get-me
 * @description get the current logged in user information
 * @access Private
 */
authRouter.get('/get-me', identifyUser, getmeController)


module.exports = authRouter;