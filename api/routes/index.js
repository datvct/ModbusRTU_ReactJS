const router = require("express").Router();

router.use("/modbus", require("./modbus"));

module.exports = router;
