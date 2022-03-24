const router = require("express").Router();

router.use("/category",require("./category.route"));
router.use("/product",require("./product.route"));
router.use("/customer", require("./customer.route"))
router.use("/merchant",require("./merchant.route"));
router.use("/user",require("./user.route"));
router.use("/cart",require("./cart.route"));
router.use("/auth",require("./auth.route"));
router.use("/order", require("./order.route"));
router.use("/orderDetail", require("./orderDetail.route"));
router.use("/upload",require("./upload.route"));

module.exports = router;