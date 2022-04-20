const mongoose = require("mongoose");
const Schema = mongoose.Schema;
/* const locationSchema = new Schema({
   lat: Number,
    log: Number
  }); */

const addressSchema = new Schema({
    city: String,
    state: String,
    postal: String,
});

const ActivitySchema = new Schema({

    /*  ReqId:{
         type: number,
         required: true,
         unique: true,
     }, */
    byEmail: {
        type: String,
        required: true,
    },
    ActivityName: {
        type: String,
        required: true,
    },

    location: {
        type: [],
        required: true
    },
    address: {
        type: addressSchema,
        required: true
    },
    Assigned_to: {
        type: String,

    },
    Date: {
        type: Date,
        required: true
    },
    duration: {
        type: Number,
        required: true
    },
    img: {
        public_id: {
            type: String,
            required: true,
        },
        url: {
            type: String,
            required: true,
        },
    },
    isVerified: {
        type: Boolean,
        default: false
    }
});

module.exports = Activities = mongoose.model("Activities", ActivitySchema);