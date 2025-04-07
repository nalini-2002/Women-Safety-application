import React from "react";
import { Container, Typography, Card, CardContent, Button, Box } from "@mui/material";
import { Warning as WarningIcon, LocationOn as LocationIcon, VideoCameraFront as VideoIcon } from "@mui/icons-material";
import PanicButton from "./Panicbutton";
import Navbar from "../Components/Navbar/Navbar";
import Footer from "../Components/Footer/Footer";
// import PanicButton from "./PanicButton.jsx";

function PanicApp() {
  return (
   <>
   <Navbar/>
   <br />
   <br />
   <br />
   <br />
   <br />
   <br />
    <Container maxWidth="sm" sx={{ textAlign: "center", mt: 4, fontFamily: "Arial, sans-serif" }}>
      {/* 🚨 Header */}
      <Typography variant="h3" color="error" gutterBottom sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
        <WarningIcon fontSize="large" sx={{ mr: 1 }} /> Panic Alert System
      </Typography>

      {/* 📝 Description */}
      <Typography variant="body1" sx={{ fontSize: "18px", mb: 3 }}>
        In case of an emergency, press the <strong>Panic Button</strong>. Your <LocationIcon color="error" /> live location and <VideoIcon color="error" /> recorded video will be shared with emergency contacts.
      </Typography>

      {/* 🚨 Panic Button */}
      
      <PanicButton />

      {/* 📌 How It Works Section */}
      <Card sx={{ mt: 4, backgroundColor: "#ffe6e6", borderRadius: "10px", boxShadow: 3 }}>
        <CardContent>
          <Typography variant="h5" color="error" sx={{ fontWeight: "bold", mb: 2 }}>
            🔔 How It Works:
          </Typography>
          <Typography variant="body1" component="ul" sx={{ textAlign: "left", fontSize: "16px", lineHeight: "1.8" }}>
            <li>Click the <strong>Panic Button</strong> to trigger an emergency alert.</li>
            <li>Your <strong>GPS location</strong> will be shared with emergency contacts.</li>
            <li>A <strong>10-second video</strong> will be recorded and sent for safety.</li>
            <li>Ensure <strong>camera, microphone, and location permissions</strong> are enabled.</li>
          </Typography>
        </CardContent>
      </Card>

      {/* 🚀 Extra Safety Message */}
      <Box sx={{ mt: 3, p: 2, bgcolor: "#ffcccb", borderRadius: "10px", fontSize: "16px", fontWeight: "bold" }}>
         Stay alert and use this feature responsibly! 🚔🆘
      </Box>
    </Container>

    <Footer/>
   </>
  );
}

export default PanicApp;
