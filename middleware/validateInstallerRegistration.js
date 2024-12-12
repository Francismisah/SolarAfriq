// middleware/validateInstallerRegistration.js

const validateInstallerRegistration = (req, res, next) => {
  const { name, email, password, phoneNumber, location, address } = req.body;

  // Check for presence of all required fields
  if (!name || !email || !password || !phoneNumber || !location || !address) {
    return res.status(400).json({ message: "All fields are required" });
  }

  // Validate password length
  if (password.length < 8) {
    return res
      .status(400)
      .json({ message: "Password must be at least 8 characters long" });
  }

  // Optional: Additional validations (e.g., email format, phone number format)
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ message: "Invalid email format" });
  }

  const phoneRegex = /^\+?[1-9]\d{1,14}$/; // E.164 format
  if (!phoneRegex.test(phoneNumber)) {
    return res.status(400).json({ message: "Invalid phone number format" });
  }

  next(); // Proceed to the next middleware or route handler
};

module.exports = validateInstallerRegistration;
