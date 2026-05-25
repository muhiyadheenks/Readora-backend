const express = require('express');
const router = express.Router();
const { protect, isUser, isAdmin } = require('../service/jwtMidleware');
const { placeOrder, getOrders } = require('../controllers/orderController');
const adminOrderController = require('../adminControllers/adminOrderController')

//user
router.get('/orders', protect, isUser, getOrders);
router.post('/orders', protect, isUser, placeOrder);

//admin
router.get('/admin-orders', protect, isAdmin, adminOrderController.getOrder)

module.exports = router;

