const express = require("express");
const ctrl = require("../../controllers/auth");
const { authenticate, upload } = require("../../middlewares");

const router = express.Router();

router.patch("/update", authenticate, upload.single('avatarURL'), ctrl.updateUser);
router.get("/current", authenticate, ctrl.getCurrent);
router.post("/subscribe", authenticate, ctrl.subscribe);
router.get("/favorites", authenticate, ctrl.getFavorites);

module.exports = router;
