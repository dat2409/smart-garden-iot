const express = require('express');
const router = express.Router();
const destinationController = require('../controller/DestinationController');

router.post('/', destinationController.create);
router.get('/:id', destinationController.show);
router.get('/', destinationController.index);
router.get('/edit/:id', destinationController.edit);
router.patch('/:id', destinationController.update);
router.delete('/:id', destinationController.delete);

module.exports = router;
