const ErrorHandler = require("../utils/errorhandler");
const catchAsyncError = require("../middleware/catchAsyncError");
const User = require("../models/usermodel");
const  CrowdSourcedData = require("../models/crowdSourceDataModel");
const  RequestsData = require("../models/RequestsModel");
const sendtoken = require("../utils/jwttoken");
const Admin = require("../models/adminmodel");

exports.getAllUsers = catchAsyncError(async (req, res, next) => { 
    const apifeature = new ApiFeatures(User.find(),req.query).search().filter();//.pagination(resultsperpage);
    const users=await apifeature.query;
    //const admins=await Admin.find();
    res.status(200).json(
    {
        success:true,
        users
    })
});
//register an admin
exports.registerAdmin = catchAsyncError(async (req, res, next) => {
    const {
        name,
        email,
        password,
        contactNo,
        pincode,
        address
    } = req.body;
    const user = await Admin.create({
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
// Login Admin
exports.loginAdmin = catchAsyncError(async (req, res, next) => {
    const {
        email,
        password
    } = req.body;
    // checking if user has given password and email both
    if (!email || !password) {
        return next(new ErrorHandler("Please Enter Email & Password", 400));
    }
    const user = await Admin.findOne({
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

//logout Admin
exports.logoutAdmin = catchAsyncError(async (req, res, next) => {
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
exports.findAdmin = catchAsyncError(async (req, res, next) =>
{
    const user = await Admin.findById(req.user.id);
    res.status(200).json({success:200,user});
})

//edit admin , vendor route
exports.updateAdmin =  catchAsyncError(async(req,res,next) =>   
{
    const newuserdata = {
        name:req.body.name,    
        email:req.body.email,
        contactNo:req.body.contactNo,
        address:req.body.address,
        pincode:req.body.pincode
    }
    const admin=await Admin.findByIdAndUpdate(req.user.id,newuserdata,{
        new:true,
        runValidators:true,    
        useFindAndModify:false,    
    });
    res.status(200).json({
        success:true, 
        admin
    });
});
//delete admin , vendor route
exports.deleteAdmin =  catchAsyncError(async (req,res,next) =>    
{
    const admin = await Admin.findById(req.body.id);
    if(!admin)     
    {
        return res.status(500).json({
            success:false,
            message: "Admin not found"
        })
    }
    await admin.remove();
    res.status(200).json({success:true,message: "Admin deleted successfully"})
});