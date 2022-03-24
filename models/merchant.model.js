const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const merchantSchema = new Schema({
  merchantName: {
    type: String,
  },
  email: {
    type: String,
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

module.exports = mongoose.model("Merchant", merchantSchema, "Merchant");