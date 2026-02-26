const mongoose = require('mongoose');

async function connectToDb(){
    mongoose.connect(process.env.MONGO_URI)
    .then(()=>{
        console.log("Connected to MongoDB...");
    }).catch((err)=>{
        console.log(err.message);
    });
}

module.exports = connectToDb;