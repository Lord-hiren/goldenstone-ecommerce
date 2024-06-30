import React, { useEffect, useState } from "react";
import Metadata from "../components/Metadata";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getProductDetails } from "../actions/productActions";
import Loader from "../components/Loader";
import { Button, Rating } from "@mui/material";
import { toast } from "react-toastify";
import { addItemsToCart } from "../actions/cartActions";

const ProductDetail = () => {
  const { id } = useParams();

  const dispatch = useDispatch();
  const params = useParams();
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [num, setnum] = useState(1);
  const [quantity, setQuantity] = useState(1);

  const _id = params.id;

  useEffect(() => {
    if (id) {
      dispatch(getProductDetails(id));
    }
  }, [dispatch, id]);

  const dicNum = (e) => {
    e.preventDefault();
    if (num > 1) {
      setnum(num - 1);
      setQuantity(num - 1);
    }
  };

  const incNum = (e) => {
    e.preventDefault();
    if (num < 20) {
      setnum(num + 1);
      setQuantity(num + 1);
    }
  };

  const { product, loading, error } = useSelector(
    (state) => state.productDetail
  );

  const price = product && product.price;
  const dis = product && product.discount;
  const disinpr = Math.ceil((price * dis) / 100);

  const disprice = price - disinpr;

  const handelAddToCart = (e) => {
    e.preventDefault();

    dispatch(addItemsToCart(_id, quantity));

    toast.success("Add To Cart Success");
  };

  return (
    <>
      {loading === true ? (
        <>
          <Loader />
        </>
      ) : (
        <>
          <Metadata title="Royal Crown" />
          <div className="container-fluid main-bg">
            <div className="container py-1">
              <div className="row">
                <div className="col-lg-6 col-md-12 p-2 mt-2">
                  <div className="white-card">
                    <div className="p-4">
                      <div
                        id="carouselExampleControls"
                        class="carousel carousel-dark slide"
                        data-bs-ride="carousel"
                      >
                        <div class="carousel-inner">
                          {product &&
                            product?.images?.map((val, ind) => (
                              <>
                                <div
                                  class="carousel-item active text-center"
                                  key={ind}
                                >
                                  <img
                                    src={val.url}
                                    class="img-fluid"
                                    alt="..."
                                  />
                                </div>
                              </>
                            ))}
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
                </div>
                <div className="col-lg-6 col-md-12 p-2">
                  <div className="row p-2 g-3">
                    <div className="col-12">
                      <div className="white-card">
                        <p className="fs-xs text-secondary m-0">
                          #{product && product._id}
                        </p>
                        <h3 className="font-2 m-0 py-3 text-gold fw-medium">
                          {product && product.name}
                        </h3>
                        <Rating
                          name="half-rating"
                          readOnly
                          defaultValue={product && product.ratings}
                          precision={0.5}
                        />
                        <p className="text-secondary">
                          Number Of Reviews ({product && product.numOfReviews})
                        </p>
                        <p className="border1 p-3 fs-xs text-secondary m-0  ">
                          {product && product.description}
                        </p>
                      </div>
                    </div>
                    <div className="col-12">
                      <div className="white-card">
                        <h1 className="font-2 text-gold fw-medium">
                          {product && product.discount === 0 ? (
                            <>₹{product && product.price}</>
                          ) : (
                            <>
                              ₹ {disprice}{" "}
                              <span className="fs-5 text-secondary text-decoration-line-through ps-2">
                                {" "}
                                ₹ {product && product.price}
                              </span>
                              <br />{" "}
                              <span className="fs-5 m-0 ps-2">
                                -{product && product.discount}%
                              </span>{" "}
                            </>
                          )}
                        </h1>
                        <div className="d-flex justify-content-center align-items-center">
                          <div className="select-quantity">
                            <p
                              className="dic fs-4 user-select-none ms-auto"
                              onClick={(e) => dicNum(e)}
                            >
                              -
                            </p>
                            <p className="num fs-4 user-select-none">{num}</p>
                            <p
                              className="inc fs-4 user-select-none me-2"
                              onClick={(e) => incNum(e)}
                            >
                              +
                            </p>
                          </div>
                          <div className="w-100">
                            <Button
                              variant="contained"
                              onClick={(e) => handelAddToCart(e)}
                              className="btn-gold"
                            >
                              Add to Cart
                            </Button>
                          </div>
                        </div>
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

export default ProductDetail;
