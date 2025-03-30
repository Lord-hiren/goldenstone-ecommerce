import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import InventoryIcon from "@mui/icons-material/Inventory";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PersonIcon from "@mui/icons-material/Person";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";

const OrderDetails = () => {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrderDetails();
  }, [id]);

  const fetchOrderDetails = async () => {
    try {
      const response = await fetch(`/api/v1/order/${id}`);
      const data = await response.json();
      if (data.success) {
        setOrder(data.order);
      }
    } catch (error) {
      console.error("Error fetching order details:", error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusStep = (status) => {
    switch (status) {
      case "Processing":
        return 1;
      case "Shipped":
        return 2;
      case "Delivered":
        return 3;
      default:
        return 0;
    }
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="error-container">
        <h2>Order not found</h2>
        <Link to="/orders" className="btn btn-primary">
          Back to Orders
        </Link>
      </div>
    );
  }

  return (
    <div className="order-details-page">
      <div className="container py-5">
        {/* Order Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="order-header"
        >
          <h1>Order #{order._id}</h1>
          <p className="order-date">
            Placed on {new Date(order.createdAt).toLocaleDateString()}
          </p>
        </motion.div>

        {/* Order Status */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="order-status-tracker"
        >
          <div className="status-line">
            <div
              className="status-progress"
              style={{
                width: `${(getStatusStep(order.orderStatus) / 3) * 100}%`,
              }}
            ></div>
          </div>
          <div className="status-points">
            <div
              className={`status-point ${
                getStatusStep(order.orderStatus) >= 1 ? "active" : ""
              }`}
            >
              <div className="status-icon">
                <InventoryIcon />
              </div>
              <p>Processing</p>
            </div>
            <div
              className={`status-point ${
                getStatusStep(order.orderStatus) >= 2 ? "active" : ""
              }`}
            >
              <div className="status-icon">
                <LocalShippingIcon />
              </div>
              <p>Shipped</p>
            </div>
            <div
              className={`status-point ${
                getStatusStep(order.orderStatus) >= 3 ? "active" : ""
              }`}
            >
              <div className="status-icon">
                <CheckCircleIcon />
              </div>
              <p>Delivered</p>
            </div>
          </div>
        </motion.div>

        <div className="row mt-5">
          {/* Order Items */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="col-lg-8"
          >
            <div className="order-items card">
              <div className="card-header">
                <h3>Order Items</h3>
              </div>
              <div className="card-body">
                {order.orderItems.map((item) => (
                  <div key={item._id} className="order-item">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="item-image"
                    />
                    <div className="item-details">
                      <h4>{item.name}</h4>
                      <p className="item-price">
                        ${item.price} x {item.quantity}
                      </p>
                    </div>
                    <div className="item-total">
                      ${(item.price * item.quantity).toFixed(2)}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Order Summary */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 }}
            className="col-lg-4"
          >
            <div className="order-summary card">
              <div className="card-header">
                <h3>Order Summary</h3>
              </div>
              <div className="card-body">
                <div className="summary-item">
                  <span>Subtotal</span>
                  <span>${order.itemsPrice?.toFixed(2)}</span>
                </div>
                <div className="summary-item">
                  <span>Shipping</span>
                  <span>${order.shippingPrice?.toFixed(2)}</span>
                </div>
                <div className="summary-item">
                  <span>Tax</span>
                  <span>${order.taxPrice?.toFixed(2)}</span>
                </div>
                <div className="summary-item total">
                  <span>Total</span>
                  <span>${order.totalPrice?.toFixed(2)}</span>
                </div>
              </div>
            </div>

            {/* Shipping Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="shipping-info card mt-4"
            >
              <div className="card-header">
                <h3>Shipping Information</h3>
              </div>
              <div className="card-body">
                <div className="info-item">
                  <PersonIcon />
                  <span>{order.user.name}</span>
                </div>
                <div className="info-item">
                  <PhoneIcon />
                  <span>{order.shippingInfo.phoneNo}</span>
                </div>
                <div className="info-item">
                  <EmailIcon />
                  <span>{order.user.email}</span>
                </div>
                <div className="info-item">
                  <LocationOnIcon />
                  <span>
                    {order.shippingInfo.address}, {order.shippingInfo.city},{" "}
                    {order.shippingInfo.state} {order.shippingInfo.pinCode},{" "}
                    {order.shippingInfo.country}
                  </span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
