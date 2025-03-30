import React, { useEffect } from "react";
import Metadata from "../components/Metadata";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Avatar } from "@mui/material";
import { toast } from "react-toastify";
import { myOrders } from "../actions/orderAction";
import VisibilityRoundedIcon from "@mui/icons-material/VisibilityRounded";
import Loader from "../components/Loader";
import Nav from "../components/Nav";

const Profile = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { loading, isAuthenticated, user } = useSelector((state) => state.user);
  const { orders, error } = useSelector((state) => state.myOrders);

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
    if (user !== undefined) {
      dispatch(myOrders(user._id));
    }
  }, [dispatch, error, user]);
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
                              <table className="table">
                                <thead>
                                  <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">Order_id</th>
                                    <th scope="col">Price</th>
                                    <th scope="col">Order Status</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {orders &&
                                    orders.map((val, ind) => (
                                      <>
                                        <tr key={ind} scope="row">
                                          <th>{ind + 1}</th>
                                          <td>{val._id}</td>
                                          <td>{val.totalPrice}</td>
                                          <td
                                            className={
                                              val.orderStatus === "delivered"
                                                ? "text-success text-uppercase"
                                                : "text-uppercase"
                                            }
                                          >
                                            {val.orderStatus}
                                          </td>
                                        </tr>
                                      </>
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
    </>
  );
};

export default Profile;
