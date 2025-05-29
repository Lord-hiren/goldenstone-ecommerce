import React from "react";
import { Container, Typography, Box, Divider } from "@mui/material";

const TermsAndConditions = () => {
  return (
    <Container maxWidth="md" sx={{ py: 5, mt: 10 }}>
      <Typography variant="h3" gutterBottom sx={{ textAlign: "center" }}>
        Terms and Conditions
      </Typography>
      <Typography variant="subtitle2" gutterBottom>
        Last updated: 01-04-2025
      </Typography>

      <Box sx={{ my: 3 }}>
        <Typography variant="body1">
          These Terms and Conditions ("Terms") govern your use of our website{" "}
          <a
            href="https://royalcrownjewellery.in"
            target="_blank"
            rel="noopener noreferrer"
          >
            https://royalcrownjewellery.in
          </a>{" "}
          (the "Site") operated by <strong>Royal Crown</strong>. By accessing or
          using our Site, you agree to be bound by these Terms.
        </Typography>
      </Box>

      <Divider sx={{ my: 4 }} />

      {[
        {
          title: "1. Use of the Site",
          content: `You must be at least 18 years old to use our Site. You agree not to use the Site for any unlawful or prohibited purpose.`,
        },
        {
          title: "2. Product Information",
          content: `We strive to display accurate product descriptions and prices, but errors may occur. We reserve the right to correct any errors and cancel orders if needed.`,
        },
        {
          title: "3. Orders and Payments",
          content: `By placing an order, you agree to pay the listed price and applicable taxes and shipping. We reserve the right to refuse or cancel any order.`,
        },
        {
          title: "4. Shipping and Delivery",
          content: `Shipping times are estimates and not guarantees. We are not liable for delays caused by carriers or external factors.`,
        },
        {
          title: "5. Returns and Refunds",
          content: `Please refer to our Return Policy for details. Products must be returned in original condition within the specified time frame.`,
        },
        {
          title: "6. Intellectual Property",
          content: `All content on this Site (text, images, logos, etc.) is owned by Royal Crown or its licensors and is protected by copyright laws.`,
        },
        {
          title: "7. Limitation of Liability",
          content: `We are not liable for any damages resulting from your use of the Site or products purchased, beyond the value of your purchase.`,
        },
        {
          title: "8. Governing Law",
          content: `These Terms are governed by the laws of India. Any disputes shall be subject to the exclusive jurisdiction of the courts in Surat.`,
        },
        {
          title: "9. Changes to Terms",
          content: `We reserve the right to update these Terms at any time. Changes will be posted on this page.`,
        },
        {
          title: "10. Contact Us",
          content: `For any questions about these Terms, please contact us at royalcrown2525@gmail.com.`,
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

export default TermsAndConditions;
