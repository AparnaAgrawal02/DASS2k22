const mongoose = require("mongoose");
const SECRET = require("../config/keys").MAP_API;
const Schema = mongoose.Schema;
const locationSchema = new mongoose.Schema({
    lat: Number,
    lng: Number
});
/* const addressSchema = new mongoose.Schema({
    city: String,
    state: String,
    postal: String,
}); */

const CrowdSourcedSchema = new Schema({
    /* dataId:{
        type: number,
        required: true,
        unique: true,
    }, */
    byEmail: {
        type: String,
        required: true,
    },

    location: {
        type: [[locationSchema]],
        required: true
    },
    /* address: {
        type: addressSchema,
        required: true
    }, */
    center:{
        type:locationSchema,
        required :true
    },
    bodyType:{
        type:String,
        required :true

    },
  

    verified: {
        type: Boolean,
        default: false
    },
    detail: {
        type: String,
        
    },
    date: {
        type: Date,
        required: true
    },
    dateOfVerification: {
        type: Date,
        default: null
    },


});




module.exports = CrowdSourcedData = mongoose.model("CrowdSourcedData", CrowdSourcedSchema);