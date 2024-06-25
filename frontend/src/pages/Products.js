import React, { useEffect, useState } from "react";
import ProductsCard from "../components/ProductsCard";
import Metadata from "../components/Metadata";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { clearErrors, getProduct } from "../actions/productActions";
import Loader from "../components/Loader";
import { IconButton, InputBase, Pagination, Paper } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

const Products = () => {
  const dispatch = useDispatch();
  const { loading, error, products, productsCount, resultPerPage } =
    useSelector((state) => state.products);

  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }
    dispatch(getProduct("", currentPage));
    // keyword, currentPage, price, category, ratings
  }, [dispatch, currentPage, error]);

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
    console.log(value);
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
                  />
                  <IconButton
                    type="button"
                    sx={{ p: "10px" }}
                    aria-label="search"
                  >
                    <SearchIcon />
                  </IconButton>
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
        </>
      )}
    </>
  );
};

export default Products;
