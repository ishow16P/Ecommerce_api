const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const orderDeatailSchema = new Schema({
  orderId: {
    type: Schema.Types.ObjectId,
    ref: "Order",
  },
  productId: {
    type: Schema.Types.ObjectId,
    ref: "Product",
  },
  quantity: {
    type: Number,
  },
  totalPrice: {
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

module.exports = mongoose.model(
  "OrderDetail",
  orderDeatailSchema,
  "OrderDetail"
);
