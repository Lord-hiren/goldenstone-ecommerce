const jwt = require("jsonwebtoken");
const crypto = require("crypto");

const JWT_SECRET = process.env.JWT_SECRET;
const ENCRYPTION_KEY = process.env.ENCRYPTION_KEY;

// Function to generate and encrypt token
exports.generateAdminToken = (user) => {
  const token = jwt.sign(
    { id: user[0].id, username: user[0].user_name },
    JWT_SECRET,
    { algorithm: "HS256" }
  );

  const iv = crypto.randomBytes(16);
  const cipher = crypto.createCipheriv(
    "aes-256-cbc",
    Buffer.from(ENCRYPTION_KEY, "utf8"),
    iv
  );
  let encryptedToken = cipher.update(token, "utf8", "hex");
  encryptedToken += cipher.final("hex");

  return iv.toString("hex") + ":" + encryptedToken;
};
