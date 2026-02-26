const postModel = require('../models/post.model');
const ImageKit = require('imagekit');

const client = new ImageKit({
    publicKey: "public_M1Q14TsIvCsHB1sxclPeSBXGFmU=",
    privateKey: "private_UD92+vKZFz8CAjde/wQoVhbARh0=",
    urlEndpoint: "https://ik.imagekit.io/PrakashDhamdhere"
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

        if(response){
        }
        const post = await postModel.create({
            caption,
            imgUrl: response.url,
            userId
        })

        res.status(200).json({
            messgae: "file uploaded successfully",
            url: response.url
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