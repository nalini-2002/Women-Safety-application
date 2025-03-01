const express = require("express");
const errorHandler = require("./middlewares/errorHandler");
const connectDB = require("./database/db");
const cors = require("cors");
const userRoutes = require("./routes/userRoutes");
const incRoutes = require("./routes/incidentRoutes");
const emergencyRoutes = require("./routes/emergencyRoutes");
const chatRoutes = require('./routes/chatRoutes')
const mongoose = require("mongoose");
const multer = require("multer");
const fs = require("fs");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 8000;

app.use(express.json());
app.use(cors());

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URL);
    app.listen(port, () => {
      console.log(`Server started on ${port}`);
      console.log(`Mongo Connected!!!`);
    });
  } catch (err) {
    console.log(err);
  }
};


const EmergencySchema = new mongoose.Schema({
  latitude: Number,
  longitude: Number,
  videoUrl: String,
  address:String,
  timestamp: { type: Date, default: Date.now },
});

const Emergencypanic = mongoose.model("Emergencypanic", EmergencySchema);



// Video Upload Setup
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

app.post("/api/upload-video", upload.single("video"), async (req, res) => {
  try {
    const videoBuffer = req.file.buffer;
    const videoPath = `./uploads/video_${Date.now()}.webm`;

    fs.writeFileSync(videoPath, videoBuffer);

    res.json({ success: true, videoUrl: videoPath });
  } catch (error) {
    res.status(500).json({ error: "Video upload failed" });
  }
});



const getAddressFromCoords = async (latitude, longitude) => {
  const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`;
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data.display_name || "Address not found";
  } catch (error) {
    console.error("Fetch error:", error);
    return "Address not found";
  }
};


// Emergency Alert API
app.post("/api/emergency-alert", async (req, res) => {
  const { latitude, longitude, videoUrl } = req.body;

    const add=await getAddressFromCoords(latitude,longitude)

  const emergency = new Emergencypanic({ latitude, longitude, videoUrl,address:add });
  await emergency.save();

  res.json({ success: true, message: "Emergency alert saved!" });

});



// Emergency Alert API
app.get("/api/panclist", async (req, res) => {
    
    const paniclist=await Emergencypanic.find()

  res.json({ success: true,paniclist });
})

app.delete("/api/panclist/:id", async (req, res) => {
    
 
  try {
    const { id } = req.params;
    const deletedPanic = await Emergencypanic.findByIdAndDelete(id);

    if (!deletedPanic) {
        return res.status(404).json({ success: false, message: 'Panic entry not found' });
    }

    res.json({ success: true, message: 'Panic entry deleted successfully', deletedPanic });
} catch (error) {
    res.status(500).json({ success: false, message: 'Server error', error });
}


})
;


app.use("/uploads", express.static("uploads"));


app.use("/api/v1/users", userRoutes);
app.use("/api/v1/incidents", incRoutes);
app.use("/api/v1/emergency", emergencyRoutes);
app.use('/api/v1/chats',chatRoutes)

app.use(errorHandler);

start();
