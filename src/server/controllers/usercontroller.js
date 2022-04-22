const ErrorHandler = require("../utils/errorhandler");
const catchAsyncError = require("../middleware/catchAsyncError");
const User = require("../models/usermodel");
const CrowdSourcedData = require("../models/crowdSourceDataModel");
const RequestsData = require("../models/RequestsModel");
const Activity = require("../models/ActivityModel");
const Project = require("../models/projectModel");
const sendtoken = require("../utils/jwttoken");
const jwt = require("jsonwebtoken")
const SECRET = require("../config/keys").JWT_SECRET;
const cloudinary = require("cloudinary");
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
    console.log(email, password);
    console.log(req);
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
    sendtoken(user, 200, res);
});

//logout user
exports.logoutUser = catchAsyncError(async (req, res, next) => {
    res.cookie("token", null, {
        expires: new Date(Date.now()),
        httpOnly: true,
    })
    res.status(200).json({
        success: true,
        message: "Logged out successfully"
    });
});

//finding the user
exports.finduser = catchAsyncError(async (req, res, next) => {
    const user = await User.findById(req.user.id);
    res.status(200).json({
        success: 200,
        user
    });
})


// save data added by crowd
exports.AddCrowdSourcedData = catchAsyncError(async (req, res, next) => {
    console.log(req)
    //console.log(req)
    myimg = null
    if(req.files){
    const myimg = await cloudinary.v2.uploader.upload(req.files.img.tempFilePath, {
        folder: "crowdSourcedData",
        width: 400,
        height: 400,
        crop: "scale"
    });
    }
    const {
        token
    } = req.cookies;
    const data = jwt.verify(token, SECRET);
    
    req.user = await User.findById(data.id);
    const {
        byEmail = req.user.email,
            location,
            address,
            center,
            bodyType,
            detail,
            isVerified,
            date = Date.now(),
            dateOfVerification
    } = req.body;
    console.log(req.body,"Fuck")
    const newData = await CrowdSourcedData.create({
        byEmail,
        location,
        address,
        center,
        bodyType,
        detail,
        isVerified,
        date,
        img: null,/* {
            public_id: myimg.public_id,
            url: myimg.url
        }, */
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
    const myimg = await cloudinary.v2.uploader.upload(req.files.img.tempFilePath, {
        folder: "crowdSourcedData",
        width: 400,
        height: 400,
        crop: "scale"
    });
    const {
        token
    } = req.cookies;
    const data = jwt.verify(token, SECRET);
    req.user = await User.findById(data.id);
    const {
        byEmail,
        location,
        center,
        //address,
        request,
        date = Date.now()

    } = req.body;
    const newData = await RequestsData.create({
        byEmail,
        location,
        //address,
        center,
        request,
        img: {
            public_id: myimg.public_id,
            url: myimg.url
        },
        date
    });
    res.status(200).json({
        success: true,
        newData
    });
})
exports.AddActivity = catchAsyncError(async (req, res, next) => {
    const myimg = await cloudinary.v2.uploader.upload(req.files.img.tempFilePath, {
        folder: "Activity",
        width: 400,
        height: 400,
        crop: "scale"
    });
    const {
        token
    } = req.cookies;
    const data = jwt.verify(token, SECRET);
    req.user = await User.findById(data.id);
    const {
        byEmail = req.user.email,
            ActivityName,
            location,
            address,
            Assigned_to,
            details,
            center,
            Date = Date.now(),
            duration,
            isVerified
    } = req.body;
    const newData = await Activity.create({
        byEmail,
        ActivityName,
        location,
        address,
        details,
        center,
        Assigned_to,
        Date,
        duration,
        img: {
            public_id: myimg.public_id,
            url: myimg.url
        },
        isVerified
    });
    res.status(200).json({
        success: true,
        newData
    });
})
exports.AddProject = catchAsyncError(async (req, res, next) => {
    let images = [];
    for (let i = 0; i < req.files.images.length; i++) {
        images.push(req.files.images[i].tempFilePath);
    }
    //console.log(images);
    const imagesLinks = [];

    for (let i = 0; i < images.length; i++) {
        const result = await cloudinary.v2.uploader.upload(images[i], {
            folder: "Projects",
        });

        imagesLinks.push({
            public_id: result.public_id,
            url: result.secure_url,
        });
    };
    const {
        token
    } = req.cookies;
    const data = jwt.verify(token, SECRET);
    req.user = await User.findById(data.id);
    const {
        byEmail = req.user.email,
        ProjectName,
        location,
        address,
        Assigned_to,
        start_date,
        completion_date,
        ProjectDetails,
        center
        
    } = req.body;
    const newData = await Project.create({
        byEmail,
        ProjectName,
        location,
        address,
        Assigned_to,
        ProjectDetails,
        start_date,
        completion_date,
        images: imagesLinks,
        center
    });
    res.status(200).json({
        success: true,
        newData
    });
})
//edit user , vendor route
exports.updateUser = catchAsyncError(async (req, res, next) => {
    const newuserdata = {
        name: req.body.name,
        email: req.body.email,
        contactNo: req.body.contactNo,
        address: req.body.address,
        pincode: req.body.pincode
    }
    const user = await User.findByIdAndUpdate(req.user.id, newuserdata, {
        new: true,
        runValidators: true,
        useFindAndModify: false,
    });
    res.status(200).json({
        success: true,
        user
    });
});
//delete user , vendor route
exports.deleteUser = catchAsyncError(async (req, res, next) => {
    const user = await User.findById(req.user.id);
    if (!user) {
        return res.status(500).json({
            success: false,
            message: "User not found"
        })
    }
    await user.remove();
    res.status(200).json({
        success: true,
        message: "User deleted successfully"
    })
});