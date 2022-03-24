const OrderDetail = require("../models/orderDetail.model");

exports.create = async (data) => {
  try {
    const orderDeatail = new OrderDetail({
      orderId: data.orderId,
      productId: data.productId,
      quantity: data.quantity,
      totalPrice: data.totalPrice,
    });
    return await orderDeatail.save();
  } catch (error) {
    return new Error(error.message);
  }
};

exports.update = async (id, data) => {
  try {
    return await OrderDetail.findByIdAndUpdate(id, data);
  } catch (error) {
    return new Error(error.message);
  }
};

exports.delete = async (id) => {
  try {
    return await OrderDetail.findByIdAndDelete(id);
  } catch (error) {
    return new Error(error.message);
  }
};

exports.findById = async (id) => {
  try {
    return OrderDetail.findById(id).populate("orderId productId");
  } catch (error) {
    return new Error(error.message);
  }
};

exports.findByOrderId = async (id) => {
  try {
    return OrderDetail.find({ orderId: id }).populate("orderId productId");
  } catch (error) {
    return new Error(error.message);
  }
};
