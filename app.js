const express = require('express');
const app = express();

// For initializing environment variables i.e., PORT, etc.
require('dotenv').config();

// For showing logs
/*
    It shows which route is being used and when it's called.
*/
const logger = require('morgan');
app.use(logger('dev'));

// Parsing the request body
/*
    This middleware is responsible for parsing incoming requests 
    and populating req.body with any data sent in a JSON payload.  
    If the Content-Type of the request is application/x-www-form-urlencoded,  
    then the middleware will parse the content of this request to make it available as params on the req.body object.
*/
app.use(express.json());

// Importing routes from other files
const indexRoutes = require('./routes/indexRouter');
const ErrorHandler = require('./utils/ErrorHandler');
// const userRoutes = require('./routes/user-router');


// Assigning / route for indexRouter
app.use('/', indexRoutes)

// Error Handling
/*
    404 - Page not found error
    The server could not find the requested resource. 
*/
app.all( '*', (req, res, next) => {
    next(new ErrorHandler("Requested Url Not Found", 404))

    // let err = new Error("Not Found");
    // err.status = 404;
    // next(err);
});
  
// Adding middleware to handle any errors that occur in our application
app.use((err, req, res, next)=> {
    /*
        Any unhandled errors will be caught here and the following data will be sent:
            .message: A short description of the error.
            .status: The HTTP status code to send with the response.
    */
    res.status(err.status || 500).send({
      message: err.message,
      error: err.name
    });
})


// Setting up server port and listening on
app.listen(process.env.PORT, ()=>{
    console.log(`Server is running on PORT ${process.env.PORT}`)
})