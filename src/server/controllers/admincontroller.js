const ErrorHandler = require("../utils/errorhandler");
const catchAsyncError = require("../middleware/catchAsyncError");
const User = require("../models/usermodel");
const  CrowdSourcedData = require("../models/crowdSourceDataModel");
const  RequestsData = require("../models/RequestsModel");
const  Project = require("../models/projectModel");
const  Activity = require("../models/ActivityModel");
const sendtoken = require("../utils/jwttoken");
const Admin = require("../models/adminmodel");
const ApiFeatures = require("../utils/apiFeatures");
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
exports.findData = catchAsyncError(async (req, res, next) =>
{
    const user = await CrowdSourcedData.findById(req.params.id);
    res.status(200).json({success:200,user});
})
exports.findProject = catchAsyncError(async (req, res, next) =>
{
    const user = await Project.findById(req.params.id);
    res.status(200).json({success:200,user});
})
exports.findActivity = catchAsyncError(async (req, res, next) =>
{
    const user = await Admin.findById(req.params.id);
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

exports.verifyActivity = catchAsyncError(async (req, res, next) =>
{
    const activity = await Activity.findById(req.params.id);
    if(!activity)
    {
        return res.status(500).json({
            success:false,
            message: "Activity not found"
        })
    }
    activity.isVerified=true;
    await activity.save();
    res.status(200).json({success:true,message: "Activity verified successfully"})
})
exports.verifyProject = catchAsyncError(async (req, res, next) =>
{
    const project = await Project.findById(req.params.id);
    if(!project)
    {
        return res.status(500).json({
            success:false,
            message: "Project not found"
        })
    }
    project.isVerified=true;
    await project.save();
    res.status(200).json({success:true,message: "Project verified successfully"})
})
exports.verifyData = catchAsyncError(async (req, res, next) =>
{   console.log(req.params.id)
    const data = await CrowdSourcedData.findById(req.params.id);
    console.log(data)
    if(!data)
    {
        return res.status(500).json({
            success:false,
            message: "Data not found"
        })
    }
    data.isVerified=true;
    await data.save();
    console.log(data)
    res.status(200).json({success:true,message: "Data verified successfully"})
})
exports.getAllActivities = catchAsyncError(async (req, res, next) =>
{
    const apifeature = new ApiFeatures(Activity.find(),req.query).search().filter();//.pagination(resultsperpage);
    const activities=await apifeature.query;
    res.status(200).json(
    {
        success:true,
        activities
    })
})
exports.getAllProjects = catchAsyncError(async (req, res, next) =>
{
    const apifeature = new ApiFeatures(Project.find(),req.query).search().filter();//.pagination(resultsperpage);
    const projects=await apifeature.query;
    res.status(200).json(
    {
        success:true,
        projects
    })
})
exports.getAllUnverifiedProjects = catchAsyncError(async (req, res, next) =>
{
    const apifeature = new ApiFeatures(Project.find({isVerified:false}),req.query).search().filter();//.pagination(resultsperpage);
    const projects=await apifeature.query;
    res.status(200).json(
    {
        success:true,
        projects
    })
})
exports.getAllUnverifiedActivities = catchAsyncError(async (req, res, next) =>
{
    const apifeature = new ApiFeatures(Activity.find({isVerified:false}),req.query).search().filter();//.pagination(resultsperpage);
    const activities=await apifeature.query;
    res.status(200).json(
    {
        success:true,
        activities
    })
})
exports.getAllUnverifiedData = catchAsyncError(async (req, res, next) =>
{
    const apifeature = new ApiFeatures(CrowdSourcedData.find({isVerified:false}),req.query).search().filter();//.pagination(resultsperpage);
    const data=await apifeature.query;
    res.status(200).json(
    {
        success:true,
        data
    })
    //console.log(data)
})
exports.getAllVerifiedProjects = catchAsyncError(async (req, res, next) =>
{   
    const apifeature = new ApiFeatures(Project.find({isVerified:true}),req.query).search().filter();//.pagination(resultsperpage);
    const projects=await apifeature.query;
    res.status(200).json(
    {
        success:true,
        projects
    })
    
})
exports.getAllVerifiedActivities = catchAsyncError(async (req, res, next) =>
{
    const apifeature = new ApiFeatures(Activity.find({isVerified:true}),req.query).search().filter();//.pagination(resultsperpage);
    const activities=await apifeature.query;
    res.status(200).json(
    {
        success:true,
        activities
    })
})
exports.getAllVerifiedData = catchAsyncError(async (req, res, next) =>
{
    const apifeature = new ApiFeatures(CrowdSourcedData.find({isVerified:true}),req.query).search().filter();//.pagination(resultsperpage);
    const data=await apifeature.query;
    res.status(200).json(
    {
        success:true,
        data
    })
})

exports.updateActivity =  catchAsyncError(async (req,res,next) =>
{
    let activity = await Activity.findById(req.params.id);
    if(!activity)
    {
        return res.status(500).json({
            success:false,
            message: "Activity not found"
        })
    }
    activity=await Activity.findByIdAndUpdate(req.params.id,req.body,{
        new:true,
        runValidators:true,    
        useFindAndModify:false,    
    });
    res.status(200).json({
        success:true, 
        activity
    });
});
exports.updateProject =  catchAsyncError(async (req,res,next) =>
{
    let project = await Project.findById(req.params.id);
    if(!project)
    {
        return res.status(500).json({
            success:false,
            message: "Project not found"
        })
    }
    project=await Project.findByIdAndUpdate(req.params.id,req.body,{
        new:true,
        runValidators:true,    
        useFindAndModify:false,    
    });
    res.status(200).json({
        success:true, 
        project
    });
});
exports.updateData =  catchAsyncError(async (req,res,next) =>
{ 
    let data = await CrowdSourcedData.findById(req.params.id);
    if(!data)
    {
        return res.status(500).json({
            success:false,
            message: "Data not found"
        })
    }
    data=await CrowdSourcedData.findByIdAndUpdate(req.params.id,req.body,{
        new:true,
        runValidators:true,    
        useFindAndModify:false,    
    });
    res.status(200).json({
        success:true, 
        data
    });
});
exports.deleteActivity =  catchAsyncError(async (req,res,next) =>
{
    let activity = await Activity.findById(req.params.id);
    if(!activity)
    {
        return res.status(500).json({
            success:false,
            message: "Activity not found"
        })
    }
    await Activity.findByIdAndDelete(req.params.id);
    res.status(200).json({
        success:true, 
        message: "Activity deleted successfully"
    });
});
exports.deleteProject =  catchAsyncError(async (req,res,next) =>
{
    let project = await Project.findById(req.params.id);
    if(!project)
    {
        return res.status(500).json({
            success:false,
            message: "Project not found"
        })
    }
    await Project.findByIdAndDelete(req.params.id);
    res.status(200).json({
        success:true, 
        message: "Project deleted successfully"
    });
});
exports.deleteData =  catchAsyncError(async (req,res,next) =>
{
    let data = await CrowdSourcedData.findById(req.params.id);
    if(!data)
    {
        return res.status(500).json({
            success:false,
            message: "Data not found"
        })
    }
    await CrowdSourcedData.findByIdAndDelete(req.params.id);
    res.status(200).json({
        success:true, 
        message: "Data deleted successfully"
    });
});