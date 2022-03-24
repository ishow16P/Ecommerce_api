const router = require("express").Router();
const Merchant = require("../../controllers/merchant.controller");

router.post("/", Merchant.createMerchant);

router.put("/:_id", Merchant.updateMerchant);

router.delete("/:_id/", Merchant.deleteMerchant);

router.get("/", Merchant.findAllMerchant);

router.get("/:_id", Merchant.findMerchantById);

module.exports = router;