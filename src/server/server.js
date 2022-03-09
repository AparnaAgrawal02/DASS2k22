const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const PORT = process.env.PORT||4000;

//using the modules
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());


// Connection to MongoDB
const db= require("./config/keys").mongoURI; //config file contains most of the pvt or secretive data
mongoose
    .connect(db,{ useUnifiedTopology: true , useNewUrlParser: true ,useCreateIndex:true})
    .then(() => console.log("MongoDB Connected"))
    .catch(err => console.log(err))

//exporting routes
// routes
var UserRouter = require("./routes/userroute");
var SuperAdminRouter = require("./routes/superadminroute");
/* var crowdSourcedRouter = require("./routes/crowdSourcedDataRoute"); */

//error handler
const errorMiddleware =require("./middleware/error");

// setup API endpoints
app.use("/user",UserRouter);
app.use("/superadmin",SuperAdminRouter);
//app.use("/crowdSourcedData",crowdSourcedRouter);
//using error middleware
app.use(errorMiddleware);  
app.listen(PORT, function() {
    console.log("Server is running on Port: " + PORT);
});