const router = require("express").Router();
const Customer = require("../../controllers/customer.controller");

router.post("/", Customer.createCustomer);

router.put("/:_id", Customer.updateCustomer);

router.delete("/:_id/", Customer.deleteCustomer);

router.get("/", Customer.findAllCustomer);

router.get("/:_id", Customer.findCustomerById);

module.exports = router;
