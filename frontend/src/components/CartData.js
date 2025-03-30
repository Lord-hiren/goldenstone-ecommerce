import React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import DeleteIcon from "@mui/icons-material/Delete";
import { IconButton } from "@mui/material";
import { useDispatch } from "react-redux";
import { removeItemsFromCart } from "../actions/cartActions";

const CartData = ({ props }) => {
  const dispatch = useDispatch();

  const deleteCartItemHandler = (id) => {
    dispatch(removeItemsFromCart(id));
  };
  return (
    <>
      <div className="container-fluid">
        <div class="position-relative product-item row mb-4 rounded-lg bg-white pt-3 shadow-sm me-1">
          <div class="col-12 col-sm-6 col-lg-4 mb-3 mb-sm-3 mb-md-3 md-lg-0">
            <b class="mb-2 d-block d-xl-none">Product</b>
            <div class=" d-flex w-100">
              <figure class="rounded-lg">
                <img src={props.image} class="rounded" width="60" alt="img" />
              </figure>
              <div class="ms-2 w-100">
                <p class="font-weight-bold text-dark">{props.name}</p>
                <div class="mt-2">
                  <small>#{props.product}</small>
                </div>
              </div>
            </div>
          </div>
          <div class="col-12 col-sm-6 col-lg-2 mb-3 mb-sm-3 mb-md-3 md-lg-0">
            <b class="mb-2 d-block d-xl-none">Price</b>
            <div>
              <span class="font-weight-bold text-primary">
                ₹{props.price - (props.price * props.discount) / 100}
              </span>
            </div>
          </div>
          <div class="col-12 col-sm-6 col-lg-3 mb-3 mb-sm-3 mb-md-3 md-lg-0">
            <b class="mb-2 d-block d-xl-none">Quantity</b>
            <div class="qty-container">
              <p className="">{props.quantity}</p>
            </div>
          </div>
          <div class="col-12 col-sm-6 col-lg-3 mb-3 mb-sm-3 mb-md-3 md-lg-0">
            <b class="mb-2 d-block d-xl-none">Total</b>
            <span class="font-weight-bold text-primary">
              ₹ {props.quantity * props.price}
            </span>
          </div>
          <button
            class="btn btn-primary position-absolute close-cart w-auto end-0 top-0"
            onClick={() => deleteCartItemHandler(props.product)}
          >
            <svg
              stroke="currentColor"
              fill="none"
              stroke-width="2"
              viewBox="0 0 24 24"
              stroke-linecap="round"
              stroke-linejoin="round"
              height="20px"
              width="20px"
              xmlns="http://www.w3.org/2000/svg"
            >
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>
      </div>
    </>
  );
};

export default CartData;
