// utils/jwtToken.js

const sendToken = (user, res) => {
  try {
    const token = user.getJWTToken();
    res.json({
      success: true,
      user,
      token,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

module.exports = sendToken;
