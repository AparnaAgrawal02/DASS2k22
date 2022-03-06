# Backend Folder

config.js : contains the secret keys and environmental variables.

controllers : contains user controllers
    usercontroller.js : contains user controller along with functions for registry , login , logout and finding users

middleware: contains some middleware files
    auth.js : contains files that authenticate / verify if user or admin
    catchAsyncError.js : catches async errors
    error.js : simplifies error messages

models : contains profile models
    usermodel.js : contains user model

routes : contains API endpoints
    userroute.js : contains user API

utils : contains some helper functions
    errorhandler.js : contains error handler / simplifies error messages
    jwttoken.js : creates and saves JWT token as a cookie.