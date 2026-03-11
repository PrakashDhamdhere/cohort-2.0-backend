const likeModel = require('../models/like.model');
const postModel = require('../models/post.model');
const ImageKit = require('imagekit');

const client = new ImageKit({
    publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
    urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT
});

async function createPostController(req, res){

    const {caption} = req.body;
    const file = req.file;

    try {
        const response = await client.upload({
            file: file.buffer,
            fileName: file.originalname,
            folder: "/insta-clone"
        });

        if(!response){
            return res.status(500).json({
                message: "image cannot uploaded"
            })
        }

        const post = await postModel.create({
            caption,
            imgUrl: response.url,
            userId: req.user.iid
        })

        res.status(201).json({
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

async function getPostsController(req, res) {

    const posts = await postModel.find({userId: req.user.id})

    res.status(200).json({
        message: "posts fetch successfully",
        posts
    })
}

async function getPostDetailsController(req, res){
    
    const postId = req.params.postid;
    const post = await postModel.findOne({_id: postId});
    if(!post){
        return res.status(404).json({
            message: "post not found"
        })
    }
    if(toString(post.userId) !== toString(req.user.iid)){
        return res.status(403).json({
            message: "unathorized access"
        })
    }
    
    res.status(200).json({
        message: "post fetch successfully",
        post
    })
}

async function likePostController(req, res){
    const postid = req.params.postid;
    const userid = req.user.id;

    const isAlredyLiked = await likeModel.findOne({
        userid,
        postid
    })

    if(isAlredyLiked){
        return res.status(400).json({
            message: "You alredy liked this post"
        })
    }

    const idPostExist = await postModel.findOne({_id: postid});

    if(!idPostExist){
        return res.status(400).json({
            message: "post doesn't exist"
        })
    }

    const likeRecord = await likeModel.create({
        postid,
        userid
    })

    res.status(201).json({
        message: `post liked successfully`,
        likeRecord
    })
}

async function unlikePostController(req, res){
    const postid = req.params.postid;
    const userid = req.user.id;

    const idPostExist = await postModel.findOne({_id: postid});

    if(!idPostExist){
        return res.status(400).json({
            message: "post doesn't exist"
        })
    }

    const likeRecord = await likeModel.findOne({
        postid,
        userid
    })

    if(!likeRecord){
        return res.status(400).json({
            message: "you doesn't liked this post",
        })
    }

    const deletedRecord = await likeModel.findByIdAndDelete(likeRecord._id);
    res.status(200).json({
        message: `post unliked successfully ${postid}`,
    })
}

async function getFeedController(req, res){
    const posts = await Promise.all((await postModel.find().populate("userId").lean())
    .map(async (post)=>{

        const isLiked = await likeModel.findOne({
            userid: req.user.id,
            postid: post._id
        })

        post.isLiked = Boolean(isLiked)
        return post
    }))

    res.status(200).json({
        message: "posts fetched successfully",
        posts
    })
}

module.exports = {
    createPostController,
    getPostsController,
    getPostDetailsController,
    likePostController,
    unlikePostController,
    getFeedController
}