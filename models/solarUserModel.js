const mongoose = require("mongoose");

const solarUserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      minlength: [3, "Name must be at least 3 characters long"],
    },
    email: {
      type: String,
      required: true,
      unique: true, // Ensure email is unique
      match: [
        /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/,
        "Please provide a valid email address",
      ],
    },
    phoneNumber: {
      type: String,
      required: true,
      match: [
        /^\+?[1-9]\d{1,14}$/,
        "Please provide a valid phone number (e.g., +1234567890)",
      ],
    },
    location: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["user", "admin"], // Possible roles
      default: "user", // Default to "user" if not specified
    },
  },
  {
    timestamps: true, // Automatically adds `createdAt` and `updatedAt` fields
  }
);

const SolarUser = mongoose.model("SolarUser", solarUserSchema);

module.exports = SolarUser;
