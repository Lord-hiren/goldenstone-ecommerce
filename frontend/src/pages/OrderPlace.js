import React, { useState } from "react";
import Metadata from "../components/Metadata";
import Stappes from "../components/Stappes";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "@mui/material";
import { createOrder } from "../actions/orderAction";
import { toast } from "react-toastify";
import Loader from "../components/Loader";
import axios from "axios";

const OrderPlace = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { shippingInfo, cartItems } = useSelector((state) => state.cart);
  const { loading, isAuthenticated, user } = useSelector((state) => state.user);

  const [isProcessing, setIsProcessing] = useState(false);

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.quantity * item.price,
    0
  );
  const ShippingCharge = subtotal >= 799 ? 0 : 70;
  const tex = subtotal * 0.03;
  const amount = Math.ceil(subtotal + ShippingCharge + tex);

  const orderData = {
    shippingInfo,
    orderItems: cartItems,
    itemsPrice: subtotal,
    texPrice: tex,
    shippingPrice: ShippingCharge,
    totalPrice: amount,
    pinCode: shippingInfo?.pinCode || "",
    phoneNo: shippingInfo?.phoneNo || "",
    user_id: user ? user._id : "",
  };

  const handelCreateOrder = async (e) => {
    e.preventDefault();
    if (!user) {
      toast.error("User information missing");
      return;
    }
    ProceedToPayment();
  };

  const ProceedToPayment = async () => {
    try {
      setIsProcessing(true);

      // Call your backend to create an order on Razorpay
      const {
        data: { order },
      } = await axios.post(`${process.env.REACT_APP_API}/api/checkout`, {
        amount,
      });

      const options = {
        key: process.env.REACT_APP_RAZORPAY_API_KEY,
        amount: amount * 100,
        currency: "INR",
        name: "Royal Crown",
        description: "Payment",
        order_id: order.id,
        handler: function (response) {
          localStorage.removeItem("cartItems");
          const paymentData = {
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_signature: response.razorpay_signature,
            order_id: order.id,
          };

          // Place order
          const orderplace = {
            ...orderData,
            paymentInfo: {
              id: response.razorpay_payment_id,
              status: "success",
            },
          };

          dispatch(createOrder(orderplace));
          toast.success("Order placed successfully");
          navigate("/");
        },
        theme: {
          color: "#832729",
        },
        modal: {
          ondismiss: function () {
            toast.error("Payment process was canceled.");
            setIsProcessing(false);
          },
        },
      };

      const razor = new window.Razorpay(options);
      razor.open();
    } catch (error) {
      toast.error("Payment failed, please try again.");
      setIsProcessing(false);
    }
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <Metadata title="Royal Crown --Payment" />
          <div className="container-fluid main-bg">
            <div className="container py-1">
              <div className="white-card my-2">
                <Stappes activeStep={2} />
                <div className="container pt-5">
                  <div className="row">
                    <div className="col-lg-4 col-md-6 col-12 mx-auto">
                      <h5 className="font-2">Proceed to Payment</h5>
                      <p>We support all payment methods</p>
                      {/* <p>We support following payment methods</p>
                      <ul>
                        <li className="list-unstyled py-2">UPI</li>
                        <li className="list-unstyled py-2">VISA CARD</li>
                        <li className="list-unstyled py-2">MASTER CARD</li>
                        <li className="list-unstyled py-2">WALLET</li>
                        <li className="list-unstyled py-2">PAY LATER</li>
                      </ul> */}
                      <Button
                        variant="contained"
                        className="gold px-5 w-100"
                        onClick={handelCreateOrder}
                        disabled={isProcessing} // Disable button while processing
                      >
                        {isProcessing ? "Processing..." : `Pay ₹${amount} /-`}
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default OrderPlace;
