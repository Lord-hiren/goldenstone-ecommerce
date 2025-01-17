import { Rating } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

const ProductsCard = ({ props }) => {
  const navigate = useNavigate();
  return (
    <>
      <div className="col-lg-3 col-md-4 col-sm-6 col-12">
        <div
          className="card border-0 shadow product-card p-2"
          onClick={() => navigate(`/product/detail/${props._id}`)}
        >
          <img
            src={props.images[0].url}
            className="img-fluid rounded-2"
            alt=""
          />
          <div className="card-body">
            <h5 className="card-title font-2">{props.name}</h5>
            <p className="card-text text-primary fw-bold fs-4 m-0">
              {props.discount === 0 ? (
                <> ₹{props.price}</>
              ) : (
                <>
                  ₹
                  {props.price -
                    Math.ceil((props.price * props.discount) / 100)}
                  /-{" "}
                  <span
                    className="fs-xs text-decoration-line-through"
                    style={{ color: "gray" }}
                  >
                    ₹{props.price}
                  </span>
                </>
              )}
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
