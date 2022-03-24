const Cart = require("../models/cart.model");

exports.create = async (data) =>{
    try {
        const item = new Cart({
            productId: data.productId,
            customerId: data.customerId,
            quantity: data.quantity
        })
        return await item.save();
    } catch (error) {
        return new Error(error.message);
    }
}

exports.update = async (id, data) =>{
    try {
        return await Cart.findByIdAndUpdate(id,data);
    } catch (error) {
        return new Error(error.message);
    }
}
exports.delete = async (id, data) =>{
    try {
        return await Cart.findByIdAndDelete(id,data);
    } catch (error) {
        return new Error(error.message);
    }
}
exports.findByCustomerId = async (id) =>{
    try {
        return await Cart.find({customerId: id}).populate("productId")
    } catch (error) {
        return new Error(error.message);
    }
}

exports.deleteByCustomerId = async(id) =>{
    try {
        return await Cart.deleteMany({customerId: id})
    } catch (error) {
        return new Error(error.message);
    }
}