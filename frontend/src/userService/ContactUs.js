import React, { useState } from "react";
import {
  Container,
  Typography,
  Box,
  TextField,
  Button,
  Grid,
  Paper,
  Divider,
  Fade,
  Slide,
  Grow,
  IconButton,
  useTheme,
} from "@mui/material";
import {
  Email as EmailIcon,
  Phone as PhoneIcon,
  AccessTime as AccessTimeIcon,
  Send as SendIcon,
  LocationOn as LocationIcon,
  Facebook as FacebookIcon,
  Twitter as TwitterIcon,
  Instagram as InstagramIcon,
  LinkedIn as LinkedInIcon,
} from "@mui/icons-material";

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const theme = useTheme();

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate form submission
    setIsSubmitted(true);
    setTimeout(() => {
      const { name, email, message } = formData;
      const subject = encodeURIComponent(`New message from ${name}`);
      const body = encodeURIComponent(
        `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`
      );
      window.location.href = `mailto:royalcrown2525@gmail.com?subject=${subject}&body=${body}`;
      setIsSubmitted(false);
    }, 1500);
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #f5f7fa 0%, #e4edf5 100%)",
        py: 8,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        mt: 10,
      }}
    >
      <Container maxWidth="lg">
        <Slide in direction="down" timeout={500}>
          <Typography
            variant="h3"
            component="h1"
            gutterBottom
            align="center"
            sx={{
              fontWeight: 700,
              mb: 6,
              color: "#2c3e50",
              textShadow: "0 2px 4px rgba(0,0,0,0.1)",
              position: "relative",
              "&:after": {
                content: '""',
                display: "block",
                width: "80px",
                height: "4px",
                background: theme.palette.primary.main,
                margin: "16px auto 0",
                borderRadius: "2px",
              },
            }}
          >
            Contact Us
          </Typography>
        </Slide>

        <Grid container spacing={4} justifyContent="center">
          <Grid item xs={12} md={5}>
            <Slide in direction="left" timeout={700}>
              <Paper
                elevation={6}
                sx={{
                  borderRadius: 4,
                  p: 4,
                  height: "100%",
                  background: "linear-gradient(145deg, #ffffff, #f0f0f0)",
                  boxShadow: "0 8px 32px rgba(0,0,0,0.1)",
                  border: "1px solid rgba(255,255,255,0.5)",
                }}
              >
                <Typography
                  variant="h5"
                  gutterBottom
                  sx={{ fontWeight: 600, mb: 3, color: "#2c3e50" }}
                >
                  Get in Touch
                </Typography>

                <Box sx={{ mb: 4 }}>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "flex-start",
                      mb: 3,
                      p: 2,
                      borderRadius: 2,
                      background: "rgba(25, 118, 210, 0.05)",
                      transition: "all 0.3s ease",
                      "&:hover": {
                        transform: "translateY(-3px)",
                        boxShadow: "0 4px 8px rgba(0,0,0,0.08)",
                      },
                    }}
                  >
                    <Box
                      sx={{
                        background: theme.palette.primary.main,
                        borderRadius: "50%",
                        width: 48,
                        height: 48,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        mr: 2,
                        flexShrink: 0,
                      }}
                    >
                      <PhoneIcon sx={{ color: "white" }} />
                    </Box>
                    <Box>
                      <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                        Phone
                      </Typography>
                      <Typography variant="body1" sx={{ mt: 0.5 }}>
                        +91 90337 22525
                      </Typography>
                    </Box>
                  </Box>

                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "flex-start",
                      mb: 3,
                      p: 2,
                      borderRadius: 2,
                      background: "rgba(25, 118, 210, 0.05)",
                      transition: "all 0.3s ease",
                      "&:hover": {
                        transform: "translateY(-3px)",
                        boxShadow: "0 4px 8px rgba(0,0,0,0.08)",
                      },
                    }}
                  >
                    <Box
                      sx={{
                        background: theme.palette.primary.main,
                        borderRadius: "50%",
                        width: 48,
                        height: 48,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        mr: 2,
                        flexShrink: 0,
                      }}
                    >
                      <EmailIcon sx={{ color: "white" }} />
                    </Box>
                    <Box>
                      <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                        Email
                      </Typography>
                      <Typography variant="body1" sx={{ mt: 0.5 }}>
                        <a
                          href="mailto:royalcrown2525@gmail.com"
                          style={{
                            textDecoration: "none",
                            color: theme.palette.primary.main,
                            fontWeight: 500,
                          }}
                        >
                          royalcrown2525@gmail.com
                        </a>
                      </Typography>
                    </Box>
                  </Box>

                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "flex-start",
                      mb: 3,
                      p: 2,
                      borderRadius: 2,
                      background: "rgba(25, 118, 210, 0.05)",
                      transition: "all 0.3s ease",
                      "&:hover": {
                        transform: "translateY(-3px)",
                        boxShadow: "0 4px 8px rgba(0,0,0,0.08)",
                      },
                    }}
                  >
                    <Box
                      sx={{
                        background: theme.palette.primary.main,
                        borderRadius: "50%",
                        width: 48,
                        height: 48,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        mr: 2,
                        flexShrink: 0,
                      }}
                    >
                      <AccessTimeIcon sx={{ color: "white" }} />
                    </Box>
                    <Box>
                      <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                        Business Hours
                      </Typography>
                      <Typography variant="body1" sx={{ mt: 0.5 }}>
                        Mon - Sat: 10:00 AM - 8:00 PM
                      </Typography>
                    </Box>
                  </Box>

                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "flex-start",
                      p: 2,
                      borderRadius: 2,
                      background: "rgba(25, 118, 210, 0.05)",
                      transition: "all 0.3s ease",
                      "&:hover": {
                        transform: "translateY(-3px)",
                        boxShadow: "0 4px 8px rgba(0,0,0,0.08)",
                      },
                    }}
                  >
                    <Box
                      sx={{
                        background: theme.palette.primary.main,
                        borderRadius: "50%",
                        width: 48,
                        height: 48,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        mr: 2,
                        flexShrink: 0,
                      }}
                    >
                      <LocationIcon sx={{ color: "white" }} />
                    </Box>
                    <Box>
                      <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                        Location
                      </Typography>
                      <Typography variant="body1" sx={{ mt: 0.5 }}>
                        123 Business Avenue, Tech City, India 560001
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              </Paper>
            </Slide>
          </Grid>

          <Grid item xs={12} md={7}>
            <Slide in direction="right" timeout={700}>
              <Paper
                elevation={6}
                sx={{
                  borderRadius: 4,
                  p: 4,
                  background: "linear-gradient(145deg, #ffffff, #f0f0f0)",
                  boxShadow: "0 8px 32px rgba(0,0,0,0.1)",
                  border: "1px solid rgba(255,255,255,0.5)",
                }}
              >
                <Typography
                  variant="h5"
                  gutterBottom
                  sx={{ fontWeight: 600, mb: 3, color: "#2c3e50" }}
                >
                  Send us a Message
                </Typography>

                <Box
                  component="form"
                  onSubmit={handleSubmit}
                  sx={{ position: "relative" }}
                >
                  {isSubmitted && (
                    <Fade in={isSubmitted}>
                      <Box
                        sx={{
                          position: "absolute",
                          top: 0,
                          left: 0,
                          right: 0,
                          bottom: 0,
                          background: "rgba(255,255,255,0.9)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          borderRadius: 3,
                          zIndex: 10,
                        }}
                      >
                        <Box textAlign="center">
                          <svg
                            width="80"
                            height="80"
                            viewBox="0 0 100 100"
                            style={{ margin: "0 auto" }}
                          >
                            <circle
                              cx="50"
                              cy="50"
                              r="45"
                              fill="none"
                              stroke="#e0e0e0"
                              strokeWidth="5"
                            />
                            <circle
                              cx="50"
                              cy="50"
                              r="45"
                              fill="none"
                              stroke={theme.palette.primary.main}
                              strokeWidth="5"
                              strokeDasharray="283"
                              strokeDashoffset="283"
                              strokeLinecap="round"
                              style={{
                                animation:
                                  "circle-fill 1.2s ease-in-out forwards",
                              }}
                            />
                            <path
                              d="M30,50 L45,65 L70,35"
                              fill="none"
                              stroke={theme.palette.primary.main}
                              strokeWidth="5"
                              strokeLinecap="round"
                              strokeDasharray="50"
                              strokeDashoffset="50"
                              style={{
                                animation:
                                  "check-draw 0.6s 0.8s ease-in-out forwards",
                              }}
                            />
                          </svg>
                          <Typography
                            variant="h6"
                            sx={{ mt: 2, fontWeight: 600, color: "#2c3e50" }}
                          >
                            Message Sent!
                          </Typography>
                        </Box>
                      </Box>
                    </Fade>
                  )}

                  <TextField
                    fullWidth
                    label="Your Name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    margin="normal"
                    required
                    variant="outlined"
                    InputProps={{
                      style: {
                        borderRadius: 12,
                        background: "rgba(255,255,255,0.7)",
                      },
                    }}
                  />
                  <TextField
                    fullWidth
                    label="Your Email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    margin="normal"
                    required
                    variant="outlined"
                    InputProps={{
                      style: {
                        borderRadius: 12,
                        background: "rgba(255,255,255,0.7)",
                      },
                    }}
                  />
                  <TextField
                    fullWidth
                    label="Your Message"
                    name="message"
                    multiline
                    rows={5}
                    value={formData.message}
                    onChange={handleChange}
                    margin="normal"
                    required
                    variant="outlined"
                    InputProps={{
                      style: {
                        borderRadius: 16,
                        background: "rgba(255,255,255,0.7)",
                      },
                    }}
                  />
                  <Grow in timeout={1000}>
                    <Button
                      type="submit"
                      variant="contained"
                      endIcon={<SendIcon />}
                      sx={{
                        mt: 3,
                        py: 1.5,
                        borderRadius: 3,
                        fontSize: "1rem",
                        fontWeight: 600,
                        textTransform: "none",
                        letterSpacing: "0.5px",
                        boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
                        transition: "all 0.3s ease",
                        background: "linear-gradient(45deg, #1976d2, #2196f3)",
                        "&:hover": {
                          transform: "translateY(-2px)",
                          boxShadow: "0 6px 8px rgba(0,0,0,0.15)",
                          background:
                            "linear-gradient(45deg, #1565c0, #1e88e5)",
                        },
                      }}
                      fullWidth
                    >
                      Send Message
                    </Button>
                  </Grow>
                </Box>
              </Paper>
            </Slide>
          </Grid>
        </Grid>
      </Container>

      <style jsx global>{`
        @keyframes circle-fill {
          0% {
            stroke-dashoffset: 283;
          }
          100% {
            stroke-dashoffset: 0;
          }
        }

        @keyframes check-draw {
          0% {
            stroke-dashoffset: 50;
          }
          100% {
            stroke-dashoffset: 0;
          }
        }
      `}</style>
    </Box>
  );
};

export default ContactUs;
