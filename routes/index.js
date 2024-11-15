var express = require("express");
var router = express.Router();


/* GET home page. */
router.get("/", function(req, res, next) {
  res.render("index", { title: 'Expresse' });
});

const private = require("../middleware/private");
const authentification = require("../service/authentification");
router.post("/authenticate", authentification.authenticate);
router.post('/createUser',private, authentification.createUser)

module.exports = router;
