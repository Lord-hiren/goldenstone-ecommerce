import axios from "axios";
import Cookies from "js-cookie";

// Create axios instance with default config
const api = axios.create({
  baseURL: `${process.env.REACT_APP_API}/api/v1`,
  withCredentials: true,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    // Add auth token to headers
    const token = Cookies.get("adminToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => {
    // Extract data from response
    return response.data;
  },
  (error) => {
    // Handle network errors
    if (!error.response) {
      return Promise.reject({
        message: "Network error. Please check your connection.",
      });
    }

    // Handle authentication errors (401 Unauthorized)
    if (error.response.status === 401) {
      if (!window.location.pathname.includes("/login")) {
        window.location.href = "/login";
      }
    }

    // Return error message
    return Promise.reject({
      message: error.response.data.message || "An error occurred",
    });
  }
);

// API endpoints
const endpoints = {
  auth: {
    login: (data) => api.post("/admin/login", data),
    logout: () => api.post("/admin/logout"),
  },
  products: {
    list: () => api.get("/admin/products"),
    create: (data) => api.post("/admin/product/new", data),
    update: (id, data) => api.put(`/admin/product/${id}`, data),
    delete: (id) => api.delete(`/admin/product/${id}`),
    getById: (id) => api.get(`/admin/product/${id}`),
  },
  users: {
    list: () => api.get("/admin/users"),
    update: (id, data) => api.put(`/admin/user/${id}`, data),
    delete: (id) => api.delete(`/admin/user/${id}`),
    getById: (id) => api.get(`/admin/user/${id}`),
  },
  orders: {
    list: () => api.get("/admin/orders"),
    update: (id, data) => api.put(`/admin/order/${id}`, data),
    delete: (id) => api.delete(`/admin/order/${id}`),
    getById: (id) => api.get(`/admin/order/${id}`),
  },
  events: {
    list: () => api.get("/admin/events"),
    create: (data) => api.post("/admin/event/new", data),
    update: (id, data) => api.put(`/admin/event/${id}`, data),
    delete: (id) => api.delete(`/admin/event/${id}`),
    getById: (id) => api.get(`/admin/event/${id}`),
    getActive: () => api.get("/events/active"),
  },
  dashboard: {
    stats: () => api.get("/admin/dashboard/stats"),
    salesChart: () => api.get("/admin/dashboard/sales-chart"),
    ordersChart: () => api.get("/admin/dashboard/orders-chart"),
    stockStatus: () => api.get("/admin/dashboard/stock-status"),
  },
};

export { api, endpoints };
