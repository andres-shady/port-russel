var express = require("express");
var router = express.Router();
const private = require("../middleware/private")

 
/* GET users listing. */
router.get("/", function(req, res, next) {
  res.send('respond with a resource');
});

const catways = require("../service/catways")
router.get('/catways:id',private, catways.getCatwayId);
router.put("/addCatway", catways.addCatway);
router.patch("/uptdateCatway:id",private, catways.updateCatway);
router.delete("/deleteCatway:id",catways.deleteCatway);
router.post("/listCatways",catways.listCatways)
 
const reservations = require("../service/reservations")
router.get("/reservation:id",private, reservations.getReservationById);
router.get("/listReservationsByCatway",private, reservations.listReservationsByCatway);
router.put("/createReservation",reservations.createReservation); 
router.delete("/deleteReservation:id",private, reservations.deleteReservation);

const authentification = require("../service/authentification")
router.post("/authenticate",  authentification.authenticate);
router.get("getDashboard ",authentification.getDashboard)

const user  = require("../service/users")
router.delete("deleteUser:id",user.deleteUser);
router.patch("updateUser:id",user.updateUser)

module.exports = router;
