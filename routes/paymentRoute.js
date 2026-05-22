const express = require('express');
const router = express.Router();
const { createRazorpayOrder } = require('../controllers/paymentController');
const { protect, isUser } = require('../service/jwtMidleware');

router.post('/online', protect, isUser, createRazorpayOrder);

module.exports = router;