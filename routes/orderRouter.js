const express = require('express');
const router = express.Router();
const { protect, isUser } = require('../service/jwtMidleware');
const { placeOrder, getOrders } = require('../controllers/orderController');

router.get('/orders', protect, isUser, getOrders);
router.post('/orders', protect, isUser, placeOrder);

module.exports = router;