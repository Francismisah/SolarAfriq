const mongoose = require("mongoose");

const installerSchema = new mongoose.Schema(
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
      unique: true,
      match: [
        /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/,
        "Please provide a valid email address",
      ],
    },
    password: {
      type: String,
      required: true,
      minlength: [8, "Password must be at least 8 characters long"],
      select: false, // Do not include the password in queries by default
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
      enum: ["installer", "admin"], // Defines the valid roles
      default: "installer", // Default role is 'installer'
    },
  },
  {
    timestamps: true, // Automatically adds `createdAt` and `updatedAt` fields
  }
);

const Installer = mongoose.model("Installer", installerSchema);

module.exports = Installer;
