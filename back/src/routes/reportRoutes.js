const express = require('express');
const reportController = require('../controllers/reportController');
const router = express.Router();

router.post('/', reportController.createReport);
router.get('/', reportController.getAllReports);
router.get('/:id', reportController.getReportById);
router.put('/:id', reportController.updateReport);
router.delete('/:id', reportController.deleteReport);

module.exports = router;