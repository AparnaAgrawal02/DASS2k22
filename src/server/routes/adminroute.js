var express = require("express");
var router = express.Router();
const {getAllUsers,registerAdmin,loginAdmin,logoutAdmin,updateAdmin,deleteAdmin,findAdmin} = require("../controllers/admincontroller");
const {isAuthAdmin,isAuthSuperAdmin} = require("../middleware/auth");

router.route("./getAllUsers").get(isAuthAdmin,getAllUsers);
router.route("/registeradmin").post(isAuthSuperAdmin,registerAdmin);
router.route("/loginadmin").post(loginAdmin);
router.route("/logoutadmin").get(logoutAdmin);
router.route("/updateadmin").put(isAuthAdmin,updateAdmin);
router.route("/deleteadmin").delete(isAuthAdmin,deleteAdmin);
router.route("/find").get(isAuthAdmin,findAdmin);

module.exports=router;