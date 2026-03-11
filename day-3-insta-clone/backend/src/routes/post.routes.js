const express = require('express');
const { createPostController, getPostsController, getPostDetailsController, likePostController, unlikePostController, getFeedController } = require('../controllers/post.controller');
const multer = require('multer');
const { identifyUser } = require('../middlewares/auth.middleware');
const likeModel = require('../models/like.model');
const postModel = require('../models/post.model');

const postRouter = express.Router();

const storage = multer.memoryStorage()
const upload = multer({ storage: storage })

/**
 * @route POST /api/post/
 * @description Create Post [protected]
 * - req.body = {caption}
 * - req.file = {image-file}
 * @access Private
 */
postRouter.post('/', upload.single('image'),  identifyUser, createPostController);

/**
 * @route GET /api/post [protected]
 * @description get all posts
 * @access Private
 */
postRouter.get('/', identifyUser, getPostsController);

/**
 * @route GET /api/post/details/:postid
 * @description return a detail about a specific post
 * @access Private
 */
postRouter.get('/details/:postid', identifyUser, getPostDetailsController);

/**
 * @route POST /api/post/like/:postid
 * @description like a post
 * @access Private
 */
postRouter.post('/like/:postid', identifyUser, likePostController);

/**
 * @route POST /api/post/unlike/:postid
 * @description unlike a post
 * @access Private
 */
postRouter.post('/unlike/:postid', identifyUser, unlikePostController);

/**
 * @route GET /api/post/feed
 * @description get all the post created in DB
 * @access Private
 */
postRouter.get('/feed', identifyUser, getFeedController);


module.exports = postRouter;