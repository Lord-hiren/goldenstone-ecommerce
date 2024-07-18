import { Avatar, Rating } from "@mui/material";
import React from "react";

const ReviewCard = ({ props }) => {
  console.log(props);
  return (
    <>
      <div className="col-lg-3 mx-2 p-2 border rounded-3 shadow-sm">
        <div className="text-center pt-2">
          <Avatar alt="Cindy Baker" className="text-center mx-auto" src={""} />
        </div>
        <div>
          <h6 className="text-center py-1">{props.name}</h6>
        </div>
        <div className="text-center">
          <Rating
            name="half-rating"
            readOnly
            value={props.rating}
            precision={0.5}
          />
        </div>
        <div>
          <p className="text-center">Comment : {props.comment}</p>
        </div>
      </div>
    </>
  );
};

export default ReviewCard;
