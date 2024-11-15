const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcryptjs")

const User = new Schema ({
    name:{
     type : String,
     required  : true,
     required :[true,'le nom est requis']
    },
    email:{
       type : String,  
       required  : true,
       unique    :true, //index unique
       lowercase :true
   },
   password:{
       type : String,
       required  : true
   }
    },{
    //ajoute 2 champs au document createdAt et updateAt
     timestamps:true
   
})
User.pre('save', function(next){
    if (!this.isMotified('password,10')){
        return next();
    }
    this.password = bcrypt.hashSync(this.password, 10);
    next();
})

module.exports= mongoose.model("User",User)
