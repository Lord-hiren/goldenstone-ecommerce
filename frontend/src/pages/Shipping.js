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

  // Initialize state with proper values or empty strings
  const [address, setAddress] = useState(shippingInfo.address || "");
  const [city, setCity] = useState(shippingInfo.city || "");
  const [state, setState] = useState(shippingInfo.state || "");
  const [country, setCountry] = useState("IN");
  const [pinCode, setPincode] = useState(shippingInfo.pinCode || "");
  const [phoneNo, setPhoneNo] = useState(shippingInfo.phoneNo || "");
  const [isProcessing, setIsProcessing] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (isAuthenticated === false) {
      navigate("/");
    }
  }, [isAuthenticated]);

  const orderData = {
    shippingInfo,
    orderItems: cartItems,
    itemsPrice: subtotal,
    taxPrice: tex,
    shippingPrice: ShippingCharge,
    totalPrice: amount,
    pinCode: shippingInfo?.pinCode || "",
    phoneNo: shippingInfo?.phoneNo || "",
    user_id: user?._id,
    itemsPrice: amount - tex + discount,
    discount,
  };

  // Validate form fields
  const validateForm = () => {
    const newErrors = {};

    if (!address.trim()) newErrors.address = "Address is required";
    if (!city.trim()) newErrors.city = "City is required";
    if (!state) newErrors.state = "State is required";
    if (!pinCode) newErrors.pinCode = "Pincode is required";
    if (!phoneNo) newErrors.phoneNo = "Phone number is required";

    if (phoneNo && phoneNo.length !== 10) {
      newErrors.phoneNo = "Phone number must be 10 digits";
    }

    if (pinCode && pinCode.length !== 6) {
      newErrors.pinCode = "Pincode must be 6 digits";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const ShippingSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    if (!user) {
      toast.error("User information missing");
      return;
    }

    dispatch(
      saveShippingInfo({ address, city, state, country, pinCode, phoneNo })
    );

    ProceedToPayment();
  };

  const ProceedToPayment = async () => {
    try {
      setIsProcessing(true);

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
          <Metadata title="Royal Crown --Checkout" />
          <Nav />

          <section className="checkout-section" style={{ marginTop: "7rem" }}>
            <div className="container mt-50 px-4">
              <div className="row">
                <div className="col-lg-7">
                  <form onSubmit={ShippingSubmit}>
                    <div className="mb-4 box-title d-flex flex-wrap align-items-center justify-content-between border-bottom-2  pb-1">
                      <h1 className="h4 font-weight-bold text-dark position-relative m-0 title-under-line mb-4 mb-sm-4 mb-md-4 mb-lg-0">
                        Delivery Address
                      </h1>
                    </div>
                    <div className="delivery-address">
                      <div className="form-row">
                        <div className="form-group col-md-6 col-12">
                          <input
                            type="tel"
                            className={`form-control ${
                              errors.phoneNo ? "is-invalid" : ""
                            }`}
                            placeholder="Phone"
                            value={phoneNo}
                            onChange={(e) => setPhoneNo(e.target.value)}
                            required
                            pattern="[0-9]{10}"
                          />
                          {errors.phoneNo && (
                            <div className="invalid-feedback">
                              {errors.phoneNo}
                            </div>
                          )}
                        </div>
                        <div className="form-group col-md-6 col-12">
                          <input
                            type="text"
                            className={`form-control ${
                              errors.address ? "is-invalid" : ""
                            }`}
                            value={address}
                            placeholder="House Number Or Street Number & Landmark"
                            onChange={(e) => setAddress(e.target.value)}
                            required
                          />
                          {errors.address && (
                            <div className="invalid-feedback">
                              {errors.address}
                            </div>
                          )}
                        </div>
                        <div className="form-group col-md-6 col-12">
                          <input
                            type="text"
                            className={`form-control ${
                              errors.city ? "is-invalid" : ""
                            }`}
                            value={city}
                            placeholder="City or Town"
                            onChange={(e) => setCity(e.target.value)}
                            required
                          />
                          {errors.city && (
                            <div className="invalid-feedback">
                              {errors.city}
                            </div>
                          )}
                        </div>
                        <div className="form-group col-md-6 col-12">
                          <select
                            className={`form-control ${
                              errors.state ? "is-invalid" : ""
                            }`}
                            value={state}
                            onChange={(e) => setState(e.target.value)}
                            required
                          >
                            <option value="">Select State</option>
                            {State &&
                              State.getStatesOfCountry(country).map((item) => (
                                <option key={item.isoCode} value={item.isoCode}>
                                  {item.name}
                                </option>
                              ))}
                          </select>
                          {errors.state && (
                            <div className="invalid-feedback">
                              {errors.state}
                            </div>
                          )}
                        </div>
                        <div className="form-group col-md-6 col-12">
                          <input
                            type="text"
                            className={`form-control ${
                              errors.pinCode ? "is-invalid" : ""
                            }`}
                            placeholder="Pincode"
                            value={pinCode}
                            onChange={(e) => setPincode(e.target.value)}
                            required
                            pattern="[0-9]{6}"
                          />
                          {errors.pinCode && (
                            <div className="invalid-feedback">
                              {errors.pinCode}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="delivery-option mt-3">
                      <div className="mb-4 box-title d-flex flex-wrap align-items-center justify-content-between border-bottom-2  pb-1">
                        <h1 className="h4 font-weight-bold text-dark position-relative m-0 mb-1 title-under-line">
                          Delivery Options
                        </h1>
                      </div>
                      <div className="delivery-option-list">
                        <div className="position-relative d-flex cursor-pointer align-items-center rounded-lg bg-white shadow-sm custom-checkbox px-3">
                          <label
                            className="d-flex w-100 cursor-pointer m-0 align-items-center justify-content-between py-3 pl-4 pr-4"
                            htmlFor="radio-standard"
                          >
                            <span className="d-flex align-items-center">
                              <svg
                                className="d-none d-sm-block mr-3"
                                stroke="currentColor"
                                fill="currentColor"
                                strokeWidth="0"
                                viewBox="0 0 640 512"
                                height="30"
                                width="30"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path d="M624 352h-16V243.9c0-12.7-5.1-24.9-14.1-33.9L494 110.1c-9-9-21.2-14.1-33.9-14.1H416V48c0-26.5-21.5-48-48-48H48C21.5 0 0 21.5 0 48v320c0 26.5 21.5 48 48 48h16c0 53 43 96 96 96s96-43 96-96h128c0 53 43 96 96 96s96-43 96-96h48c8.8 0 16-7.2 16-16v-32c0-8.8-7.2-16-16-16zM160 464c-26.5 0-48-21.5-48-48s21.5-48 48-48 48 21.5 48 48-21.5 48-48 48zm320 0c-26.5 0-48-21.5-48-48s21.5-48 48-48 48 21.5 48 48-21.5 48-48 48zm80-208H416V144h44.1l99.9 99.9V256z"></path>
                              </svg>
                              <span>
                                <span className="text-muted font-weight-bold">
                                  Standard
                                </span>
                                <span> Delivery with Blue Dart</span>
                              </span>
                            </span>
                            <span className="text-uppercase text-success mr-4">
                              free
                            </span>
                          </label>
                        </div>
                      </div>
                      <div className="text-right mt-4">
                        <button
                          type="submit"
                          className="btn btn-primary custom-btn-p px-4 font-weight-normal"
                          disabled={isProcessing}
                        >
                          {isProcessing ? "Processing..." : "Checkout"}
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
                <div className="col-lg-5 mt-5 mt-sm-5 mt-md-0 mt-lg-0">
                  <div className="delivery-summary">
                    <div className="mb-4 box-title d-flex flex-wrap align-items-center justify-content-between border-bottom-2  pb-1">
                      <h1 className="h4 font-weight-bold text-dark position-relative m-0 mb-1 title-under-line">
                        Order Summary
                      </h1>
                    </div>

                    <div className="rounded bg-white shadow-sm p-3">
                      <div className="order-summary-item-box overflow-x-hidden overflow-y-auto">
                        {cartItems?.map((val, ind) => (
                          <div className="row p-2" key={ind}>
                            <div className="col-3 col-sm-3 col-md-3 col-lg-3 px-2">
                              <a href="#">
                                <figure className=" rounded border">
                                  <img
                                    className="w-100"
                                    height="70"
                                    src={val.image}
                                    alt="img"
                                  />
                                </figure>
                              </a>
                            </div>
                            <div className="col-9 col-sm-9 col-md-9 col-lg-9 p-0">
                              <div className="text-truncate">
                                <a
                                  className="font-weight-bold text-default transition-all duration-300 hover:text-primary"
                                  href="#"
                                >
                                  {val.name}
                                </a>
                                <div className="mt-2 d-flex flex-row flex-wrap flex-sm-row align-items-sm-center flex-lg-column align-items-lg-start flex-xl-row align-items-xl-center">
                                  <span className="d-flex small mr-1">
                                    <b>Quantity:</b>
                                    {val.quantity}
                                  </span>
                                </div>
                                <div className="mt-2">
                                  <span className="font-weight-bold text-primary">
                                    ₹
                                    {val.price -
                                      (val.price * val.discount) / 100}
                                  </span>
                                  {val.discount !== 0 ? (
                                    <span className="small text-muted ms-1">
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
                      <div className="border-top pt-4">
                        <ul className="list-unstyled">
                          <li className="d-flex justify-content-between">
                            Items
                            <span className="text-default">{` ₹ ${subtotal}`}</span>
                          </li>
                          <li className="mt-2 d-flex justify-content-between">
                            Discount
                            <span className="text-success">
                              -{` ₹ ${discount}`}
                            </span>
                          </li>
                          <li className="mt-2 d-flex justify-content-between">
                            G.S.T. 3% (CGST + SGST)
                            <span className="text-danger">+{` ₹ ${tex}`}</span>
                          </li>
                          <li className="mt-2 d-flex justify-content-between">
                            Shipping
                            <span className="text-default">
                              ₹{ShippingCharge}
                            </span>
                          </li>
                          <hr />
                          <li className="mt-4 d-flex justify-content-between font-weight-bold text-uppercase text-default fw-bold">
                            Total to pay
                            <span>{` ₹ ${amount}/-`}</span>
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
