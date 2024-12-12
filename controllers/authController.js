const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Installer = require("../models/installerModel");
const validateInstallerRegistration = require("../middleware/validateInstallerRegistration");
const authenticate = require("../middleware/authenticate");

const SECRET_KEY = process.env.SECRET_KEY || "Vybz_kartel_2003";

// **Installer Registration**
exports.registerInstaller = async (req, res) => {
  const { name, email, password, phoneNumber, location, address } = req.body;

  try {
    const existingInstaller = await Installer.findOne({ email });
    if (existingInstaller) {
      return res.status(400).json({ message: "Email already in use" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newInstaller = await Installer.create({
      name,
      email,
      password: hashedPassword,
      phoneNumber,
      location,
      address,
    });

    res.status(201).json({
      message: "Installer registered successfully",
      installer: newInstaller,
    });
  } catch (error) {
    console.error("Error during registration:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// **Installer Login**
exports.loginInstaller = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const installer = await Installer.findOne({ email }).select("+password");
    console.log(installer);
    if (!installer) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const isPasswordValid = await bcrypt.compare(password, installer.password);
    console.log("Password valid:", isPasswordValid);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: installer._id, role: "installer" },
      SECRET_KEY,
      {
        expiresIn: "1h",
      }
    );
    res.status(200).json({ message: "Login successful", token });
  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// **Get Profile**
exports.getInstallerProfile = [
  authenticate, // Middleware to authenticate the user using the token
  async (req, res) => {
    try {
      const installer = await Installer.findById(req.user._id).select(
        "-password"
      );
      if (!installer) {
        return res.status(404).json({ message: "Installer not found" });
      }

      res.status(200).json({ installer });
    } catch (error) {
      console.error("Profile Fetch Error:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  },
];
