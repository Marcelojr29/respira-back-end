const express = require('express');
const router = express.Router();
const sensorDataController = require('../controllers/sensorDataController');

router.post('/', sensorDataController.createSensorData);
router.get('/:sensorId', sensorDataController.getSensorDataBySensorId);
router.put('/:id', sensorDataController.updateSensorData);
router.delete('/:id', sensorDataController.deleteSensorData);

module.exports = router;