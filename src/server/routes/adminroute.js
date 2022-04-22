var express = require("express");
var router = express.Router();
const { getAllUsers, registerAdmin, loginAdmin, logoutAdmin, updateAdmin, deleteAdmin, 
    findAdmin, verifyProject, verifyActivity, verifyData, getAllUnverifiedActivities, getAllUnverifiedProjects, 
    getAllUnverifiedData, updateActivity, updateData, updateProject, deleteActivity, deleteData, deleteProject ,findData,findProject,findActivity} = require("../controllers/admincontroller");
const { isAuthAdmin, isAuthSuperAdmin } = require("../middleware/auth");

router.route("./getAllUsers").get(isAuthAdmin, getAllUsers);
router.route("/registeradmin").post(isAuthSuperAdmin, registerAdmin);
router.route("/loginadmin").post(loginAdmin);
router.route("/logoutadmin").get(logoutAdmin);
// router.route("/updateadmin").put(isAuthAdmin, updateAdmin);
router.route("/updateadmin").put(updateAdmin);
router.route("/deleteadmin").delete(isAuthAdmin, deleteAdmin);
router.route("/find").get(isAuthAdmin, findAdmin);
router.route("/unverifiedp/:id").get(isAuthAdmin,findProject) //gets the data with id of the unverified
router.route("/verifiedp/:id").get(isAuthAdmin,findProject) //gets the data with id of the verified
//router.route("/unverifiedp").get(isAuthAdmin, getAllUnverifiedProjects);
router.route("/unverifiedp").get(getAllUnverifiedProjects);
router.route("/verifyp/:id").put(isAuthAdmin, verifyProject);
//router.route("/unverifieda").get(isAuthAdmin, getAllUnverifiedActivities);
router.route("/unverifieda").get(getAllUnverifiedActivities)
router.route("/verifya/:id").put(isAuthAdmin, verifyActivity);
//router.route("/unverifiedd").get(isAuthAdmin,getAllUnverifiedData);
router.route("/unverifiedd").get(getAllUnverifiedData);
router.route("/unverifiedd/:id").get(isAuthAdmin,findData) //gets the data with id of the unverified
router.route("/verifiedd/:id").get(isAuthAdmin,findData) //gets the data with id of the verified
//router.route("/verifyd/:id").put(isAuthAdmin, verifyData);
router.route("/verifyd/:id").put(verifyData);
//update and delete for all activity projects and crowdsourced data 
router.route("/unverifieda/:id").get(isAuthAdmin,findActivity) //gets the data with id of the unverified
router.route("/verifieda/:id").get(isAuthAdmin,findActivity) //gets the data with id of the verified
router.route("/updateactivity/:id").put(isAuthAdmin, updateActivity);
router.route("/updatedata/:id").put(isAuthAdmin, updateData);
router.route("/updateproject/:id").put(isAuthAdmin, updateProject);
router.route("/deleteactivity/:id").delete(isAuthAdmin, deleteActivity);
router.route("/deletedata/:id").delete(isAuthAdmin, deleteData);
router.route("/deleteproject/:id").delete(isAuthAdmin, deleteProject);
module.exports = router;
