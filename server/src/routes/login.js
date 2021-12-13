const express = require('express');
const loginController = require('../controller/LoginController');
const router = express.Router();

router.post('/', loginController.create);

module.exports = router;
