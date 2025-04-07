import React, { useState, useEffect } from "react";
import Sidebar from "../Components/Dash/Sidebar";
import toast from "react-hot-toast";
import { api } from "../context/api";
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Modal,
} from "@mui/material";

const Dashboard = () => {
  const [incidentreport, setIncidentReport] = useState([]);
  const [report, setReport] = useState("");
  const [ack, setAck] = useState(false);
  const [open, setOpen] = useState(false);

  const handleOpen = (rpt) => {
    setReport(rpt);
    setOpen(true);
  };
  const handleClose = () => setOpen(false);

  const getAllIncident = async () => {
    try {
      const res = await fetch(api + "api/v1/incidents", {
        method: "GET",
        headers: { "Content-type": "application/json" },
      });
      if (res.status === 200) {
        const data = await res.json();
        setIncidentReport(data);
      }
    } catch (err) {
      console.error("Error fetching incidents:", err);
    }
  };

  const acknowledge = async (incId) => {
    try {
      const res = await fetch(`${api}api/v1/incidents/${incId}`, {
        method: "PATCH",
        headers: { "Content-type": "application/json" },
      });
      if (res.status === 200) {
        toast.success("Updated Successfully");
      }
    } catch (e) {
      toast.error("Error while Updating!");
    } finally {
      setAck(!ack);
    }
  };

  useEffect(() => {
    getAllIncident();
    window.scrollTo(0, 0);
  }, [ack]);

  return (
    <Box display="flex">
      <Sidebar />
      <Box p={3} flex={1}>
        <Box textAlign="center" mb={4}>
          <Typography variant="h6" color="textSecondary">
            Latest Women Incident Reported!
          </Typography>
          <Typography variant="h4" fontWeight="bold">
            Women Incident Data
          </Typography>
        </Box>

        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell align="center"><b>Name</b></TableCell>
                <TableCell align="center"><b>Report</b></TableCell>
                <TableCell align="center"><b>Address</b></TableCell>
                <TableCell align="center"><b>Pincode</b></TableCell>
                <TableCell align="center"><b>Date & Time</b></TableCell>
                <TableCell align="center"><b>Acknowledgement</b></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {incidentreport.map((p, index) => (
                <TableRow key={index}>
                  <TableCell align="center" sx={{ color: p.isSeen ? "green" : "red" }}>
                    {p.uname} {p.isSeen && "✓"}
                  </TableCell>
                  <TableCell align="center">
                    {p.isSeen ? (
                      p.report
                    ) : (
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={() => handleOpen(p.report)}
                      >
                        View Report
                      </Button>
                    )}
                  </TableCell>
                  <TableCell align="center">{p.address}</TableCell>
                  <TableCell align="center">{p.pincode}</TableCell>
                  <TableCell align="center">
                    {p.createdAt.split("T")[0]} - {p.createdAt.split("T")[1].split(".")[0]}
                  </TableCell>
                  <TableCell align="center">
                    {p.isSeen ? (
                      <Button variant="contained" color="success" disabled>
                        Acknowledged
                      </Button>
                    ) : (
                      <Button variant="contained" color="error" onClick={() => acknowledge(p._id)}>
                        Acknowledge
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        {/* MUI Modal */}
        <Modal open={open} onClose={handleClose}>
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: 400,
              bgcolor: "background.paper",
              borderRadius: 2,
              boxShadow: 24,
              p: 4,
            }}
          >
            <Typography variant="h6" mb={2}>
              Incident Report
            </Typography>
            <Typography variant="body1">{report}</Typography>
            <Box mt={3} textAlign="right">
              <Button onClick={handleClose} variant="outlined">
                Close
              </Button>
            </Box>
          </Box>
        </Modal>
      </Box>
    </Box>
  );
};

export default Dashboard;
