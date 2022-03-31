var express = require("express");
var router = express.Router();
const {registeruser,loginUser, logoutUser, finduser,AddCrowdSourcedData,Addrequest,updateUser,deleteUser} = require("../controllers/usercontroller");
const { isAuthUser } = require("../middleware/auth");

router.route("/registeruser").post(registeruser);
router.route("/loginuser").post(loginUser);    
router.route("/logoutuser").get(logoutUser);
router.route("/user").get(isAuthUser,finduser);
router.route("/crowdsourced").post(AddCrowdSourcedData);
router.route("/request").post(Addrequest);
router.route("/updateuser").put(isAuthUser,updateUser);
router.route("/deleteuser").delete(isAuthUser,deleteUser);

module.exports=router;