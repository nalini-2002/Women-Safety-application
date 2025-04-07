import React, { useState, useEffect } from "react";
import axios from "axios";
import { motion } from "framer-motion"; // 👈 import motion

const SafetyTimer = () => {
  const [timeLeft, setTimeLeft] = useState(0);
  const [timerRunning, setTimerRunning] = useState(false);
  const [location, setLocation] = useState(null);
  const [customMinutes, setCustomMinutes] = useState("");

  const startTimer = (minutes) => {
    if (!minutes || minutes <= 0) {
      alert("Please enter valid minutes");
      return;
    }
    setTimeLeft(minutes * 60);
    setTimerRunning(true);
    getUserLocation();
  };

  const cancelTimer = () => {
    setTimeLeft(0);
    setTimerRunning(false);
  };

  const getUserLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
        },
        (error) => {
          console.error("Location error", error);
        }
      );
    }
  };

  useEffect(() => {
    let timer;
    if (timerRunning && timeLeft > 0) {
      timer = setTimeout(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    }

    if (timerRunning && timeLeft === 0) {
      setTimerRunning(false);
      triggerEmergency();
    }

    return () => clearTimeout(timer);
  }, [timeLeft, timerRunning]);

  const triggerEmergency = async () => {
    try {
      await axios.post("http://localhost:8000/api/safety-timer-alert", {
        latitude: location?.latitude,
        longitude: location?.longitude,
        videoUrl: "",
      });
      alert("⏰ Timer ended! Emergency Alert sent.");
    } catch (err) {
      console.error("Error sending alert", err);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.heading}>⏳ Safety Timer</h2>

        {timerRunning ? (
          <>
            <motion.h3
              style={styles.timeText}
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
            >
              Time Left: {Math.floor(timeLeft / 60)}:
              {String(timeLeft % 60).padStart(2, "0")}
            </motion.h3>

            <button onClick={cancelTimer} style={styles.cancelBtn}>
              Cancel Timer
            </button>
          </>
        ) : (
          <>
            <div style={styles.inputRow}>
              <input
                type="number"
                placeholder="Enter custom minutes"
                value={customMinutes}
                onChange={(e) => setCustomMinutes(e.target.value)}
                style={styles.input}
              />
              <button
                onClick={() => startTimer(parseInt(customMinutes))}
                style={styles.timerBtn}
              >
                Start Custom Timer
              </button>
            </div>

            <div style={styles.quickTimeBox}>
              <h4 style={styles.subHeading}>Or select quick time:</h4>
              {[5, 10, 20, 30].map((min) => (
                <button
                  key={min}
                  onClick={() => startTimer(min)}
                  style={styles.quickBtn}
                >
                  {min} Min
                </button>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    background: "#f0f2f5",
  },
  card: {
    backgroundColor: "#fff",
    padding: "40px",
    borderRadius: "16px",
    boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
    textAlign: "center",
    width: "90%",
    maxWidth: "450px",
  },
  heading: {
    fontSize: "28px",
    marginBottom: "20px",
    color: "#2c3e50",
  },
  subHeading: {
    fontSize: "18px",
    marginBottom: "10px",
    color: "#444",
  },
  timeText: {
    fontSize: "26px",
    color: "#e67e22",
    marginBottom: "15px",
    fontWeight: "bold",
  },
  inputRow: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: "10px",
    flexWrap: "wrap",
    marginBottom: "20px",
  },
  input: {
    padding: "10px",
    fontSize: "16px",
    width: "180px",
    borderRadius: "8px",
    border: "1px solid #ccc",
  },
  timerBtn: {
    padding: "10px 20px",
    fontSize: "16px",
    backgroundColor: "#3498db",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    transition: "background-color 0.3s",
  },
  quickTimeBox: {
    marginTop: "10px",
  },
  quickBtn: {
    padding: "10px 15px",
    fontSize: "16px",
    margin: "5px",
    backgroundColor: "#2ecc71",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    transition: "transform 0.2s",
  },
  cancelBtn: {
    padding: "12px 24px",
    fontSize: "18px",
    backgroundColor: "#e74c3c",
    color: "#fff",
    border: "none",
    borderRadius: "10px",
    cursor: "pointer",
  },
};

export default SafetyTimer;
