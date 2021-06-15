const mongoose = require("mongoose");
const models = require("../models/index");
const { UserInfo } = models;
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

let refreshTokenList = [];
exports.isUserExist = async (uid) => {
  try {
    const isExist = await UserInfo.exists({ _id: uid });
    return isExist;
  } catch (error) {
    return false;
  }
};

exports.hashPassword = async (password) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);
    return hashPassword;
  } catch (error) {
    return null;
  }
};

exports.validatePassword = async (uid, userPassword) => {
  try {
    const { password } = await UserInfo.findById({ _id: uid }, "password");
    const isMatch = await bcrypt.compare(userPassword, password);
    return isMatch;
  } catch (error) {
    return false;
  }
};

exports.createJwtTokens = async (uid) => {
  try {
    const userData = {
      uid: uid,
      createAt: Date.now(),
    };

    const refresh_token = jwt.sign(userData, process.env.ACCESS_TOKEN_SECRET, { expiresIn: process.env.TOKEN_EXPIRY });
    const access_token = jwt.sign(userData, process.env.ACCESS_TOKEN_SECRET, { expiresIn: process.env.TOKEN_EXPIRY });
    return { refreshToken: refresh_token, accessToken: access_token };
  } catch (error) {
    return null;
  }
};

exports.jwtVerify = async (token) => {
  const userData = await jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
  return userData;
};
