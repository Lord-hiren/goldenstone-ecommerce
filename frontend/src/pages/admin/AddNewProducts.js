import { Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { clearErrors, createProduct } from "../../actions/productActions";
import { toast } from "react-toastify";
import { NEW_PRODUCT_RESET } from "../../constants/productConstants";
import AdminNav from "../../components/AdminNav";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const AddNewProducts = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { error, success, loading } = useSelector((state) => state.newProduct);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [stock, setStock] = useState("");
  const [images, setImages] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("price", price);
    formData.append("category", category);
    formData.append("stock", stock);
    images.forEach((image) => {
      formData.append("images", image);
    });

    dispatch(createProduct(formData));
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    files.forEach((file) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImages((prevFiles) => [...prevFiles, reader.result]);
      };
      reader.readAsDataURL(file);
    });
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }

    if (success) {
      toast.success("Product added successfully");
      dispatch({ type: NEW_PRODUCT_RESET });
      navigate(-1);
    }
  }, [error, dispatch, success, navigate]);

  return (
    <>
      <div className="container">
        <div className="row">
          <AdminNav />
          <div className="col-9 py-5">
            <div className="row">
              <div className="col-lg-8 col-12 mx-auto pt-5">
                <Button onClick={() => navigate("/v1/admin/products")}>
                  <ArrowBackIcon />
                </Button>
                <form
                  className="mt-4"
                  onSubmit={handleSubmit}
                  enctype="multipart/form-data"
                >
                  <input
                    type="text"
                    className="input"
                    placeholder="Name"
                    name="name"
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                  <input
                    type="text"
                    className="input"
                    placeholder="Description"
                    name="description"
                    onChange={(e) => setDescription(e.target.value)}
                    required
                  />
                  <input
                    type="text"
                    className="input"
                    placeholder="Price"
                    name="price"
                    onChange={(e) => setPrice(e.target.value)}
                    required
                  />
                  <input
                    type="text"
                    className="input"
                    placeholder="Category"
                    name="category"
                    onChange={(e) => setCategory(e.target.value)}
                    required
                  />
                  <input
                    type="text"
                    className="input"
                    placeholder="Stock"
                    name="stock"
                    onChange={(e) => setStock(e.target.value)}
                    required
                  />
                  <input
                    type="file"
                    onChange={handleImageChange}
                    multiple="multiple"
                  />

                  {loading === true ? (
                    <>
                      <Button
                        variant="contained"
                        className="btn-lg-main"
                        type="submit"
                        disabled
                      >
                        Submit
                      </Button>
                    </>
                  ) : (
                    <>
                      <Button
                        variant="contained"
                        className="btn-lg-main"
                        type="submit"
                      >
                        Submit
                      </Button>
                    </>
                  )}
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddNewProducts;
