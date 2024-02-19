const express = require("express");
const { isValidId, authenticate } = require("../../middlewares");
const ctrl = require("../../controllers/myDrinks");

const router = express.Router();

router.get("/own", authenticate, ctrl.getOwn);

router.delete("/own/remove/", authenticate, isValidId, ctrl.deleteOwn);

module.exports = router;
