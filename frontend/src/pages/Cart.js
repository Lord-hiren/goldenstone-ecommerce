import React from "react";
import Metadata from "../components/Metadata";
import CartData from "../components/CartData";
import Loader from "../components/Loader";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { removeItemsFromCart } from "../actions/cartActions";
import { Button } from "@mui/material";
import { toast } from "react-toastify";

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { cartItems } = useSelector((state) => state.cart);
  const { user, isAuthenticated, loading } = useSelector((state) => state.user);

  const shipingHandler = () => {
    if (isAuthenticated) {
      navigate("/shipping");
    } else {
      toast.error("Pleace Login to Continue Shopping");
    }
  };

  return (
    <>
      {loading === true ? (
        <>
          <Loader />
        </>
      ) : (
        <>
          <Metadata title="Royal Crown -- Cart" />
          <div className="container-fluid main-bg">
            <div className="container pt-4">
              <div className="white-card my-3">
                <h3 className="py-2 font-2 text-gold">My cart</h3>
                <div className="pt-3 overflow-y-auto">
                  {cartItems.length === 0 ? (
                    <>
                      <p>No Items in Cart</p>
                    </>
                  ) : (
                    <>
                      {cartItems.map((val, ind) => (
                        <CartData props={val} key={ind} />
                      ))}
                      <br />
                      <hr />
                      <div className="text-end fs-5 px-3">
                        {" "}
                        Totel :{" "}
                        <span className="font2 fw-bold ">
                          {` ₹ ${cartItems.reduce(
                            (acc, item) => acc + item.quantity * item.price,
                            0
                          )}`}{" "}
                        </span>{" "}
                        <br />
                        <div className="w-100 py-2">
                          <Button
                            variant="contained"
                            onClick={(e) => shipingHandler(e)}
                            className="btn-gold px-4"
                          >
                            Chekout
                          </Button>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Cart;
