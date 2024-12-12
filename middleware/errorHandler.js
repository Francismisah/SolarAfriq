// middleware/errorHandler.js

const errorHandler = (err, req, res, next) => {
  console.error(err); // Log the error details

  // Handle different types of errors
  if (err.name === "ValidationError") {
    // Mongoose validation error
    return res.status(400).json({
      message: "Validation error",
      errors: err.errors,
    });
  }

  if (err.name === "JsonWebTokenError" || err.name === "TokenExpiredError") {
    // JWT related errors
    return res.status(401).json({
      message: "Unauthorized: Invalid or expired token",
    });
  }

  if (err.code === 11000) {
    // MongoDB duplicate key error
    return res.status(400).json({
      message: "Duplicate key error",
      error: "A record with this value already exists",
    });
  }

  // Default case for unexpected errors
  res.status(500).json({
    message: "Internal server error",
    error: err.message,
  });
};

module.exports = errorHandler;
