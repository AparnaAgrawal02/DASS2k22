var express = require("express");
var router = express.Router();
const {registeruser,loginUser, logoutUser, finduser} = require("../controllers/usercontroller");
const { isAuthUser } = require("../middleware/auth");

router.route("/registeruser").post(registeruser);
router.route("/loginuser").post(loginUser);    
router.route("/logoutuser").get(logoutUser);
router.route("/user").get(isAuthUser,finduser);
module.exports=router;