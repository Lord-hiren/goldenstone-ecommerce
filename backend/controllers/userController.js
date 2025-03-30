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
      new ErrorHander("Please provide email, name, and profile picture")
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

  console.log(user);

  // Log in the user
  sendToken(user, res);
});

// Logout User
exports.logout = catchAsyncErrors(async (req, res, next) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });

  res.json({
    success: true,
    message: "Logged Out",
  });
});

// Get User Detail
exports.getUserDetails = catchAsyncErrors(async (req, res, next) => {
  const { userid } = req.body;

  if (!userid) {
    return next(new ErrorHander("User ID is required"));
  }

  const user = await User.findById(userid);

  if (!user) {
    return next(new ErrorHander("User not found"));
  }

  res.json({
    success: true,
    user,
  });
});

// Get all users (admin)
exports.getAllUser = catchAsyncErrors(async (req, res, next) => {
  const users = await User.find();

  res.json({
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

  res.json({
    success: true,
    user,
  });
});

// Update User Role -- Admin
exports.updateUserRole = catchAsyncErrors(async (req, res, next) => {
  const newUserData = {
    role: req.body.role,
  };

  const user = await User.findByIdAndUpdate(req.params.id, newUserData, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  if (!user) {
    return next(
      new ErrorHander(`User does not exist with Id: ${req.params.id}`)
    );
  }

  res.json({
    success: true,
    message: "User role updated successfully",
    user,
  });
});

// Delete User -- Admin
exports.deleteUser = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    return next(
      new ErrorHander(`User does not exist with Id: ${req.params.id}`)
    );
  }

  await User.deleteOne({ _id: req.params.id });

  res.json({
    success: true,
    message: "User deleted successfully",
  });
});

// ADMIN LOGIN
exports.adminLogin = catchAsyncErrors(async (req, res, next) => {
  const { userName, password } = req.body;

  if (!userName || !password) {
    return next(new ErrorHander("Please provide both username and password"));
  }

  const Username = process.env.ADMIN_USER_NAME;
  const Password = process.env.ADMIN_PASSWORD;

  if (userName !== Username || password !== Password) {
    return next(new ErrorHander("Invalid username or password"));
  }

  const user = { id: 1, name: userName, role: "admin" };
  const token = await generateAdminToken(user);

  // Set cookie options
  const cookieOptions = {
    expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
  };

  // Set token in cookie
  res.cookie("adminToken", token, cookieOptions);

  res.json({
    success: true,
    token,
    user,
  });
});

// ADMIN LOGOUT
exports.adminLogout = catchAsyncErrors(async (req, res, next) => {
  res.cookie("adminToken", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });

  res.json({
    success: true,
    message: "Logged out successfully",
  });
});

// Get Admin Profile
exports.getAdminProfile = catchAsyncErrors(async (req, res, next) => {
  const user = req.user;

  res.json({
    success: true,
    user,
  });
});
