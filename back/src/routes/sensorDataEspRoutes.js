const express = require('express');
const sensorDataEspController = require('../controllers/sensorDataEspController');
const router = express.Router();

router.post('/receive', sensorDataEspController.receiveDataSensor);

module.exports = router;