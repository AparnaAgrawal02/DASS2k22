const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const locationSchema = new Schema({
   lat: Number,
    log: Number
  });

const addressSchema = new Schema({
    city:String,
    state:String,
    postal:String,
   });
  
const RequestSchema = new Schema({
    
   /*  ReqId:{
        type: number,
        required: true,
        unique: true,
    }, */
    byEmail: {
        type: String,
        required: true,
    },

    location: {
        type:[[locationSchema]],
        required:true
    },
    address: {
        type: addressSchema,
        required: true
    },
    accepted: {
        type: Boolean,
        default: false
      },
    request: {
        type: String,
        required: true
    },
    date:{
        type: Date,
        required: true
    },
    dateOfAcceptance:{
        type:Date,
        
    },
   
});

module.exports = Requests = mongoose.model("Requests", RequestSchema);