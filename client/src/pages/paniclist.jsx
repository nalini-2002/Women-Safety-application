import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  IconButton
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { styled } from "@mui/system";
import axios from "axios";
import PlayCircleOutlineIcon from "@mui/icons-material/PlayCircleOutline";
import DownloadIcon from "@mui/icons-material/Download";
import Navbar from "../Components/Navbar/Navbar";
import Sidebar from "../Components/Dash/Sidebar";

const StyledTableCell = styled(TableCell)({
  fontWeight: "bold",
  backgroundColor: "#1976d2",
  color: "white"
});



const LocationTable = () => {

    const [open, setOpen] = useState(false);
    const [selectedVideo, setSelectedVideo] = useState(null);

    const[height,setheight]=useState("100px")
    const[width,setwidth]=useState("100px")

const [paniclist,setpaniclist]=useState([])


    useEffect(()=>{
        const fetchpaniclist=async()=>{

            const {data} = await axios.get("http://localhost:8000/api/panclist")

            setpaniclist(data.paniclist);
            
   }

   fetchpaniclist()

    },[])








  const handleDelete = async (index) => {
    
    console.log(index);

  const {data}=await  axios.delete("http://localhost:8000/api/panclist/"+index)
  alert(data.message);
  


    
  };

  const handleViewLocation = (latitude, longitude) => {
    window.open(`https://www.google.com/maps?q=${latitude},${longitude}`, "_blank");
  };


  const handleOpenVideo = (videoUrl) => {
    setSelectedVideo(videoUrl);
    setOpen(true);
  };

  const handleCloseVideo = () => {
    setOpen(false);
    setSelectedVideo(null);
  };

  

  return (

    <>
 <div className="d-flex justify-content-start">

 <Sidebar/>

 <div style={{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center" ,width:"100%",marginTop:"40px"}}>
 <h1 style={{display:"flex",alignItems:"center",justifyContent:"center"}}>women Panic Data</h1>  
    <TableContainer component={Paper} sx={{ maxWidth: 1000, margin: "auto", mt: 5, boxShadow: 3, borderRadius: 2 }}>
      <Table>
        <TableHead>
          <TableRow>
            <StyledTableCell>Address</StyledTableCell>
            <StyledTableCell>Latitude</StyledTableCell>
            <StyledTableCell>Longitude</StyledTableCell>
            <StyledTableCell>Video</StyledTableCell>
            <StyledTableCell>Timestamp</StyledTableCell>
            <StyledTableCell>Actions</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {paniclist.map((item, index) => (
            <TableRow key={index}>
              <TableCell>{item.address || "Loading..."}</TableCell>
              <TableCell>{item.latitude}</TableCell>
              <TableCell>{item.longitude}</TableCell>
              <TableCell>
              <video  style={{height:height,width:width}} controls>
                  <source src={"http://localhost:8000/"+item.videoUrl.replace(/^.\//, '')} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
                <div>
                  <IconButton color="primary" onClick={() => handleOpenVideo(item.videoUrl)}>
                    <PlayCircleOutlineIcon />
                  </IconButton>
                  <IconButton color="success" component="a" href={"http://localhost:8000/"+item.videoUrl} download>
                    <DownloadIcon />
                  </IconButton>
                </div>
              </TableCell>
              <TableCell>{item.timestamp}</TableCell>
              <TableCell sx={{display:"flex"}}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => handleViewLocation(item.latitude, item.longitude)}
                  sx={{ mr: 1 }}
                >
                  View Location
                </Button>
                <IconButton color="error" onClick={() => handleDelete(item._id)}>
                  <DeleteIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
 </div>

 </div>
    {/* <Navbar/> */}
   

    
 
  
    </>
  );
};

export default LocationTable;