import { Rating } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

const ProductsCard = ({ props }) => {
  const navigate = useNavigate();
  return (
    <>
      <div className="col-lg-3 col-md-4 col-sm-6 col-12">
        <div
          class="card border-0 shadow product-card p-2"
          onClick={() => navigate(`/product/detail/${props._id}`)}
        >
          <img src={props.images[0].url} class="img-fluid rounded-2" alt="" />
          <div class="card-body">
            <h5 class="card-title font-2">{props.name}</h5>
            <p class="card-text fw-bold fs-4 m-0">
              ₹{props.price}/-{" "}
              <span className="fs-6 text-secondary text-decoration-line-through">
                ₹3500
              </span>
            </p>
            <div>
              <Rating
                name="half-rating"
                readOnly
                defaultValue={props.ratings}
                precision={0.5}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductsCard;