import React from "react";
import { Card, CardContent, Typography, Box, Grid } from "@mui/material";
import { motion } from "framer-motion";
import search from "../gifs/search.gif";
import puzzle from "../gifs/emegency.png";
import statis from "../gifs/statis.gif";
import noti from "../gifs/location.png";
import rock from "../gifs/rock.gif";
import proct from "../gifs/proct.gif";
import panic from '../gifs/panic.png'

const featuresData = [
  { title: "Emergency Mail Alert", img: search, desc: "We take your security seriously, and that's why we've implemented Mailing systems..." },
  { title: "Emergency Service Support", img: puzzle, desc: "Get email and mobile notifications when a person is in danger..." },
  { title: "Incident Reporting", img: statis, desc: "We take your Community seriously, and that's why we've implemented Incident reporting..." },
  { title: "Live Location", img: noti, desc: "Using the latest technology, we provide live location tracking..." },
  { title: "Emergency Chat", img: rock, desc: "When there is an emergency, our operators connect with government officials..." },
  { title: "Mail Services", img: proct, desc: "Receive email alerts when your loved ones are in danger..." },
  { title: "Panic Services", img: panic, desc: "In case of emergency, instantly send distress signals to authorities and loved ones with precise location tracking, ensuring immediate help." }
];

const Features = () => {
  return (
    <Box sx={{ py: 8, px: 4, textAlign: "center", background: "#f9f9f9" }}>
      <Typography variant="h4" fontWeight={600} gutterBottom>
        Our Automated Features
      </Typography>
      <Typography variant="subtitle1" color="text.secondary" gutterBottom>
        Feature-Packed Driving
      </Typography>
      <Grid container spacing={4} justifyContent="center">
        {featuresData.map((feature, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Card sx={{ p: 2, borderRadius: 3, boxShadow: 3, textAlign: "center", transition: "0.3s", background: "#fff" }}>
                <motion.img
                  src={feature.img}
                  alt={feature.title}
                  width={120}
                  height={120}
                  style={{ margin: "0 auto" }}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                />
                <CardContent>
                  <Typography variant="h6" fontWeight={600} gutterBottom>
                    {feature.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {feature.desc}
                  </Typography>
                </CardContent>
              </Card>
            </motion.div>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Features;
