import React, { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../Components/Dash/Sidebar";
import {
  Box,
  Container,
  Typography,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Paper,
  TableContainer,
  Link,
} from "@mui/material";

const Dashboard = () => {
  const [paniclist, setpaniclist] = useState([]);

  useEffect(() => {
    const fetchpaniclist = async () => {
      try {
        const { data } = await axios.get("http://localhost:8000/api/v1/emergency");
        const resolved = data.filter((item) => item.isResolved === true);
        setpaniclist(resolved);
      } catch (error) {
        console.error("Error fetching emergency data:", error);
      }
    };
    fetchpaniclist();
  }, []);

  return (
    <Box sx={{ display: "flex", bgcolor: "#f7f9fc", minHeight: "100vh" }}>
      <Sidebar />
      <Container maxWidth="lg" sx={{ mt: 10 }}>
        <Box textAlign="center" mb={4}>
          <Typography variant="subtitle1" color="text.secondary">
            Latest Women Closed Alert!
          </Typography>
          <Typography variant="h4" fontWeight="bold" gutterBottom>
            Women Closed Data
          </Typography>
        </Box>

        <TableContainer component={Paper} elevation={3}>
          <Table>
            <TableHead>
              <TableRow sx={{ bgcolor: "#1976d2" }}>
                <TableCell sx={{ color: "#fff", fontWeight: "bold" }} align="center">Name</TableCell>
                <TableCell sx={{ color: "#fff", fontWeight: "bold" }} align="center">Report</TableCell>
                <TableCell sx={{ color: "#fff", fontWeight: "bold" }} align="center">Address</TableCell>
                <TableCell sx={{ color: "#fff", fontWeight: "bold" }} align="center">Pincode</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {paniclist.length > 0 ? (
                paniclist.map((item) => {
                  const pincode = item.addressOfInc.split(',').pop().trim();
                  return (
                    <TableRow key={item._id}>
                      <TableCell align="center">{item.username}</TableCell>
                      <TableCell align="center">
                        <Link href={item.mapLct} target="_blank" rel="noopener noreferrer" underline="hover">
                          View Map
                        </Link>
                      </TableCell>
                      <TableCell align="center">{item.addressOfInc}</TableCell>
                      <TableCell align="center">{pincode}</TableCell>
                    </TableRow>
                  );
                })
              ) : (
                <TableRow>
                  <TableCell colSpan={4} align="center">
                    No resolved reports found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </Box>
  );
};

export default Dashboard;
