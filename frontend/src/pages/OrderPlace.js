import React from "react";
import Metadata from "../components/Metadata";
import Stappes from "../components/Stappes";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "@mui/material";
import { createOrder } from "../actions/orderAction";
import { toast } from "react-toastify";
import Loader from "../components/Loader";

const OrderPlace = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { shippingInfo, cartItems } = useSelector((state) => state.cart);
  const { loading, isAuthenticated, user } = useSelector((state) => state.user);

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.quantity * item.price,
    0
  );
  const ShippingCharge = subtotal >= 500 ? 0 : 100;
  const tex = subtotal * 0.18;
  const amount = subtotal + ShippingCharge + tex;

  const order = {
    shippingInfo,
    orderItems: cartItems,
    itemsPrice: subtotal,
    texPrice: tex,
    shippingPrice: ShippingCharge,
    totalPrice: amount,
    paymentInfo: {
      id: Math.ceil(Math.random() * 100000),
      status: "pending",
    },
    pinCode: shippingInfo.pinCode,
    phoneNo: shippingInfo.phoneNo,
    user_id: user._id,
  };

  const handelCreateOrder = (e) => {
    e.preventDefault();
    dispatch(createOrder(order));
    toast.success("Order placed successfully");
    navigate("/");
  };

  return (
    <>
      {loading === true ? (
        <>
          <Loader />
        </>
      ) : (
        <>
          {isAuthenticated === true ? (
            <>{navigate("/")}</>
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
                          <h5 className="font-2">Choose Payment Method</h5>
                          <Button
                            variant="contained"
                            className="gold px-5"
                            onClick={(e) => handelCreateOrder(e)}
                          >
                            <span className="pe-2"> Pay</span>₹ {amount} /-
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
      )}
    </>
  );
};

export default OrderPlace;
