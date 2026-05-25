const express = require('express');
const router = express.Router();
const { createRazorpayOrder } = require('../controllers/paymentController');
const { protect, isUser } = require('../service/jwtMidleware');

router.post('/online', protect, isUser, createRazorpayOrder);
// const { protect } = require('../service/jwtMidleware');

// router.post('/online', protect, createRazorpayOrder);

module.exports = router;