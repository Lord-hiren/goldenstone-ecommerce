require("dotenv").config({ path: "./.env" });
const express = require("express");
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const path = require("path");
const errorMiddleware = require("./middleware/error");

app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/images", express.static(path.join(__dirname, "../images")));

// Ensure product image directory exists
const productImgDir = path.join(__dirname, "../images/productimg");
if (!require("fs").existsSync(productImgDir)) {
  require("fs").mkdirSync(productImgDir, { recursive: true });
}

// Configure CORS for frontend and admin panel
app.use(
  cors({
    origin: "*",
    optionsSuccessStatus: 200,
  })
);

// Route Imports
const product = require("./routes/productRoute");
const user = require("./routes/userRoute");
const order = require("./routes/orderRoute");
const paymentRoutes = require("./routes/paymentRoutes");
const dashboard = require("./routes/dashboardRoute");
const event = require("./routes/eventRoute");

// API Routes
app.use("/api/v1", product);
app.use("/api/v1", user);
app.use("/api/v1", order);
app.use("/api/v1/admin/dashboard", dashboard);
app.use("/api/v1", event);
app.use("/api", paymentRoutes);

app.get("/", (req, res) => {
  res.json({ status: "success" });
});
// Serve frontend in production
// if (process.env.NODE_ENV === "PRODUCTION") {
//   // Serve frontend
//   app.use(express.static(path.join(__dirname, "../frontend/build")));
//   app.get("/", (req, res) => {
//     res.sendFile(path.resolve(__dirname, "../frontend/build/index.html"));
//   });

//   // Serve admin panel
//   app.use("/admin", express.static(path.join(__dirname, "../admin/build")));
//   app.get("/admin/*", (req, res) => {
//     res.sendFile(path.resolve(__dirname, "../admin/build/index.html"));
//   });

//   // // Handle other routes
//   // app.get("*", (req, res) => {
//   //   if (req.url.startsWith("/admin")) {
//   //     res.sendFile(path.resolve(__dirname, "../admin/build/index.html"));
//   //   } else {
//   //     res.sendFile(path.resolve(__dirname, "../frontend/build/index.html"));
//   //   }
//   // });
// }

// Middleware for Errors
app.use(errorMiddleware);

module.exports = app;
