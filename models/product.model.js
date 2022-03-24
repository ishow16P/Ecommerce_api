const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productSchema = new Schema({
  categoryId: {
    type: Schema.Types.ObjectId,
    ref: "Category",
  },
  merchantId: {
    type: Schema.Types.ObjectId,
    ref: "Merchant",
  },
  productName: {
    type: String,
  },
  description: {
    type: String,
  },
  price: {
    type: Number,
  },
  productImage: {
    type: String,
  },
  isActive: {
    type: Boolean,
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

module.exports = mongoose.model("Product", productSchema, "Product");
