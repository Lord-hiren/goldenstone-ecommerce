const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET;

// Function to generate JWT token
exports.generateAdminToken = (user) => {
  try {
    return jwt.sign(
      {
        id: user.id,
        name: user.name,
        role: user.role,
      },
      JWT_SECRET,
      {
        expiresIn: "7d",
        algorithm: "HS256",
      }
    );
  } catch (error) {
    console.error("Error generating admin token:", error);
    return null;
  }
};

// Function to verify JWT token
exports.verifyAdminToken = (token) => {
  try {
    return jwt.verify(token, JWT_SECRET, { algorithms: ["HS256"] });
  } catch (error) {
    console.error("Error verifying admin token:", error);
    return null;
  }
};
