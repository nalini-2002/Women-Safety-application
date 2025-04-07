import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Table, TableHead, TableBody, TableRow,
  TableCell, Button, Paper, CircularProgress,
  Typography, Box, Grid
} from "@mui/material";
import Sidebar from "../../Components/Dash/Sidebar";

const SaftyAdminPanel = () => {
  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchAlerts();
  }, []);

  const fetchAlerts = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await axios.get("http://localhost:8000/api/safety-timer-alerts");
      setAlerts(res.data.alerts);
    } catch (err) {
      console.error("Failed to fetch alerts", err);
      setError("Failed to fetch safety alerts.");
    } finally {
      setLoading(false);
    }
  };

  const markResolved = async (id) => {
    try {
      await axios.patch(`http://localhost:8000/api/safety-timer-alert/${id}`, {
        status: "Resolved",
      });
      fetchAlerts();
    } catch (err) {
      console.error("Error marking resolved", err);
      alert("Failed to update status. Please try again.");
    }
  };

  return (
    <Box sx={{ display: "flex", justifyContent: "center", mt: 5 }}>
        <Sidebar/>
      <Paper elevation={4} sx={{ width: "90%", padding: 4 }}>

        <Typography variant="h4" align="center" gutterBottom sx={{ fontWeight: "bold" }}>
          🛡️ Safety Alert Admin Panel
        </Typography>

        {loading ? (
          <Box sx={{ display: "flex", justifyContent: "center", py: 4 }}>
            <CircularProgress />
          </Box>
        ) : error ? (
          <Typography color="error" align="center">{error}</Typography>
        ) : alerts.length === 0 ? (
          <Typography align="center">No alerts found.</Typography>
        ) : (
          <Box sx={{ overflowX: "auto" }}>
            <Table>
              <TableHead sx={{ backgroundColor: "#f5f5f5" }}>
                <TableRow>
                  <TableCell><strong>ID</strong></TableCell>
                  <TableCell><strong>Location</strong></TableCell>
                  <TableCell><strong>Time</strong></TableCell>
                  <TableCell><strong>Status</strong></TableCell>
                  <TableCell><strong>Map</strong></TableCell>
                  <TableCell><strong>Action</strong></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {alerts.map((alert) => (
                  <TableRow key={alert._id}>
                    <TableCell>{alert._id.slice(-6)}</TableCell>
                    <TableCell>{alert.latitude}, {alert.longitude}</TableCell>
                    <TableCell>{new Date(alert.createdAt).toLocaleString()}</TableCell>
                    <TableCell>
                      {alert.status === "Resolved" ? (
                        <span style={{
                          color: "green",
                          fontWeight: "bold",
                          backgroundColor: "#e8f5e9",
                          padding: "4px 10px",
                          borderRadius: "10px"
                        }}>
                          ✅ Resolved
                        </span>
                      ) : (
                        <span style={{ color: "#ff9800", fontWeight: "bold" }}>⏳ Pending</span>
                      )}
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="outlined"
                        size="small"
                        onClick={() =>
                          window.open(`https://www.google.com/maps?q=${alert.latitude},${alert.longitude}`, "_blank")
                        }
                      >
                        View in Google Maps
                      </Button>
                    </TableCell>
                    <TableCell>
                      {alert.status === "Resolved" ? null : (
                        <Button
                          variant="contained"
                          color="success"
                          size="small"
                          onClick={() => markResolved(alert._id)}
                        >
                          Mark Resolved
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Box>
        )}
      </Paper>
    </Box>
  );
};

export default SaftyAdminPanel;
