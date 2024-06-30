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

const Home = () => {
  const dispatch = useDispatch();
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
      <div className="container-fluid main-bg">
        <div className="container pt-4">
          <div className="">
            <div
              id="carouselExampleControls"
              class="carousel slide"
              data-bs-ride="carousel"
            >
              <div class="carousel-inner">
                <div class="carousel-item active" data-bs-interval="3000">
                  <img src={hero1} class="header-img" alt="" />
                </div>
                <div class="carousel-item" data-bs-interval="3000">
                  <img src={hero2} class="header-img" alt="" />
                </div>
                <div class="carousel-item" data-bs-interval="3000">
                  <img src={hero3} class="header-img" alt="" />
                </div>
              </div>
              <button
                class="carousel-control-prev"
                type="button"
                data-bs-target="#carouselExampleControls"
                data-bs-slide="prev"
              >
                <span
                  class="carousel-control-prev-icon"
                  aria-hidden="true"
                ></span>
                <span class="visually-hidden">Previous</span>
              </button>
              <button
                class="carousel-control-next"
                type="button"
                data-bs-target="#carouselExampleControls"
                data-bs-slide="next"
              >
                <span
                  class="carousel-control-next-icon"
                  aria-hidden="true"
                ></span>
                <span class="visually-hidden">Next</span>
              </button>
            </div>
          </div>
        </div>

        {/* category */}
        <div className="container py-2 py-md-4">
          <div className="row g-3">
            <div className="col-lg-6 col-md-12 col-sm-12 col-12">
              <div className="white-card">
                <h3 className="py-2">Women Collection</h3>
                <div className="row py-2 g-3">
                  <div className="col-lg-3 col-md-3 col-sm-3 col-6  text-center">
                    <img
                      src={Wbreslet}
                      alt=""
                      className="img-fluid thumbnale"
                    />
                    <h6 className="pt-2 font-2">Breslet</h6>
                  </div>
                  <div className="col-lg-3 col-md-3 col-sm-3 col-6 text-center">
                    <img
                      src={Weyrring}
                      alt=""
                      className="img-fluid thumbnale"
                    />
                    <h6 className="pt-2 font-2">Eyrring</h6>
                  </div>
                  <div className="col-lg-3 col-md-3 col-sm-3 col-6 text-center">
                    <img src={Wring} alt="" className="img-fluid thumbnale" />
                    <h6 className="pt-2 font-2">Ring</h6>
                  </div>
                  <div className="col-lg-3 col-md-3 col-sm-3 col-6 text-center">
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
                  <div className="col-lg-3 col-md-3 col-sm-3 col-6  text-center">
                    <img
                      src={mbreslet}
                      alt=""
                      className="img-fluid thumbnale"
                    />
                    <h6 className="pt-2 font-2">Breslet</h6>
                  </div>
                  <div className="col-lg-3 col-md-3 col-sm-3 col-6 text-center">
                    <img
                      src={meyrring}
                      alt=""
                      className="img-fluid thumbnale"
                    />
                    <h6 className="pt-2 font-2">Eyrring</h6>
                  </div>
                  <div className="col-lg-3 col-md-3 col-sm-3 col-6 text-center">
                    <img src={mring} alt="" className="img-fluid thumbnale" />
                    <h6 className="pt-2 font-2">Ring</h6>
                  </div>
                  <div className="col-lg-3 col-md-3 col-sm-3 col-6 text-center">
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

        {/* trending products */}
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
      </div>
    </>
  );
};

export default Home;
