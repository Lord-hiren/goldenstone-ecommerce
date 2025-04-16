import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useDispatch } from "react-redux";
import { addItemsToCart } from "../actions/cartActions";
import { toast } from "react-toastify";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import FavoriteIcon from "@mui/icons-material/Favorite";
import StarIcon from "@mui/icons-material/Star";
import StarHalfIcon from "@mui/icons-material/StarHalf";
import StarOutlineIcon from "@mui/icons-material/StarOutline";

const ProductsCard = ({ product }) => {
  const dispatch = useDispatch();

  const addToCartHandler = () => {
    dispatch(addItemsToCart(product._id, 1));
    toast.success("Item added to cart");
  };

  const getRatingStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    // Add full stars
    for (let i = 0; i < fullStars; i++) {
      stars.push(<StarIcon key={`full-${i}`} className="star-icon filled" />);
    }

    // Add half star if needed
    if (hasHalfStar) {
      stars.push(<StarHalfIcon key="half" className="star-icon half" />);
    }

    // Add empty stars
    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <StarOutlineIcon key={`empty-${i}`} className="star-icon empty" />
      );
    }

    return stars;
  };

  return (
    <motion.div
      className="product-card"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <div className="product-image-container">
        <img
          src={product.images[0]?.url}
          alt={product.name}
          className="product-image"
        />
        <div className="product-overlay">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="overlay-btn cart-btn"
            onClick={addToCartHandler}
          >
            <ShoppingCartIcon />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="overlay-btn wishlist-btn"
          >
            <FavoriteIcon />
          </motion.button>
        </div>
        {product.stock <= 0 && <div className="out-of-stock">Out of Stock</div>}
        {product.discount > 0 && (
          <div className="discount-badge">{product.discount}% OFF</div>
        )}
      </div>

      <Link to={`/product/${product._id}`} className="product-info">
        <h3 className="product-name">{product.name}</h3>
        <div className="product-rating">
          <div className="stars">{getRatingStars(product.ratings)}</div>
          <span className="rating-count">({product.numOfReviews} reviews)</span>
        </div>
        <div className="product-price">
          {product.discount > 0 && (
            <span className="original-price">${product.price.toFixed(2)}</span>
          )}
          <span className="final-price">
            ₹
            {(product.price - (product.price * product.discount) / 100).toFixed(
              2
            )}
          </span>
        </div>
      </Link>

      {product.stock > 0 && (
        <div className="stock-status">
          <div
            className="stock-bar"
            style={{
              width: `${(product.stock / product.maxStock) * 100}%`,
            }}
          ></div>
          <span className="stock-text">
            {product.stock} {product.stock === 1 ? "item" : "items"} left
          </span>
        </div>
      )}
    </motion.div>
  );
};

export default ProductsCard;
