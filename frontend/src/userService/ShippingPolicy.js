import React from "react";
import { Container, Typography, Box } from "@mui/material";

const ShippingPolicy = () => {
  return (
    <Container maxWidth="md" sx={{ py: 5, mt: 10 }}>
      <Typography variant="h3" gutterBottom sx={{ textAlign: "center" }}>
        Shipping Policy
      </Typography>
      <Typography variant="subtitle2" gutterBottom>
        Last updated: 01-04-2025
      </Typography>

      <Box sx={{ mt: 4 }}>
        <Typography variant="h6" component="h2" gutterBottom>
          1. Delivery Partners
        </Typography>
        <Typography paragraph>
          We ship all our products through trusted delivery partners such as{" "}
          <strong>Blue Dart</strong> and other reliable courier services to
          ensure safe and timely delivery across India.
        </Typography>

        <Typography variant="h6" component="h2" gutterBottom>
          2. Shipping Timeline
        </Typography>
        <Typography paragraph>
          Orders are typically processed within{" "}
          <strong>1-3 business days</strong>. After dispatch, delivery usually
          takes <strong>3-7 business days</strong> depending on your location.
        </Typography>

        <Typography variant="h6" component="h2" gutterBottom>
          3. Shipping Charges
        </Typography>
        <Typography paragraph>
          We offer <strong>free shipping</strong> on all prepaid orders above a
          certain value. For COD or express delivery, extra charges may apply,
          which will be shown at checkout.
        </Typography>

        <Typography variant="h6" component="h2" gutterBottom>
          4. Tracking Information
        </Typography>
        <Typography paragraph>
          Once your order is shipped, you will receive an email and/or SMS with
          the tracking number and a link to track your shipment.
        </Typography>

        <Typography variant="h6" component="h2" gutterBottom>
          5. Delays and Issues
        </Typography>
        <Typography paragraph>
          We are not responsible for delays caused by courier services, weather
          conditions, or unforeseen circumstances. However, we will assist you
          in resolving any issues with the delivery service.
        </Typography>

        <Typography variant="h6" component="h2" gutterBottom>
          6. International Shipping
        </Typography>
        <Typography paragraph>
          Currently, we only ship within India. International shipping is not
          available at this time.
        </Typography>

        <Typography variant="h6" component="h2" gutterBottom>
          7. Contact Us
        </Typography>
        <Typography paragraph>
          For questions related to shipping, please contact us at{" "}
          <a href="mailto:royalcrown2525@gmail.com">royalcrown2525@gmail.com</a>
          .
        </Typography>
      </Box>
    </Container>
  );
};

export default ShippingPolicy;
