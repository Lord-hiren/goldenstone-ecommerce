import React, { useEffect, useState } from "react";
import Metadata from "../components/Metadata";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  clearErrors,
  getProductDetails,
  newReview,
} from "../actions/productActions";
import Loader from "../components/Loader";
import { Button, Rating } from "@mui/material";
import { toast } from "react-toastify";
import { addItemsToCart } from "../actions/cartActions";
import { NEW_REVIEW_RESET } from "../constants/productConstants";
import ReviewCard from "../components/ReviewCard";

const ProductDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [num, setNum] = useState(1);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    if (id) {
      dispatch(getProductDetails(id));
    }
  }, [dispatch, id]);

  const { product, loading, error } = useSelector(
    (state) => state.productDetail
  );
  const { success, error: reviewError } = useSelector(
    (state) => state.newReview
  );
  const { isAuthenticated, user } = useSelector((state) => state.user);

  const price = product && product.price;
  const discount = product && product.discount;
  const discountedPrice = discount
    ? Math.ceil(price * (1 - discount / 100))
    : price;

  const handleAddToCart = (e) => {
    e.preventDefault();
    dispatch(addItemsToCart(id, quantity));
    toast.success("Added to Cart Successfully");
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }

    if (reviewError) {
      toast.error(reviewError);
      dispatch(clearErrors());
    }

    if (success) {
      toast.success("Review submitted successfully");
      dispatch({ type: NEW_REVIEW_RESET });
      getProductDetails(id);
    }
  }, [dispatch, error, reviewError, success]);

  const submitReviewHandler = (e) => {
    e.preventDefault();
    const myForm = new FormData();
    myForm.set("rating", rating);
    myForm.set("comment", comment);
    myForm.set("productId", id);
    myForm.set("name", user && user.name);
    myForm.set("user", user && user._id);
    dispatch(newReview(myForm));
    setRating(0);
    setComment("");
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <Metadata title="Royal Crown --Product Details" />
          <div className="container-fluid main-bg">
            <div className="container py-1">
              <div className="row">
                <div className="col-lg-6 col-md-12 p-2 mt-2">
                  <div className="white-card">
                    <div className="p-4">
                      <div
                        id="carouselExampleControls"
                        className="carousel carousel-dark slide"
                        data-bs-ride="carousel"
                      >
                        <div className="carousel-inner">
                          {product &&
                            product.images &&
                            product.images.map((val, ind) => (
                              <div
                                className={`carousel-item ${
                                  ind === 0 ? "active" : ""
                                } text-center`}
                                key={ind}
                              >
                                <img
                                  src={val.url}
                                  className="img-fluid"
                                  alt="Product"
                                />
                              </div>
                            ))}
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
                          value={product && product.ratings}
                          precision={0.5}
                        />
                        <p className="text-secondary">
                          Number Of Reviews ({product && product.numOfReviews})
                        </p>
                      </div>
                    </div>
                    <div className="col-12">
                      <div className="white-card">
                        <h1 className="font-2 text-gold fw-medium">
                          {discount === 0 ? (
                            <>₹{price}</>
                          ) : (
                            <>
                              ₹{discountedPrice}
                              <span className="fs-5 text-secondary text-decoration-line-through ps-2">
                                ₹{price}
                              </span>
                              <br />
                              <span className="fs-5 m-0 ps-2">
                                -{discount}%
                              </span>
                            </>
                          )}
                        </h1>
                        <p>
                          Status:{" "}
                          {product.stock < 1 ? (
                            <span className="text-danger fw-bold">
                              Out of stock
                            </span>
                          ) : (
                            <span className="text-success fw-bold">
                              In stock
                            </span>
                          )}
                        </p>
                        <div className="d-flex justify-content-center align-items-center">
                          <div className="select-quantity">
                            <p
                              className="dic fs-4 user-select-none ms-auto"
                              onClick={() => {
                                if (num > 1) {
                                  setNum(num - 1);
                                  setQuantity(num - 1);
                                }
                              }}
                            >
                              -
                            </p>
                            <p className="num fs-4 user-select-none">{num}</p>
                            <p
                              className="inc fs-4 user-select-none me-2"
                              onClick={() => {
                                if (num < 20) {
                                  setNum(num + 1);
                                  setQuantity(num + 1);
                                }
                              }}
                            >
                              +
                            </p>
                          </div>
                          <div className="w-100">
                            <Button
                              variant="contained"
                              onClick={handleAddToCart}
                              className="btn-gold"
                              disabled={product.stock < 1}
                            >
                              Add to Cart
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-12">
                      <div className="white-card">
                        <p className="m-0 ps-3">
                          Description: <br />
                          <span className="p-3 fs-xs text-secondary m-0">
                            {product && product.description}
                          </span>
                        </p>
                        <hr />
                        <h6 className="m-0 mt-3 text-center">Submit Review</h6>
                        <div className="text-center text-md-start px-0 px-md-4 mt-3">
                          <Rating
                            name="half-rating"
                            precision={1}
                            value={rating}
                            onChange={(e) => setRating(e.target.value)}
                          />
                        </div>
                        <div className="px-0 px-md-4">
                          <textarea
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                            placeholder="Write your review..."
                            id="comment"
                            className="reaview-box"
                          ></textarea>
                        </div>
                        <div className="px-0 px-md-4 mt-2">
                          <Button
                            variant="contained"
                            className="btn-gold"
                            onClick={submitReviewHandler}
                            disabled={isAuthenticated === false ? true : false}
                          >
                            Submit
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-12">
                  <div className="white-card d-flex g-3 overflow-auto">
                    {product.reviews && product.reviews[0] ? (
                      <>
                        {product.reviews &&
                          product.reviews.map((val, ind) => (
                            <ReviewCard key={ind} props={val} />
                          ))}
                      </>
                    ) : (
                      <>
                        <p className="m-0 text-center p-0">No Reviews yet</p>
                      </>
                    )}
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
