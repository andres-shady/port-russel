const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../model/user");
const Catway = require("../model/catways");
const { redirect } = require("react-router-dom");
const cookieParser = require("cookie-parser");

// creer un nouvelle utilisateur pour se coonecter a l'application
exports.createUser = async(req,res,next) => {
  const {name,email,password,}= req.body;
  let users = await User.findOne({email});
   try{
    if (users) {
     return res.status(400).json("l'utilisateur existe deja");
  
   } 
    let user = User.create( {name,email,password});
      
    await user.save();
    redirect("/");
   
   }catch{
     res.status(500).json(error);
   }
 
}


//pour se connecter a l'application avec un utilisateur
exports.authenticate= async (req,res,next) =>{
  const{email,password} = req.body;
  try {
    user= await User.findOne({email});
    if(!user){
      res.status(201).render("email no found");
    }
     accepter = bcrypt.compare(password, user.password);

     if(!accepter){
      res.status(201).render("l'email n'est pas le meme");
     }

     const token = await jwt.sign({userId:user._id} ,process.env.SECRET_KEY ,{expiresIn:"4"});
     res.cookie("token",token,{httpOnly:true});
     console(token);
     redirect("/dashboard");
  } catch (error) {
    res.status(500).json(error);
    redirect("/");
  }
          
}

exports.getDashboard = async (res,req,next) => {
  const token = req.cookie.token
try { 
  if(!token){
    redirect("/");
  }
  const decode=jwt.verify({token} ,process.env.SECRET_KEY )
  
  const user= await User.findByid(decode)
  if(!user){
    return res.status(404).json({ message: "User not found" });
  }

  const catway = await Catway.find()
  res.render("dashboard",{user,catway});
  console.log("User ID:", decoded.userId);
} catch (error) {
  res.clearCookie("token");
  res.redirect("/login");
  console.log(error);
}
 
}