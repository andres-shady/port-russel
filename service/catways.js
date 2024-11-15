const Catway = require("../model/catways")

//Ici c'est le callback qui servira qui servira a prendre un catway avec son id
exports.getCatwayId = async (req,res,next)=>{
    try {
        //recupération de l'id dans la requete
        const catwayNumber = req.query;
        //Verification des catway par rapport a l'id enregistré
        const catway = await Catway.findOne(catwayNumber);
        if (!catway) {
          return res.status(404).json({ message: "Catway not found" });
        }
        console.log(catway);
        res.status(200).render("catwayDetail", { catway });
      } catch (err) {
        res.status(500).send(err);
      }
      };
   
//ici c'est le callback qui servira à ajouter un catway
exports.addCatway = async (req,res,next) =>{

    try {
        //recupération des champs dans le corp de la requete
        const { catwayNumber, type, catwayState } = req.body;
    
        //Verification dans la base de donné de l'existance d'un catwayNumber identique
        let newCatway = await Catway.findOne({ catwayNumber });
        if (newCatway) {
          return res.status(400).json("Catway already exists");
        }
        //Création du nouveau catway
        newCatway = new Catway({ catwayNumber, type, catwayState });
    
        //sauvegarde du catway
        await newCatway.save();
        console.log(newCatway);
        //redirection au dashbord
        res.status(201).redirect("/dashboard/catways");
      } catch (error) {
        console.error(error);
        res.status(501).json(error);
      }
    };
    

    // ici c'est le callback qui servira à modifier un catway
exports.updateCatway = async (req,res,next) => {
    try {
        const catway = await Catway.findByIdAndUpdate(
          req.params.id,
          {catwayState: req.body.catwayState },
          { new: true }
        );
        if (!catway) {
          return res.status(404).json({ message: "Catway not found" });
        }
        res.redirect("/dashboard");
      } catch (err) {
        res.status(500).send(err);
      }
    };

//ici c'est le callback qui serviera à supprimer un catway
exports.deleteCatway= async (req,res,next) => {
    try {
        //recupération de l'id dans la requete
        const catwayNumber = req.body;
    
        const catway = await Catway.findOneAndDelete(catwayNumber);
        if (!catway) return res.status(404).send("Catway not found");
         //redirection au dashbord
        res.redirect("/dashboard");
      } catch (err) { 
        res.status(500).send(err);
      }
    };
//ici c'est le callback qui servira afficher tout les catway
exports.listCatways =async(req,res)=>{
    try {
        const catways = await Catway.find();
        res.status(200).render("catways", { catways });
      } catch (error) {
        console.error(error);
        res.status(500).json(error);
      }
    };