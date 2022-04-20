const ErrorHandler = require("../utils/errorhandler");
const catchAsyncError = require("../middleware/catchAsyncError");
const User = require("../models/usermodel");
const  CrowdSourcedData = require("../models/crowdSourceDataModel");
const  RequestsData = require("../models/RequestsModel");
const Activity = require("../models/ActivityModel");
const Project = require("../models/projectModel");
const sendtoken = require("../utils/jwttoken");

//register a user
exports.registeruser = catchAsyncError(async (req, res, next) => {
    const {
        name,
        email,
        password,
        contactNo,
        pincode,
        address
    } = req.body;
    const user = await User.create({
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
// Login User
exports.loginUser = catchAsyncError(async (req, res, next) => {
    const {
        email,
        password
    } = req.body;
    // checking if user has given password and email both
    if (!email || !password) {
        return next(new ErrorHandler("Please Enter Email & Password", 400));
    }
    const user = await User.findOne({
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

//logout user
exports.logoutUser = catchAsyncError(async (req, res, next) => {
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
exports.finduser = catchAsyncError(async (req, res, next) =>
{
    const user = await User.findById(req.user.id);
    res.status(200).json({success:200,user});
})


// save data added by crowd
exports.AddCrowdSourcedData = catchAsyncError(async (req, res, next) => {
    //console.log(req)
    const {
        byEmail,
        location,
        //address,
        center,
        bodyType,
        detail,
        isVerified,
        date=Date.now(),
        dateOfVerification
    } = req.body;
    const  newData = await CrowdSourcedData.create({
        byEmail,
        location,
        //address,
        center,
        bodyType,
        detail,
        isVerified,
        date,
        dateOfVerification
    });
    res.status(200).json({
        success: true,
        newData 
    });
    
})

// save request 
exports.AddGenericRequest = catchAsyncError(async (req, res, next) => {
    console.log(req)
    const {
        byEmail,
        location,
        center,
        //address,
        request,
        date=Date.now()
    } = req.body;
    const  newData = await RequestsData.create({
        byEmail,
        location,
        //address,
        center,
        request,
        date
    });
    res.status(200).json({
        success: true,
        newData 
    });
})
exports.AddActivity = catchAsyncError(async (req, res, next) =>
{
    const {
        byEmail=req.user.email,
        ActivityName,
        location,
        address,
        Assigned_to,
        Date=Date.now(),
        duration,
        isVerified
    } = req.body;
    const  newData = await Activity.create({
        byEmail,
        ActivityName,
        location,
        address,
        Assigned_to,
        Date,
        duration,
        isVerified
    });
    res.status(200).json({
        success: true,
        newData 
    });
})
exports.AddProject = catchAsyncError(async (req, res, next) =>
{
    const {
        ProjectName,
        location,
        address,
        Assigned_to,
        start_date,
        completion_date,
    } = req.body;
    const  newData = await Project.create({
        ProjectName,
        location,
        address,
        Assigned_to,
        start_date,
        completion_date,
    });
    res.status(200).json({
        success: true,
        newData 
    });
})
//edit user , vendor route
exports.updateUser =  catchAsyncError(async(req,res,next) =>   
{
    const newuserdata = {
        name:req.body.name,    
        email:req.body.email,
        contactNo:req.body.contactNo,
        address:req.body.address,
        pincode:req.body.pincode
    }
    const user=await User.findByIdAndUpdate(req.user.id,newuserdata,{
        new:true,
        runValidators:true,    
        useFindAndModify:false,    
    });
    res.status(200).json({
        success:true, 
        user
    });
});
//delete user , vendor route
exports.deleteUser =  catchAsyncError(async (req,res,next) =>    
{
    const user = await User.findById(req.user.id);
    if(!user)     
    {
        return res.status(500).json({
            success:false,
            message: "User not found"
        })
    }
    await user.remove();
    res.status(200).json({success:true,message: "User deleted successfully"})
});