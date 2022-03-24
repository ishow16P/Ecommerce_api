const router = require("express").Router();
const Category = require("../../controllers/category.controller");

router.post("/", Category.createCategory);

router.put("/:_id", Category.updateCategory);

router.delete("/:_id", Category.deleteCatagory);

router.get("/", Category.findAllCategory);

router.get("/:_id", Category.findCategoryById);

module.exports = router;