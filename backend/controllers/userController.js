const ErrorHander = require("../middleware/error");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const User = require("../models/userModel");
const sendToken = require("../utils/jwtToken");
const { generateAdminToken } = require("../utils/adminToken");

// Google Login/Register User
exports.googleLogin = catchAsyncErrors(async (req, res, next) => {
  const { email, name, profile_pic } = req.body;

  if (!email || !name || !profile_pic) {
    return next(
      new ErrorHander("Please provide email, name, and profile picture", 400)
    );
  }

  let user = await User.findOne({ email });

  if (!user) {
    // Register the user
    user = await User.create({
      name,
      email,
      avatar: {
        public_id: "",
        url: profile_pic,
      },
    });
  }

  // Log in the user
  sendToken(user, 200, res);
});

// Logout User
exports.logout = catchAsyncErrors(async (req, res, next) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });

  res.status(200).json({
    success: true,
    message: "Logged Out",
  });
});

// Get User Detail
exports.getUserDetails = catchAsyncErrors(async (req, res, next) => {
  const { userid } = req.body;

  if (!userid) {
    return next(new ErrorHander("User ID is required", 400));
  }

  const user = await User.findById(userid);

  if (!user) {
    return next(new ErrorHander("User not found", 404));
  }

  res.status(200).json({
    success: true,
    user,
  });
});

// Get all users (admin)
exports.getAllUser = catchAsyncErrors(async (req, res, next) => {
  const users = await User.find();

  res.status(200).json({
    success: true,
    users,
  });
});

// Get single user (admin)
exports.getSingleUser = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    return next(
      new ErrorHander(`User does not exist with Id: ${req.params.id}`)
    );
  }

  res.status(200).json({
    success: true,
    user,
  });
});

// Update User Role -- Admin
exports.updateUserRole = catchAsyncErrors(async (req, res, next) => {
  const newUserData = {
    role: req.body.role,
  };

  await User.findByIdAndUpdate(req.params.id, newUserData, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
  });
});

// Delete User -- Admin
exports.deleteUser = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    return next(
      new ErrorHander(`User does not exist with Id: ${req.params.id}`, 400)
    );
  }

  await User.deleteOne({ _id: req.params.id });

  res.status(200).json({
    success: true,
    message: "User Deleted Successfully",
  });
});

// ADMIN LOGIN
exports.adminLogin = catchAsyncErrors(async (req, res, next) => {
  const { userName, password } = req.body;

  if (!userName) {
    return next(new ErrorHander("Username is required", 400));
  }

  if (!password) {
    return next(new ErrorHander("Password is required", 400));
  }

  const Username = process.env.ADMIN_USER_NAME;
  const Password = process.env.ADMIN_PASSWORD;

  if (userName !== Username) {
    return next(new ErrorHander("Please provide valid username", 401));
  }

  if (password !== Password) {
    return next(new ErrorHander("Please provide valid password", 403));
  }

  const adminToken = await generateAdminToken([
    { user_id: 1, user_name: userName },
  ]);

  if (adminToken) {
    return res.status(200).json({ success: true, token: adminToken });
  }
});
