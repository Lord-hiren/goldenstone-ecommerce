import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import { clearErrors, getProduct } from "../actions/productActions";
import { jwtDecode } from "jwt-decode";

// Material UI Icons
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import SecurityIcon from "@mui/icons-material/Security";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";
import CachedIcon from "@mui/icons-material/Cached";

// Components
import Layout from "../components/layout/Layout";
import Metadata from "../components/Metadata";
import ProductCard from "../components/ProductsCard";

// Images
import Wbreslet from "../asetes/img/breslet-women.png";
import Weyrring from "../asetes/img/eyrring-women.png";
import Wring from "../asetes/img/ring-women.png";
import Wnecklace from "../asetes/img/necklace-women.png";
import mbreslet from "../asetes/img/breslet-man.png";
import meyrring from "../asetes/img/eyrring-man.png";
import mring from "../asetes/img/ring-man.png";
import mnecklace from "../asetes/img/necklace-man.png";
import banner1 from "../asetes/images/banner/1.png";
import banner2 from "../asetes/images/banner/2.png";
import { useGoogleOneTapLogin } from "@react-oauth/google";
import { googleLogin } from "../actions/userAction";

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, products } = useSelector((state) => state.products);

  const [trandingProducts, setTrandingProducts] = useState([]);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }
    dispatch(getProduct());
  }, [dispatch, error]);

  useEffect(() => {
    if (products !== undefined) {
      const filteredProcut = products?.filter(
        (element) => element.trending === "Y"
      );
      setTrandingProducts(filteredProcut);
    }
  }, [products]);

  // fatching data
  const fatchUser = (creRes) => {};
  const onhandelclick = (e) => {
    e.preventDefault();
    toast.success("hello world");
  };

  const policyFeatures = [
    {
      icon: <LocalShippingIcon />,
      title: "Free Shipping",
      description: "All orders",
    },
    {
      icon: <CachedIcon />,
      title: "Money Back",
      description: "7 day guarantee",
    },
    {
      icon: <SecurityIcon />,
      title: "Secure Payment",
      description: "Protected by SSL",
    },
    {
      icon: <SupportAgentIcon />,
      title: "24/7 Support",
      description: "Dedicated support",
    },
  ];

  const categories = [
    {
      name: "Women's Collection",
      items: [
        { image: Wbreslet, title: "Bracelets", path: "breslet" },
        { image: Weyrring, title: "Earrings", path: "eyrring" },
        { image: Wring, title: "Rings", path: "ring" },
        { image: Wnecklace, title: "Necklaces", path: "necklace" },
      ],
    },
    {
      name: "Men's Collection",
      items: [
        { image: mbreslet, title: "Bracelets", path: "breslet" },
        { image: meyrring, title: "Earrings", path: "eyrring" },
        { image: mring, title: "Rings", path: "ring" },
        { image: mnecklace, title: "Necklaces", path: "necklace" },
      ],
    },
  ];

  return (
    <Layout>
      <Metadata title="Golden Jewelry | Home" />

      {/* Hero Section */}
      <motion.section
        className="hero-section"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <div className="container pt-5" style={{ marginTop: "5.5rem" }}>
          <motion.div
            id="heroCarousel"
            className="carousel slide"
            data-bs-ride="carousel"
            initial={{ scale: 0.95 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <div className="carousel-indicators">
              <button
                type="button"
                data-bs-target="#heroCarousel"
                data-bs-slide-to="0"
                className="active"
                aria-current="true"
                aria-label="Slide 1"
              ></button>
              <button
                type="button"
                data-bs-target="#heroCarousel"
                data-bs-slide-to="1"
                aria-label="Slide 2"
              ></button>
            </div>
            <div className="carousel-inner">
              <div className="carousel-item active" data-bs-interval="5000">
                <motion.div
                  initial={{ opacity: 0, scale: 1.1 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.8 }}
                  className="carousel-image-container"
                >
                  <img
                    src={banner1}
                    className="d-block w-100"
                    alt="Luxury Jewelry"
                  />
                  <div className="carousel-caption">
                    <motion.h2
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3, duration: 0.6 }}
                    >
                      Luxury Collection
                    </motion.h2>
                    <motion.p
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5, duration: 0.6 }}
                    >
                      Discover our exclusive jewelry pieces
                    </motion.p>
                  </div>
                </motion.div>
              </div>
              <div className="carousel-item" data-bs-interval="5000">
                <motion.div
                  initial={{ opacity: 0, scale: 1.1 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.8 }}
                  className="carousel-image-container"
                >
                  <img
                    src={banner2}
                    className="d-block w-100"
                    alt="Premium Collection"
                  />
                  <div className="carousel-caption">
                    <motion.h2
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3, duration: 0.6 }}
                    >
                      Premium Selection
                    </motion.h2>
                    <motion.p
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5, duration: 0.6 }}
                    >
                      Handcrafted with excellence
                    </motion.p>
                  </div>
                </motion.div>
              </div>
            </div>
            <button
              className="carousel-control-prev"
              type="button"
              data-bs-target="#heroCarousel"
              data-bs-slide="prev"
            >
              <span className="carousel-control-prev-icon"></span>
              <span className="visually-hidden">Previous</span>
            </button>
            <button
              className="carousel-control-next"
              type="button"
              data-bs-target="#heroCarousel"
              data-bs-slide="next"
            >
              <span className="carousel-control-next-icon"></span>
              <span className="visually-hidden">Next</span>
            </button>
          </motion.div>
        </div>
      </motion.section>

      {/* Policy Features */}
      <motion.section
        className="policy-section"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        <div className="container">
          <motion.div
            className="row g-4"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{
              visible: {
                transition: {
                  staggerChildren: 0.2,
                },
              },
            }}
          >
            {policyFeatures.map((feature, index) => (
              <motion.div
                key={index}
                className="col-md-3 col-sm-6"
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: {
                      type: "spring",
                      stiffness: 100,
                    },
                  },
                }}
              >
                <div className="policy-card">
                  <div className="policy-icon">{feature.icon}</div>
                  <div className="policy-content">
                    <h3>{feature.title}</h3>
                    <p>{feature.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* Categories */}
      <motion.section
        className="categories-section"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        <div className="container">
          {categories.map((collection, index) => (
            <motion.div
              key={index}
              className="category-collection"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              viewport={{ once: true }}
            >
              <h2>{collection.name}</h2>
              <div className="row g-4">
                {collection.items.map((item, itemIndex) => (
                  <motion.div
                    key={itemIndex}
                    className="col-lg-3 col-md-6"
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    whileHover={{ y: -5, scale: 1.02 }}
                    transition={{
                      type: "spring",
                      stiffness: 200,
                      damping: 15,
                    }}
                    onClick={() => navigate(`/products/${item.path}`)}
                  >
                    <div className="category-card">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="img-fluid"
                      />
                      <h3>{item.title}</h3>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Featured Products */}
      <motion.section
        className="featured-section"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        <div className="container">
          <motion.div
            className="section-header"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            viewport={{ once: true }}
          >
            <h2>
              Featured Products
              <ArrowRightAltIcon className="section-icon" />
            </h2>
          </motion.div>

          <motion.div
            className="row g-4"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{
              visible: {
                transition: {
                  staggerChildren: 0.15,
                },
              },
            }}
          >
            {loading ? (
              <div className="col-12 text-center">
                <div className="loading-spinner"></div>
              </div>
            ) : (
              trandingProducts &&
              trandingProducts?.map((product) => (
                <motion.div
                  key={product._id}
                  className="col-lg-3 col-md-4 col-sm-6"
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: {
                      opacity: 1,
                      y: 0,
                      transition: {
                        type: "spring",
                        stiffness: 100,
                        damping: 12,
                      },
                    },
                  }}
                >
                  <ProductCard product={product} />
                </motion.div>
              ))
            )}
          </motion.div>
        </div>
      </motion.section>
    </Layout>
  );
};

export default Home;
