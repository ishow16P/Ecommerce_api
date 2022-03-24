const router = require("express").Router();
const Order = require("../../controllers/order.controller");

router.post("/", Order.createOrder);

router.put("/:_id", Order.updateOrder);

router.delete("/:_id" ,Order.deleteOrder);

router.get("/:_id", Order.findOrderById);

router.get("/customer/:_id", Order.findByCustomerId);

module.exports  = router;