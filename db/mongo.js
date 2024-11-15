const mongoose = require("mongoose");
 

exports.DbConnect = async () =>{
    try{
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected");
    }
        catch(error){
            console.log(error);
            throw error; 
        }
    }