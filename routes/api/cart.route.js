const router = require("express").Router();
const Cart = require("../../controllers/cart.controller");
const verifyToken = require("../../middleware/authorization");

router.post("/", Cart.addItemCart);

router.put("/:_id", Cart.updateItemCart);

router.delete("/:_id", Cart.deleteItemCart);

router.delete("/itemCart/:_id",Cart.deleteAllItemCartByCustomerId);

router.get("/:_id", Cart.findByCustomerId);


module.exports = router;