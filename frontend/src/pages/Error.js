import React from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGhost } from "@fortawesome/free-solid-svg-icons";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";

const Error = () => {
  const navigate = useNavigate();
  const handelnavigate = (e) => {
    e.preventDefault();
    navigate("/");
  };
  return (
    <>
      <div className="main">
        <h1 className="h1">
          4
          <span>
            <FontAwesomeIcon icon={faGhost} />
          </span>
          4
        </h1>
        <h2 className="h2">Error: 404 page not found</h2>
        <p className="p">
          Sorry, the page you're looking for cannot be accessed
        </p>
        <Button variant="contained" onClick={(e) => handelnavigate(e)}>
          Go Home
        </Button>
      </div>
    </>
  );
};

export default Error;