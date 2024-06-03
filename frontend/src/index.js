import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { GoogleOAuthProvider } from "@react-oauth/google"; // Google OAuth provider
import { Provider } from "react-redux";
import store from "./store";
import { CookiesProvider } from "react-cookie";
import { ToastContainer, Flip } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Get the root element to mount the React app
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLINT_ID}>
        <CookiesProvider defaultSetOptions={{ path: "/" }}>
          <App />
          <ToastContainer
            position="top-center"
            autoClose={3000}
            hideProgressBar
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="colored"
            transition={Flip}
          />
        </CookiesProvider>
      </GoogleOAuthProvider>
    </Provider>
  </React.StrictMode>
);

// Measure app performance
reportWebVitals();
