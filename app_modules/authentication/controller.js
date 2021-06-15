const mongoose = require("mongoose");
const authHelper = require("../helper/auth.helper");
const { ErrorHandler } = require("../error_handler/errorHandler");
const UserInfo = require("../models/user");

const authController = {
  userLogin: async function (req, res, next) {
    try {
      const { email, password } = req.body;
      const isUserExist = await authHelper.isUserExist(email);
      console.log(isUserExist);

      if (!isUserExist) {
        throw new ErrorHandler(401, "Invalid Email or Password");
      }

      const isPasswordValid = await authHelper.validatePassword(email, password);
      console.log(isPasswordValid);
      if (!isPasswordValid) {
        throw new ErrorHandler(401, "Invalid Email or Password");
      }

      const tokens = authHelper.createJwtTokens(email);
      const response = {
        ...tokens,
        success: true,
      };
      return res.json(response);
    } catch (error) {
      next(error);
    }
  },

  userRegister: async function (req, res, next) {
    try {
      const { name, password, email } = req.body;

      const isUserExist = await authHelper.isUserExist(email);
      if (isUserExist) {
        throw new ErrorHandler(409, "User Already Exist");
      }

      const hashPassword = await authHelper.hashPassword(password);
      if (!hashPassword) {
        throw new ErrorHandler(500, "Partial Service Outage");
      }

      req.body._id = email;
      req.body.password = hashPassword;

      const registerUser = await new UserInfo(req.body);
      registerUser.save();
      return res.json("Registered Successfully");
    } catch (error) {
      next(error);
    }
  },
};

module.exports = authController;
