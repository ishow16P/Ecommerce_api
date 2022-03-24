const Product = require("../models/product.model");

exports.create = async (data) => {
  try {
    const product = new Product({
      categoryId: data.categoryId,
      merchantId: data.merchantId,
      productName: data.productName,
      description: data.description,
      price: data.price,
      productImage: data.productImage,
      quantity: data.quantity,
      isActive: data.isActive,
    });
    return await product.save();
  } catch (error) {
    return new Error(error.message);
  }
};

exports.update = async (id, data) => {
  try {
    return await Product.findByIdAndUpdate(id, data);
  } catch (error) {
    return new Error(error.message);
  }
};
exports.delete = async (id) => {
  try {
    return await Product.findByIdAndDelete(id);
  } catch (error) {
    return new Error(error.message);
  }
};

exports.findAll = async (query, sort, offset, limit) => {
  try {
    const product = await Product.find(query)
    .populate("merchantId categoryId")
    .sort([['price',sort]])
    .limit(limit)
    .skip(offset);

    const rowCont = await Product.countDocuments();

    return { rowCont, product };
  } catch (error) {
      console.log(error)
    return new Error(error.message);
  }
};
exports.findById = async (id) => {
  try {
    return Product.findById(id).populate("merchantId");
  } catch (error) {
    return new Error(error.message);
  }
};
exports.findByMerchantId = async (id) =>{
  try {
    return Product.find({merchantId:id})
  } catch (error) {
    return new Error(error.message);
  }
}
