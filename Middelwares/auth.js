const ErrorHander = require('../Utils/ErrorHandler');
const catchAsyncErrors = require("./AsyncError");
const jwt = require("jsonwebtoken");
const User = require("../Model/userModel");

exports.isAuthenticatedUser = catchAsyncErrors(async (req, res, next) => {
    const { authorization } = req.headers;
 
  if (!authorization) {
    return next(new ErrorHander("Please Login ", 404));
  }

  const decodedData = jwt.verify(authorization, process.env.JWT_SECRET);

  req.user = await User.findById(decodedData.id);

  next();
});

exports.authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new ErrorHander(
          `Role: ${req.user.role} is not allowed to access this resouce `,
          403
        )
      );
    }

    next();
  };
};
