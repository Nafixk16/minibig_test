const mongoose = require("mongoose");
const models = require("../models/index");
const { Task, Categories } = models;

const taskController = {
  createTask: async function (req, res, next) {
    try {
      const { category_type } = req.body;

      const categories = await Categories.find({ category_type: category_type });
      console.log("categoeis=>", categories);
      res.json("task added");
    } catch (error) {
      next(error);
    }
  },
};
