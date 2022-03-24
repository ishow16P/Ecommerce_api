const router = require("express").Router();
const User = require("../../controllers/user.controller");
const { verifyToken } = require("../../middleware/authorization");

router.post("/", User.createUser);

router.put("/:_id",verifyToken, User.updateUser);

router.delete("/:_id/", User.deleteUser);

router.get("/", User.findAllUser);

router.get("/:_id", User.findUserById);

module.exports = router;