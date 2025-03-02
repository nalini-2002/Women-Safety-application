import React, { useEffect } from "react";
import { Container, Grid, Typography, Button, Box } from "@mui/material";
import { motion } from "framer-motion";
import about from "../images/aboutUs.png";
import about2 from "../images/aboutUs2.png";
import Navbar from "../Components/Navbar/Navbar";
import Footer from "../Components/Footer/Footer";

const About = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div>
      <Navbar />
      <Box sx={{ py: 5, textAlign: "center", backgroundColor: "#f4f4f4" }}>
        <Typography variant="h4" color="primary" gutterBottom>
          Our Team for Your Safety
        </Typography>
        <Typography variant="h2" fontWeight={600}>
          About Us
        </Typography>
      </Box>
      <Container>
        <Grid container spacing={5} alignItems="center" sx={{ mt: 3 }}>
          <Grid item xs={12} md={5}>
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1 }}
            >
              <Typography variant="h3" color="secondary" gutterBottom>
                Women Safety App is here for your safety
              </Typography>
              <Typography variant="body1" paragraph>
                We ensure that every human being reaches home safely. With advanced features
                like mail notifications, mobile messaging, and live location sharing, we are
                your trusted bodyguard.
              </Typography>
              <Button variant="contained" color="primary" size="large">
                Learn More
              </Button>
            </motion.div>
          </Grid>
          <Grid item xs={12} md={7}>
            <motion.img
              src={about}
              alt="Women Safety App"
              className="img-fluid"
              width="100%"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1 }}
            />
          </Grid>
        </Grid>
      </Container>

      <Box sx={{ py: 5, backgroundColor: "#e3f2fd", mt: 5 }}>
        <Container>
          <Grid container spacing={5} alignItems="center">
            <Grid item xs={12} md={6}>
              <motion.img
                src={about2}
                alt="Reliable Source"
                className="img-fluid"
                width="100%"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1 }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1 }}
              >
                <Typography variant="h3" color="secondary" gutterBottom>
                  The Best Reliable Source
                </Typography>
                <Typography variant="body1" paragraph>
                  We're more than just a web app; we're your trusted partner in reaching home safely.
                  Our innovative features provide real-time security updates to ensure you feel safe.
                </Typography>
                <Button variant="contained" color="secondary" size="large">
                  Contact Us
                </Button>
              </motion.div>
            </Grid>
          </Grid>
        </Container>
      </Box>
      <Footer />
    </div>
  );
};

export default About;
