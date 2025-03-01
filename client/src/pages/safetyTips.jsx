import React from "react";
import { Container, Typography, Card, CardContent, Grid, Accordion, AccordionSummary, AccordionDetails } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import SecurityIcon from "@mui/icons-material/Security";
import SchoolIcon from "@mui/icons-material/School";
import { motion } from "framer-motion";
import Navbar from "../Components/Navbar/Navbar";

const safetyTips = [
  "Always lock your doors and windows when leaving home.",
  "Avoid sharing personal information online.",
  "Use strong passwords and enable two-factor authentication.",
  "Be cautious when clicking on unknown links or emails.",
  "Stay aware of your surroundings, especially in unfamiliar places.",
  "Install security software to protect against cyber threats.",
  "Keep emergency contacts saved on your phone.",
  "Do not share your location on social media in real-time.",
  "Trust your instincts and avoid suspicious individuals or places.",
  "Keep your personal belongings secure while traveling.",
  "Ensure your phone is charged and has credit for emergency calls.",
  "Avoid walking alone at night in isolated areas.",
  "Keep a first aid kit in your home and car.",
  "Be cautious when using ATMs, especially in isolated locations.",
  "Learn basic self-defense techniques for personal safety."
];

const tutorials = [
  { title: "Cybersecurity Basics", description: "Learn how to stay safe online and prevent cyber threats." },
  { title: "Self-Defense Techniques", description: "Simple ways to protect yourself in emergency situations." },
  { title: "Fire Safety", description: "Understand fire hazards and how to respond to emergencies." }
];

const alternativeContents = [
  { title: "Emergency Contacts", description: "A list of essential emergency numbers you should have on hand." },
  { title: "First Aid Tips", description: "Basic first aid techniques everyone should know." },
  { title: "Safe Travel Guidelines", description: "Tips to ensure safety while traveling." }
];

const SafetyPage = () => {
  return (
    <>
    <Navbar/>
    <br />
    <br />
    <Container maxWidth="lg" sx={{ py: 5 }}>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
        <Typography variant="h3" gutterBottom align="center" sx={{ fontWeight: "bold", color: "#1976d2" }}>
          <SecurityIcon fontSize="large" /> Safety Tips & Awareness
        </Typography>
      </motion.div>
      
      {/* Safety Tips Section */}
      <Typography variant="h5" sx={{ fontWeight: "bold", mt: 4, mb: 2 }}>
        Important Safety Tips
      </Typography>
      {safetyTips.map((tip, index) => (
        <Accordion key={index} sx={{ mb: 2 }}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}> 
            <Typography sx={{ fontWeight: "bold" }}>{tip}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>Follow this tip to stay safe in everyday life.</Typography>
          </AccordionDetails>
        </Accordion>
      ))}
      
      {/* Awareness Tutorials */}
      <Typography variant="h5" sx={{ fontWeight: "bold", mt: 4, mb: 2 }}>
        Awareness Tutorials
      </Typography>
      <Grid container spacing={3}>
        {tutorials.map((tutorial, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card sx={{ p: 2, background: "#f5f5f5", textAlign: "center" }}>
              <CardContent>
                <SchoolIcon fontSize="large" color="primary" />
                <Typography variant="h6" sx={{ mt: 1 }}>{tutorial.title}</Typography>
                <Typography variant="body2" sx={{ mt: 1 }}>{tutorial.description}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
      
      {/* Alternative Contents Section */}
      <Typography variant="h5" sx={{ fontWeight: "bold", mt: 4, mb: 2 }}>
        Additional Safety Resources
      </Typography>
      <Grid container spacing={3}>
        {alternativeContents.map((content, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card sx={{ p: 2, background: "#e3f2fd", textAlign: "center" }}>
              <CardContent>
                <Typography variant="h6" sx={{ mt: 1 }}>{content.title}</Typography>
                <Typography variant="body2" sx={{ mt: 1 }}>{content.description}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
    </>
  );
};

export default SafetyPage;
