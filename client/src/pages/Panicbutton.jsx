import React, { useState, useRef } from "react";
import axios from "axios";
import { motion } from "framer-motion";

const PanicButton = () => {
  const [location, setLocation] = useState(null);
  const [isRecording, setIsRecording] = useState(false);
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const [recordedChunks, setRecordedChunks] = useState([]);
  const [videoUrl,setvideoUrl]=useState("")
  const videoRef = useRef(null);

  // Get User Location
  const getUserLocation = () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      },
      (error) => {
        alert("Location access denied. Please enable location services.");
        console.error("Error getting location:", error);
      }
    );
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: false });
      videoRef.current.srcObject = stream;
  
      const recorder = new MediaRecorder(stream);
      setMediaRecorder(recorder);
  
      let chunks = [];
      recorder.ondataavailable = (event) => {
        if (event.data.size > 0) chunks.push(event.data);
      };
   
      recorder.onstop = async () => {
        const videoBlob = new Blob(chunks, { type: "video/webm" });
        const formData = new FormData();
        formData.append("video", videoBlob);
        
  
        try {
         const {data}= await axios.post("http://localhost:8000/api/upload-video", formData);
         setvideoUrl(data.videoUrl);
         

         return data

        } catch (error) {
          console.error("Error uploading video:", error);
        }
  
        stream.getTracks().forEach((track) => track.stop());
      };
  
      recorder.start();
      setIsRecording(true);
  
      setTimeout(() => {
        recorder.stop();
        setIsRecording(false);
      }, 10000);
    } catch (error) {
      console.error("Error accessing media devices:", error);
      alert("Camera access denied. Please allow permissions in browser settings.");
    }
  };
  
  // Handle Panic Button Click
  const handlePanicClick = async () => {
    getUserLocation();

    startRecording()

    if (location) {
      try {
        await axios.post("http://localhost:8000/api/emergency-alert", {
          latitude: location.latitude,
          longitude: location.longitude,
          videoUrl

        });

        alert("🚨 Emergency Alert Sent!");
      } catch (error) {
        console.error("Error sending alert:", error);
      }
    }
  };

  return (
    <div>
      <video
        ref={videoRef}
        autoPlay
        playsInline
        style={{ width: "300px", display: isRecording ? "block" : "none" }}
      />


<motion.div
      animate={{
        scale: [1, 1.2, 1],
      }}
      transition={{
        duration: 0.8,
        repeat: Infinity,
        ease: "easeInOut",
      }}
      style={{
        display: "inline-block",
      }}
    >
           <button
  onClick={handlePanicClick}
  disabled={isRecording}
  style={{
    padding: "25px 60px",
    fontSize: "28px",
    fontWeight: "bold",
    backgroundColor: isRecording ? "gray" : "#ff0000",
    color: "white",
    border: "none",
    borderRadius: "20px",
    boxShadow: isRecording
      ? "0 0 10px rgba(128,128,128,0.6)"
      : "0 0 20px 5px rgba(255, 0, 0, 0.7)",
    cursor: isRecording ? "not-allowed" : "pointer",
    animation: isRecording ? "none" : "pulse 1.2s infinite",
    transition: "all 0.3s ease",
    marginTop: "30px",
  }}
>
  {isRecording ? "🎥 Recording..." : "🚨 Send Panic Alert"}
</button>
    </motion.div>



    </div>
  );
};

export default PanicButton;
