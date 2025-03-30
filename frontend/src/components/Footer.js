import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import PinterestIcon from "@mui/icons-material/Pinterest";

const Footer = () => {
  const fadeInUpVariants = {
    initial: {
      opacity: 0,
      y: 20,
    },
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          {/* Newsletter Section */}
          <motion.div
            className="newsletter-section"
            variants={fadeInUpVariants}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            {/* <h3>Subscribe to Our Newsletter</h3>
            <p>Stay updated with our latest collections and exclusive offers</p>
            <form className="newsletter-form">
              <input
                type="email"
                placeholder="Enter your email"
                className="form-control"
              />
              <button type="submit" className="btn btn-primary">
                Subscribe
              </button>
            </form> */}
          </motion.div>

          <div className="footer-grid">
            {/* Company Info */}
            <motion.div
              className="footer-section"
              variants={fadeInUpVariants}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
            >
              <h4>About Us</h4>
              <p>
                We are dedicated to providing the finest jewelry collections,
                crafted with excellence and attention to detail.
              </p>
              <div className="social-links">
                <a href="#" className="social-link">
                  <FacebookIcon />
                </a>
                <a href="#" className="social-link">
                  <TwitterIcon />
                </a>
                <a href="#" className="social-link">
                  <InstagramIcon />
                </a>
                <a href="#" className="social-link">
                  <PinterestIcon />
                </a>
              </div>
            </motion.div>

            {/* Quick Links */}
            <motion.div
              className="footer-section"
              variants={fadeInUpVariants}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
            >
              <h4>Quick Links</h4>
              <ul className="footer-links">
                <li>
                  <Link to="/products">Shop All</Link>
                </li>
                <li>
                  <Link to="/about">About Us</Link>
                </li>
                <li>
                  <Link to="/contact">Contact</Link>
                </li>
                {/* <li>
                  <Link to="/blog">Blog</Link>
                </li> */}
              </ul>
            </motion.div>

            {/* Customer Service */}
            <motion.div
              className="footer-section"
              variants={fadeInUpVariants}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
            >
              <h4>Customer Service</h4>
              <ul className="footer-links">
                <li>
                  <Link to="/shipping">Shipping Info</Link>
                </li>
                <li>
                  <Link to="/returns">Returns & Exchanges</Link>
                </li>
                <li>
                  <Link to="/faq">FAQ</Link>
                </li>
                <li>
                  <Link to="/size-guide">Size Guide</Link>
                </li>
              </ul>
            </motion.div>

            {/* Contact Info */}
            <motion.div
              className="footer-section"
              variants={fadeInUpVariants}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
            >
              <h4>Contact Us</h4>
              <ul className="contact-info">
                {/* <li>
                  <strong>Address:</strong> 123 Jewelry Street, Fashion City, FC
                  12345
                </li> */}
                <li>
                  <strong>Phone:</strong> +91 90337 22525
                </li>
                <li>
                  <strong>Email:</strong> royalcrown2525@gmail.com
                </li>
                <li>
                  <strong>Hours:</strong> Mon - Sat: 10:00 AM - 8:00 PM
                </li>
              </ul>
            </motion.div>
          </div>
        </div>

        {/* Bottom Bar */}
        <motion.div
          className="footer-bottom"
          variants={fadeInUpVariants}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
        >
          <div className="footer-bottom-content px-3">
            <p>&copy; 2025 Golden Jewelry. All rights reserved.</p>
            <div className="footer-bottom-links">
              <Link to="/privacy">Privacy Policy</Link>
              <Link to="/terms">Terms of Service</Link>
              <Link to="/sitemap">Sitemap</Link>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
