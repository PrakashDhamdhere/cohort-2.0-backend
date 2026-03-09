
const jwt = require('jsonwebtoken');
const userModel = require('../models/user.model');

async function identifyUser(req, res, next) {
    const token = req.cookies.token;
    
    if(!token){
        return res.status(401).json({
            message: "unauthorized access"
        })
    }
    
    let decoded;
    try {
        decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (error) {
        return res.status(401).json({
            message: "token invalid"
        })
    }
    
    req.user = decoded;

    next();
}

module.exports = {
    identifyUser
}