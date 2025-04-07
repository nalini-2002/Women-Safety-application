const SafetyAlert = require("../models/safty");



// ✅ Get All Alerts (Admin)
exports.getAllAlerts = async (req, res) => {
  try {
    const alerts = await SafetyAlert.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, alerts });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// ✅ Update Alert Status
exports.updateAlertStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const updatedAlert = await SafetyAlert.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );
    if (!updatedAlert) {
      return res.status(404).json({ success: false, message: "Alert not found" });
    }
    res.status(200).json({ success: true, alert: updatedAlert });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
