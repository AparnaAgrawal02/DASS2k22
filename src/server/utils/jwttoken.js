const sendtoken = (user,statuscode,res) => {
    const token = user.getJWTToken();
    const options = {
        expires: new Date(Date.now + 7*24*3600*1000),
        httpOnly: true,
    };
    res.status(statuscode).cookie("token",token,options).json({ 
        success: true,
        user,token,
    });
};

module.exports = sendtoken;