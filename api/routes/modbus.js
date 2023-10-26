const router = require("express").Router();
const modbusController = require("../controllers/modbus.controller");

//get
router.get("/", modbusController.get);

//post
router.post("/");

//put
router.put("/");

module.exports = router;
