var express = require("express");
var router = express.Router();
const { getAllUsers, registerAdmin, loginAdmin, logoutAdmin, updateAdmin, deleteAdmin, findAdmin, verifyProject, verifyActivity, verifyData, getAllUnverifiedActivities, getAllUnverifiedProjects, getAllUnverifiedData, updateActivity, updateData, updateProject, deleteActivity, deleteData, deleteProject } = require("../controllers/admincontroller");
const { isAuthAdmin, isAuthSuperAdmin } = require("../middleware/auth");

router.route("./getAllUsers").get(isAuthAdmin, getAllUsers);
router.route("/registeradmin").post(isAuthSuperAdmin, registerAdmin);
router.route("/loginadmin").post(loginAdmin);
router.route("/logoutadmin").get(logoutAdmin);
router.route("/updateadmin").put(isAuthAdmin, updateAdmin);
router.route("/deleteadmin").delete(isAuthAdmin, deleteAdmin);
router.route("/find").get(isAuthAdmin, findAdmin);
router.route("/unverifiedp").get(isAuthAdmin, getAllUnverifiedProjects);
router.route("/verifyp/:id").put(isAuthAdmin, verifyProject);
router.route("/unverifieda").get(isAuthAdmin, getAllUnverifiedActivities);
router.route("/verifya/:id").put(isAuthAdmin, verifyActivity);
router.route("/unverifiedd").get(getAllUnverifiedData);
router.route("/verifyd/:id").put(isAuthAdmin, verifyData);
//update and delete for all activity projects and crowdsourced data 
router.route("/updateactivity/:id").put(isAuthAdmin, updateActivity);
router.route("/updatedata/:id").put(isAuthAdmin, updateData);
router.route("/updateproject/:id").put(isAuthAdmin, updateProject);
router.route("/deleteactivity/:id").delete(isAuthAdmin, deleteActivity);
router.route("/deletedata/:id").delete(isAuthAdmin, deleteData);
router.route("/deleteproject/:id").delete(isAuthAdmin, deleteProject);
module.exports = router;
