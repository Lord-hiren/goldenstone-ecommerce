import React from "react";
import Metadata from "../components/Metadata";
import Stappes from "../components/Stappes";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Loader from "../components/Loader";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const OrderConfirm = () => {
  const navigate = useNavigate();

  const { shippingInfo, cartItems } = useSelector((state) => state.cart);
  const { loading, isAuthenticated, user } = useSelector((state) => state.user);

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.quantity * item.price,
    0
  );
  const ShippingCharge = subtotal >= 799 ? 0 : 70;
  const tex = subtotal * 0.03;
  const amount = Math.ceil(subtotal + ShippingCharge + tex);

  const address = `${shippingInfo.address},${shippingInfo.city},${shippingInfo.state},${shippingInfo.country},${shippingInfo.pinCode}`;

  // rzp payment

  const Proceedtopayment = async (data, order, order_id) => {
    try {
      const options = {
        key: process.env.RAZORPAY_API_KEY,
        amount: data.order_total_amount,
        currency: "INR",
        name: "Royalcroun",
        description: "Payment",
        image: "",
        order_id: order.id,
        handler: function (response) {
          const sendData = {
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_signature: response.razorpay_signature,
            order_id: order_id,
          };
          console.log(response);
        },
        theme: {
          color: "#832729",
        },
      };

      const razor = new window.Razorpay(options);
      razor.open();
    } catch (error) {}
  };
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          {isAuthenticated ? (
            <>
              <Metadata title="Royal Crown --Order confirm" />
              <div className="container-fluid main-bg">
                <div className="container py-1">
                  <div className="white-card my-2">
                    <Stappes activeStep={1} />
                    <div className="container">
                      <div className="row py-5 g-3">
                        <div className="col-lg-8 text-center text-md-start">
                          <h3 className="mb-4">Shipping info</h3>
                          <p className="p-2 m-0">
                            Name : <span className="text-end">{user.name}</span>
                          </p>
                          <p className="p-2 m-0">
                            Phone:{" "}
                            <span className="text-end">
                              {shippingInfo.phoneNo}
                            </span>
                          </p>
                          <p className="p-2 m-0">
                            Address :{" "}
                            <span className="text-end">{address}</span>
                          </p>

                          <h3 className="py-5">Your cart itams</h3>
                          <div className="row px-4">
                            {cartItems &&
                              cartItems.map((val, ind) => (
                                <>
                                  <Accordion className="bg-light" key={ind}>
                                    <AccordionSummary
                                      expandIcon={<ExpandMoreIcon />}
                                      aria-controls="panel1-content"
                                      id="panel1-header"
                                    >
                                      <img
                                        src={val.image}
                                        className="cart-image mx-1 mx-lg-4"
                                        alt=""
                                      />
                                      {val.name}
                                      <span className=" px-2 px-lg-4">
                                        {val.price}
                                      </span>
                                      <span className="ms-auto"></span>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                      <table className="table w-50">
                                        <tr>
                                          <td>Name : {val.name}</td>
                                          <td>Price : ₹{val.price}</td>
                                          <td>Quantity : {val.quantity}</td>
                                        </tr>
                                      </table>
                                      <div>
                                        <table className="table w-50">
                                          <tr>
                                            <th>Quantity</th>
                                            <th>Price</th>
                                            <th>Totel price</th>
                                          </tr>
                                          <tr>
                                            <td>{val.quantity}</td>
                                            <td>₹{val.price}</td>
                                            <td className="fw-bold">
                                              ₹ {val.quantity * val.price}
                                            </td>
                                          </tr>
                                        </table>
                                      </div>
                                    </AccordionDetails>
                                  </Accordion>
                                </>
                              ))}
                          </div>
                        </div>
                        <div className="col-lg-4">
                          <h3>Order summary</h3>
                          <hr />
                          <div className="row">
                            <div className="col-6 p-2">Sub total :</div>
                            <div className="col-6 p-2 text-end">
                              ₹ {subtotal}
                            </div>
                            <div className="col-6 p-2">Shipping charge :</div>
                            <div className="col-6 p-2 text-end">
                              ₹ {ShippingCharge}
                            </div>
                            <div className="col-6 p-2">G.S.T 3% :</div>
                            <div className="col-6 p-2 text-end">₹ {tex}</div>
                            <hr />
                            <div className="col-6 p-2 fw-bold">Total :</div>
                            <div className="col-6 p-2 text-end">₹ {amount}</div>
                            <hr />
                          </div>

                          <Button
                            variant="contained"
                            className="font-2 gold px-4"
                            onClick={() => navigate("/payment")}
                          >
                            Checkout
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <>{navigate("/")}</>
          )}
        </>
      )}
    </>
  );
};

export default OrderConfirm;
