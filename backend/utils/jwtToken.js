// utils/jwtToken.js

const sendToken = (user, res) => {
  try {
    const token = user.getJWTToken();

    console.log(token);

    res.json({
      success: true,
      user,
      token,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal Server Error" });
    console.log(error);
  }
};

module.exports = sendToken;
