import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { GoogleOAuthProvider } from "@react-oauth/google"; // Google OAuth provider
import { Provider } from "react-redux";
import store from "./store";
import { CookiesProvider } from "react-cookie";

// Get the root element to mount the React app
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLINT_ID}>
        <CookiesProvider defaultSetOptions={{ path: "/" }}>
          <App />
        </CookiesProvider>
      </GoogleOAuthProvider>
    </Provider>
  </React.StrictMode>
);

// Measure app performance
reportWebVitals();
