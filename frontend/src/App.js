import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import AOS from "aos";
import "aos/dist/aos.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Layout
import Layout from "./components/layout/Layout";

// Pages
import Home from "./pages/Home";
import Products from "./pages/Products";
import ProductDetail from "./pages/ProductDetail";
import Cart from "./pages/Cart";
import OrderDetails from "./pages/OrderDetails";
import Profile from "./pages/Profile";
import About from "./pages/AboutUs";
// import Contact from "./pages/";
// import Categories from "./pages/Categories";
import Shipping from "./pages/Shipping";
import OrderPlace from "./pages/OrderPlace";
import Error from "./pages/Error";

// Protected Route
import ProtectedRoute from "./components/route/ProtectedRoute";

// Styles
import "./App.scss";
import Footer from "./components/Footer";
import PrivacyPolicy from "./userService/Privacy";
import TermsAndConditions from "./userService/TermsAndConditions";
import RefundPolicy from "./userService/RefundPolicy";
import ShippingPolicy from "./userService/ShippingPolicy";
import ContactUs from "./userService/ContactUs";

function App() {
  useEffect(() => {
    // Initialize AOS
    AOS.init({
      duration: 800,
      once: true,
      offset: 50,
      easing: "ease-out-cubic",
    });
  }, []);

  return (
    <Router>
      <Layout>
        <AnimatePresence mode="wait">
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<Products />} />
            <Route path="/products/:keyword" element={<Products />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/about" element={<About />} />
            {/* <Route path="/contact" element={<Contact />} /> */}
            {/* <Route path="/categories" element={<Categories />} /> */}

            {/* Protected Routes */}
            <Route path="/profile" element={<Profile />} />
            <Route path="/shipping" element={<Shipping />} />

            <Route
              path="/order/:id"
              element={
                <ProtectedRoute>
                  <OrderDetails />
                </ProtectedRoute>
              }
            />
            <Route
              path="/order/success"
              element={
                <ProtectedRoute>
                  <OrderPlace />
                </ProtectedRoute>
              }
            />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/terms" element={<TermsAndConditions />} />
            <Route path="/refund-policy" element={<RefundPolicy />} />
            <Route path="/shipping-policy" element={<ShippingPolicy />} />
            <Route path="/contact-us" element={<ContactUs />} />

            {/* 404 Route */}
            <Route path="*" element={<Error />} />
          </Routes>
          <Footer />
        </AnimatePresence>

        <ToastContainer
          position="bottom-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
      </Layout>
    </Router>
  );
}

export default App;
