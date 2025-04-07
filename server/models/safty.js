const mongoose = require('mongoose');

const SafetyTimerAlertSchema = new mongoose.Schema({
  latitude: {
    type: Number,
    required: true,
  },
  longitude: {  
    type: Number,
    required: true,
  },
  videoUrl: {
    type: String,
    default: null,
  },
  status: {
    type: String,
    enum: ["Pending", "Resolved"],
    default: "Pending",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

const Safty= mongoose.model('SafetyTimerAlert', SafetyTimerAlertSchema);

module.exports =Safty
