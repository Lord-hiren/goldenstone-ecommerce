const jwt = require("jsonwebtoken");
const crypto = require("crypto");

const JWT_SECRET = process.env.JWT_SECRET;
const ENCRYPTION_KEY = process.env.ENCRYPTION_KEY;

// Middleware to authenticate token
exports.authenticateAdminToken = (req, res, next) => {
  const authHeader = req.headers["x-auth"];
  const token = authHeader;
  if (!token)
    return res.send({ status: "error", message: "Unauthorised Access." });

  const parts = token.split(":");
  if (parts.length !== 2) {
    return res.send({ status: "error", message: "Invalid token format." });
  }

  const iv = Buffer.from(parts[0], "hex");
  const encryptedToken = parts[1];

  const decipher = crypto.createDecipheriv(
    "aes-256-cbc",
    Buffer.from(ENCRYPTION_KEY, "utf8"),
    iv
  );
  let decryptedToken;
  try {
    decryptedToken = decipher.update(encryptedToken, "hex", "utf8");
    decryptedToken += decipher.final("utf8");
  } catch (err) {
    return res.send({ status: "error", message: "Invalid Token" });
  }

  jwt.verify(
    decryptedToken,
    JWT_SECRET,
    { algorithms: ["HS256"] },
    (err, user) => {
      if (err) return res.send({ status: "error", message: "Invalid Token" });
      req.user = user;
      next();
    }
  );
};
