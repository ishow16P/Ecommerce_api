const router = require("express").Router();
const OrderDetail = require("../../controllers/orderDetail.controller");

router.post("/" ,OrderDetail.createOrderDetail);

router.put("/:_id" ,OrderDetail.updateOrederDetail);

router.post("/:_id" ,OrderDetail.deleteOrderDetail);

router.get("/:_id",OrderDetail.findOrderDetailById);

router.get("/order/:_id",OrderDetail.findOrderDetailByOrderId);

module.exports = router;