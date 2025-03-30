import React, { useEffect, useState } from "react";
import Metadata from "../components/Metadata";
import Stappes from "../components/Stappes";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { saveShippingInfo } from "../actions/cartActions";
import { Country, State } from "country-state-city";
import { Button } from "@mui/material";
import Loader from "../components/Loader";
import Nav from "../components/Nav";
import axios from "axios";
import { createOrder } from "../actions/orderAction";

const Shipping = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { shippingInfo, cartItems } = useSelector((state) => state.cart);
  const { loading, isAuthenticated, user } = useSelector((state) => state.user);

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.quantity * item.price,
    0
  );
  const discount = cartItems.reduce(
    (acc, item) => acc + item.quantity * ((item.price * item.discount) / 100),
    0
  );
  const tex = (subtotal * process.env.REACT_APP_GST_RATE) / 100;
  const ShippingCharge = subtotal >= 799 ? 0 : 70;
  const amount = Math.ceil(subtotal + ShippingCharge + tex - discount);

  // const address = `${shippingInfo.address},${shippingInfo.city},${shippingInfo.state},${shippingInfo.country},${shippingInfo.pinCode}`;

  const [address, setAddress] = useState(shippingInfo.address);
  const [city, setCity] = useState(shippingInfo.city);
  const [state, setState] = useState(shippingInfo.state);
  const [country, setcountry] = useState("IN");
  const [pinCode, setPincode] = useState(shippingInfo.pinCode);
  const [phoneNo, setPhoneNo] = useState(shippingInfo.phoneNo);
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    if (isAuthenticated === false) {
      navigate("/");
    }
  }, [isAuthenticated]);

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

  const ShippingSubmit = (e) => {
    e.preventDefault();

    if (phoneNo.length !== 10) {
      toast.error("Phone number should be 10 digits");
      return;
    }
    dispatch(
      saveShippingInfo({ address, city, state, country, pinCode, phoneNo })
    );

    if (!user) {
      toast.error("User information missing");
      return;
    }
    ProceedToPayment();

    // navigate("/order/confirm");
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
      {loading === true ? (
        <>
          <Loader />
        </>
      ) : (
        <>
          <Metadata title="Royal Crown --Chackout" />
          <Nav />
          {/* <div className="container-fluid main-bg">
            <div className="container py-1">
              <div className="white-card my-2">
                <Stappes activeStep={0} />

                <div className="container">
                  <div className="row">
                    <div className="col-lg-4 mx-auto">
                      <form
                        onSubmit={ShippingSubmit}
                        autoComplete="off"
                        encType="multipart/form-data"
                      >
                        <div className="py-5">
                          <h5 className="text-center">Shipping info</h5>
                          <input
                            type="text"
                            className="shipinput"
                            placeholder="Address"
                            value={address}
                            name="address"
                            onChange={(e) => setAddress(e.target.value)}
                          />

                          <input
                            type="text"
                            className="shipinput"
                            placeholder="City"
                            value={city}
                            name="city"
                            onChange={(e) => setCity(e.target.value)}
                          />

                          <input
                            type="number"
                            className="shipinput"
                            placeholder="Number"
                            value={phoneNo}
                            name="phoneno"
                            onChange={(e) => setPhoneNo(e.target.value)}
                          />

                          <input
                            type="number"
                            className="shipinput"
                            placeholder="Pincode"
                            value={pinCode}
                            name="pincode"
                            onChange={(e) => setPincode(e.target.value)}
                          />

                          {country && (
                            <select
                              className="shipinput "
                              value={state}
                              onChange={(e) => setState(e.target.value)}
                            >
                              <option>State</option>
                              {State &&
                                State.getStatesOfCountry(country).map(
                                  (item) => (
                                    <option
                                      key={item.isoCode}
                                      value={item.isoCode}
                                    >
                                      {item.name}
                                    </option>
                                  )
                                )}
                            </select>
                          )}

                          <Button
                            type="submit"
                            variant="contained"
                            className="w-100 gold font-2"
                          >
                            Submit
                          </Button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div> */}

          <section class="checkout-section" style={{ marginTop: "7rem" }}>
            <div class="container mt-50 px-4">
              <div class="row">
                <div class="col-lg-7">
                  <form onSubmit={ShippingSubmit}>
                    <div class="mb-4 box-title d-flex flex-wrap align-items-center justify-content-between border-bottom-2  pb-1">
                      <h1 class="h4 font-weight-bold text-dark position-relative m-0 title-under-line mb-4 mb-sm-4 mb-md-4 mb-lg-0">
                        Delivery Address
                      </h1>
                      {/* <button
                        class="btn  position-relative d-flex align-items-center"
                        data-toggle="modal"
                        data-target="#saveAddressModal"
                        type="button"
                      >
                        <svg
                          class="mr-1"
                          height="16"
                          width="16"
                          stroke="currentColor"
                          fill="currentColor"
                          stroke-width="0"
                          baseProfile="tiny"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M22.262 10.468c-3.39-2.854-9.546-8.171-9.607-8.225l-.655-.563-.652.563c-.062.053-6.221 5.368-9.66 8.248-.438.394-.688.945-.688 1.509 0 1.104.896 2 2 2h1v6c0 1.104.896 2 2 2h12c1.104 0 2-.896 2-2v-6h1c1.104 0 2-.896 2-2 0-.598-.275-1.161-.738-1.532zm-8.262 9.532h-4v-5h4v5zm4-8l.002 8h-3.002v-6h-6v6h-3v-8h-3.001c2.765-2.312 7.315-6.227 9.001-7.68 1.686 1.453 6.234 5.367 9 7.681l-3-.001z"></path>
                        </svg>
                        Saved addresses
                      </button> */}
                    </div>
                    <div class="delivery-address">
                      <div class="form-row">
                        <div class="form-group col-md-6 col-12">
                          <input
                            type="text"
                            class="form-control"
                            placeholder="Phone"
                            value={phoneNo}
                            onChange={(e) => setPhoneNo(e.target.value)}
                          />
                        </div>
                        <div class="form-group col-md-6 col-12">
                          <input
                            type="text"
                            class="form-control"
                            value={address}
                            placeholder="House Number Or Street Number & Landmark"
                            onChange={(e) => setAddress(e.target.value)}
                          />
                        </div>
                        {/* <div class="form-group col-md-12">
                          <select
                            className="form-control"
                            value={country}
                            onChange={(e) => setcountry(e.target.value)}
                          >
                            <option>Country</option>
                            {Country &&
                              Country.getAllCountries().map((item) => (
                                <option key={item.isoCode} value={item.isoCode}>
                                  {item.name}
                                </option>
                              ))}
                          </select>
                        </div> */}
                        <div class="form-group col-md-6 col-12">
                          <input
                            type="text"
                            class="form-control"
                            value={city}
                            placeholder="City or Town"
                            onChange={(e) => setCity(e.target.value)}
                          />
                        </div>
                        <div class="form-group col-md-6 col-12">
                          <select
                            className="form-control"
                            value={state}
                            onChange={(e) => setState(e.target.value)}
                          >
                            <option>State</option>
                            {State &&
                              State.getStatesOfCountry(country).map((item) => (
                                <option key={item.isoCode} value={item.isoCode}>
                                  {item.name}
                                </option>
                              ))}
                          </select>
                        </div>
                        <div class="form-group col-md-6 col-12">
                          <input
                            type="text"
                            class="form-control"
                            placeholder="Pincode"
                            value={pinCode}
                            onChange={(e) => setPincode(e.target.value)}
                          />
                        </div>
                      </div>
                    </div>
                    <div class="delivery-option mt-3">
                      <div class="mb-4 box-title d-flex flex-wrap align-items-center justify-content-between border-bottom-2  pb-1">
                        <h1 class="h4 font-weight-bold text-dark position-relative m-0 mb-1 title-under-line">
                          Delivery Options
                        </h1>
                      </div>
                      <div class="delivery-option-list">
                        <div class="position-relative d-flex cursor-pointer align-items-center rounded-lg bg-white shadow-sm custom-checkbox px-3">
                          <label
                            class="d-flex w-100 cursor-pointer m-0 align-items-center justify-content-between py-3 pl-4 pr-4"
                            for="radio-standard"
                          >
                            <span class="d-flex align-items-center">
                              <svg
                                class="d-none d-sm-block mr-3"
                                stroke="currentColor"
                                fill="currentColor"
                                stroke-width="0"
                                viewBox="0 0 640 512"
                                height="30"
                                width="30"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path d="M624 352h-16V243.9c0-12.7-5.1-24.9-14.1-33.9L494 110.1c-9-9-21.2-14.1-33.9-14.1H416V48c0-26.5-21.5-48-48-48H48C21.5 0 0 21.5 0 48v320c0 26.5 21.5 48 48 48h16c0 53 43 96 96 96s96-43 96-96h128c0 53 43 96 96 96s96-43 96-96h48c8.8 0 16-7.2 16-16v-32c0-8.8-7.2-16-16-16zM160 464c-26.5 0-48-21.5-48-48s21.5-48 48-48 48 21.5 48 48-21.5 48-48 48zm320 0c-26.5 0-48-21.5-48-48s21.5-48 48-48 48 21.5 48 48-21.5 48-48 48zm80-208H416V144h44.1l99.9 99.9V256z"></path>
                              </svg>
                              <span>
                                <span class="text-muted font-weight-bold">
                                  Standard
                                </span>
                                <span> Delivery with Blue Dart</span>
                              </span>
                            </span>
                            <span class="text-uppercase text-success mr-4">
                              free
                            </span>
                          </label>
                          {/* <input
                            class="position-absolute top-0"
                            type="radio"
                            id="radio-standard"
                            name="delivery-option"
                          /> */}
                        </div>

                        {/* <div class="position-relative mt-4 d-flex cursor-pointer align-items-center rounded-lg bg-white shadow-sm custom-checkbox">
                          <label
                            class="d-flex w-100 cursor-pointer  m-0 align-items-center justify-content-between py-3 pl-4 pr-4"
                            for="radio-express"
                          >
                            <span class="d-flex align-items-center">
                              <svg
                                class="d-none d-sm-block mr-3"
                                stroke="currentColor"
                                fill="currentColor"
                                stroke-width="0"
                                viewBox="0 0 640 512"
                                height="30"
                                width="30"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path d="M112 0C85.5 0 64 21.5 64 48V96H16c-8.8 0-16 7.2-16 16s7.2 16 16 16H64 272c8.8 0 16 7.2 16 16s-7.2 16-16 16H64 48c-8.8 0-16 7.2-16 16s7.2 16 16 16H64 240c8.8 0 16 7.2 16 16s-7.2 16-16 16H64 16c-8.8 0-16 7.2-16 16s7.2 16 16 16H64 208c8.8 0 16 7.2 16 16s-7.2 16-16 16H64V416c0 53 43 96 96 96s96-43 96-96H384c0 53 43 96 96 96s96-43 96-96h32c17.7 0 32-14.3 32-32s-14.3-32-32-32V288 256 237.3c0-17-6.7-33.3-18.7-45.3L512 114.7c-12-12-28.3-18.7-45.3-18.7H416V48c0-26.5-21.5-48-48-48H112zM544 237.3V256H416V160h50.7L544 237.3zM160 368a48 48 0 1 1 0 96 48 48 0 1 1 0-96zm272 48a48 48 0 1 1 96 0 48 48 0 1 1 -96 0z"></path>
                              </svg>
                              <span>
                                <span class="text-muted font-weight-bold">
                                  Express
                                </span>
                                <span>Estimated delivery: Friday, 10/12</span>
                              </span>
                            </span>
                            <span class="text-muted mr-4">$5.00</span>
                          </label>
                          <input
                            class="position-absolute"
                            type="radio"
                            id="radio-express"
                            name="delivery-option"
                            style={{ right: "1rem;" }}
                          />
                        </div> */}
                      </div>
                      <div class="text-right mt-4">
                        <button
                          type="submit"
                          class="btn btn-primary custom-btn-p px-4 font-weight-normal"
                          disabled={isProcessing}
                        >
                          Checkout
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
                <div class="col-lg-5 mt-5 mt-sm-5 mt-md-0 mt-lg-0">
                  <div class="delivery-summary">
                    <div class="mb-4 box-title d-flex flex-wrap align-items-center justify-content-between border-bottom-2  pb-1">
                      <h1 class="h4 font-weight-bold text-dark position-relative m-0 mb-1 title-under-line">
                        Order Summary
                      </h1>
                    </div>

                    <div class="rounded bg-white shadow-sm p-3">
                      <div class="order-summary-item-box overflow-x-hidden overflow-y-auto">
                        {cartItems?.map((val, ind) => (
                          <div class="row p-2">
                            <div class="col-3 col-sm-3 col-md-3 col-lg-3 px-2">
                              <a href="#">
                                <figure class=" rounded border">
                                  <img
                                    class="w-100"
                                    height="70"
                                    src={val.image}
                                    alt="img"
                                  />
                                </figure>
                              </a>
                            </div>
                            <div class="col-9 col-sm-9 col-md-9 col-lg-9 p-0">
                              <div class="text-truncate">
                                <a
                                  class="font-weight-bold text-default transition-all duration-300 hover:text-primary"
                                  href="#"
                                >
                                  {val.name}
                                </a>
                                <div class="mt-2 d-flex flex-row flex-wrap flex-sm-row align-items-sm-center flex-lg-column align-items-lg-start flex-xl-row align-items-xl-center">
                                  {/* <span class="d-flex small mr-1">
                                    <b>Size:</b>
                                    XL
                                  </span>
                                  <svg
                                    class="d-none d-sm-block d-lg-none d-xl-block"
                                    stroke="currentColor"
                                    fill="currentColor"
                                    stroke-width="0"
                                    viewBox="0 0 24 24"
                                    height="10"
                                    width="10"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <path d="M12 18a6 6 0 1 0 0-12 6 6 0 0 0 0 12Z"></path>
                                  </svg>
                                  <span class="d-flex small mr-2">
                                    <b>Color:</b>
                                    <span class="ml-1 color-box"></span>
                                  </span>
                                  <svg
                                    class="d-none d-sm-block d-lg-none d-xl-block"
                                    stroke="currentColor"
                                    fill="currentColor"
                                    stroke-width="0"
                                    viewBox="0 0 24 24"
                                    height="10"
                                    width="10"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <path d="M12 18a6 6 0 1 0 0-12 6 6 0 0 0 0 12Z"></path>
                                  </svg> */}
                                  <span class="d-flex small mr-1">
                                    <b>Quantity:</b>
                                    {val.quantity}
                                  </span>
                                </div>
                                <div class="mt-2">
                                  <span class="font-weight-bold text-primary">
                                    ₹
                                    {val.price -
                                      (val.price * val.discount) / 100}
                                  </span>
                                  {val.discount !== 0 ? (
                                    <span class="small text-muted ms-1">
                                      <s>₹{val.price}</s>
                                    </span>
                                  ) : (
                                    <></>
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                      <div class="border-top pt-4">
                        <ul class="list-unstyled">
                          <li class="d-flex justify-content-between">
                            Items
                            <span class="text-default">{` ₹ ${subtotal}`}</span>
                          </li>
                          <li class="mt-2 d-flex justify-content-between">
                            Discount
                            <span class="text-success">
                              -{` ₹ ${discount}`}
                            </span>
                          </li>
                          <li class="mt-2 d-flex justify-content-between">
                            G.S.T. 3% (CGST + SGST)
                            <span class="text-danger">+{` ₹ ${tex}`}</span>
                          </li>
                          <li class="mt-2 d-flex justify-content-between">
                            Shipping
                            <span class="text-default">₹{ShippingCharge}</span>
                          </li>
                          <li class="mt-4 d-flex justify-content-between font-weight-bold text-uppercase text-default">
                            Total to pay
                            <span>{` ₹ ${amount}`}</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </>
      )}
    </>
  );
};

export default Shipping;
