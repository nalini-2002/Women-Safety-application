import React from "react";
import { Container, Grid, Typography, Link, Box, Divider, IconButton } from "@mui/material";
import { BsLinkedin, BsGithub } from "react-icons/bs";
import logo from "../../images/logo.png";
import { useAuth } from "../../context/auth";

const Footer = () => {
  const [auth] = useAuth();

  const user=JSON.parse(localStorage.getItem("auth")).user
  console.log(user);
  

  return (
    <Box component="footer" sx={{ bgcolor: "#1e1e1e", color: "white", py: 5 }}>
      <Container>
        <div className="floating-contact-buttons">
       <h3 style={{fontSize:"20px",color:"rebeccapurple"}}>   Emergency Contact</h3>
          <a href={`tel:+91${user?.phoneNo}`} className="contact-btn call-btn">📞 Call Us</a>
          <a href={`https://wa.me/${user?.phoneNo}`} target="_blank" rel="noopener noreferrer" className="contact-btn whatsapp-btn">💬 WhatsApp</a>
        </div>
        <Grid container spacing={4} justifyContent="space-between">
          <Grid item xs={12} sm={4}>
            <Box display="flex" alignItems="center" gap={1}>
              <img src={logo} alt="Logo" width={100} />
              <Typography variant="h6">SAFE SIREN</Typography>
            </Box>
            <Typography variant="body2" sx={{ mt: 2, textAlign: "justify" }}>
              At SAFE SIREN, we're dedicated to building a secure digital space for women's safety.
              Our team is committed to providing innovative solutions to enhance security and well-being.
            </Typography>
          </Grid>

          <Grid item xs={12} sm={4}>
            <Typography variant="h6">Quick Links</Typography>
            <Divider sx={{ my: 1, bgcolor: "white" }} />
            <Box display="flex" flexDirection="column" gap={1}>
              <Link href="#" color="inherit" underline="none">Home</Link>
              <Link href="#" color="inherit" underline="none">About Us</Link>
              <Link href="#" color="inherit" underline="none">Services</Link>
              <Link href="#" color="inherit" underline="none">Contact</Link>
            </Box>
          </Grid>

          <Grid item xs={12} sm={4}>
            <Typography variant="h6">Contact</Typography>
            <Divider sx={{ my: 1, bgcolor: "white" }} />
            <Typography variant="body2">Email: your@gmail.com</Typography>
            <Typography variant="body2">Location: chennai, India</Typography>
            <Box mt={2}>
              <IconButton href="#" sx={{ color: "white" }}>
                <BsLinkedin size={24} />
              </IconButton>
              <IconButton href="https://github.com/nalini-2002/Women-Safety-application" sx={{ color: "white" }}>
                <BsGithub size={24} />
              </IconButton>
            </Box>
          </Grid>
        </Grid>

        <Divider sx={{ my: 4, bgcolor: "white" }} />
        <Typography variant="body2" align="center">
          © 2025 . All Rights Reserved.
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;
