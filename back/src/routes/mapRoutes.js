const express = require('express');
const mapController = require('../controllers/mapController');
const router = express.Router();

router.get('/sensors/', mapController.filterSensors);
router.get('/sensors/filters', mapController.filterSensors);
router.get('/alerts/', mapController.filterAlerts);
router.get('/alerts/filters', mapController.filterAlerts);

module.exports = router;