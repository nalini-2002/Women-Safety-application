import React, { useEffect } from "react";
import { Container, Grid, Typography, Button, Box } from "@mui/material";
import Navbar from "../Components/Navbar/Navbar";
import Footer from "../Components/Footer/Footer";
import about from "../images/aboutUs.png";
import about2 from "../images/aboutUs2.png";
import { Link } from "react-router-dom";

const AboutUs2 = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <Box>
      <Navbar />
      <Box sx={{ backgroundColor: "#f5f5f5", py: 5 }}>
        <Container>
          <Box textAlign="center" mb={5}>
            <Typography variant="h5" color="primary" gutterBottom>
              Our Team for Your Safety
            </Typography>
            <Typography variant="h3" fontWeight={700}>
              About Us
            </Typography>
          </Box>
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={5} textAlign={{ xs: "center", md: "left" }}>
              <Typography variant="h4" color="secondary" gutterBottom>
                Welcome to Women Safety App
              </Typography>
              <Typography variant="body1" textAlign="justify" paragraph>
                At Women Safety App, we are committed to ensuring a safer world
                for women. Our journey began with a mission to empower women
                with a tool that enhances their safety and confidence in any
                situation. Understanding the unique challenges women face, we
                leverage technology to address them effectively.
              </Typography>
              <Typography variant="body1" textAlign="justify">
                Our app integrates advanced security features like real-time
                tracking, emergency alerts, and AI-based threat detection,
                ensuring instant support and peace of mind.
              </Typography>
            </Grid>
            <Grid item xs={12} md={7} textAlign="center">
              <img src={about} alt="About Us" style={{ width: "100%", borderRadius: 8 }} />
            </Grid>
          </Grid>
        </Container>
      </Box>
      <Box sx={{ py: 5 }}>
        <Container>
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={6} textAlign="center">
              <img src={about2} alt="Why Us" style={{ width: "100%", borderRadius: 8 }} />
            </Grid>
            <Grid item xs={12} md={6} textAlign={{ xs: "center", md: "left" }}>
              <Typography variant="h4" color="secondary" gutterBottom>
                Why Women Safety App?
              </Typography>
              <Typography variant="body1" textAlign="justify" paragraph>
                Our application prioritizes your safety with features such as
                emergency SOS alerts, trusted contact notifications, and live
                tracking. Whether you’re commuting alone, exploring new places,
                or simply ensuring safety, our app is designed to assist you at
                every step.
              </Typography>
              <Typography variant="body1" textAlign="justify" paragraph>
                Our mission is to empower individuals by providing a
                user-friendly interface with real-time alert systems, ensuring
                instant response from authorities and loved ones when needed.
              </Typography>
              <Button
                variant="contained"
                color="primary"
                component={Link}
                to="/contact"
                sx={{ mt: 3 }}
              >
                Contact Us
              </Button>
            </Grid>
          </Grid>
        </Container>
      </Box>
      <Footer />
    </Box>
  );
};

export default AboutUs2;