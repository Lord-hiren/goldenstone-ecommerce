import React from "react";
import logo from "../asetes/img/logo.png";
import { Link } from "react-router-dom";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

const Footer = () => {
  let currentDate = new Date();
  let currentYear = currentDate.getFullYear();
  return (
    <>
      <div className="container-fluid black p-4">
        <div className="container">
          <div className="row">
            <div className="col-lg-4 col-md-4 col-sm-12 py-5">
              <div>
                <img src={logo} alt="" className="img-fluid" />
              </div>
              <h2 className="text-white">Royal Crown</h2>
            </div>
            <div className="col-lg-4 col-md-4 col-sm-12 py-5">
              <p className="text-white">Usefyll Links</p>
              <div className="d-flex">
                <ul className="list-unstyled">
                  <li>
                    <Link
                      className="text-white-50 text-decoration-none glow-1"
                      to={"/"}
                    >
                      <ChevronRightIcon />
                      Home
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="text-white-50 text-decoration-none glow-1"
                      to={"/products"}
                    >
                      <ChevronRightIcon />
                      Products
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="text-white-50 text-decoration-none glow-1"
                      to={"/cart"}
                    >
                      <ChevronRightIcon />
                      Cart
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="text-white-50 text-decoration-none glow-1"
                      to={"/profile"}
                    >
                      <ChevronRightIcon />
                      Profile
                    </Link>
                  </li>
                </ul>
                <ul className="list-unstyled">
                  <li>
                    <Link
                      className="text-white-50 text-decoration-none glow-1"
                      to={"/t&c"}
                    >
                      <ChevronRightIcon />
                      Terms & Conditions
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="text-white-50 text-decoration-none glow-1"
                      to={"/about"}
                    >
                      <ChevronRightIcon />
                      About Us
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="text-white-50 text-decoration-none glow-1"
                      to={"/refundpolicy"}
                    >
                      <ChevronRightIcon />
                      Refund Policy
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-lg-4 col-md-4 col-sm-12 py-5">
              <h3 className="text-white">Contact us</h3>
              <p className="text-white-50">
                Contact us:{" "}
                <span className="text-white">royalcrown2525@gmail.com</span>
              </p>
            </div>
          </div>
          <p className="fs-xs text-center text-white-50">
            © {currentYear} All Right Reserved
          </p>
        </div>
      </div>
    </>
  );
};

export default Footer;
