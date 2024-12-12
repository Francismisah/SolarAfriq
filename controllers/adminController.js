const Installer = require("../models/installerModel");
const SolarUser = require("../models/solarUserModel");

// **Get All Installers**
exports.getAllInstallers = async (req, res) => {
  try {
    const installers = await Installer.find().select("-password"); // Exclude sensitive data
    res
      .status(200)
      .json({ message: "Installers retrieved successfully", installers });
  } catch (error) {
    throw new Error("Failed to fetch installers: " + error.message);
  }
};

// **Get All Solar Users**
exports.getAllSolarUsers = async (req, res) => {
  try {
    const solarUsers = await SolarUser.find();
    res
      .status(200)
      .json({ message: "Solar users retrieved successfully", solarUsers });
  } catch (error) {
    throw new Error("Failed to fetch solar users: " + error.message);
  }
};

// **Delete User**
exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    // Check both Installer and SolarUser collections
    const installer = await Installer.findByIdAndDelete(id);
    const solarUser = installer ? null : await SolarUser.findByIdAndDelete(id);

    if (!installer && !solarUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
      message: "User deleted successfully",
      deletedUser: installer || solarUser,
    });
  } catch (error) {
    throw new Error("Failed to delete user: " + error.message);
  }
};
