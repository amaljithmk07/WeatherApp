const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decodedtoken = jwt.verify(token, "this_should_be_secret");

    req.userData = {
      UserId: decodedtoken.UserId,
      UserEmail: decodedtoken.UserEmail,
    };
    console.log("req,userData:", req.userData);

    next();
  } catch (err) {
    return res.status(401).json({
      success: false,
      error: true,
      message: "Auth Failed",
      message: err.message,
    });
  }
};
