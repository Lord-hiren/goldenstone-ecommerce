import React, { useEffect, useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useGoogleLogin } from "@react-oauth/google";
import {
  clearErrors,
  googleLogin,
  loadUser,
  logout,
} from "../actions/userAction";
import { useCookies } from "react-cookie";
import { jwtDecode } from "jwt-decode";
import { toast } from "react-toastify";
import { LOGOUT_SUCCESS } from "../constants/userConstants";
import logo from "../asetes/img/logo.png";

const pages = [
  { title: "Home", dest: "/" },
  { title: "Products", dest: "/products" },
  { title: "About us", dest: "/about" },
  { title: "Cart", dest: "/cart" },
];
const settings = ["Profile", "Cart", "Logout"];

const Nav = () => {
  const [cookies, , removeCookie] = useCookies(["token"]);
  const token = cookies.token;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { error, isAuthenticated, user } = useSelector((state) => state.user);

  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const navigatePage = (e, dest) => {
    e.preventDefault();
    navigate(dest);
  };

  const login = useGoogleLogin({
    onSuccess: (tokenResponse) => {
      const accessToken = tokenResponse.access_token;
      fetch(
        `https://www.googleapis.com/oauth2/v3/userinfo?access_token=${accessToken}`
      )
        .then((response) => response.json())
        .then((userData) => {
          dispatch(
            googleLogin(userData.email, userData.name, userData.picture)
          );
        })
        .catch((error) => {
          console.error("Error fetching user data:", error);
        });
    },
  });

  const handleSettingClick = (setting) => {
    switch (setting) {
      case "Profile":
        navigate("/profile");
        break;
      case "Cart":
        navigate("/cart");
        break;
      case "Logout":
        removeCookie("token");
        dispatch({ type: LOGOUT_SUCCESS });
        toast.success("Logout success");
        break;
      default:
        break;
    }
    handleCloseUserMenu();
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }
  }, [dispatch, error]);

  useEffect(() => {
    if (user && user[0] === undefined && token !== undefined) {
      try {
        const decoded = jwtDecode(token);
        dispatch(loadUser(decoded.id));
      } catch (error) {
        console.error("Error decoding token:", error);
      }
    }
  }, []);

  return (
    <>
      <nav class="navbar navbar-expand-lg py-0 bg-main">
        <div class="container bg-nav py-2">
          <img
            src={logo}
            alt="Logo"
            style={{ height: "40px", cursor: "pointer" }}
            onClick={() => navigate("/")}
          />
          <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav mx-auto mb-2 mb-lg-0">
              <li class="nav-item px-3">
                <Link class="nav-link " aria-current="page" to="/">
                  HOME
                </Link>
              </li>
              <li class="nav-item px-3">
                <Link class="nav-link " aria-current="page" to="/products">
                  PRODUCTS
                </Link>
              </li>
              <li class="nav-item px-3">
                <Link class="nav-link " aria-current="page" to="/about">
                  ABOUT US
                </Link>
              </li>
              <li class="nav-item px-3">
                <Link class="nav-link " aria-current="page" to="/cart">
                  CART
                </Link>
              </li>
            </ul>
            {/* User Avatar and Login Button */}
            {isAuthenticated ? (
              <Box sx={{ flexGrow: 0 }}>
                <Tooltip title="Open settings">
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar
                      alt={user?.name}
                      src={user?.avatar?.url}
                      sx={{ width: 45, height: 45 }}
                    />
                  </IconButton>
                </Tooltip>
                <Menu
                  sx={{ mt: "45px" }}
                  anchorEl={anchorElUser}
                  anchorOrigin={{ vertical: "top", horizontal: "right" }}
                  keepMounted
                  transformOrigin={{ vertical: "top", horizontal: "right" }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                >
                  {settings.map((setting) => (
                    <MenuItem
                      key={setting}
                      onClick={() => handleSettingClick(setting)}
                    >
                      <Typography textAlign="center">{setting}</Typography>
                    </MenuItem>
                  ))}
                </Menu>
              </Box>
            ) : (
              <button
                type="button"
                class="login-with-google-btn"
                onClick={() => login()}
              >
                Sign in with Google
              </button>
            )}
          </div>
        </div>
      </nav>
    </>
  );
};

export default Nav;
