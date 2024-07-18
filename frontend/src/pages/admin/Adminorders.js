import React, { useEffect } from "react";
import AdminNav from "../../components/AdminNav";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { DELETE_ORDER_RESET } from "../../constants/orderConstants";
import { clearErrors, getAllOrders } from "../../actions/orderAction";
import Loader from "../../components/Loader";
import { useNavigate } from "react-router-dom";
import { DataGrid } from "@mui/x-data-grid";
import { Box, IconButton } from "@mui/material";
import VisibilityRoundedIcon from "@mui/icons-material/VisibilityRounded";

const Adminorders = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { isAuthenticated, user } = useSelector((state) => state.user);
  const { loading, error, orders } = useSelector((state) => state.allOrders);
  const {
    error: deleteError,
    isDeleted,
    isUpdated,
  } = useSelector((state) => state.order);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }

    if (deleteError) {
      toast.error(deleteError);
      dispatch(clearErrors());
    }

    if (isDeleted) {
      toast.success("Order deleted");
      dispatch({ type: DELETE_ORDER_RESET });
    }

    dispatch(getAllOrders());
  }, [dispatch, error, isDeleted, navigate, deleteError, isUpdated]);

  const handleEdit = (id) => {
    navigate(`/v1/admin/order/details/${id}`);
  };

  const columns = [
    { field: "id", headerName: "ID", width: 150 },
    { field: "city", headerName: "City", width: 100 },
    { field: "pinCode", headerName: "Pin Code", width: 100 },
    { field: "phoneNo", headerName: "Phone No", width: 150 },
    { field: "status", headerName: "Status", width: 100 },
    { field: "totalPrice", headerName: "Total Price", width: 150 },
    { field: "createdAt", headerName: "Created At", width: 200 },
    {
      field: "actions",
      headerName: "Actions",
      width: 150,
      renderCell: (params) => (
        <>
          <IconButton color="info" onClick={() => handleEdit(params.row.id)}>
            <VisibilityRoundedIcon />
          </IconButton>
        </>
      ),
    },
  ];

  const rows = orders?.map((order) => ({
    id: order._id,
    city: order.shippingInfo.city,
    pinCode: order.shippingInfo.pinCode,
    phoneNo: order.shippingInfo.phoneNo,
    status: order.orderStatus,
    totalPrice: order.totalPrice,
    createdAt: new Date(order.createdAt).toLocaleString(),
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
              <h3 className="py-1 m-0">List of all Orders</h3>

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
                rowsPerPageOptions={[10, 25, 50, 100]}
                checkboxSelection={false}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Adminorders;
