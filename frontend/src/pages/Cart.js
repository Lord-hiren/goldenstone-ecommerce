import React from "react";
import Metadata from "../components/Metadata";
import CartData from "../components/CartData";
import Loader from "../components/Loader";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { removeItemsFromCart } from "../actions/cartActions";
import { Button } from "@mui/material";
import { toast } from "react-toastify";
import Nav from "../components/Nav";

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
          <Nav />
          <div
            className="container-fluid main-bg"
            style={{ marginTop: "5rem" }}
          >
            <div className="container pt-4">
              <div className="white-card my-3">
                <h3 className="py-2 font-2 text-primary">My cart</h3>
                <div className="pt-3 overflow-y-auto">
                  {cartItems.length === 0 ? (
                    <>
                      <p className="text-center">No Items in Cart</p>
                    </>
                  ) : (
                    <>
                      <section class="cart-section">
                        <div class="container mt-50 px-4">
                          <div class="mb-6 row">
                            <div class="col-12 col-lg-7 mb-4 mb-lg-0">
                              <div class="mb-4 row d-none d-sm-none d-md-none d-lg-block">
                                <div class="col-lg-12">
                                  <div class="row">
                                    <div class="col-lg-4">
                                      <b>Product</b>
                                    </div>
                                    <div class="col-lg-2">
                                      <b>Price</b>
                                    </div>
                                    <div class="col-lg-3">
                                      <b>Quantity</b>
                                    </div>
                                    <div class="col-lg-3">
                                      <b>Total</b>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div class="products mt-3">
                                {cartItems.map((val, ind) => (
                                  <CartData props={val} key={ind} />
                                ))}

                                {/* <!-- Product 1 --> */}
                              </div>
                            </div>
                            <div class="col-12 col-lg-5  pl-lg-4">
                              <div class="delivery-summary">
                                <div class="mb-4 box-title d-flex flex-wrap align-items-center justify-content-between border-bottom-2 pb-1">
                                  <h1 class="h4 font-weight-bold text-dark position-relative m-0 mb-1 title-under-line">
                                    Order Total
                                  </h1>
                                </div>
                                {/* <form class="d-flex">
                  <div class="position-relative w-100">
                    <input
                      type="text"
                      id="code"
                      class="form-control rounded-0"
                      placeholder="Promo code"
                      autocomplete="off"
                    />
                  </div>
                  <button
                    class="btn apply-coupon text-white rounded-0"
                    type="submit"
                  >
                    Apply
                  </button>
                </form> */}
                                <div class="mt-4 bg-white ">
                                  <ul class="list-unstyled px-3 pt-3">
                                    {/* <li class="d-flex justify-content-between">
                      Items <span class="text-dark">$690.00</span>
                    </li> */}
                                    {/* <li class="d-flex justify-content-between">
                      Discount <span class="text-danger">-$330.00</span>
                    </li>
                    <li class="d-flex justify-content-between">
                      Shipping <span class="text-dark">$8.00</span>
                    </li> */}
                                    <li class="d-flex justify-content-between font-weight-bold text-uppercase text-dark">
                                      Total
                                      <span>
                                        {` ₹ ${cartItems.reduce(
                                          (acc, item) =>
                                            acc +
                                            item.quantity *
                                              (item.price -
                                                (item.price * item.discount) /
                                                  100),
                                          0
                                        )}`}
                                      </span>
                                    </li>
                                  </ul>
                                  <a
                                    class="btn btn-primary mt-2 w-100 text-center font-weight-bold custom-btn-p"
                                    onClick={(e) => shipingHandler(e)}
                                  >
                                    Checkout
                                  </a>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </section>
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
