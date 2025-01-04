import React, { useEffect } from "react";
import Metadata from "../components/Metadata";
import { useGoogleOneTapLogin } from "@react-oauth/google";
import { toast } from "react-toastify";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import Wbreslet from "../asetes/img/breslet-women.png";
import Weyrring from "../asetes/img/eyrring-women.png";
import Wring from "../asetes/img/ring-women.png";
import Wnecklace from "../asetes/img/necklace-women.png";
import mbreslet from "../asetes/img/breslet-man.png";
import meyrring from "../asetes/img/eyrring-man.png";
import mring from "../asetes/img/ring-man.png";
import mnecklace from "../asetes/img/necklace-man.png";
import hero1 from "../asetes/img/hero1.png";
import hero2 from "../asetes/img/hero2.png";
import hero3 from "../asetes/img/hero3.png";
import Tproducts from "../components/Tproducts";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, getProduct } from "../actions/productActions";
import { useNavigate } from "react-router-dom";
import Nav from "../components/Nav";
import banner1 from "../asetes/images/banner/1.png";
import banner2 from "../asetes/images/banner/2.png";
import product1 from "../asetes/images/product/1.png";

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // useGoogleOneTapLogin({
  //   onSuccess: (credentialResponse) => {
  //     fatchUser(credentialResponse);
  //   },
  //   onError: () => {
  //     console.log("Login Failed");
  //   },
  // });

  // // fatching data
  // const fatchUser = (creRes) => {
  //   console.log(creRes);
  // };
  // const onhandelclick = (e) => {
  //   e.preventDefault();
  //   toast.success("hello world");
  // };

  const { loading, error, products, productsCount, resultPerPage } =
    useSelector((state) => state.products);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }
    dispatch(getProduct());
  }, [dispatch, error]);

  return (
    <>
      <Metadata title="Royal Crown --Home" />
      <Nav />
      {/* <div className="container-fluid main-bg">
        <div className="container pt-4">
          <div className="">
            <div
              id="carouselExampleControls"
              className="carousel slide"
              data-bs-ride="carousel"
            >
              <div className="carousel-inner">
                <div className="carousel-item active" data-bs-interval="3000">
                  <img src={hero1} className="header-img" alt="" />
                </div>
                <div className="carousel-item" data-bs-interval="3000">
                  <img src={hero2} className="header-img" alt="" />
                </div>
                <div className="carousel-item" data-bs-interval="3000">
                  <img src={hero3} className="header-img" alt="" />
                </div>
              </div>
              <button
                className="carousel-control-prev"
                type="button"
                data-bs-target="#carouselExampleControls"
                data-bs-slide="prev"
              >
                <span
                  className="carousel-control-prev-icon"
                  aria-hidden="true"
                ></span>
                <span className="visually-hidden">Previous</span>
              </button>
              <button
                className="carousel-control-next"
                type="button"
                data-bs-target="#carouselExampleControls"
                data-bs-slide="next"
              >
                <span
                  className="carousel-control-next-icon"
                  aria-hidden="true"
                ></span>
                <span className="visually-hidden">Next</span>
              </button>
            </div>
          </div>
        </div>

        {/* category 
        <div className="container py-2 py-md-4">
          <div className="row g-3">
            <div className="col-lg-6 col-md-12 col-sm-12 col-12">
              <div className="white-card">
                <h3 className="py-2">Women Collection</h3>
                <div className="row py-2 g-3">
                  <div
                    className="col-lg-3 col-md-3 col-sm-3 col-6  text-center"
                    onClick={() => navigate(`/products/breslet`)}
                  >
                    <img
                      src={Wbreslet}
                      alt=""
                      className="img-fluid thumbnale"
                    />
                    <h6 className="pt-2 font-2">Breslet</h6>
                  </div>
                  <div
                    className="col-lg-3 col-md-3 col-sm-3 col-6 text-center"
                    onClick={() => navigate(`/products/eyrring`)}
                  >
                    <img
                      src={Weyrring}
                      alt=""
                      className="img-fluid thumbnale"
                    />
                    <h6 className="pt-2 font-2">Eyrring</h6>
                  </div>
                  <div
                    className="col-lg-3 col-md-3 col-sm-3 col-6 text-center"
                    onClick={() => navigate(`/products/ring`)}
                  >
                    <img src={Wring} alt="" className="img-fluid thumbnale" />
                    <h6 className="pt-2 font-2">Ring</h6>
                  </div>
                  <div
                    className="col-lg-3 col-md-3 col-sm-3 col-6 text-center"
                    onClick={() => navigate(`/products/necklace`)}
                  >
                    <img
                      src={Wnecklace}
                      alt=""
                      className="img-fluid thumbnale"
                    />
                    <h6 className="pt-2 font-2">Necklace</h6>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-6 col-md-12 col-sm-12 col-12 ">
              <div className="white-card">
                <h3 className="py-2">Man Collection</h3>
                <div className="row py-2 g-3">
                  <div
                    className="col-lg-3 col-md-3 col-sm-3 col-6  text-center"
                    onClick={() => navigate(`/products/breslet`)}
                  >
                    <img
                      src={mbreslet}
                      alt=""
                      className="img-fluid thumbnale"
                    />
                    <h6 className="pt-2 font-2">Breslet</h6>
                  </div>
                  <div
                    className="col-lg-3 col-md-3 col-sm-3 col-6 text-center"
                    onClick={() => navigate(`/products/eyrring`)}
                  >
                    <img
                      src={meyrring}
                      alt=""
                      className="img-fluid thumbnale"
                    />
                    <h6 className="pt-2 font-2">Eyrring</h6>
                  </div>
                  <div
                    className="col-lg-3 col-md-3 col-sm-3 col-6 text-center"
                    onClick={() => navigate(`/products/ring`)}
                  >
                    <img src={mring} alt="" className="img-fluid thumbnale" />
                    <h6 className="pt-2 font-2">Ring</h6>
                  </div>
                  <div
                    className="col-lg-3 col-md-3 col-sm-3 col-6 text-center"
                    onClick={() => navigate(`/products/necklace`)}
                  >
                    <img
                      src={mnecklace}
                      alt=""
                      className="img-fluid thumbnale"
                    />
                    <h6 className="pt-2 font-2">Necklace</h6>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        trending products 
        <div className="container py-2">
          <div className="white-card">
            <h3 className="m-0 py-2">
              Trending now <ArrowRightAltIcon className="fs-1" />
            </h3>
            <div className="row g-3">
              {products &&
                products.map((val, ind) => <Tproducts key={ind} props={val} />)}
            </div>
          </div>
        </div>
      </div> */}

      {/* <!-- Menu Section --> */}
      <div class="container-fluid mt-2 mt-sm-2 mt-md-2 mt-lg-4">
        <div className="container pt-4">
          <div className="">
            <div
              id="carouselExampleControls"
              className="carousel slide"
              data-bs-ride="carousel"
            >
              <div className="carousel-inner">
                <div className="carousel-item active" data-bs-interval="3000">
                  <img src={banner1} className="header-img" alt="" />
                </div>
                <div className="carousel-item" data-bs-interval="3000">
                  <img src={banner2} className="header-img" alt="" />
                </div>
              </div>
              <button
                className="carousel-control-prev"
                type="button"
                data-bs-target="#carouselExampleControls"
                data-bs-slide="prev"
              >
                <span
                  className="carousel-control-prev-icon"
                  aria-hidden="true"
                ></span>
                <span className="visually-hidden">Previous</span>
              </button>
              <button
                className="carousel-control-next"
                type="button"
                data-bs-target="#carouselExampleControls"
                data-bs-slide="next"
              >
                <span
                  className="carousel-control-next-icon"
                  aria-hidden="true"
                ></span>
                <span className="visually-hidden">Next</span>
              </button>
            </div>
          </div>
        </div>

        {/* <!-- Our Policy --> */}
        <div class="our-policy container-fluid my-5 px-5">
          <div class="row text-center icon-link" style={{ gap: 0 }}>
            <div class="col col-12 col-sm-6 col-md-6 col-lg-3 mx-0 mb-0 mb-sm-0 mb-md-2 mb-lg-0">
              <a href="#">
                <svg
                  class="text-muted me-3"
                  stroke="currentColor"
                  fill="none"
                  stroke-width="2"
                  viewBox="0 0 24 24"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M7 17m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0"></path>
                  <path d="M17 17m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0"></path>
                  <path d="M5 17h-2v-4m-1 -8h11v12m-4 0h6m4 0h2v-6h-8m0 -5h5l3 5"></path>
                  <path d="M3 9l4 0"></path>
                </svg>
                <div>
                  <h2 class="h6 font-weight-bold text-dark mb-1">
                    Free Shipping
                  </h2>
                  <p class="text-muted mb-0">Orders over $100</p>
                </div>
              </a>
            </div>
            <div class="col col-12 col-sm-6 col-md-6 col-lg-3 mb-0 mb-sm-0 mb-md-4 mb-lg-0">
              <a href="#">
                <svg
                  class="h-5 w-5 text-muted me-3 transition-transform transform hover:translate-y-n2 hover:text-primary"
                  stroke="currentColor"
                  fill="none"
                  stroke-width="2"
                  viewBox="0 0 24 24"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M15 11v.01"></path>
                  <path d="M5.173 8.378a3 3 0 1 1 4.656 -1.377"></path>
                  <path d="M16 4v3.803a6.019 6.019 0 0 1 2.658 3.197h1.341a1 1 0 0 1 1 1v2a1 1 0 0 1 -1 1h-1.342c-.336 .95 -.907 1.8 -1.658 2.473v2.027a1.5 1.5 0 0 1 -3 0v-.583a6.04 6.04 0 0 1 -1 .083h-4a6.04 6.04 0 0 1 -1 -.083v.583a1.5 1.5 0 0 1 -3 0v-2l0 -.027a6 6 0 0 1 4 -10.473h2.5l4.5 -3h0z"></path>
                </svg>
                <div class="text-left">
                  <h2 class="h6 font-weight-bold text-dark mb-1">Money Back</h2>
                  <p class="text-muted mb-0">With a 30 day</p>
                </div>
              </a>
            </div>
            <div class="col col-12 col-sm-6 col-md-6 col-lg-3 mb-0 mb-sm-0 mb-md-4 mb-lg-0">
              <a href="#">
                <svg
                  class="h-5 w-5 text-muted me-3 transition-transform transform hover:translate-y-n2 hover:text-primary"
                  stroke="currentColor"
                  fill="currentColor"
                  stroke-width="0"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M11.0049 2L18.3032 4.28071C18.7206 4.41117 19.0049 4.79781 19.0049 5.23519V7H21.0049C21.5572 7 22.0049 7.44772 22.0049 8V10H9.00488V8C9.00488 7.44772 9.4526 7 10.0049 7H17.0049V5.97L11.0049 4.094L5.00488 5.97V13.3744C5.00488 14.6193 5.58406 15.7884 6.56329 16.5428L6.75154 16.6793L11.0049 19.579L14.7869 17H10.0049C9.4526 17 9.00488 16.5523 9.00488 16V12H22.0049V16C22.0049 16.5523 21.5572 17 21.0049 17L17.7848 17.0011C17.3982 17.5108 16.9276 17.9618 16.3849 18.3318L11.0049 22L5.62486 18.3318C3.98563 17.2141 3.00488 15.3584 3.00488 13.3744V5.23519C3.00488 4.79781 3.28913 4.41117 3.70661 4.28071L11.0049 2Z"></path>
                </svg>
                <div class="text-left">
                  <h2 class="h6 font-weight-bold text-dark mb-1">
                    Secure Payment
                  </h2>
                  <p class="text-muted mb-0">Secured payment</p>
                </div>
              </a>
            </div>
            <div class="col col-12 col-sm-6 col-md-6 col-lg-3 mb-0 mb-sm-0 mb-md-4 mb-lg-0">
              <a href="#">
                <svg
                  class="h-5 w-5 text-muted me-3 transition-transform transform hover:translate-y-n2 hover:text-primary"
                  stroke="currentColor"
                  fill="currentColor"
                  stroke-width="0"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path fill="none" d="M0 0h24v24H0z"></path>
                  <path d="M21 12.22C21 6.73 16.74 3 12 3c-4.69 0-9 3.65-9 9.28-.6.34-1 .98-1 1.72v2c0 1.1.9 2 2 2h1v-6.1c0-3.87 3.13-7 7-7s7 3.13 7 7V19h-8v2h8c1.1 0 2-.9 2-2v-1.22c.59-.31 1-.92 1-1.64v-2.3c0-.7-.41-1.31-1-1.62z"></path>
                  <circle cx="9" cy="13" r="1"></circle>
                  <circle cx="15" cy="13" r="1"></circle>
                  <path d="M18 11.03A6.04 6.04 0 0 0 12.05 6c-3.03 0-6.29 2.51-6.03 6.45a8.075 8.075 0 0 0 4.86-5.89c1.31 2.63 4 4.44 7.12 4.47z"></path>
                </svg>
                <div class="text-left">
                  <h2 class="h6 font-weight-bold text-dark mb-1">
                    Online Support
                  </h2>
                  <p class="text-muted mb-0">Support 24/7</p>
                </div>
              </a>
            </div>
          </div>
        </div>

        {/* <!-- Featured Products --> */}
        <div class="container-fluid mt-100">
          <div class="product">
            <div class="product-head-title">Featured Products</div>
            <div className="row g-3">
              {products &&
                products.map((val, ind) => <Tproducts key={ind} props={val} />)}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
