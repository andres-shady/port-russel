const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const catway = new Schema({
    catwaysNumber:{
        type : Number,
        required : true,
        unique : true
    },
    type:{
      type : String,
      enum : ['long','short'],
      required : true
    },
    catwayState:{
        type : String,
        required : true
    }
})
module.exports = mongoose.model("Catway",catway)