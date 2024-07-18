import React, { useEffect, useState } from "react";
import ProductsCard from "../components/ProductsCard";
import Metadata from "../components/Metadata";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { clearErrors, getProduct } from "../actions/productActions";
import Loader from "../components/Loader";
import {
  Drawer,
  IconButton,
  InputBase,
  Pagination,
  Paper,
  Tooltip,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import FilterAltRoundedIcon from "@mui/icons-material/FilterAltRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";

const Products = () => {
  const dispatch = useDispatch();
  const { loading, error, products, productsCount, resultPerPage } =
    useSelector((state) => state.products);

  const [currentPage, setCurrentPage] = useState(1);
  const [keyword, setkeyword] = useState("");
  const [keywords, setkeywords] = useState("");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }
    dispatch(getProduct(keyword, currentPage));
    // keyword, currentPage, price, category, ratings
  }, [dispatch, currentPage, error, keyword]);

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
    console.log(value);
  };

  const handelAddKeyword = (e) => {
    e.preventDefault();
    setkeyword(keywords);
  };

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  return (
    <>
      {loading === true ? (
        <Loader />
      ) : (
        <>
          <Metadata title="Royal Crown --Products" />
          <div className="container-fluid main-bg">
            <div className="container py-1">
              <div className="white-card my-2">
                <Paper
                  component="form"
                  sx={{
                    p: "2px 4px",
                    display: "flex",
                    alignItems: "center",
                  }}
                  className="w-100 shadow"
                >
                  <InputBase
                    sx={{ flex: 1 }}
                    placeholder="Search For Products"
                    inputProps={{ "aria-label": "search google maps" }}
                    className="px-3"
                    value={keywords}
                    onChange={(e) => setkeywords(e.target.value)}
                  />
                  <Tooltip title="Search">
                    <IconButton
                      type="button"
                      sx={{ p: "10px" }}
                      aria-label="search"
                      onClick={(e) => handelAddKeyword(e)}
                    >
                      <SearchIcon />
                    </IconButton>
                  </Tooltip>

                  <Tooltip title="Filter">
                    <IconButton
                      type="button"
                      sx={{ p: "10px" }}
                      aria-label="search"
                      onClick={toggleDrawer(true)}
                    >
                      <FilterAltRoundedIcon />
                    </IconButton>
                  </Tooltip>
                </Paper>
              </div>
              <div className="white-card my-3">
                <h3 className="py-2 font-2">All products</h3>
                <div className="row g-4">
                  {products &&
                    products.map((vel, ind) => (
                      <ProductsCard key={ind} props={vel} />
                    ))}
                </div>
                <div className="py-3">
                  {resultPerPage && productsCount > resultPerPage && (
                    <div className="paginationBox">
                      <Pagination
                        page={currentPage}
                        count={Math.ceil(productsCount / resultPerPage)}
                        onChange={handlePageChange}
                        showFirstButton
                        showLastButton
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
          <Drawer open={open} anchor={"right"} onClose={toggleDrawer(false)}>
            <div className="container-fluid filters bg-light">
              <div className="text-end">
                <Tooltip title="Close">
                  <IconButton
                    type="button"
                    sx={{ p: "10px" }}
                    aria-label="search"
                    onClick={toggleDrawer(false)}
                  >
                    <CloseRoundedIcon />
                  </IconButton>
                </Tooltip>
              </div>
              <div className="container">
                <div className="row">
                  <div className="col-12 white-card p-2">
                    <h5 className="text-center m-0 ">Filters</h5>
                  </div>
                </div>
              </div>
            </div>
          </Drawer>
        </>
      )}
    </>
  );
};

export default Products;
