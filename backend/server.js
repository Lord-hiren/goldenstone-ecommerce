const app = require("./app");
const connectDatabase = require("./config/database");
const https = require("https");
const http = require("http");
const fs = require("fs");

// Handling Uncaught Exception
process.on("uncaughtException", (err) => {
  console.log(`Error: ${err.message}`);
  console.log(`Shutting down due to Uncaught Exception`);
  process.exit(1);
});

// Connect to database
connectDatabase();

const PORT = process.env.PORT;
const NODE_ENV = process.env.NODE_ENV || "development";

let server;

console.log(PORT);

if (NODE_ENV === "PRODUCTION") {
  // Path to Let's Encrypt SSL certificates
  const sslOptions = {
    key: fs.readFileSync(
      "/etc/letsencrypt/live/api.royalcrownjewellery.in/privkey.pem"
    ),
    cert: fs.readFileSync(
      "/etc/letsencrypt/live/api.royalcrownjewellery.in/fullchain.pem"
    ),
  };

  server = https.createServer(sslOptions, app).listen(443, () => {
    console.log(
      `🚀 HTTPS server running on https://api.royalcrownjewellery.in`
    );
  });
} else {
  server = http.createServer(app).listen(PORT, () => {
    console.log(`🚀 HTTP server running on http://localhost:${PORT}`);
  });
}

// Handle Unhandled Promise Rejections
process.on("unhandledRejection", (err) => {
  console.log(`Error: ${err.message}`);
  console.log(`Shutting down due to Unhandled Promise Rejection`);

  server.close(() => {
    process.exit(1);
  });
});
