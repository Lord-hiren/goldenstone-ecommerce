require("dotenv").config();
const app = require("./app");
const connectDatabase = require("./config/database");
const https = require("https");

// Handling Uncaught Exception
process.on("uncaughtException", (err) => {
  console.log(`Error: ${err.message}`);
  console.log(`Shutting down the server due to Uncaught Exception`);
  process.exit(1);
});

// Connecting to database
connectDatabase();

const port = process.env.PORT || 4000;

if (process.env.NODE_ENV === "PRODUCTION") {
  https.createServer(options, app).listen(4000, () => {
    console.log("Server is running on https://royalcrownjewellery.in:4000");
  });
} else {
  const server = app.listen(port, () => {
    console.log(`Server is working on http://localhost:${port}`);
  });
}

// Unhandled Promise Rejection
process.on("unhandledRejection", (err) => {
  console.log(`Error: ${err.message}`);
  console.log(`Shutting down the server due to Unhandled Promise Rejection`);

  server.close(() => {
    process.exit(1);
  });
});
