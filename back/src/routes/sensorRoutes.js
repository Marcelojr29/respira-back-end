const express = require('express');
const router = express.Router();
const sensorController = require('../controllers/sensorController');
const sensorDataController = require('../controllers/sensorDataController');
const validate = require('../middleware/validate');
const authMiddleware = require('../middleware/authMiddleware');
const { createSensorSchema, createSensorDataSchema } = require('../validations/validationSchemas');

// router.use(authMiddleware); // Apply authentication middleware to all routes below

router.get('/', sensorController.getAllSensors);
router.get('/:id', sensorController.getSensorById);

router.post('/', validate(createSensorSchema) ,sensorController.createSensor);
router.post('/:id/data', validate(createSensorDataSchema), sensorDataController.createSensorData);

router.put('/:id', sensorController.updateSensor);
router.delete('/:id', sensorController.deleteSensor);
router.get('/:id/data', sensorController.getSensorData);

module.exports = router;