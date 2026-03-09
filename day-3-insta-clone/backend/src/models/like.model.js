const mongoose = require('mongoose');

const likeSchema = new mongoose.Schema({
    postid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "posts",
        required: [true, "post id is required"]
    },
    userid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: [true, "user id is required"]
    }
}, {timestamps: true})

likeSchema.index({postid: 1, userid: 1}, {unique: true});

const likeModel = mongoose.model("likes", likeSchema);

module.exports = likeModel;