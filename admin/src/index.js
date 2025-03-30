import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import store from "./store/store";
import App from "./App";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";
import "./App.scss";

// Clear the existing HTML content
document.getElementById("root").innerHTML = "";

// Create root
const root = createRoot(document.getElementById("root"));

// Initial render
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
