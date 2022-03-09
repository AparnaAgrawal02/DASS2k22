const ErrorHandler = require("../utils/errorhandler");
const catchAsyncError = require("../middleware/catchAsyncError");
const User = require("../models/usermodel");
const sendtoken = require("../utils/jwttoken");
const ApiFeatures = require("../utils/apiFeatures");

exports.getAllUsers = catchAsyncError(async (req, res, next) => { 
    const apifeature = new ApiFeatures(User.find(),req.query).search().filter();//.pagination(resultsperpage);
    const users=await apifeature.query;
    //const products=await Product.find();
    res.status(200).json(
    {
        success:true,
        users
    })
});

exports.changerole = catchAsyncError(async (req, res, next) =>
{
    const user = await User.findById(req.user.id);
    req.user.role="admin";
    res.status(200).json({
        success: true,
        user
    });
})