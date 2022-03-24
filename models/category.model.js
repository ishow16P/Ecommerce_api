const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const categorySchema = new Schema({
    categoryId: {
        type: String,
        default: null
    },
    categoryName: {
        type: String
    },
    categoryImage:{
        type: String
    },
    isActive: {
        type: Boolean
    }
});

module.exports = mongoose.model("Category", categorySchema, "Category")