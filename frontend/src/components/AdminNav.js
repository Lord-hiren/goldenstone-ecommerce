import React from "react";
import Avatar from "@mui/material/Avatar";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import DashboardRoundedIcon from "@mui/icons-material/DashboardRounded";
import PeopleRoundedIcon from "@mui/icons-material/PeopleRounded";
import CategoryRoundedIcon from "@mui/icons-material/CategoryRounded";
import AssignmentRoundedIcon from "@mui/icons-material/AssignmentRounded";
import PaymentsIcon from "@mui/icons-material/Payments";

const AdminNav = () => {
  const { error, loading, isAuthenticated, user } = useSelector(
    (state) => state.user
  );

  // Return null if the user data is empty
  if (!user || Object.keys(user).length === 0) {
    return null;
  }

  // Return null if the component is in loading state
  if (loading) {
    return null;
  }

  return (
    <div className="col-3 pt-5">
      <div className="row g-3">
        <div className="col-12">
          <div className="">
            <Avatar
              alt={user.name} // Assuming user object has a name property
              src={user.avatar?.url} // Optional chaining in case avatar is undefined
              className="adminprofile"
            />
            <h4 className="pt-3">Hello, {user.name}</h4>
            <p className="p">{user.email}</p>
          </div>
        </div>
        <div className="col-12">
          <ul className="ul">
            <li className="li">
              <Link className="link" to="/v1/admin/dashbord">
                <DashboardRoundedIcon /> Dashbord
              </Link>
            </li>
            <li className="li">
              <Link className="link" to="/v1/admin/users">
                <PeopleRoundedIcon /> Users
              </Link>
            </li>
            <li className="li">
              <Link className="link" to="/v1/admin/products">
                <CategoryRoundedIcon /> Products
              </Link>
            </li>
            <li className="li">
              <Link className="link" to="/v1/admin/orders">
                <AssignmentRoundedIcon /> Orders
              </Link>
            </li>
            <li className="li">
              <Link className="link" to="/v1/admin/payments">
                <PaymentsIcon /> Payments
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AdminNav;
