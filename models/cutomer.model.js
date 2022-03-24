const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const customerSchema = new Schema({
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  email: {
    type: String,
  },
  address: {
      type: String,
      default: null
  },
  password: {
    type: String,
  },
  saltPassword: {
    type: String,
  },
  isActive: {
    type: Boolean,
  },
  createAt: {
    type: Date,
    default: Date.now,
  },
  updateAt: {
    type: Date,
    default: Date.now,
  },
  deleteAt: {
    type: Date,
    default: null,
  },
});

module.exports = mongoose.model("Customer", customerSchema, "Customer");
