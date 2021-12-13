const express = require('express');
const userController = require('../controller/UserController');
const router = express.Router();

router.post('/create',userController.create);

module.exports = router;
