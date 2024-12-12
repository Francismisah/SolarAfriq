// require("dotenv").config(); // Load environment variables
// const mongoose = require("mongoose");
// const bcrypt = require("bcrypt");
// const Installer = require("./models/installerModel"); // Adjust path as needed

// async function seedAdmin() {
//   try {
//     // Connect to MongoDB
//     await mongoose.connect(process.env.MONGODB_URI, {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//     });

//     // Hash the admin password
//     const hashedPassword = await bcrypt.hash("admin123", 10);

//     // Create the admin user
//     const admin = new Installer({
//       name: "Admin User",
//       email: "admin@example.com",
//       password: hashedPassword, // Use the hashed password
//       phoneNumber: "+1234567890",
//       location: "Admin HQ",
//       address: "123 Admin Street",
//       role: "admin", // Explicitly set the role to admin
//     });

//     // Save the admin to the database
//     await admin.save();
//     console.log("Admin user created successfully!");

//     // Close the database connection
//     mongoose.connection.close();
//   } catch (error) {
//     console.error("Error seeding admin:", error);

//     // Close the database connection on error
//     mongoose.connection.close();
//   }
// }

// // Call the function to seed the admin
// seedAdmin();
