const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const cloudinary = require('cloudinary');
const fileUpload = require('express-fileupload');
const PORT = process.env.PORT || 5000;

app.use(cors({ credentials: true, origin: 'http://localhost:3000' }));
//using the modules
//app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(fileUpload({ useTempFiles: true }));




// Connection to MongoDB
const db = require("./config/keys").mongoURI; //config file contains most of the pvt or secretive data
mongoose
    .connect(db, { useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true })
    .then(() => console.log("MongoDB Connected"))
    .catch(err => console.log(err))


//cloudinary config
cloudinary.config({
    cloud_name: require("./config/keys").cloud_name,
    api_key: require("./config/keys").api_key,
    api_secret: require("./config/keys").api_secret
});
//exporting routes
// routes
var UserRouter = require("./routes/userroute");
var SuperAdminRouter = require("./routes/superadminroute");
var AdminRouter = require("./routes/adminroute");
/* var crowdSourcedRouter = require("./routes/crowdSourcedDataRoute"); */

//error handler
const errorMiddleware = require("./middleware/error");

// setup API endpoints
app.use("/user", UserRouter);
app.use("/superadmin", SuperAdminRouter);
app.use("/admin", AdminRouter);
//app.use("/crowdSourcedData",crowdSourcedRouter);
//using error middleware
app.use(errorMiddleware);
app.listen(PORT, function () {
    console.log("Server is running on Port: " + PORT);
});