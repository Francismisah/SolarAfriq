// middleware/validateUserSubmission.js

const validateUserSubmission = (req, res, next) => {
  const { name, email, phoneNumber, location, address } = req.body;

  // Check for presence of all required fields
  if (!name || !email || !phoneNumber || !location || !address) {
    return res.status(400).json({ message: "All fields are required" });
  }

  // Validate email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ message: "Invalid email format" });
  }

  // Validate phone number format
  const phoneRegex = /^\+?[1-9]\d{1,14}$/; // E.164 format
  if (!phoneRegex.test(phoneNumber)) {
    return res.status(400).json({ message: "Invalid phone number format" });
  }

  next(); // Proceed to the next middleware or route handler
};

module.exports = validateUserSubmission;
