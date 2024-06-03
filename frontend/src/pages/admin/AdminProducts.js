import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../components/Loader";
import AdminNav from "../../components/AdminNav";
import { DataGrid } from "@mui/x-data-grid";
import { useNavigate } from "react-router-dom";
import { IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { getAdminProduct } from "../../actions/productActions";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";

const AdminProducts = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, isAuthenticated } = useSelector((state) => state.user);
  const { error, products } = useSelector((state) => state.products);

  console.log(products);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/");
    } else {
      dispatch(getAdminProduct());
    }
  }, [dispatch, isAuthenticated, navigate]);

  const handleDelete = (id) => {
    console.log("Delete product with ID:", id);
    // Dispatch an action to delete the product
  };

  const handleEdit = (id) => {
    navigate(`/v1/admin/product/edit/${id}`);
  };

  const columns = [
    { field: "id", headerName: "ID", width: 150 },
    { field: "name", headerName: "Name", width: 200 },
    { field: "description", headerName: "Description", width: 200 },
    { field: "price", headerName: "Price", width: 100 },
    { field: "category", headerName: "Category", width: 150 },
    { field: "stock", headerName: "Stock", width: 100 },
    {
      field: "actions",
      headerName: "Actions",
      width: 150,
      renderCell: (params) => (
        <>
          <IconButton color="primary" onClick={() => handleEdit(params.row.id)}>
            <EditIcon />
          </IconButton>
          <IconButton color="error" onClick={() => handleDelete(params.row.id)}>
            <DeleteIcon />
          </IconButton>
        </>
      ),
    },
  ];

  const rows =
    products &&
    products.map((product) => ({
      id: product._id,
      name: product.name,
      description: product.description,
      price: product.price,
      category: product.category,
      stock: product.stock,
    }));

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="container">
          <div className="row">
            <AdminNav />
            <div className="col-9 py-5">
              <h3 className="py-1 m-0">List of all Products</h3>
              <div
                className="py-3"
                onClick={() => navigate("/v1/admin/add/products")}
              >
                <Button variant="contained" startIcon={<AddIcon />}>
                  Add new product
                </Button>
              </div>
              <DataGrid
                className="custom-data-grid"
                rows={rows}
                columns={columns}
                autoHeight
                initialState={{
                  pagination: {
                    paginationModel: { page: 0, pageSize: 10 },
                  },
                }}
                pageSizeOptions={[10, 25, 50, 100]}
                checkboxSelection={false}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AdminProducts;
