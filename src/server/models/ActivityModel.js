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
  
const ActivitySchema = new Schema({
    
   /*  ReqId:{
        type: number,
        required: true,
        unique: true,
    }, */
    ProjectName: {
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
    Assigned_to: {
        type: String,
        
      },
    Date: {
        type: Date,
        required: true
    },
    duration:{
        type: Number,
        required: true
    }
});

module.exports = Activites = mongoose.model("Requests", ActivitySchema);