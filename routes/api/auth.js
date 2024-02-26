const express = require("express");
const ctrl = require("../../controllers/auth");
const { validateBody, authenticate } = require("../../middlewares");
const { schemas } = require("../../models/user");

const router = express.Router();

// signin
router.post("/signin", validateBody(schemas.signInSchema), ctrl.signIn);
router.post("/signout", authenticate, ctrl.logout);

// signup
router.post("/signup", validateBody(schemas.signUpSchema), ctrl.signUp);
router.post(
  "/verify",
  validateBody(schemas.emailSchema),
  ctrl.resendVerifyEmail
);
router.get("/verify/:verificationToken", ctrl.verifyEmail);

module.exports = router;
