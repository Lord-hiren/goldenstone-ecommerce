import React from "react";
import AdminNav from "../../components/AdminNav";
import Loader from "../../components/Loader";
import { useSelector } from "react-redux";

const Admin = () => {
  const { error, loading, isAuthenticated, user } = useSelector(
    (state) => state.user
  );
  return (
    <>
      {loading === true ? (
        <>
          <Loader />
        </>
      ) : (
        <>
          <div className="container">
            <div className="row">
              <AdminNav />
              <div className="col-9 py-5">
                <div className="row pt-5 px-3">
                  <div className="col-lg-3">
                    <div className="card shadow border-0 rounded-4 p-3">
                      <div className="card-body">
                        <p className="card-text text-center">Total users</p>
                        <h5 className="card-title text-center green">50</h5>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-3">
                    <div className="card shadow border-0 rounded-4 p-3">
                      <div className="card-body">
                        <p className="card-text text-center">Total products</p>
                        <h5 className="card-title text-center ">
                          <span className="green">70</span> /{" "}
                          <span className="red">14</span>
                        </h5>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-3">
                    <div className="card shadow border-0 rounded-4 p-3">
                      <div className="card-body">
                        <p className="card-text text-center">Total orders</p>
                        <h5 className="card-title text-center ">
                          <span className="green">70</span> /{" "}
                          <span className="red">14</span>
                        </h5>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-3">
                    <div className="card shadow border-0 rounded-4 p-3">
                      <div className="card-body">
                        <p className="card-text text-center">Total payments</p>
                        <h5 className="card-title text-center green">
                          ₹ 50000
                        </h5>
                      </div>
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

export default Admin;
