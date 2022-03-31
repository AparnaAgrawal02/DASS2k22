const catchAsyncError = require("./catchAsyncError");
const ErrorHandler = require("../utils/errorhandler");
const jwt=require("jsonwebtoken")
const User=require("../models/usermodel");
const SECRET = require("../config/keys").JWT_SECRET;
exports.isAuthUser=catchAsyncError(async (req,res,next)=>
{
    const {token} = req.cookies;  
    //console.log(token);
    if(!token)    
    {
        return next(new ErrorHandler("You are not logged in",401));
    }
    const data=jwt.verify(token,SECRET);
    req.user=await User.findById(data.id);
    if(!req.user)
    {
        return next(new ErrorHandler("You are not logged in to interact with this User functionality",401));
    }
    else
    {
        next();
    }
})
exports.isAuthAdmin=catchAsyncError(async (req,res,next)=>
{
    const {token} = req.cookies;  
    //console.log(token);
    if(!token)    
    {
        return next(new ErrorHandler("You are not logged in",401));
    }
    const data=jwt.verify(token,SECRET);
    req.user=await Admin.findById(data.id);
    if(!req.user)
    {
        return next(new ErrorHandler("You are not logged in to interact with this Admin functionality",401));
    }
    else
    {
        next();
    }
})
exports.isAuthSuperAdmin=catchAsyncError(async (req,res,next)=>
{
    const {token} = req.cookies;  
    //console.log(token);
    if(!token)    
    {
        return next(new ErrorHandler("You are not logged in",401));
    }
    const data=jwt.verify(token,SECRET);
    req.user=await SuperAdmin.findById(data.id);
    if(!req.user)
    {
        return next(new ErrorHandler("You are not logged in to interact with this Admin functionality",401));
    }
    else
    {
        next();
    }
})