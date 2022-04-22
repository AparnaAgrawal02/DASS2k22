var express = require("express");
var router = express.Router();
const {registeruser,loginUser, logoutUser, finduser,AddCrowdSourcedData,AddGenericRequest,AddActivity,AddProject,updateUser,deleteUser} = require("../controllers/usercontroller");
const { isAuthUser } = require("../middleware/auth");
const {getAllVerifiedProjects,getAllVerifiedActivities,getAllVerifiedData,findData,findProject,findActivity}=require("../controllers/admincontroller");

router.route("/registeruser").post(registeruser);
router.route("/loginuser").post(loginUser);    
router.route("/logoutuser").get(logoutUser);
router.route("/user").get(isAuthUser,finduser);
router.route("/crowdsourced").post(isAuthUser,AddCrowdSourcedData);
router.route("/requestgen").post(isAuthUser,AddGenericRequest);
//router.route("/requestActivity").post(isAuthUser,AddActivity);
router.route("/requestActivity").post(AddActivity);
router.route("/requestProject").post(isAuthUser,AddProject);
router.route("/updateuser").put(isAuthUser,updateUser);
router.route("/deleteuser").delete(isAuthUser,deleteUser);
router.route("/getallverifiedp").get(getAllVerifiedProjects);
router.route("/getallverifieda").get(getAllVerifiedActivities);
router.route("/getallverifiedd").get(getAllVerifiedData);
router.route("/getallverifiedd/:id").get(isAuthUser,findData);
router.route("/getallverifiedp/:id").get(isAuthUser,findProject);
router.route("/getallverifieda/:id").get(isAuthUser,findActivity);

module.exports=router;
