const mongoose = require("mongoose");
const { Schema } = mongoose;

const categoriesSchema = new mongoose.Schema({
  _id: {
    type: String,
    require: true,
  },
  category_type: {
    type: String,
    require: true,
  },
  created_at: {
    type: Date,
    require: true,
    default: Date.now(),
  },
  task: {
    type: Schema.Types.String,
    ref: "task",
  },
});

const Categories = mongoose.model("categories", categoriesSchema);
module.exports = Categories;
