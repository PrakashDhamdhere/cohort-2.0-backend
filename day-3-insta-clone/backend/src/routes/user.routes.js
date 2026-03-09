const express = require('express');
const { identifyUser } = require('../middlewares/auth.middleware');
const { followUserController, unfollowUserController } = require('../controllers/user.controller');

const userRouter = express.Router();

/**
 * @route POST /api/users/follow/:userid
 * @description Follow a User
 * @access Privete
 */
userRouter.post('/follow/:userid', identifyUser, followUserController);

/**
 * @route POST /api/users/unfollow/:userid
 * @description Unfollow the user
 * @access Privete
 */
userRouter.post('/unfollow/:userid', identifyUser, unfollowUserController);


module.exports = userRouter;