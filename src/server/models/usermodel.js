const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const SECRET = require("../config/keys").JWT_SECRET;
const EXPIRE = require("../config/keys").JWT_EXPIRE;
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validator: [validator.isEmail, "Enter a valid Email"]
    },
    password: {
        type: String,
        required: true,
        selected: false,
    },
    contactNo: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    pincode: {
        type: Number,
        required: true
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date
});

UserSchema.pre("save", async function (next) {
    if (!this.isModified("password")) //so as to not rehash password
    {
        next();
    }

    this.password = await bcrypt.hash(this.password, 10);
});


//Jwt
UserSchema.methods.getJWTToken = function () {
    //console.log(SECRET);
    return jwt.sign({
        id: this._id
    }, SECRET, {
        expiresIn: EXPIRE,
    });
};
// Compare Password
UserSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password);
};

module.exports = User = mongoose.model("User", UserSchema);