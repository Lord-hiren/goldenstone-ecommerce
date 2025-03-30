import React, { useState, useEffect } from "react";
import { FaPlus, FaEdit, FaTrash, FaSearch } from "react-icons/fa";
import { toast } from "react-toastify";
import axios from "axios";
import { Modal, Button, Form, Table, Spinner, Badge } from "react-bootstrap";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const [currentProduct, setCurrentProduct] = useState({
    name: "",
    price: "",
    stock: "",
    category: "",
    description: "",
    image: null,
  });

  useEffect(() => {
    fetchProducts();
  }, []);

  // Fetch Products
  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `${process.env.REACT_APP_API}/admin/products`
      );
      if (response.data.success) {
        setProducts(response.data.products || []);
      } else {
        toast.error(response.data.message || "Failed to fetch products");
      }
    } catch (error) {
      toast.error(error.message || "Failed to fetch products");
    } finally {
      setLoading(false);
    }
  };

  // Handle Input Change
  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    setCurrentProduct((prev) => ({
      ...prev,
      [name]: name === "image" && files?.length > 0 ? files[0] : value,
    }));
  };

  // Handle Form Submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      Object.keys(currentProduct).forEach((key) => {
        if (key === "image" && currentProduct[key]) {
          formData.append("images", currentProduct[key]);
        } else {
          formData.append(key, currentProduct[key]);
        }
      });

      let response;
      if (isEditing) {
        response = await axios.put(
          `${process.env.REACT_APP_API}/admin/product/${currentProduct._id}`,
          formData
        );
      } else {
        response = await axios.post(
          `${process.env.REACT_APP_API}/admin/product/new`,
          formData
        );
      }

      if (response.data.success) {
        toast.success(
          response.data.message ||
            `Product ${isEditing ? "updated" : "created"} successfully`
        );
        fetchProducts();
        handleCloseModal();
      } else {
        toast.error(response.message || "Operation failed");
      }
    } catch (error) {
      toast.error(error.message || "Operation failed");
    }
  };

  // Handle Edit Product
  const handleEdit = async (product) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API}/admin/product/${product._id}`
      );
      if (response.data.success) {
        setCurrentProduct({ ...response.data.product, image: null });
        setIsEditing(true);
        setShowModal(true);
      } else {
        toast.error(response.data.message || "Failed to load product");
      }
    } catch (error) {
      toast.error(error.message || "Failed to load product");
    }
  };

  // Handle Delete Product
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        const response = await axios.delete(
          `${process.env.REACT_APP_API}/admin/product/${id}`
        );
        if (response.data.success) {
          toast.success(
            response.data.message || "Product deleted successfully"
          );
          fetchProducts();
        } else {
          toast.error(response.data.message || "Failed to delete product");
        }
      } catch (error) {
        toast.error(error.message || "Failed to delete product");
      }
    }
  };

  // Reset and Close Modal
  const handleCloseModal = () => {
    setCurrentProduct({
      name: "",
      price: "",
      stock: "",
      category: "",
      description: "",
      image: null,
    });
    setIsEditing(false);
    setShowModal(false);
  };

  // Filtered Products List
  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="py-4 fade-in">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Products Management</h2>
        <Button variant="primary" onClick={() => setShowModal(true)}>
          <FaPlus className="me-2" />
          Add New Product
        </Button>
      </div>

      {/* Search Bar */}
      <div className="mb-4">
        <div className="input-group">
          <span className="input-group-text">
            <FaSearch />
          </span>
          <input
            type="text"
            className="form-control"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Loader */}
      {loading ? (
        <div
          className="d-flex justify-content-center align-items-center"
          style={{ height: "60vh" }}
        >
          <Spinner animation="border" variant="primary" />
        </div>
      ) : (
        <div className="table-responsive">
          <Table hover bordered>
            <thead>
              <tr>
                <th>Image</th>
                <th>Name</th>
                <th>Category</th>
                <th>Price</th>
                <th>Stock</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.map((product) => (
                <tr key={product._id}>
                  <td>
                    <img
                      src={product.images[0]?.url || "/placeholder.png"}
                      alt={product.name}
                      style={{
                        width: "50px",
                        height: "50px",
                        objectFit: "cover",
                      }}
                      className="rounded"
                    />
                  </td>
                  <td>{product.name}</td>
                  <td>{product.category}</td>
                  <td>${product.price.toFixed(2)}</td>
                  <td>
                    <Badge
                      bg={
                        product.stock > 10
                          ? "success"
                          : product.stock > 0
                          ? "warning"
                          : "danger"
                      }
                    >
                      {product.stock}
                    </Badge>
                  </td>
                  <td>
                    <Button
                      variant="outline-primary"
                      size="sm"
                      className="me-2"
                      onClick={() => handleEdit(product)}
                    >
                      <FaEdit />
                    </Button>
                    <Button
                      variant="outline-danger"
                      size="sm"
                      onClick={() => handleDelete(product._id)}
                    >
                      <FaTrash />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      )}

      {/* Add/Edit Product Modal */}
      <Modal show={showModal} onHide={handleCloseModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>
            {isEditing ? "Edit Product" : "Add New Product"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Product Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={currentProduct.name}
                onChange={handleInputChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Category</Form.Label>
              <Form.Select
                name="category"
                value={currentProduct.category}
                onChange={handleInputChange}
                required
              >
                <option value="">Select Category</option>
                <option value="Rings">Rings</option>
                <option value="Necklaces">Necklaces</option>
                <option value="Earrings">Earrings</option>
                <option value="Bracelets">Bracelets</option>
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Price ($)</Form.Label>
              <Form.Control
                type="number"
                name="price"
                value={currentProduct.price}
                onChange={handleInputChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Stock</Form.Label>
              <Form.Control
                type="number"
                name="stock"
                value={currentProduct.stock}
                onChange={handleInputChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="description"
                value={currentProduct.description}
                onChange={handleInputChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Product Image</Form.Label>
              <Form.Control
                type="file"
                name="image"
                onChange={handleInputChange}
                accept="image/*"
                required={!isEditing}
              />
            </Form.Group>

            <Button variant="primary" type="submit">
              {isEditing ? "Update Product" : "Add Product"}
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default Products;
