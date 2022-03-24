const Order = require("../models/order.model");

exports.create = async (data) => {
  try {
    const order = new Order({
    customerId: data.customerId,
    });
    return await order.save();
  } catch (error) {
    return new Error(error.message);
  }
};

exports.update = async (id, data) => {
  try {
    return await Order.findByIdAndUpdate(id, data);
  } catch (error) {
    return new Error(error.message);
  }
};

exports.delete = async (id) => {
  try {
    return await Order.findByIdAndDelete(id);
  } catch (error) {
    return new Error(error.message);
  }
};

exports.findAll = async (query, sort, offset, limit) => {
    try {
      const order = await Order.find(query)
      .sort(sort)
      .limit(limit)
      .skip(offset);
  
      const rowCont = await Order.countDocuments();
  
      return { rowCont, order };
    } catch (error) {
        console.log(error)
      return new Error(error.message);
    }
  };

  exports.findById = async (id) => {
    try {
      return Order.findById(id);
    } catch (error) {
      return new Error(error.message);
    }
  };

  exports.findByCustomerId = async (id) =>{
    try {
      return Order.find({customerId:id})
    } catch (error) {
      return new Error(error.message);
    }
  }