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

function App() {
  return (
    <>
      <BrowserRouter>
        <Nav />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/v1/admin/dashbord" element={<Admin />} />
          <Route path="/v1/admin/users" element={<AdminUsers />} />
          <Route path="/v1/admin/products" element={<AdminProducts />} />
          <Route path="/v1/admin/add/products" element={<AddNewProducts />} />
          <Route
            path="/v1/admin/edit/products/:id"
            element={<AdminEditproduct />}
          />
          {/* <Route path="/v1/admin/orders" element={<Adminorders />} /> */}

          <Route path="*" element={<Error />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
