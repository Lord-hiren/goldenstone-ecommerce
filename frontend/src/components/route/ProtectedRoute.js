import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import Loader from "../Loader";

const ProtectedRoute = ({ children }) => {
  // const navigate = useNavigate();
  // const { loading, isAuthenticated, user } = useSelector((state) => state.user);

  // useEffect(() => {
  //   if (!loading) {
  //     console.log("User:", user);
  //     console.log("Is Authenticated:", isAuthenticated);
  //     if (!isAuthenticated || (user && user.role !== "admin")) {
  //       navigate("/");
  //     }
  //   }
  // }, [loading, isAuthenticated, user, navigate]);

  // if (loading) {
  //   return <Loader />;
  // }

  return children ? children : <Outlet />;
};

export default ProtectedRoute;
