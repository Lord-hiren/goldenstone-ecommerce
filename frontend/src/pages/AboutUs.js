import React from "react";
import { Container, Typography, Box, Divider } from "@mui/material";
import Metadata from "../components/Metadata";

const AboutUs = () => {
  return (
    <>
      <Metadata title="Royal Crown --About us" />
      <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
        <Box sx={{ textAlign: "center", mb: 4 }}>
          <Typography variant="h4" component="h1" gutterBottom>
            About Us
          </Typography>
        </Box>

        <Divider sx={{ mb: 4 }} />

        <Typography paragraph>
          Welcome to <strong>Royal Crown</strong>! We are passionate about
          creating exquisite jewelry that stands out for its unique design and
          craftsmanship. Our mission is to offer high-quality pieces that
          reflect individuality and style, without the use of gold, silver, or
          real diamonds.
        </Typography>

        <Typography variant="h6" component="h2" gutterBottom>
          Our Story
        </Typography>
        <Typography paragraph>
          At Royal Crown, we believe in the beauty of simplicity and elegance.
          Each piece of jewelry is handcrafted with care, using only the finest
          materials. Our collection is inspired by modern trends and timeless
          designs, ensuring that there’s something for everyone.
        </Typography>

        <Typography variant="h6" component="h2" gutterBottom>
          Our Vision
        </Typography>
        <Typography paragraph>
          Our vision is to empower our customers by providing them with
          beautiful, affordable jewelry that enhances their style. We take pride
          in our commitment to quality, customer satisfaction, and ethical
          practices in sourcing our materials.
        </Typography>

        <Typography variant="h6" component="h2" gutterBottom>
          Contact Us
        </Typography>
        <Typography paragraph>
          We love hearing from our customers! If you have any questions or would
          like to know more about our products, feel free to reach out to us at
          <a href="mailto:royalcrown2525@gmail.com">
            {" "}
            royalcrown2525@gmail.com
          </a>
          .
        </Typography>

        <Divider sx={{ mt: 4 }} />
      </Container>
    </>
  );
};

export default AboutUs;
