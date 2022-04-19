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
  
const ProjectSchema = new Schema({
    
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
    start_date: {
        type: Date,
        required: true
    },
    completion_Date:{
        type: Date,
        required: true
    },
    Progress_Images:[],
    isVerified: {
        type: Boolean,
        default: false
    }

   
});

module.exports = Projects = mongoose.model("Projects", ProjectSchema);