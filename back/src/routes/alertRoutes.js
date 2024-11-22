const express = require('express');
const alertController = require('../controllers/alertController');
const router = express.Router();

router.get('/', alertController.getAllAlerts);
router.post('/', alertController.createAlert);
router.get('/filter', alertController.filterAlerts);
router.put('/:id', alertController.updateAlert);
router.delete('/:id', alertController.deleteAlert);

module.exports = router;