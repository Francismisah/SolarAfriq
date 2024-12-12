const SolarUser = require("../models/solarUserModel");
const matchController = require("./matchController"); // Import match logic if needed

/**
 * **Submit Solar User Request**
 * Creates a new solar user in the database.
 */
exports.submitSolarUser = async (req, res) => {
  const { name, email, phoneNumber, location, address } = req.body;

  // Validate required fields
  if (!name || !email || !phoneNumber || !location || !address) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    // Check for duplicate email
    const existingUser = await SolarUser.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "Email already registered" });
    }

    // Create a new solar user
    const newSolarUser = await SolarUser.create({
      name,
      email,
      phoneNumber,
      location,
      address,
    });

    // Optionally, you can fetch installers for the newly created user
    // const matchedInstallers = await matchController.findMatches(newSolarUser._id);

    res.status(201).json({
      message: "Solar user request submitted successfully",
      solarUser: newSolarUser,
      // installers: matchedInstallers, // If you want to include installer matches
    });
  } catch (error) {
    console.error("Error during solar user submission:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

/**
 * **Get Solar User by ID**
 * Fetch a single solar user based on their ID.
 */
exports.getSolarUserById = async (req, res) => {
  const { id } = req.params;

  try {
    const solarUser = await SolarUser.findById(id);
    if (!solarUser) {
      return res.status(404).json({ message: "Solar user not found" });
    }

    res.status(200).json({ solarUser });
  } catch (error) {
    console.error("Error fetching solar user by ID:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

/**
 * **Get All Solar Users**
 * Retrieve all solar users from the database.
 */
exports.getAllSolarUsers = async (req, res) => {
  try {
    const solarUsers = await SolarUser.find();
    if (!solarUsers || solarUsers.length === 0) {
      return res.status(404).json({ message: "No solar users found" });
    }

    res.status(200).json({ solarUsers });
  } catch (error) {
    console.error("Error fetching solar users:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

/**
 * **Update Solar User by ID**
 * Update the details of an existing solar user.
 */
exports.updateSolarUser = async (req, res) => {
  const { id } = req.params;
  const updates = req.body;

  try {
    const updatedUser = await SolarUser.findByIdAndUpdate(id, updates, {
      new: true, // Return updated document
      runValidators: true, // Validate updates
    });

    if (!updatedUser) {
      return res.status(404).json({ message: "Solar user not found" });
    }

    res.status(200).json({
      message: "Solar user updated successfully",
      solarUser: updatedUser,
    });
  } catch (error) {
    console.error("Error updating solar user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

/**
 * **Delete Solar User by ID**
 * Remove a solar user from the database.
 */
exports.deleteSolarUser = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedUser = await SolarUser.findByIdAndDelete(id);
    if (!deletedUser) {
      return res.status(404).json({ message: "Solar user not found" });
    }

    res.status(200).json({ message: "Solar user deleted successfully" });
  } catch (error) {
    console.error("Error deleting solar user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
