const jwt = require("jsonwebtoken");
const { ErrorHandler } = require("../app_modules/error_handler/errorHandler");
const authHelper = require("../app_modules/helper/auth.helper");

const { jwtVerify } = authHelper;

exports.verifyUser = async (req, res, next) => {
  try {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) {
      console.log("sss");
      throw new ErrorHandler(401, "Unauthorized to Access");
    }

    const decodedData = await jwtVerify(token);
    req.decoded = decodedData;
    next();
  } catch (error) {
    next(error);
  }
};
