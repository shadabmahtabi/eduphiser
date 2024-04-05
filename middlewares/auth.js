const jwt = require("jsonwebtoken");
const ErrorHandler = require("../utils/ErrorHandler");
const { catchAsynchErrors } = require("./catchAsynchErrors");
const userModel = require("../models/userModel");

exports.isAuthenticated = catchAsynchErrors(async (req, res, next) => {
  let { token } = req.cookies;

  if (!token) {
    return next(new ErrorHandler("Please signin to access the resource.", 401));
  }

  let { id } = jwt.verify(token, process.env.JWT_SECRET);

  //   res.json({ id, token });
  //   req.user = await userModel.findById(id).exec();
  next();
});
