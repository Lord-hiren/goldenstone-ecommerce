import React from "react";
import logo from "../asetes/img/logo.png";
import { Link } from "react-router-dom";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

const Footer = () => {
  let currentDate = new Date();
  let currentYear = currentDate.getFullYear();
  return (
    <>
      {/* <div className="container-fluid black p-4">
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
      </div> */}

      <footer class="mt-100">
        <div class="container-fluid">
          <div class="row">
            <div class="col-12 col-sm-12 col-md-6 col-lg-4 mb-4 mb-sm-4 mb-md-4 mb-lg-0">
              <p class="footer_title">About Information</p>
              <div class="mt-4 pr-5">
                <p class="address">
                  Widgetify Inc, 456 Gadget Avenue, Techtown, TX 67890, United
                  States of America
                </p>
                <p class="phone m-0">
                  Call Us:<a href="tel:(987) 654-3210"> (987) 654-3210</a>
                </p>
                <p class="email m-0 mt-2">
                  <a href="mailto:royalcrown2525@gmail.com">
                    royalcrown2525@gmail.com
                  </a>
                </p>
              </div>
            </div>
            <div class="col-12 col-sm-12 col-md-6 col-lg-4 mb-4 mb-sm-4 mb-md-4 mb-lg-0">
              <div class="footer_menu">
                <p class="footer_title">Quick Links</p>
                <ul class="m-0 p-0 list-unstyled">
                  <li>
                    <a href="#">About Us</a>
                  </li>
                  <li>
                    <a href="#">Return Policy</a>
                  </li>
                  <li>
                    <a href="#">Privacy Policy</a>
                  </li>
                  <li>
                    <a href="#">FAQ</a>
                  </li>
                </ul>
              </div>
            </div>
            <div class="col-12 col-sm-12 col-md-6 col-lg-4 mb-4 mb-sm-4 mb-md-4 mb-lg-0">
              <div class="footer_menu">
                <p class="footer_title">Contact Us</p>
                <ul class="m-0 p-0 list-unstyled">
                  <li>
                    <a href="#">About Us</a>
                  </li>
                  <li>
                    <a href="#">Return Policy</a>
                  </li>
                  <li>
                    <a href="#">Privacy Policy</a>
                  </li>
                  <li>
                    <a href="#">FAQ</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <hr class="m-0 mt-2" />
        </div>
      </footer>
    </>
  );
};

export default Footer;
