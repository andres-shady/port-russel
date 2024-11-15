const User = require("../model/user")

// ici c'est le callback qui servira à modifier un user
exports.updateUser = async (req,res,next) => {
    const id = req.params.id
    const temp = ({
        name      : req.body.name,
        email     :req.body.email,
        password  :req.body.password,
    });
    try{
     let user= await User.findOne({_id : id });
     if (user){
        objet.keys(temp).forEach((key)=>{
            if (!!temp[key]){
                user[key] = temp [key];
            }
        });
        await user.save();
        return res.status(201).json(user);
     }
      return res.status(404).json('user_not_found');
    } catch (error) {
      return res.status(501).json(error);
    }
}


//ici c'est le callback qui serviera à supprimer un user
exports.deleteUser= async (req,res,next) => {
    const id= req.params.id
    try{
       await User.deleteOne({_id: id});
       return res.status(204).json('delete_ok');
    } catch(error) {
      return res.status(501).json(error)
    }
   }