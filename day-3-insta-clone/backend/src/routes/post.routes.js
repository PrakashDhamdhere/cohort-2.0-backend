const express = require('express');
const { createPostController } = require('../controllers/post.controller');
const multer = require('multer');

const postRouter = express.Router();

const storage = multer.memoryStorage()
const upload = multer({ storage: storage })

/**
 * Create Post [protected]
 * POST /api/post/
 * - req.body = {caption}
 * - req.file = {image-file}
 */
postRouter.post('/', upload.single('image'),createPostController);


module.exports = postRouter;