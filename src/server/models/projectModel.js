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
    byEmail: {
        type: String,
        required: true,
    },
    ProjectName: {
        type: String,
        required: true,
    },

    location: {
        type:[],
        required:true
    },
    center:{
        type:locationSchema,
        required :true
    },
    address: {
        type: String,
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
    images: [
        {
          public_id: {
            type: String,
            required: true,
          },
          url: {
            type: String,
            required: true,
          },
        },
      ],
    isVerified: {
        type: Boolean,
        default: false
    }

   
});

module.exports = Projects = mongoose.model("Projects", ProjectSchema);