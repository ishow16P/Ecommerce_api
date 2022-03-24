const Category = require("../models/category.model");

exports.create = async (data) =>{
    try {
        const category = new Category({
            categoryId: data.categoryId,
            categoryName: data.categoryName,
            categoryImage: data.categoryImage,
            isActive: data.isActive
        })
        return await category.save();
    } catch (error) {
        return new Error(error.message)
    }
}
exports.update = async (id,data) =>{
    try {
        return await Category.findByIdAndUpdate(id,data,{useFindndModify: false});
    } catch (error) {
        return new Error(error.message)
    }
}

exports.delete = async (id) =>{
    try {
        return await Category.findByIdAndDelete(id);
    } catch (error) {
        return new Error(error.message)
    }
}
exports.findAll = async (data, sort, offset, limit) =>{
    try {
        const category = await Category.find(data)
        .sort(sort)
        .limit(limit)
        .skip(offset);

        const rowCont = await Category.countDocuments();

        return { rowCont,category}
    } catch (error) {
        return new Error(error.message)
    }
}

exports.findById = async (id) =>{
    try {
        return await Category.findById(id)
    } catch (error) {
        return new Error(error.message)
    }
}
