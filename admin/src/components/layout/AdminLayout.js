import React from "react";
import { Link, useLocation, useNavigate, Outlet } from "react-router-dom";
import {
  FaChartBar,
  FaBox,
  FaUsers,
  FaShoppingCart,
  FaCalendarAlt,
  FaSignOutAlt,
} from "react-icons/fa";

const AdminLayout = ({ setIsAuthenticated }) => {
  const location = useLocation();
  const navigate = useNavigate();
  console.log("AdminLayout.js: rendered");
  const menuItems = [
    { path: "/dashboard", icon: <FaChartBar />, label: "Dashboard" },
    { path: "/products", icon: <FaBox />, label: "Products" },
    { path: "/users", icon: <FaUsers />, label: "Users" },
    { path: "/orders", icon: <FaShoppingCart />, label: "Orders" },
    { path: "/events", icon: <FaCalendarAlt />, label: "Events" },
  ];

  const handleLogout = () => {
    setIsAuthenticated(false);
    navigate("/login");
  };

  return (
    // <div className="admin-layout">
    //   <div className="sidebar">
    //     <div className="text-center mb-4">
    //       <h4 className="mb-0">Admin Panel</h4>
    //     </div>
    //     <nav className="nav flex-column">
    //       {menuItems.map((item) => (
    //         <Link
    //           key={item.path}
    //           to={item.path}
    //           className={`nav-link d-flex align-items-center ${
    //             location.pathname === item.path ? "active" : ""
    //           }`}
    //         >
    //           <span className="me-2">{item.icon}</span>
    //           {item.label}
    //         </Link>
    //       ))}
    //       <button
    //         onClick={handleLogout}
    //         className="nav-link text-danger border-0 bg-transparent d-flex align-items-center mt-auto"
    //       >
    //         <span className="me-2">
    //           <FaSignOutAlt />
    //         </span>
    //         Logout
    //       </button>
    //     </nav>
    //   </div>
    //   <main className="main-content">
    //     <div className="container-fluid">
    //       <Outlet />
    //     </div>
    //   </main>
    // </div>
    <div>Admin Layout</div>
  );
};

export default AdminLayout;
