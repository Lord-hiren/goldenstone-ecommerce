import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../components/Loader";
import AdminNav from "../../components/AdminNav";
import { DataGrid } from "@mui/x-data-grid";
import { useNavigate } from "react-router-dom";
import {
  clearErrors,
  deleteUser,
  getAllUsers,
  updateUser,
} from "../../actions/userAction";
import { IconButton, Switch } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  CLEAR_ERRORS,
  DELETE_USER_RESET,
  UPDATE_USER_RESET,
} from "../../constants/userConstants";
import { toast } from "react-toastify";

const AdminUsers = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, isAuthenticated } = useSelector((state) => state.user);
  const { error, users } = useSelector((state) => state.allUsers);
  const {
    error: deleteError,
    isDeleted,
    isUpdated,
  } = useSelector((state) => state.userProfile);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/");
    }
  }, [dispatch, isAuthenticated, navigate]);

  const handleDelete = (id) => {
    dispatch(deleteUser(id));
  };

  const handleRoleChange = (id, event) => {
    const role = event.target.checked ? "admin" : "user";
    // Dispatch an action to change the user role
    const myForm = new FormData();

    myForm.set("role", role);
    dispatch(updateUser(id, myForm));
  };

  const columns = [
    { field: "id", headerName: "ID", width: 150 },
    { field: "name", headerName: "UserName", width: 150 },
    { field: "email", headerName: "Email address", width: 250 },
    {
      field: "role",
      headerName: "Role",
      width: 150,
      renderCell: (params) => (
        <Switch
          checked={params.row.role === "admin"}
          onChange={(event) => handleRoleChange(params.row.id, event)}
          color="primary"
        />
      ),
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 150,
      renderCell: (params) => (
        <>
          <IconButton color="error" onClick={() => handleDelete(params.row.id)}>
            <DeleteIcon />
          </IconButton>
        </>
      ),
    },
  ];

  const rows =
    users &&
    users.map((user) => ({
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    }));

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }

    if (deleteError) {
      toast.error(deleteError);
      dispatch(CLEAR_ERRORS());
    }

    if (isDeleted) {
      toast.success("User deleted");
      dispatch(getAllUsers());
      dispatch({ type: DELETE_USER_RESET });
    }

    if (isUpdated) {
      toast.success("User updated");
      dispatch(getAllUsers());
      dispatch({ type: UPDATE_USER_RESET });
    }
    dispatch(getAllUsers());
  }, [error, dispatch, isDeleted, deleteError, navigate, isUpdated]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="container">
          <div className="row">
            <AdminNav />
            <div className="col-9 py-5">
              <h3 className="py-2">List of all users</h3>
              <DataGrid
                className="custom-data-grid"
                rows={rows}
                columns={columns}
                autoHeight // This prop ensures the DataGrid height adjusts based on content
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

export default AdminUsers;
