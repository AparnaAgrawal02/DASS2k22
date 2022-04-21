var express = require("express");
var router = express.Router();
const {getAllUsers,getAllAdmins,registerSuperAdmin,loginSuperAdmin,logoutSuperAdmin,updateSuperAdmin,deleteSuperAdmin,findSuperAdmin} = require("../controllers/superadmincontroller");
const {isAuthSuperAdmin} = require("../middleware/auth");


router.route("/registerSuperAdmin").post(registerSuperAdmin);
router.route("/loginSuperAdmin").post(loginSuperAdmin);
router.route("/logoutSuperAdmin").get(logoutSuperAdmin);
router.route("/getAllUsers").get(isAuthSuperAdmin,getAllUsers);
router.route("/getAllAdmins").get(isAuthSuperAdmin,getAllAdmins);
router.route("/getAllAdmin").get(getAllAdmins);


router.route("/updateSuperAdmin").put(isAuthSuperAdmin,updateSuperAdmin);
router.route("/deleteSuperAdmin").delete(isAuthSuperAdmin,deleteSuperAdmin);
router.route("/find").get(isAuthSuperAdmin,findSuperAdmin);
module.exports=router;