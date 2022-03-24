const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const cartSchema = new Schema({
  productId: {
    type: Schema.Types.ObjectId,
    ref: "Product",
  },
  customerId: {
    type: Schema.Types.ObjectId,
    res: "Customer",
  },
  quantity: {
    type: Number,
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

module.exports = mongoose.model("Cart", cartSchema, "Cart");
