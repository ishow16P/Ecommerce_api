const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const orderSchema = Schema({
  customerId: {
    type: Schema.Types.ObjectId,
    ref: "Customer",
  },
  orderDate: {
    type: Date,
    default: Date.now,
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

module.exports = mongoose.model("Order", orderSchema, "Order");
