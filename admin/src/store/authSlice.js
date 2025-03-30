import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

const token = Cookies.get("adminToken");
const user = Cookies.get("adminUser")
  ? JSON.parse(Cookies.get("adminUser"))
  : null;

const initialState = {
  user: user,
  token: token,
  isAuthenticated: !!token,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    loginSuccess: (state, action) => {
      state.loading = false;
      state.isAuthenticated = true;
      state.user = action.payload.user;
      state.token = action.payload.token;
      // Set cookies with expiry of 7 days
      Cookies.set("adminToken", action.payload.token, {
        expires: 7,
        secure: true,
      });
      Cookies.set("adminUser", JSON.stringify(action.payload.user), {
        expires: 7,
        secure: true,
      });
    },
    loginFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.isAuthenticated = false;
      state.user = null;
      state.token = null;
      Cookies.remove("adminToken");
      Cookies.remove("adminUser");
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      state.token = null;
      Cookies.remove("adminToken");
      Cookies.remove("adminUser");
    },
    clearError: (state) => {
      state.error = null;
    },
  },
});

export const { loginStart, loginSuccess, loginFailure, logout, clearError } =
  authSlice.actions;
export default authSlice.reducer;
