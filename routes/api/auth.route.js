const router = require("express").Router();
const Authen = require("../../controllers/auth.controller")

router.post("/login",Authen.Login);

module.exports = router;