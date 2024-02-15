const express = require("express");

const { userControllers } = require("../../controllers");

const { validateBody, authenticate } = require("../../middlewares");

const { schemas } = require("../../models/user");

const router = express.Router();

router.post("/register", validateBody(schemas.signUpSchema), userControllers.register);

router.post("/login", validateBody(schemas.signInSchema), userControllers.login);

router.get("/current", authenticate, userControllers.getCurrent);

router.post("/logout", authenticate, userControllers.logout);

router.patch("/", authenticate, validateBody(schemas.updateNameSchema), userControllers.updateSubscription);

module.exports = router;
