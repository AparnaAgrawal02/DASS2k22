var express = require("express");
var router = express.Router();
const {getAllUsers,registerAdmin,loginAdmin,logoutAdmin,updateAdmin,deleteAdmin,findAdmin,verifyProject,verifyActivity,verifyData,getAllUnverifiedActivities,getAllUnverifiedProjects,getAllUnverifiedData} = require("../controllers/admincontroller");
const {isAuthAdmin,isAuthSuperAdmin} = require("../middleware/auth");

router.route("./getAllUsers").get(isAuthAdmin,getAllUsers);
router.route("/registeradmin").post(isAuthSuperAdmin,registerAdmin);
router.route("/loginadmin").post(loginAdmin);
router.route("/logoutadmin").get(logoutAdmin);
router.route("/updateadmin").put(isAuthAdmin,updateAdmin);
router.route("/deleteadmin").delete(isAuthAdmin,deleteAdmin);
router.route("/find").get(isAuthAdmin,findAdmin);
router.route("/unverifiedp").get(isAuthAdmin,getAllUnverifiedProjects);
router.route("/verifyp").put(isAuthAdmin,verifyProject);
router.route("/unverifieda").get(isAuthAdmin,getAllUnverifiedActivities);
router.route("/verifya").put(isAuthAdmin,verifyActivity);
//router.route("/unverifiedd").get(isAuthAdmin,getAllUnverifiedData)
router.route("/unverifiedd").get(getAllUnverifiedData)
router.route("/verifyd").put(isAuthAdmin,verifyData);
module.exports=router;