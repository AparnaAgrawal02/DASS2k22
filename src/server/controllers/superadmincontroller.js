const ErrorHandler = require("../utils/errorhandler");
const catchAsyncError = require("../middleware/catchAsyncError");
const SuperAdmin = require("../models/superadminmodel");
const User = require("../models/usermodel");
const sendtoken = require("../utils/jwttoken");
const ApiFeatures = require("../utils/apiFeatures");

exports.getAllUsers = catchAsyncError(async (req, res, next) => { 
    const apifeature = new ApiFeatures(User.find(),req.query).search().filter();//.pagination(resultsperpage);
    const users=await apifeature.query;
    //const products=await SuperAdmin.find();
    res.status(200).json(
    {
        success:true,
        users
    })
});
exports.getAllAdmins = catchAsyncError(async (req, res, next) => { 
    const apifeature = new ApiFeatures(Admin.find(),req.query).search().filter();//.pagination(resultsperpage);
    const users=await apifeature.query;
    //const products=await SuperAdmin.find();
    res.status(200).json(
    {
        success:true,
        users
    })
});

//register a SuperAdmin
exports.registerSuperAdmin = catchAsyncError(async (req, res, next) => {
    const {
        name,
        email,
        password,
        contactNo,
        pincode,
        address
    } = req.body;
    const user = await SuperAdmin.create({
        name,
        email,
        password,
        contactNo,
        pincode,
        address
    });
    const token = user.getJWTToken();
    res.status(200).json({
        success: true,
        token
    });
})
// Login Super Admin
exports.loginSuperAdmin = catchAsyncError(async (req, res, next) => {
    const {
        email,
        password
    } = req.body;
    // checking if user has given password and email both
    if (!email || !password) {
        return next(new ErrorHandler("Please Enter Email & Password", 400));
    }
    const user = await SuperAdmin.findOne({
        email
    }).select("+password");
    if (!user) {
        return next(new ErrorHandler("Invalid email or password", 401));
    }
    const isPasswordMatched = await user.comparePassword(password);
    if (!isPasswordMatched) {
        return next(new ErrorHandler("Invalid email or password", 401));
    }
    sendtoken(user,200,res);
});

//logout SuperAdmin
exports.logoutSuperAdmin = catchAsyncError(async (req, res, next) => {
    res.cookie("token",null,{
        expires : new Date(Date.now()),
        httpOnly : true,        
    })
    res.status(200).json({
        success: true,
        message: "Logged out successfully"
    });
});
//finding the user
exports.findSuperAdmin = catchAsyncError(async (req, res, next) =>
{
    const user = await SuperAdmin.findById(req.user.id);
    res.status(200).json({success:200,user});
})

//edit superadmin , vendor route
exports.updateSuperAdmin =  catchAsyncError(async(req,res,next) =>   
{
    const newsuperadmindata = {
        name:req.body.name,    
        email:req.body.email,
        contactNo:req.body.contactNo,
        address:req.body.address,
        pincode:req.body.pincode
    }
    const superadmin=await SuperAdmin.findByIdAndUpdate(req.user.id,newsuperadmindata,{
        new:true,
        runValidators:true,    
        useFindAndModify:false,    
    });
    res.status(200).json({
        success:true, 
        superadmin
    });
});
//delete superadmin , vendor route
exports.deleteSuperAdmin =  catchAsyncError(async (req,res,next) =>    
{
    const superadmin = await SuperAdmin.findById(req.user.id);
    if(!superadmin)     
    {
        return res.status(500).json({
            success:false,
            message: "SuperAdmin not found"
        })
    }
    await superadmin.remove();
    res.status(200).json({success:true,message: "SuperAdmin deleted successfully"})
});