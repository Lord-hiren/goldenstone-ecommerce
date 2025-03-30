import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import AOS from "aos";
import "aos/dist/aos.css";
import Nav from "../Nav";
import Footer from "../Footer";

const Layout = ({ children }) => {
  useEffect(() => {
    // Initialize AOS
    AOS.init({
      duration: 800,
      once: true,
      offset: 50,
      easing: "ease-out-cubic",
    });

    // Update AOS on window resize
    window.addEventListener("resize", () => {
      AOS.refresh();
    });

    return () => {
      window.removeEventListener("resize", () => {
        AOS.refresh();
      });
    };
  }, []);

  // Page transition variants
  const pageVariants = {
    initial: {
      opacity: 0,
      y: 20,
    },
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
    exit: {
      opacity: 0,
      y: -20,
      transition: {
        duration: 0.3,
        ease: "easeIn",
      },
    },
  };

  return (
    <>
      <Nav />
      <AnimatePresence mode="wait">
        <motion.main
          initial="initial"
          animate="animate"
          exit="exit"
          variants={pageVariants}
          className="main-content"
        >
          {children}
        </motion.main>
      </AnimatePresence>
      {/* <Footer /> */}
    </>
  );
};

export default Layout;
