const { ErrorHandler } = require("../error_handler/errorHandler");
const models = require("../models/index");
const { Categories } = models;

const categoryController = {
  createCategory: async function (req, res, next) {
    try {
      const { category_type } = req.body;
      const isExist = await Categories.exists({ category_type: category_type });
      if (isExist) {
        throw new ErrorHandler(409, "category type already exist");
      }

      const categories = await new Categories(req.body);
      categories.save();
      res.json("category added");
    } catch (error) {}
  },
};

module.exports = categoryController;
