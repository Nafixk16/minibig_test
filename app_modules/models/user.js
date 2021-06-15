const mongoose = require("mongoose");
const { Schema } = mongoose;

const userInfoSchema = new mongoose.Schema({
  _id: {
    type: String,
    require: true,
  },
  name: {
    type: String,
    require: true,
  },
  password: {
    type: String,
    require: true,
  },
  categories: {
    type: Schema.Types.String,
    ref: "categories",
  },
  task: {
    type: Schema.Types.String,
    ref: "task",
  },
});

const UserInfo = mongoose.model("user_info", userInfoSchema);
module.exports = UserInfo;
