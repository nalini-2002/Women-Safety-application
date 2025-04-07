const express = require('express');
const Safty = require('../models/safty');
const { getAllAlerts, updateAlertStatus } = require('../controllers/saftycontroller');
const router = express.Router();

// Safety Timer Emergency Alert API
router.post('/safety-timer-alert', async (req, res) => {
  try {
    const { latitude, longitude, videoUrl } = req.body;

    if (!latitude || !longitude) {
      return res.status(400).json({ message: "Location is required." });
    }

    // You can store this alert in DB or notify someone here
    console.log("⏰ Safety Timer Alert Triggered:");
    console.log("Location:", latitude, longitude);
    console.log("Video URL:", videoUrl || "No video attached");

   const video= videoUrl || "No video attached"

    const newAlert = new Safty({ latitude, longitude, videoUrl:video });
    await newAlert.save();
    // Just sending success response
    res.status(200).json({ message: "Safety Timer Alert Received Successfully" });
  } catch (error) {
    console.error("Safety Timer Error:", error);
    res.status(500).json({ message: "Server error" });
  }
});



router.get("/safety-timer-alerts", getAllAlerts);
router.patch("/safety-timer-alert/:id", updateAlertStatus);

module.exports = router;
