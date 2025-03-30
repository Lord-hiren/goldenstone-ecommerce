import { IconButton } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
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
import Nav from "../components/Nav";

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
          <Nav />

          <div class="product-details mt-5">
            <div class="container-fluid mt-5 pt-5">
              <section class="mt-5">
                <div class="row">
                  <div class="col-12 col-lg-5 px-2 px-sm-2 px-md-2 px-lg-0">
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
                  <div class="col-md-12 col-lg-7 px-2 px-sm-2 px-md-2 px-lg-0">
                    <div class="col-lg-12 col-md-12 mb-4">
                      <div class="mb-2 d-flex align-items-center justify-content-between">
                        <div class="d-flex align-items-center">
                          <Rating
                            name="half-rating"
                            readOnly
                            value={product?.ratings}
                            precision={0.5}
                            size="small"
                          />
                          <small class="text-muted ms-2">
                            ({product?.numOfReviews})
                          </small>
                        </div>
                        {product.stock < 1 ? (
                          <span className="text-danger fw-bold">
                            Out of stock
                          </span>
                        ) : (
                          <span className="text-success fw-bold">In stock</span>
                        )}
                      </div>
                      <h1 class="h4 font-weight-semibold text-secondary">
                        {product?.name}
                      </h1>
                      <div class="my-2 d-flex align-items-center">
                        <h1 className="font-2 text-primary fw-medium">
                          {discount === 0 ? (
                            <>₹{price}</>
                          ) : (
                            <>
                              ₹{discountedPrice}
                              <span className="fs-4 text-secondary text-decoration-line-through ps-2">
                                ₹{price}
                              </span>
                              <span className="fs-5 m-0 ms-2 text-bg-danger px-2 py-1 rounded-2 ">
                                -{discount}% off
                              </span>
                            </>
                          )}
                        </h1>
                      </div>
                      <div class="mb-3 border-bottom pb-3">
                        <p class="text-truncate-3">{product?.description}</p>
                      </div>
                      <div class="my-3">
                        <span class="font-weight-bold text-secondary">
                          Quantity:
                        </span>
                        <div class="d-flex mt-2">
                          <div className="product-actions">
                            <div className="quantity-selector">
                              <IconButton
                                onClick={() => {
                                  if (num > 1) {
                                    setNum(num - 1);
                                    setQuantity(num - 1);
                                  }
                                }}
                                disabled={quantity <= 1}
                              >
                                <RemoveIcon />
                              </IconButton>
                              <span className="quantity user-select-none">
                                {quantity}
                              </span>
                              <IconButton
                                onClick={() => {
                                  if (num < 20) {
                                    setNum(num + 1);
                                    setQuantity(num + 1);
                                  }
                                }}
                                disabled={quantity >= product.stock}
                              >
                                <AddIcon />
                              </IconButton>
                            </div>
                          </div>
                          {/* <div class="qty-container">
                            <button
                              class="qty-btn-minus count-decreament"
                              type="button"
                              onClick={() => {
                                if (num > 1) {
                                  setNum(num - 1);
                                  setQuantity(num - 1);
                                }
                              }}
                            >
                              -
                            </button>
                            <input
                              type="number"
                              name="qty"
                              value={num}
                              class="input-qty input-cornered"
                            />
                            <button
                              class="qty-btn-plus count-increament"
                              type="button"
                              onClick={() => {
                                if (num < 20) {
                                  setNum(num + 1);
                                  setQuantity(num + 1);
                                }
                              }}
                            >
                              +
                            </button>
                          </div> */}
                          <div>
                            <a
                              href="cart.html"
                              onClick={handleAddToCart}
                              class="btn btn-primary btn-block ms-3 py-2"
                              disabled={product.stock < 1}
                            >
                              Add to cart
                            </a>
                          </div>
                        </div>
                      </div>

                      {/* <div class="my-3 d-flex align-items-center">
                        <span class="font-weight-bold text-secondary">
                          Available:
                        </span>
                        <span class="text-success ms-2">10 items in Stock</span>
                      </div>
                      <div class="my-3 category-tag">
                        <span class="font-weight-bold text-secondary">
                          Category:
                        </span>
                        <a
                          href="#"
                          class="text-primary ml-1 text-decoration-none "
                        >
                          Jewellery Set
                        </a>
                      </div>
                      <div class="my-3 category-tag">
                        <span class="font-weight-bold text-secondary">
                          Tags:
                        </span>
                        <a
                          href="#"
                          class="text-primary ml-1 text-decoration-none "
                        >
                          Women Accessories,
                        </a>
                        <a
                          href="#"
                          class="text-primary ml-1 text-decoration-none "
                        >
                          Jewellery
                        </a>
                      </div> */}
                    </div>
                  </div>
                </div>
              </section>

              <section class="mt5 review-section">
                <div class="mb-4 d-flex align-items-center justify-content-between pb-2">
                  <h2 class="h4 font-weight-bold text-secondary position-relative pb-2 mb-0">
                    Reviews ({product?.numOfReviews})
                  </h2>
                </div>
                <div class="row mb-4">
                  <div className="col-12">
                    <div className="white-card">
                      <h2 class="h5 font-weight-semibold text-secondary mb-3">
                        Add a review
                      </h2>
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
                          className="form-control"
                        ></textarea>
                      </div>
                      <div className="px-0 px-md-4 mt-2">
                        <button
                          className="btn btn-primary"
                          onClick={submitReviewHandler}
                          disabled={
                            user?.name === undefined
                              ? true
                              : isAuthenticated === false
                              ? true
                              : false
                          }
                        >
                          Submit
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="col-12 pt-3">
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
              </section>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default ProductDetail;
