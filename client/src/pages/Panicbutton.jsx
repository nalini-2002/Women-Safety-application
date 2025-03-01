import React, { useState, useRef } from "react";
import axios from "axios";

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
      <button
        onClick={handlePanicClick}
        disabled={isRecording}
        style={{
          padding: "10px",
          fontSize: "18px",
          backgroundColor: isRecording ? "gray" : "red",
          color: "white",
          cursor: isRecording ? "not-allowed" : "pointer",
        }}
      >
        {isRecording ? "🎥 Recording..." : "🚨 Send Panic Alert"}
      </button>
    </div>
  );
};

export default PanicButton;
