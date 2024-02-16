const express = require('express');
const ctrl = require('../../controllers/auth');
const {authenticate}  = require("../../middlewares");

const router = express.Router();

router.patch('/update', authenticate, ctrl.updateUser);                             
router.get('/current', authenticate, ctrl.getCurrent);                            
   
module.exports = router;