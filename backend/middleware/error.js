class ErrorHandler extends Error {
  constructor(message) {
    super(message);
    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = (err, req, res, next) => {
  err.message = err.message || "Internal Server Error";

  // Wrong MongoDB Id error
  if (err.name === "CastError") {
    err.message = `Resource not found. Invalid: ${err.path}`;
  }

  // Mongoose duplicate key error
  if (err.code === 11000) {
    err.message = `Duplicate ${Object.keys(err.keyValue)} entered`;
  }

  // Wrong JWT error
  if (err.name === "JsonWebTokenError") {
    err.message = "Invalid token, please login again";
  }

  // JWT Expire error
  if (err.name === "TokenExpiredError") {
    err.message = "Token expired, please login again";
  }

  // Validation error
  if (err.name === "ValidationError") {
    err.message = Object.values(err.errors)
      .map((val) => val.message)
      .join(", ");
  }

  res.json({
    success: false,
    message: err.message,
    ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
  });
};

module.exports.ErrorHandler = ErrorHandler;
