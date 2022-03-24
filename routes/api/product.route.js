const router = require("express").Router();
const Product = require("../../controllers/product.controller");

router.post("/", Product.createProduct);

router.put("/:_id", Product.updateProduct);

router.delete("/:_id/", Product.deleteProduct);

router.get("/", Product.findAllProduct);

router.get("/:_id", Product.findProductById);

router.get("/myshop/:_id", Product.findAllProductByMerchantId);

module.exports = router;