import React from "react";
import { Container, Typography, Box, Divider } from "@mui/material";

const PrivacyPolicy = () => {
  return (
    <Container maxWidth="md" sx={{ py: 5, mt: 10 }}>
      <Typography variant="h3" gutterBottom sx={{ textAlign: "center" }}>
        Privacy Policy
      </Typography>
      <Typography variant="subtitle2" gutterBottom>
        Last updated: 01-04-2025
      </Typography>

      <Box sx={{ my: 3 }}>
        <Typography variant="body1">
          Welcome to <strong>Royal Crown</strong> ("we", "our", "us"). This
          Privacy Policy describes how your personal information is collected,
          used, and shared when you visit or make a purchase from{" "}
          <a
            href="https://royalcrownjewellery.in"
            target="_blank"
            rel="noopener noreferrer"
          >
            https://royalcrownjewellery.in
          </a>{" "}
          (the "Site").
        </Typography>
      </Box>

      <Divider sx={{ my: 4 }} />

      {[
        {
          title: "1. Personal Information We Collect",
          content: `We collect information such as your name, address, email, phone number, payment information, and data from your device including your IP address, browser type, and cookies.`,
        },
        {
          title: "2. How We Use Your Information",
          content: `We use your information to fulfill orders, communicate with you, process payments, screen for fraud, and send promotions if you've opted in.`,
        },
        {
          title: "3. Sharing Your Information",
          content: `We do not sell your information. We only share it with trusted service providers (like payment processors or couriers) and comply with legal obligations.`,
        },
        {
          title: "4. Your Rights",
          content: `Depending on your location, you may have the right to access, correct, delete, or restrict use of your personal data. Contact us at royalcrown2525@gmail.com to exercise your rights.`,
        },
        {
          title: "5. Cookies",
          content: `We use cookies to remember your preferences and improve site experience. You can manage cookies via your browser settings.`,
        },
        {
          title: "6. Data Retention",
          content: `We retain order information unless you request deletion. Some data may be retained for legal or operational reasons.`,
        },
        {
          title: "7. Third-Party Links",
          content: `We may link to third-party websites. We are not responsible for their content or privacy practices.`,
        },
        {
          title: "8. Security",
          content: `We implement industry-standard security practices to protect your data, but no system is completely secure.`,
        },
        {
          title: "9. Changes to This Policy",
          content: `We may update this Privacy Policy periodically. Updates will be posted on this page.`,
        },
      ].map((section, index) => (
        <Box key={index} sx={{ mb: 4 }}>
          <Typography variant="h6" gutterBottom>
            {section.title}
          </Typography>
          <Typography variant="body2">{section.content}</Typography>
        </Box>
      ))}
    </Container>
  );
};

export default PrivacyPolicy;
