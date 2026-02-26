const postModel = require('../models/post.model');
const ImageKit = require('imagekit');

const client = new ImageKit({
    publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
    urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT
});

async function createPostController(req, res){

    const {caption, userId} = req.body;
    const file = req.file;

    try {
        const response = await client.upload({
            file: file.buffer,
            fileName: file.originalname,
            folder: "/insta-clone"
        });

        if(!response){
            return res.status(404).json({
                message: "image cannot uploaded"
            })
        }

        const post = await postModel.create({
            caption,
            imgUrl: response.url,
            userId
        })

        res.status(200).json({
            messgae: "post created successfully",
            post
        })

    } catch (error) {
        res.status(500).json({
            messgae: "Upload Failed",
            error: error.message
        })
    }
}

module.exports = {
    createPostController
}