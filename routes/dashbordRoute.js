const express = require('express');
const router = express.Router();
const { protect, isAdmin } = require('../service/jwtMidleware');
const dashboardController = require('../adminControllers/dashboardController');


router.get('/revenue-data', protect, isAdmin, dashboardController.revenueData);
router.get('/aov-data', protect, isAdmin, dashboardController.aovData);
router.get('/total-revenue', protect, isAdmin, dashboardController.totalRevenue);

module.exports = router