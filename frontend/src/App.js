import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "./App.scss";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Nav from "./components/Nav";
import Error from "./pages/Error";
import Admin from "./pages/admin/Admin";
import AdminUsers from "./pages/admin/AdminUsers";
import AdminProducts from "./pages/admin/AdminProducts";
import AddNewProducts from "./pages/admin/AddNewProducts";
import AdminEditproduct from "./pages/admin/AdminEditproduct";
import Footer from "./components/Footer";
import Products from "./pages/Products";
import ProductDetail from "./pages/ProductDetail";
import Cart from "./pages/Cart";
import Shipping from "./pages/Shipping";
import OrderConfirm from "./pages/OrderConfirm";
import OrderPlace from "./pages/OrderPlace";
import Profile from "./pages/Profile";
import ProtectedRoute from "./components/route/ProtectedRoute";
import Adminorders from "./pages/admin/Adminorders";
import AdminOrderDetails from "./pages/admin/AdminOrderDetails";
import TermsAndConditions from "./pages/TermsAndConditions";
import RefundPolicy from "./pages/RefundPolicy";
import AboutUs from "./pages/AboutUs";

function App() {
  return (
    <>
      <BrowserRouter>
        <Nav />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/:keyword" element={<Products />} />
          <Route path="/product/detail/:id" element={<ProductDetail />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/shipping" element={<Shipping />} />
          <Route path="/order/confirm" element={<OrderConfirm />} />
          <Route path="/payment" element={<OrderPlace />} />
          <Route path="/profile" element={<Profile />} />

          <Route path="/t&c" element={<TermsAndConditions />} />
          <Route path="/refundpolicy" element={<RefundPolicy />} />
          <Route path="/about" element={<AboutUs />} />

          <Route
            path="/v1/admin/dashboard"
            element={
              <ProtectedRoute>
                <Admin />
              </ProtectedRoute>
            }
          />
          <Route
            path="/v1/admin/users"
            element={
              <ProtectedRoute>
                <AdminUsers />
              </ProtectedRoute>
            }
          />
          <Route
            path="/v1/admin/products"
            element={
              <ProtectedRoute>
                <AdminProducts />
              </ProtectedRoute>
            }
          />
          <Route
            path="/v1/admin/add/products"
            element={
              <ProtectedRoute>
                <AddNewProducts />
              </ProtectedRoute>
            }
          />
          <Route
            path="/v1/admin/edit/products/:id"
            element={
              <ProtectedRoute>
                <AdminEditproduct />
              </ProtectedRoute>
            }
          />
          <Route
            path="/v1/admin/orders"
            element={
              <ProtectedRoute>
                <Adminorders />
              </ProtectedRoute>
            }
          />

          <Route
            path="/v1/admin/order/details/:id"
            element={
              <ProtectedRoute>
                <AdminOrderDetails />
              </ProtectedRoute>
            }
          />

          <Route path="*" element={<Error />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
