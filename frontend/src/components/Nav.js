import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import PersonIcon from "@mui/icons-material/Person";
import SearchIcon from "@mui/icons-material/Search";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import { useCookies } from "react-cookie";
import { jwtDecode } from "jwt-decode";
import { googleLogin, loadUser } from "../actions/userAction";
import { useGoogleLogin, useGoogleOneTapLogin } from "@react-oauth/google";
import { toast } from "react-toastify";

const Nav = () => {
  const [cookies, , removeCookie] = useCookies(["token"]);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { error, isAuthenticated, user } = useSelector((state) => state.user);

  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [token, settoken] = useState("");
  const location = useLocation();
  const cartItems = useSelector((state) => state.cart.items);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const token = cookies.token;
    settoken(token);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  const navVariants = {
    hidden: { y: -100, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  const menuVariants = {
    closed: {
      opacity: 0,
      x: "-100%",
      transition: {
        duration: 0.3,
        ease: "easeInOut",
      },
    },
    open: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.3,
        ease: "easeInOut",
      },
    },
  };

  const searchVariants = {
    closed: {
      opacity: 0,
      y: -20,
      transition: {
        duration: 0.2,
        ease: "easeInOut",
      },
    },
    open: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.2,
        ease: "easeInOut",
      },
    },
  };

  const login = useGoogleLogin({
    onSuccess: (tokenResponse) => {
      const accessToken = tokenResponse.access_token;
      fetch(
        `https://www.googleapis.com/oauth2/v3/userinfo?access_token=${accessToken}`
      )
        .then((response) => response.json())
        .then((userData) => {
          dispatch(
            googleLogin(userData.email, userData.name, userData.picture)
          );
        })
        .catch((error) => {
          console.error("Error fetching user data:", error);
        });
    },
  });

  useEffect(() => {
    if (user?.name === undefined && token !== undefined) {
      try {
        const decoded = jwtDecode(token);
        dispatch(loadUser(decoded.id));
      } catch (error) {
        console.error("Error decoding token:", error);
      }
    } else {
      // autoLogin();
    }
  }, []);

  // const autoLogin = () => {
  //   // google auto login
  //   useGoogleOneTapLogin({
  //     onSuccess: (credentialResponse) => {
  //       // fatchUser(credentialResponse);
  //       const userData = jwtDecode(credentialResponse.credential);
  //       dispatch(googleLogin(userData.email, userData.name, userData.picture));
  //       const token = cookies.token;
  //       const decoded = jwtDecode(token);
  //       dispatch(loadUser(decoded.id));
  //     },
  //     onError: () => {
  //       toast.error("Login Failed");
  //     },
  //   });
  // };

  const surchProduct = (e, value) => {
    e.preventDefault();
    navigate(`/products/${value}`);
  };

  return (
    <motion.nav
      initial="hidden"
      animate="visible"
      variants={navVariants}
      className={`navbar fixed-top ${isScrolled ? "scrolled" : ""}`}
    >
      <div className="container">
        <div className="nav-wrapper">
          {/* Logo */}
          <Link to="/" className="navbar-brand">
            <img src="/logo.png" alt="Logo" className="nav-logo" />
          </Link>

          {/* Desktop Menu */}
          <div className="nav-menu d-none d-lg-flex">
            <Link to="/" className="nav-link">
              Home
            </Link>
            <Link to="/products" className="nav-link">
              Products
            </Link>
            {/* <Link to="/categories" className="nav-link">
              Categories
            </Link> */}
            <Link to="/about" className="nav-link">
              About
            </Link>
            {/* <Link to="/contact" className="nav-link">
              Contact
            </Link> */}
          </div>

          {/* Nav Icons */}
          <div className="nav-icons">
            <button
              className="nav-icon-btn"
              onClick={() => setIsSearchOpen(!isSearchOpen)}
            >
              <SearchIcon />
            </button>
            <Link to="/cart" className="nav-icon-btn cart-icon">
              <ShoppingCartIcon />
              {cartItems?.length > 0 && (
                <span className="cart-badge">{cartItems.length}</span>
              )}
            </Link>
            {isAuthenticated ? (
              <>
                <Link to="/profile" className="nav-icon-btn">
                  <PersonIcon />
                </Link>
              </>
            ) : (
              <>
                <Link onClick={() => login()} className="nav-icon-btn">
                  <PersonIcon />
                </Link>
              </>
            )}

            <button
              className="nav-icon-btn d-lg-none"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <CloseIcon /> : <MenuIcon />}
            </button>
          </div>
        </div>

        {/* Search Bar */}
        <AnimatePresence>
          {isSearchOpen && (
            <motion.div
              initial="closed"
              animate="open"
              exit="closed"
              variants={searchVariants}
              className="search-bar"
            >
              <input
                type="text"
                placeholder="Search products..."
                onChange={(e) => surchProduct(e, e.target.value)}
                className="form-control"
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial="closed"
              animate="open"
              exit="closed"
              variants={menuVariants}
              className="mobile-menu"
            >
              <Link to="/" className="mobile-link">
                Home
              </Link>
              <Link to="/products" className="mobile-link">
                Products
              </Link>
              <Link to="/categories" className="mobile-link">
                Categories
              </Link>
              <Link to="/about" className="mobile-link">
                About
              </Link>
              <Link to="/contact" className="mobile-link">
                Contact
              </Link>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
};

export default Nav;
