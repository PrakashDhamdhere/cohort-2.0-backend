const userModel = require('../models/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

async function registerController(req, res){
    const {username, email, password, bio, profilePicture} = req.body;

    const isUserExist = await userModel.findOne({
        $or: [
            {
                username
            },
            {
                email
            }
        ]
    })
    if(isUserExist){
        return res.status(409).json({
            message: isUserExist.username == username ? "username already exist" : "email already exist"
        })
    }

    bcrypt.genSalt(12, function(err, salt) {
        bcrypt.hash(password, salt, async function(err, hash) {
            const user = await userModel.create({
                username,
                email,
                password: hash,
                bio,
                profilePicture
            })

            const token = jwt.sign({
                id: user._id
            }, process.env.JWT_SECRET, {expiresIn: "1h"})

            res.cookie("token", token);

            res.status(201).json({
                message: "Account Created Successfully",
                user: {
                    username: user.username,
                    email: user.email,
                    bio: user.bio,
                    profilePicture: user.profilePicture
                }
            })
        });
    });
}

async function loginController(req, res){
    const {username, email, password} = req.body;

    const user = await userModel.findOne({
        $or: [
            {
                username
            },
            {
                email
            }
        ]
    }).select("+password")

    if(!user){
        return res.status(404).json({
            message: "user not found"
        })
    }


    bcrypt.compare(password, user.password, function(err, result) {
        if(!result){
            return res.status(401).json({
                message: "password is wrong"
            })
        }

        const token = jwt.sign({
            id: user._id
        }, process.env.JWT_SECRET, {expiresIn: "1d"})

        res.cookie("token", token);

        res.status(200).json({
            message: "Logged In Successfully",
            user: {
                username: user.username,
                email: user.email,
                bio: user.bio,
                profilePicture: user.profilePicture
            }
        })
    });

}


module.exports = {
    registerController,
    loginController
}