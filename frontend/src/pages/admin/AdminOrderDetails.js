import React, { useEffect, useState } from "react";
import AdminNav from "../../components/AdminNav"; // Ensure this path is correct
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  clearErrors,
  getOrderDetails,
  updateOrder,
} from "../../actions/orderAction";
import { toast } from "react-toastify";
import Loader from "../../components/Loader";
import OrderStapes from "../../components/OrderStapes";
import { IconButton } from "@mui/material";
import WestIcon from "@mui/icons-material/West";
import { UPDATE_ORDER_RESET } from "../../constants/orderConstants";

const AdminOrderDetails = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();

  const [activeStep, setActiveStep] = useState(0);
  const [status, setStatus] = useState("processing");

  const id = params.id;

  const { loading, error, order } = useSelector((state) => state.orderDetails);
  const { error: deleteError, isUpdated } = useSelector((state) => state.order);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }

    if (deleteError) {
      toast.error(deleteError);
      dispatch(clearErrors());
    }

    if (isUpdated) {
      toast.success("Product updated successfully");
      dispatch({ type: UPDATE_ORDER_RESET });
    }

    if (id) {
      dispatch(getOrderDetails(id));
    }
  }, [dispatch, error, deleteError, isUpdated, id]);

  useEffect(() => {
    if (order && order.orderStatus) {
      setStatus(order.orderStatus);
      const step = getStepFromStatus(order.orderStatus);
      setActiveStep(step);
    }
  }, [order]);

  const getStepFromStatus = (status) => {
    switch (status) {
      case "processing":
        return 0;
      case "packed":
        return 1;
      case "dispatched":
        return 2;
      case "delivered":
        return 3;
      default:
        return 0;
    }
  };

  const updateOrderStatus = (id, status) => {
    const myForm = new FormData();
    myForm.set("status", status);

    dispatch(updateOrder(id, myForm));
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="container">
          <div className="row">
            <AdminNav />
            <div className="col-9 py-5">
              <h3 className="py-1 m-0">Order details</h3>
              <div className="py-4">
                <IconButton
                  aria-label="back"
                  onClick={() => navigate("/v1/admin/orders")}
                >
                  <WestIcon />
                </IconButton>
              </div>
              <select
                className="form-select"
                value={status}
                onChange={(e) => {
                  setStatus(e.target.value);
                  setActiveStep(getStepFromStatus(e.target.value));
                  updateOrderStatus(id, e.target.value);
                }}
              >
                <option value="processing">Processing</option>
                <option value="packed">Packed</option>
                <option value="dispatched">Dispatched</option>
                <option value="delivered">Delivered</option>
              </select>
              <div className="row">
                <div className="col-12">
                  {order && order.orderItems && order.orderItems.length > 0 ? (
                    order.orderItems.map((val, ind) => (
                      <div key={ind}>
                        <div className="d-flex align-items-center">
                          <div>
                            <img
                              src={val.image}
                              className="cart-image"
                              alt=""
                            />
                          </div>
                          <div>
                            <p className="m-0 text-secondary">#{val.product}</p>
                            <p className="m-0">
                              {val.name} X {val.quantity}
                            </p>
                          </div>
                          <div className="ms-auto">
                            <h5 className="m-0">₹{order.itemsPrice}/-</h5>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p>No order items found</p>
                  )}
                  <div className="pt-5 overflow-auto">
                    <OrderStapes activeStep={activeStep} />
                  </div>
                  <div className="row pt-5">
                    <hr />
                    <h6 className="pb-3">Payment info</h6>
                    <p className="col-6">Payment Id</p>
                    <p className="col-6 text-end">#{order.paymentInfo?.id}</p>
                    <p className="col-6">Payment Status</p>
                    <p
                      className={
                        order.paymentInfo?.status === "pending"
                          ? "col-6 text-end text-danger"
                          : "col-6 text-end text-success"
                      }
                    >
                      {order.paymentInfo?.status}
                    </p>
                    <p className="col-6">Price</p>
                    <p className="col-6 text-end">₹{order.itemsPrice}</p>
                    <p className="col-6">Shipping Cost</p>
                    <p className="col-6 text-end">₹{order.shippingPrice}</p>
                    <p className="col-6">G.S.T 3%</p>
                    <p className="col-6 text-end">
                      ₹
                      {order.totalPrice -
                        order.itemsPrice -
                        order.shippingPrice}
                    </p>
                    <hr />
                    <p className="col-6 fw-bold">Total</p>
                    <p className="col-6 text-end fw-bold">
                      ₹{order.totalPrice}/-
                    </p>
                  </div>
                  <div className="pt-5">
                    <hr />
                    <h6 className="pb-3">Shipping Info</h6>
                    <p className="m-0">Address : </p>
                    <p>
                      {order.shippingInfo?.address} {order.shippingInfo?.city}{" "}
                      {order.shippingInfo?.state}. {order.shippingInfo?.country}
                      .{" "}
                    </p>
                    <p className="m-0">Pincode : </p>
                    <p>{order.shippingInfo?.pinCode}</p>
                    <p className="m-0">Mobile No : </p>
                    <p>{order.shippingInfo?.phoneNo}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AdminOrderDetails;
