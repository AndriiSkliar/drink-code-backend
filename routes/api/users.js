const express = require("express");
const ctrl = require("../../controllers/auth");
const { authenticate, upload, validateBody } = require("../../middlewares");
const {schemas} = require("../../models/user");

const router = express.Router();

router.patch("/update", authenticate, upload.single('avatarURL'), validateBody(schemas.updateNameSchema), ctrl.updateUser);
router.get("/current", authenticate, ctrl.getCurrent);
router.post("/subscribe", authenticate, ctrl.subscribe);

module.exports = router;
