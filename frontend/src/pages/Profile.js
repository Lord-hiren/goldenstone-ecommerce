import React, { useEffect } from "react";
import Metadata from "../components/Metadata";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Avatar, IconButton, Tooltip } from "@mui/material";
import { toast } from "react-toastify";
import { myOrders } from "../actions/orderAction";
import VisibilityRoundedIcon from "@mui/icons-material/VisibilityRounded";
import Loader from "../components/Loader";
import Nav from "../components/Nav";
import RemoveRedEyeRoundedIcon from "@mui/icons-material/RemoveRedEyeRounded";
import DownloadRoundedIcon from "@mui/icons-material/DownloadRounded";
import axios from "axios";
import { useState } from "react";
import { Table, Modal } from "react-bootstrap";
import { jsPDF } from "jspdf";
import image from "../asetes/img/logo.png";
const Profile = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { loading, isAuthenticated, user } = useSelector((state) => state.user);
  const { orders, error } = useSelector((state) => state.myOrders);

  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [currentOrder, setCurrentOrder] = useState(null);

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
    dispatch(myOrders(user._id));
  }, [dispatch, error, user]);

  const handleView = async (order) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/order/${order._id}`
      );
      if (response.data.success) {
        setCurrentOrder(response.data.order);
        setShowDetailsModal(true);
      } else {
        toast.error(response.data.message || "Failed to load order details");
      }
    } catch (error) {
      toast.error(error.message || "Failed to load order details");
    }
  };

  const DownloadInvoice = (order) => {
    const doc = new jsPDF();

    doc.addImage(image, "PNG", 80, 0, 50, 50);

    // laft add
    doc.setFontSize(12);
    doc.setTextColor(0, 0, 0);
    doc.text(user.name, 10, 50);
    doc.text(user.email, 10, 55);
    doc.text(`${order.shippingInfo.address},`, 10, 60);
    doc.text(
      `${order.shippingInfo.city}, ${order.shippingInfo.state}, ${order.shippingInfo.country},`,
      10,
      65
    );
    doc.text(`${order.shippingInfo.pinCode}.`, 10, 70);
    doc.text(`Mobile no. : ${order.shippingInfo.phoneNo}`, 10, 75);

    //right add
    doc.text(`Invoice No. : ${order._id}`, 200, 50, { align: "right" });
    doc.text(
      `Date : ${new Date(order.createdAt).toLocaleDateString()}`,
      200,
      60,
      {
        align: "right",
      }
    );
    doc.text(`Royal Crown`, 200, 70, { align: "right" });
    doc.text(
      `${order.shippingInfo.city}, ${order.shippingInfo.state}, ${order.shippingInfo.country},`,
      200,
      75,
      { align: "right" }
    );

    // lines of bill
    doc.setDrawColor(187, 93, 60); // RGB for #bb5d3c
    doc.setLineWidth(0.6);

    // aadi line
    doc.line(10, 90, 200, 90);
    doc.line(10, 100, 200, 100);

    doc.line(10, 180, 200, 180);
    doc.line(170, 190, 200, 190);
    doc.line(170, 200, 200, 200);
    doc.line(170, 210, 200, 210);
    doc.line(10, 220, 200, 220);
    doc.line(10, 230, 200, 230);

    // ubhi line
    doc.line(10, 90, 10, 230);
    doc.line(20, 90, 20, 230);
    doc.line(130, 90, 130, 180);
    doc.line(150, 90, 150, 180);
    doc.line(170, 90, 170, 230);
    doc.line(200, 90, 200, 230);

    // order data

    doc.text("No", 12, 97);
    doc.text("Item", 22, 97);
    doc.text("Qut", 132, 97);
    doc.text("Price", 152, 97);
    doc.text("Total", 172, 97);
    // Table content (starting Y position below the header lines at y = 100)
    let startY = 105;
    const rowHeight = 10;

    order.orderItems.forEach((val, ind) => {
      const y = startY + ind * rowHeight;

      doc.text(`${val.name}`, 22, y);
      doc.text(`${val.quantity}`, 132, y); // X between 130 and 150
      doc.text(`${val.price}`, 152, y); // X between 150 and 170
      doc.text(`${val.quantity * val.price}`, 172, y);
    });

    // TOTALS
    const subtotal =
      order.totalPrice + order.discount - order.taxPrice - order.shippingPrice;
    doc.text("Sub Total", 22, 187);
    doc.text(`${subtotal}`, 172, 187);
    doc.text("Discount", 22, 197);
    doc.text(`${order.discount}`, 172, 197);
    doc.text("G.S.T.", 22, 207);
    doc.text(`${order.taxPrice}`, 172, 207);
    doc.text("Shipping Charg", 22, 217);
    doc.text(`${order.shippingPrice}`, 172, 217);
    doc.setTextColor(187, 93, 60);
    doc.text("Total", 22, 227);
    doc.text(`${order.totalPrice}/-`, 172, 227);
    doc.setTextColor(0, 0, 0);

    // payment details
    doc.text(`Payment : Via Razorpay ${order.paymentInfo.id}`, 10, 240);

    doc.save(`order_${order._id}.pdf`);
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
            <>
              <Metadata title="Royal Crown --Profile" />
              <Nav />
              <div className="container-fluid main-bg pt-5 mt-5">
                <div className="container py-1 mt-5">
                  <div className="white-card my-2">
                    <div className="row">
                      <div className="col-lg-3 col-md-4 col-sm-6 col-8 m-auto">
                        <div className="m-auto">
                          <Avatar
                            alt={user && user.name}
                            src={user && user.avatar.url}
                            sx={{ width: 80, height: 80 }}
                            className="img-fluid  m-auto border"
                          />
                        </div>
                      </div>
                      <div className="col-lg-9 col-md-8 col-sm-12 col-12">
                        <div>
                          <h5 className="font-2 pt-4 text-center text-md-start">
                            {user && user.name}
                          </h5>
                          <h5 className="text-secondary font-2 text-center text-md-start">
                            {user && user.email}
                          </h5>
                        </div>
                      </div>
                    </div>
                    <hr />
                    <div className="row">
                      <div className="col-11 mx-auto">
                        <h5>Your orders</h5>
                        {orders ? (
                          <>
                            <div className="overflow-auto">
                              <table
                                className="table table-responsive table-striped table-bordered table-hover"
                                responsive
                                striped
                                bordered
                                hover
                              >
                                <thead>
                                  <tr>
                                    <th>Order ID</th>
                                    <th>Items</th>
                                    <th>Total</th>
                                    <th>Status</th>
                                    <th>Date</th>
                                    <th>Actions</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {orders.map((order) => (
                                    <tr key={order._id}>
                                      <td>{order._id}</td>
                                      <td>
                                        {order.orderItems?.length || 0} items
                                      </td>
                                      <td>${order.totalPrice?.toFixed(2)}</td>
                                      <td>{order.orderStatus}</td>
                                      <td>
                                        {new Date(
                                          order.createdAt
                                        ).toLocaleDateString()}
                                      </td>
                                      <td>
                                        <Tooltip title="View Details">
                                          <IconButton
                                            onClick={() => handleView(order)}
                                          >
                                            <RemoveRedEyeRoundedIcon />
                                          </IconButton>
                                        </Tooltip>
                                        <Tooltip title="Download Invoice">
                                          <IconButton
                                            onClick={() =>
                                              DownloadInvoice(order)
                                            }
                                          >
                                            <DownloadRoundedIcon />
                                          </IconButton>
                                        </Tooltip>
                                        {/* <button
                                          variant="outline-info"
                                          size="sm"
                                          className="me-2"
                                          onClick={() => handleView(order)}
                                        >
                                          <FaEye />
                                        </button> */}
                                        {/* <Button
                  variant="outline-danger"
                  size="sm"
                  onClick={() => handleDelete(order._id)}
                >
                  <FaTrash />
                </Button> */}
                                      </td>
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                            </div>
                          </>
                        ) : (
                          <>
                            <p>No Orders Found</p>
                          </>
                        )}
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
      <Modal
        show={showDetailsModal}
        onHide={() => setShowDetailsModal(false)}
        size="lg"
      >
        <Modal.Header closeButton>
          <Modal.Title>Order Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {currentOrder && (
            <div>
              <div className="mb-4">
                <h5>Customer Information</h5>
                {/* <p className="mb-1">
                  <strong>Name:</strong> {currentOrder.user?.name}
                </p>
                <p className="mb-1">
                  <strong>Email:</strong> {currentOrder.user?.email}
                </p> */}
                <p className="mb-1">
                  <strong>Phone:</strong> {currentOrder.shippingInfo?.phoneNo}
                </p>
              </div>

              <div className="mb-4">
                <h5>Shipping Address</h5>
                <p className="mb-1">
                  {currentOrder.shippingInfo?.address}
                  <br />
                  {currentOrder.shippingInfo?.city},{" "}
                  {currentOrder.shippingInfo?.state}{" "}
                  {currentOrder.shippingInfo?.pinCode}
                  <br />
                  {currentOrder.shippingInfo?.country}
                </p>
              </div>

              <div className="mb-4">
                <h5>Order Items</h5>
                <Table responsive striped>
                  <thead>
                    <tr>
                      <th>Product</th>
                      <th>Price</th>
                      <th>Quantity</th>
                      <th>Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentOrder.orderItems?.map((item) => (
                      <tr key={item._id}>
                        <td>
                          <div className="d-flex align-items-center">
                            {item.image && (
                              <img
                                src={item.image}
                                alt={item.name}
                                style={{
                                  width: "50px",
                                  height: "50px",
                                  objectFit: "cover",
                                  marginRight: "10px",
                                }}
                              />
                            )}
                            {item.name}
                          </div>
                        </td>
                        <td>₹{item.price?.toFixed(2)}</td>
                        <td>{item.quantity}</td>
                        <td>₹{(item.price * item.quantity).toFixed(2)}</td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot>
                    <tr>
                      <td colSpan="3" className="text-end">
                        <strong>Subtotal:</strong>
                      </td>
                      <td>₹{currentOrder.itemsPrice.toFixed(2)}</td>
                    </tr>
                    <tr>
                      <td colSpan="3" className="text-end">
                        <strong>G.S.T.:</strong>
                      </td>
                      <td>+ ₹{currentOrder.taxPrice?.toFixed(2)}</td>
                    </tr>
                    <tr>
                      <td colSpan="3" className="text-end">
                        <strong>Discount:</strong>
                      </td>
                      <td>- ₹{currentOrder.discount?.toFixed(2)}</td>
                    </tr>
                    <tr>
                      <td colSpan="3" className="text-end">
                        <strong>Shipping:</strong>
                      </td>
                      <td>₹{currentOrder.shippingPrice?.toFixed(2)}</td>
                    </tr>
                    <tr>
                      <td colSpan="3" className="text-end">
                        <strong>Total:</strong>
                      </td>
                      <td>
                        <strong>
                          ₹{currentOrder.totalPrice?.toFixed(2)}/-
                        </strong>
                      </td>
                    </tr>
                  </tfoot>
                </Table>
              </div>
            </div>
          )}
        </Modal.Body>
      </Modal>
    </>
  );
};

export default Profile;
