import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import {
  Slider,
  FormControl,
  Select,
  MenuItem,
  Checkbox,
  FormControlLabel,
  IconButton,
} from "@mui/material";
import FilterListIcon from "@mui/icons-material/FilterList";
import SortIcon from "@mui/icons-material/Sort";
import CloseIcon from "@mui/icons-material/Close";

import { clearErrors, getProduct } from "../actions/productActions";
import ProductsCard from "../components/ProductsCard";
import Metadata from "../components/Metadata";
import Loader from "../components/Loader";
import Layout from "../components/layout/Layout";

const categories = [
  "Rings",
  "Necklaces",
  "Earrings",
  "Bracelets",
  "Pendants",
  "Anklets",
];

const Products = () => {
  const dispatch = useDispatch();
  const { keyword } = useParams();
  const { loading, error, products, productsCount, resultPerPage } =
    useSelector((state) => state.products);

  const [currentPage, setCurrentPage] = useState(1);
  const [price, setPrice] = useState([0, 25000]);
  const [category, setCategory] = useState([]);
  const [sortBy, setSortBy] = useState("newest");
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }
    dispatch(getProduct(keyword, currentPage, price));
    // keyword, currentPage, price, category, ratings
  }, [dispatch, currentPage, error, keyword, price]);

  const handlePriceChange = (event, newPrice) => {
    setPrice(newPrice);
  };

  const handleCategoryChange = (event) => {
    const value = event.target.value;
    if (category.includes(value)) {
      setCategory(category.filter((cat) => cat !== value));
    } else {
      setCategory([...category, value]);
    }
  };

  const handleSortChange = (event) => {
    setSortBy(event.target.value);
  };

  const clearFilters = () => {
    setPrice([0, 50000]);
    setCategory([]);
    setSortBy("newest");
  };

  return (
    <Layout>
      <Metadata title="Products | Golden Jewelry" />
      <div className="section">
        <div className="container">
          {loading ? (
            <Loader />
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              {/* Header */}
              <div className="d-flex justify-content-between align-items-center mb-4">
                <h1>Our Collection</h1>
                {/* <div className="d-flex gap-3">
                  <IconButton
                    onClick={() => setShowFilters(!showFilters)}
                    className="filter-toggle"
                  >
                    {showFilters ? <CloseIcon /> : <FilterListIcon />}
                  </IconButton>
                  <FormControl variant="outlined" size="small">
                    <Select
                      value={sortBy}
                      onChange={handleSortChange}
                      startAdornment={<SortIcon className="me-2" />}
                    >
                      <MenuItem value="newest">Newest First</MenuItem>
                      <MenuItem value="price_low">Price: Low to High</MenuItem>
                      <MenuItem value="price_high">Price: High to Low</MenuItem>
                      <MenuItem value="popular">Most Popular</MenuItem>
                    </Select>
                  </FormControl>
                </div> */}
              </div>
              {loading && <Loader />}

              <div className="row">
                {/* Filters */}
                {showFilters && (
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="col-lg-3"
                  >
                    <div className="product-filters">
                      <div className="d-flex justify-content-between align-items-center mb-3">
                        <h3>Filters</h3>
                        <button className="btn btn-link" onClick={clearFilters}>
                          Clear All
                        </button>
                      </div>

                      {/* Price Filter */}
                      <div className="filter-section px-2">
                        <h4>Price Range</h4>
                        <Slider
                          value={price}
                          onChange={handlePriceChange}
                          valueLabelDisplay="auto"
                          min={0}
                          max={50000}
                          sx={{
                            color: "#bb5d3c",
                            "& .MuiSlider-thumb": {
                              backgroundColor: "#bb5d3c",
                            },
                          }}
                        />
                      </div>

                      {/* Category Filter */}
                      <div className="filter-section">
                        <h4>Categories</h4>
                        <ul className="category-list">
                          {categories.map((cat) => (
                            <li key={cat}>
                              <FormControlLabel
                                control={
                                  <Checkbox
                                    checked={category.includes(cat)}
                                    onChange={() =>
                                      handleCategoryChange({
                                        target: { value: cat },
                                      })
                                    }
                                    sx={{
                                      color: "#bb5d3c",
                                      "&.Mui-checked": {
                                        color: "#bb5d3c",
                                      },
                                    }}
                                  />
                                }
                                label={cat}
                              />
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Products Grid */}
                <div className={`col-lg-${showFilters ? "9" : "12"}`}>
                  <div className="products-grid">
                    {products && products.length > 0 ? (
                      products.map((product) => (
                        <ProductsCard key={product._id} product={product} />
                      ))
                    ) : (
                      <div className="text-center py-5">
                        <h3>No products found</h3>
                        <p>Try adjusting your filters or search criteria</p>
                      </div>
                    )}
                  </div>

                  {/* Pagination */}
                  {resultPerPage && productsCount > resultPerPage && (
                    <div className="d-flex justify-content-center mt-5">
                      <nav>
                        <ul className="pagination">
                          {[
                            ...Array(Math.ceil(productsCount / resultPerPage)),
                          ].map((_, index) => (
                            <li
                              key={index + 1}
                              className={`page-item ${
                                currentPage === index + 1 ? "active" : ""
                              }`}
                            >
                              <button
                                className="page-link"
                                onClick={() => setCurrentPage(index + 1)}
                              >
                                {index + 1}
                              </button>
                            </li>
                          ))}
                        </ul>
                      </nav>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Products;
