import { Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  clearErrors,
  getAdminProduct,
  getProductDetails,
  updateProduct,
} from "../../actions/productActions";
import { toast } from "react-toastify";
import { UPDATE_PRODUCT_RESET } from "../../constants/productConstants";
import AdminNav from "../../components/AdminNav";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const AdminEditproduct = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();

  const id = params.id;

  const { error, product, loading } = useSelector(
    (state) => state.productDetail
  );
  const { error: updateError, isUpdated } = useSelector(
    (state) => state.product
  );

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [stock, setStock] = useState("");
  const [images, setImages] = useState([]);
  const [oldImages, setOldImages] = useState([]);

  useEffect(() => {
    if (product && product._id !== id) {
      dispatch(getProductDetails(id));
    } else {
      setName(product.name);
      setDescription(product.description);
      setPrice(product.price);
      setCategory(product.category);
      setStock(product.stock);
      setOldImages(product.images);
    }
  }, [product, dispatch, id]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = {
      name,
      description,
      price,
      category,
      stock,
      images,
    };

    dispatch(updateProduct(id, formData));
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);

    const promises = files.map((file) => {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (event) => {
          resolve(event.target.result);
        };
        reader.onerror = reject;
        reader.readAsDataURL(file);
      });
    });

    Promise.all(promises)
      .then((base64Files) => {
        setImages(base64Files);
      })
      .catch((error) => {
        console.error("Error converting files to base64", error);
      });
  };

  useEffect(() => {
    if (updateError) {
      toast.error(updateError);
      dispatch(clearErrors());
    }
    if (isUpdated) {
      toast.success("Product updated successfully");
      dispatch({ type: UPDATE_PRODUCT_RESET });
      dispatch(getAdminProduct());
      navigate("/v1/admin/products");
    }
  }, [updateError, isUpdated, dispatch, navigate]);

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
                  encType="multipart/form-data"
                >
                  <label htmlFor="name">Name: </label> <br />
                  <input
                    type="text"
                    className="input"
                    autoComplete="off"
                    placeholder="Name"
                    name="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />{" "}
                  <br />
                  <label htmlFor="description">Description: </label> <br />
                  <input
                    type="text"
                    className="input"
                    autoComplete="off"
                    placeholder="Description"
                    name="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                  />{" "}
                  <br />
                  <label htmlFor="price">Price: </label> <br />
                  <input
                    type="text"
                    className="input"
                    autoComplete="off"
                    placeholder="Price"
                    name="price"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    required
                  />{" "}
                  <br />
                  <label htmlFor="category">Category: </label> <br />
                  <input
                    type="text"
                    className="input"
                    autoComplete="off"
                    placeholder="Category"
                    name="category"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    required
                  />{" "}
                  <br />
                  <label htmlFor="stock">Stock: </label> <br />
                  <input
                    type="text"
                    className="input"
                    autoComplete="off"
                    placeholder="Stock"
                    name="stock"
                    value={stock}
                    onChange={(e) => setStock(e.target.value)}
                    required
                  />{" "}
                  <br />
                  <input type="file" multiple onChange={handleImageChange} />
                  <div className="old-images">
                    {oldImages &&
                      oldImages.map((image) => (
                        <img
                          key={image.url}
                          src={image.url}
                          className="img-fluid privew-img"
                          alt="Old product"
                        />
                      ))}
                  </div>
                  <div className="new-images">
                    {images &&
                      images.map((image, index) => (
                        <img key={index} src={image} alt="New product" />
                      ))}
                  </div>
                  {loading ? (
                    <Button
                      variant="contained"
                      className="btn-lg-main"
                      type="submit"
                      disabled
                    >
                      Submit
                    </Button>
                  ) : (
                    <Button
                      variant="contained"
                      className="btn-lg-main"
                      type="submit"
                    >
                      Submit
                    </Button>
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

export default AdminEditproduct;
