import React from "react";
import {
  Container,
  Typography,
  Box,
  Divider,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import Metadata from "../components/Metadata";

const TermsAndConditions = () => {
  return (
    <>
      <Metadata title="Royal Crown --Shipping" />
      <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
        <Box sx={{ textAlign: "center", mb: 4 }}>
          <Typography variant="h4" component="h1" gutterBottom>
            Terms & Conditions
          </Typography>
        </Box>

        <Divider sx={{ mb: 4 }} />

        <Typography variant="h6" component="h2" gutterBottom>
          1. General Information
        </Typography>
        <Typography paragraph>
          Royal Crown specializes in handcrafted jewelry. Please note that we do{" "}
          <strong>not</strong> use gold, silver, or real diamonds in our
          products. All jewelry items are designed with the utmost care and
          attention to detail. By placing an order, you confirm that you have
          read, understood, and agree to these terms.
        </Typography>

        <Typography variant="h6" component="h2" gutterBottom>
          2. Products
        </Typography>
        <Typography paragraph>
          The images of our products are for illustrative purposes only. We aim
          to display the colors as accurately as possible, but we cannot
          guarantee that your device’s display will accurately reflect the
          actual color of the jewelry. Due to the handmade nature of our
          products, there may be slight variations in size, shape, and finish
          between individual pieces.
        </Typography>

        <Typography variant="h6" component="h2" gutterBottom>
          3. Pricing
        </Typography>
        <Typography paragraph>
          All prices are listed in INR and include applicable taxes. Royal Crown
          reserves the right to change prices without prior notice. However, the
          price you pay for your order will always be the price at the time you
          place your order.
        </Typography>

        <Typography variant="h6" component="h2" gutterBottom>
          4. Order Processing & Shipping
        </Typography>
        <Typography paragraph>
          Orders will be processed within 2-3 business days of receipt. Shipping
          times vary based on the destination. We provide estimated shipping
          times during the checkout process. Royal Crown is not responsible for
          any delays caused by the courier service or customs.
        </Typography>

        <Typography variant="h6" component="h2" gutterBottom>
          5. Returns & Refunds
        </Typography>
        <Typography paragraph>
          Due to hygiene reasons, we do not accept returns on jewelry unless the
          item is defective or damaged. If your item arrives damaged or is
          faulty, please contact us within 7 days of receiving your order with
          proof of damage. Refunds for damaged items will be processed once we
          receive the returned product. The cost of return shipping will be
          covered by Royal Crown only if the item is faulty.
        </Typography>

        <Typography variant="h6" component="h2" gutterBottom>
          6. Care Instructions
        </Typography>
        <Typography paragraph>
          To maintain the quality of your jewelry, avoid exposure to water,
          perfume, and harsh chemicals. Some jewelry materials may naturally
          develop a patina over time. This is normal and adds to the character
          of the piece. To restore its shine, gently polish with a soft cloth.
        </Typography>

        <Typography variant="h6" component="h2" gutterBottom>
          7. Intellectual Property
        </Typography>
        <Typography paragraph>
          All designs, images, and content on our website are the intellectual
          property of Royal Crown. Any unauthorized use, reproduction, or
          distribution of our content is prohibited.
        </Typography>

        <Typography variant="h6" component="h2" gutterBottom>
          8. Privacy Policy
        </Typography>
        <Typography paragraph>
          We are committed to protecting your privacy. Personal information
          provided during the checkout process will only be used to process your
          order and will not be shared with third parties.
        </Typography>

        <Typography variant="h6" component="h2" gutterBottom>
          9. Amendments
        </Typography>
        <Typography paragraph>
          Royal Crown reserves the right to update these terms and conditions at
          any time. Changes will be posted on our website, and it is your
          responsibility to review them regularly.
        </Typography>

        <Typography variant="h6" component="h2" gutterBottom>
          10. Contact Information
        </Typography>
        <Typography paragraph>
          For any questions or concerns, please contact us at
          royalcrown2525@gmail.com.
        </Typography>

        <Divider sx={{ mt: 4 }} />
      </Container>
    </>
  );
};

export default TermsAndConditions;
