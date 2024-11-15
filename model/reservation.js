const { checkout } = require("../routes/dashboard");
const catway = require("./catways");

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Reservation = new Schema({
    catwayNumber:{
     type : String,
     required  : true
    },
    clientName:{
       type : String,
       required  : true
    },

    boatName:{
        type : String,
        required  : true
    },
    chekIn:{
        type : String,
        required  : true
    },
    checkout:{
        type : String,
        required  : true
    }

})

module.exports= mongoose.model("Reservation",Reservation)