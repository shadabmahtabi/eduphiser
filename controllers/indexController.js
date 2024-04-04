const { catchAsynchErrors } = require("../middlewares/catchAsynchErrors");
const userModel = require("../models/userModel");
const ErrorHandler = require("../utils/ErrorHandler");

/*
  Controller function for showing homepage.
*/
exports.homepage = catchAsynchErrors(async (req, res, next) => {
  res.json({
    name: "Shadab",
    age: 20,
    branch: "CSE",
  });
});

/*
  Controller function to handle registration of a user.
*/
exports.userSignUp = catchAsynchErrors(async (req, res, next) => {
  let user = await new userModel(req.body).save();

  // Sending back the created user with a response code of 201 which means 'Created'
  res.status(201).json({
    status: true,
    data: {
      user: user,
    },
    message: "User has been successfully signed up!",
  });
});

/*
  Controller function to handle login of a user.
*/
exports.userSignIn = catchAsynchErrors(async (req, res, next) => {
  let user = await userModel
    .findOne({ email: req.body.email })
    .select("+password")
    .exec();

  if (!user)
    return next(new ErrorHandler("No user exists with this credentials", 404));

  let isMatch = user.comparePassword(req.body.password);

  if (!isMatch) return next(new ErrorHandler("Wrong Credentials", 400));

  res.status(200).json({
    status: true,
    data: {
      user: user,
    },
    message: "User has been successfully signed in!",
  });
});
