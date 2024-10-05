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
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import Slider from "@mui/material/Slider";
import { useParams } from "react-router-dom";
import Search from "../components/Search";

const Products = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const keyword = params.keyword;
  const { loading, error, products, productsCount, resultPerPage } =
    useSelector((state) => state.products);

  const [currentPage, setCurrentPage] = useState(1);

  const [open, setOpen] = useState(false);
  const [price, setprice] = useState([0, 50000]);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }
    dispatch(getProduct(keyword, currentPage, price));
    // keyword, currentPage, price, category, ratings
  }, [dispatch, currentPage, error, keyword, price]);

  const priceHandler = (event, newprice) => {
    setprice(newprice);
  };

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
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
              <Search />

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
                <div className="row g-3">
                  <div className="col-12 white-card p-2">
                    <h5 className="text-center m-0 ">Filters</h5>
                  </div>
                  <div className="col-12 white-card p-2">
                    <h5 className="text-center m-0 ">Price Range</h5>
                    <div className="px-3">
                      <Slider
                        getAriaLabel={() => "Price Range"}
                        value={price}
                        onChangeCommitted={priceHandler}
                        valueLabelDisplay="auto"
                        min={0}
                        max={50000}
                      />
                    </div>
                  </div>
                  {/* <div className="col-12 white-card p-2">
                    <h5 className="text-center m-0 ">Rateing Range</h5>
                    <div className="px-3">
                      
                    </div>
                  </div> */}
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
