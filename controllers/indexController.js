const { catchAsynchErrors } = require("../middlewares/catchAsynchErrors")
const userModel = require('../models/userModel');

// @desc    Controller function for Home Page
// @route   GET /
// @access  Public
exports.homepage = catchAsynchErrors( async (req, res, next) => {
    res.json({
        "name" : "Shadab",
        "age" : 20,
        "branch" : "CSE"
    })
})

// @desc    Controller function to handle registration of user
// @route   GET /signup
// @access  Public
exports.userSignUp = catchAsynchErrors( async (req, res, next) => {

    let user = await new userModel(req.body).save();
    
    // Sending back the created user with a response code of 201 which means 'Created'
    res.status(201).json({
        status: true,
        data:{
            user: user
        },
        message:"User has been successfully signed up!"
    });

})