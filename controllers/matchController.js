// controllers/matchController.js
const Installer = require("../models/installerModel");
const SolarUser = require("../models/solarUserModel");

// **Match Solar Users with Installers**
exports.findMatches = async (solarUserId) => {
  try {
    // Find the Solar User by ID
    const solarUser = await SolarUser.findById(solarUserId);
    if (!solarUser) {
      throw new Error("Solar user not found");
    }

    const { location, address } = solarUser;

    // Find installers that match the same location and have overlapping address details
    const matchedInstallers = await Installer.find({
      location: { $regex: location, $options: "i" }, // Case-insensitive match for location
      address: { $regex: address, $options: "i" }, // Case-insensitive match for address
    });

    if (matchedInstallers.length === 0) {
      return {
        message: "No installers found in the specified location and address",
      };
    }

    return matchedInstallers;
  } catch (error) {
    console.error("Matching Error:", error);
    throw new Error("Internal server error");
  }
};
