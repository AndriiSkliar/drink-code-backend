const express = require('express');
const ctrl = require('../../controllers/auth');
const {validateBody, authenticate}  = require("../../middlewares");
const {schemas} = require("../../models/user");

const router = express.Router();

// signup
router.post('/signup', validateBody(schemas.signUpSchema), ctrl.signUp);            
router.get('/verify/:verificationToken', ctrl.verifyEmail);                            
router.post('/verify', validateBody(schemas.emailSchema), ctrl.resendVerifyEmail);  

// googleAuth
router.get('/google', ctrl.googleAuth);
router.get('/google-redirect', ctrl.googleRedirect);

// signin
router.post('/signin', validateBody(schemas.signInSchema), ctrl.signIn);
router.post('/signout', authenticate, ctrl.logout);                                 

module.exports = router;