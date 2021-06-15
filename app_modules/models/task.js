const mongoose = require("mongoose");
const { Schema } = mongoose;

const taskSchema = new mongoose.Schema({
  uid: {
    type: String,
    require: true,
  },
  cid: {
    type: String,
    require: true,
  },
  task_name: {
    type: String,
    require: true,
  },
  created_at: {
    type: Date,
    require: true,
    default: Date.now(),
  },
});

const TaskInfo = mongoose.model("task", taskSchema);
module.exports = TaskInfo;
