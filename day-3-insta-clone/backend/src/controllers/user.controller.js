const followModel = require('../models/follow.model');
const userModel = require('../models/user.model');

async function followUserController(req, res){

    if(req.user.id === req.params.userid){
        return res.status(400).json({
            message: "You cannot follow yourself"
        })
    }

    const isFolloweeExist = await userModel.findOne({_id: req.params.userid})
    if(!isFolloweeExist){
        return res.status(400).json({
            message: "Followee dosen't exist"
        })
    }

    const isAlreadyFollow = await followModel.findOne({
        follower: req.user.id,
        followee: req.params.userid
    })

    if(isAlreadyFollow){
        return res.status(400).json({
            message: "You Already Follow's this user"
        })
    }

    const followRecord = await followModel.create({
        follower: req.user.id,
        followee: req.params.userid
    })

    res.status(201).json({
        message: `You are now following ${followRecord.followee}`,
        followRecord
    })
}

async function unfollowUserController(req, res){
    const followRecord = await followModel.findOne({
        follower: req.user.id,
        followee: req.params.userid
    })

    if(!followRecord){
        return res.status(400).json({
            message: `You cannot follow this user`
        })
    }

    const deletedRecord = await followModel.findByIdAndDelete(followRecord._id);

    res.status(200).json({
        message: `You have unfollowed ${req.params.userid}`
    })
}

module.exports = {
    followUserController,
    unfollowUserController
}