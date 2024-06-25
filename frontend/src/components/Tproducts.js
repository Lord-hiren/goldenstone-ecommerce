import { Rating } from "@mui/material";
import React from "react";

const Tproducts = ({ props }) => {
  return (
    <>
      <div className="col-lg-4 col-md-4 col-sm-6 col-6">
        <div class="card rounded-0 border-0 shadow">
          <div className="tranding-product-box">
            <img src={props.image} class="tranding-product " alt="" />
          </div>
          <div class="card-body">
            <h5 class="card-title font-2">{props.titel}</h5>
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
                defaultValue={props.value}
                precision={0.5}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Tproducts;
