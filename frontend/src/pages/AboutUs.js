import React from "react";
import { Container, Typography, Box, Divider, Grid } from "@mui/material";
import Metadata from "../components/Metadata";
import Nav from "../components/Nav";
import p1 from "../asetes/images/poster.jpeg";

const AboutUs = () => {
  return (
    <>
      <Metadata title="Royal Crown --About us" />
      <Nav />

      {/* Hero Section */}
      <Box
        sx={{
          position: "relative",
          marginTop: "6rem",
          height: "300px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          mb: 4,
          "&::before": {
            content: '""',
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundImage: `url(${p1})`, // Jewelry image
            backgroundSize: "cover",
            backgroundPosition: "center",
            filter: "brightness(70%)", // Adjust brightness for better text readability
            zIndex: -1,
          },
        }}
      >
        <Container maxWidth="md">
          <Typography
            variant="h3"
            component="h1"
            color="white"
            align="center"
            gutterBottom
          >
            About Royal Crown
          </Typography>
          <Typography variant="h5" component="p" color="white" align="center">
            Exquisite Jewelry, Unique Design
          </Typography>
        </Container>
      </Box>

      <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
        <Grid container spacing={4}>
          <Grid item xs={12}>
            <Typography variant="h4" component="h2" gutterBottom align="center">
              Our Story
            </Typography>
            <Typography paragraph>
              Welcome to <strong>Royal Crown</strong>! We are passionate about
              creating exquisite jewelry that stands out for its unique design
              and craftsmanship. Our mission is to offer high-quality pieces
              that reflect individuality and style, without the use of gold,
              silver, or real diamonds.
            </Typography>
            <Typography paragraph>
              At Royal Crown, we believe in the beauty of simplicity and
              elegance. Each piece of jewelry is handcrafted with care, using
              only the finest materials. Our collection is inspired by modern
              trends and timeless designs, ensuring that there’s something for
              everyone.
            </Typography>
          </Grid>

          <Grid item xs={12}>
            <Typography variant="h4" component="h2" gutterBottom align="center">
              Our Vision
            </Typography>
            <Typography paragraph>
              Our vision is to empower our customers by providing them with
              beautiful, affordable jewelry that enhances their style. We take
              pride in our commitment to quality, customer satisfaction, and
              ethical practices in sourcing our materials.
            </Typography>
          </Grid>

          <Grid item xs={12}>
            <Typography variant="h4" component="h2" gutterBottom align="center">
              Meet Our Team
            </Typography>
            <Grid container spacing={2} justifyContent="center">
              {/* Team Member 1 */}
              <Grid item xs={12} sm={6} md={4}>
                <Box sx={{ textAlign: "center" }}>
                  <img
                    src="https://images.unsplash.com/photo-1581456495146-65a71b2c8e52" // Man in suit
                    alt="Team Member 1"
                    style={{
                      borderRadius: "50%",
                      width: "150px",
                      height: "150px",
                    }}
                  />
                  <Typography variant="h6" gutterBottom>
                    John Doe
                  </Typography>
                  <Typography>CEO & Founder</Typography>
                  <Typography paragraph>
                    John is a visionary leader with a passion for jewelry.
                  </Typography>
                </Box>
              </Grid>

              {/* Team Member 2 */}
              <Grid item xs={12} sm={6} md={4}>
                <Box sx={{ textAlign: "center" }}>
                  <img
                    src="https://images.unsplash.com/photo-1544005313-94ddf0286df2" // Woman smiling
                    alt="Team Member 2"
                    style={{
                      borderRadius: "50%",
                      width: "150px",
                      height: "150px",
                    }}
                  />
                  <Typography variant="h6" gutterBottom>
                    Jane Smith
                  </Typography>
                  <Typography>Lead Designer</Typography>
                  <Typography paragraph>
                    Jane brings creativity and innovation to our designs.
                  </Typography>
                </Box>
              </Grid>

              {/* Team Member 3 */}
              <Grid item xs={12} sm={6} md={4}>
                <Box sx={{ textAlign: "center" }}>
                  <img
                    src="https://images.unsplash.com/photo-1557862921-37829c790f19" // Man in office
                    alt="Team Member 3"
                    style={{
                      borderRadius: "50%",
                      width: "150px",
                      height: "150px",
                    }}
                  />
                  <Typography variant="h6" gutterBottom>
                    David Lee
                  </Typography>
                  <Typography>Marketing Director</Typography>
                  <Typography paragraph>
                    David is responsible for sharing our vision with the world.
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={12}>
            <Typography variant="h4" component="h2" gutterBottom align="center">
              Contact Us
            </Typography>
            <Typography paragraph>
              We love hearing from our customers! If you have any questions or
              would like to know more about our products, feel free to reach out
              to us at
              <a href="mailto:royalcrown2525@gmail.com">
                {" "}
                royalcrown2525@gmail.com
              </a>
              .
            </Typography>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default AboutUs;
