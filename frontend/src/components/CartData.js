import React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import DeleteIcon from "@mui/icons-material/Delete";
import { IconButton } from "@mui/material";

const CartData = ({ props }) => {
  return (
    <>
      <Accordion className="bg-light">
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1-content"
          id="panel1-header"
        >
          <img src={props.image} className="cart-image mx-1 mx-lg-4" alt="" />
          {props.name}
          <span className=" px-2 px-lg-4">{props.price}</span>
          <span className="ms-auto">
            <IconButton aria-label="delete" color="error">
              <DeleteIcon />
            </IconButton>
          </span>
        </AccordionSummary>
        <AccordionDetails>
          <table className="table w-50">
            <tr>
              <td>Name : {props.name}</td>
              <td>Price : ₹{props.price}</td>
              <td>Quantity : {props.quantity}</td>
            </tr>
          </table>
          <div>
            <table className="table w-50">
              <tr>
                <th>Quantity</th>
                <th>Price</th>
                <th>Totel price</th>
              </tr>
              <tr>
                <td>{props.quantity}</td>
                <td>₹{props.price}</td>
                <td className="fw-bold">₹ {props.quantity * props.price}</td>
              </tr>
            </table>
          </div>
        </AccordionDetails>
      </Accordion>
    </>
  );
};

export default CartData;
