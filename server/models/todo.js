const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const todoSchema = new Schema({
  item: {
    type: String,
    trim: true,
    required: true,
    default: ""
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Todo", todoSchema);
