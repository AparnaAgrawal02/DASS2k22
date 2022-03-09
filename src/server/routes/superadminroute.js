var express = require("express");
var router = express.Router();
const {getAllUsers,changerole} = require("../controllers/superadmincontroller");

router.route("/allusers").get(getAllUsers);
router.route("/changerole").post(changerole);

module.exports=router;