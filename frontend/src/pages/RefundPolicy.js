import React from "react";
import { Container, Typography, Box, Divider } from "@mui/material";
import Metadata from "../components/Metadata";
import Nav from "../components/Nav";

const RefundPolicy = () => {
  return (
    <>
      <Metadata title="Royal Crown --RefundPolicy" />
      <Nav />
      <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
        <Box sx={{ textAlign: "center", mb: 4 }}>
          <Typography variant="h4" component="h1" gutterBottom>
            Refund Policy
          </Typography>
        </Box>

        <Divider sx={{ mb: 4 }} />

        <Typography variant="h6" component="h2" gutterBottom>
          1. Eligibility for Refunds
        </Typography>
        <Typography paragraph>
          We accept refunds for items that arrive damaged or defective. To be
          eligible for a refund, you must contact us within{" "}
          <strong>7 days</strong>
          of receiving your order and provide proof of damage (photos or a
          description).
        </Typography>

        <Typography variant="h6" component="h2" gutterBottom>
          2. Non-Refundable Items
        </Typography>
        <Typography paragraph>
          Due to hygiene reasons, we do not accept refunds on jewelry unless the
          item is defective or damaged.
        </Typography>

        <Typography variant="h6" component="h2" gutterBottom>
          3. Return Process
        </Typography>
        <Typography paragraph>
          If your item is eligible for a refund, we will provide you with
          instructions on how to return the item. You must return the item in
          its original packaging, including all accessories, tags, and labels.
        </Typography>

        <Typography variant="h6" component="h2" gutterBottom>
          4. Refund Process
        </Typography>
        <Typography paragraph>
          Once we receive the returned item and verify its condition, we will
          process your refund. Refunds will be issued to the original payment
          method used for the purchase. The cost of return shipping will be
          covered by Royal Crown only if the item is faulty.
        </Typography>

        <Typography variant="h6" component="h2" gutterBottom>
          5. Processing Time
        </Typography>
        <Typography paragraph>
          Please allow <strong>5-7 business days</strong> for your refund to be
          processed after we receive the returned item.
        </Typography>

        <Typography variant="h6" component="h2" gutterBottom>
          6. Contact Us
        </Typography>
        <Typography paragraph>
          For any questions or concerns regarding our refund policy, please
          contact us at royalcrown2525@gmail.com.
        </Typography>

        <Divider sx={{ mt: 4 }} />
      </Container>
    </>
  );
};

export default RefundPolicy;
