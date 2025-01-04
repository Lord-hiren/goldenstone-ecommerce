import React, { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import FilterAltRoundedIcon from "@mui/icons-material/FilterAltRounded";
import { IconButton, InputBase, Paper, Tooltip } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Search = () => {
  const [keyWord, setKeyWord] = useState("");
  const navigate = useNavigate();

  const searchSubmitHandler = (e) => {
    e.preventDefault();

    if (keyWord.trim()) {
      navigate(`/products/${keyWord}`);
    } else {
      navigate(`/products`);
    }
  };
  return (
    <>
      <div className="white-card my-2">
        <Paper
          component="form"
          sx={{
            p: "2px 4px",
            display: "flex",
            alignItems: "center",
          }}
          className="w-100 "
        >
          <InputBase
            sx={{ flex: 1 }}
            placeholder="Search For Products"
            inputProps={{ "aria-label": "search google maps" }}
            className="px-3"
            value={keyWord}
            onChange={(e) => setKeyWord(e.target.value)}
          />
          <Tooltip title="Search">
            <IconButton
              type="button"
              sx={{ p: "10px" }}
              aria-label="search"
              onClick={(e) => searchSubmitHandler(e)}
            >
              <SearchIcon />
            </IconButton>
          </Tooltip>

          {/* <Tooltip title="Filter">
            <IconButton
              type="button"
              sx={{ p: "10px" }}
              aria-label="search"
              //   onClick={toggleDrawer(true)}
            >
              <FilterAltRoundedIcon />
            </IconButton>
          </Tooltip> */}
        </Paper>
      </div>
    </>
  );
};

export default Search;
