const mongoose = require("mongoose");

const matchSchema = new mongoose.Schema(
  {
    solarUserId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "SolarUser",
      required: true,
    },
    matchedInstallers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Installer",
      },
    ],
  },
  { timestamps: true } // Adds `createdAt` and `updatedAt` fields
);

module.exports = mongoose.model("Match", matchSchema);
