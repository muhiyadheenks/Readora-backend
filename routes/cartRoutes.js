const express = require('express');
const router = express.Router();
const { protect, isUser } = require("../service/jwtMidleware");
// const { protect } = require("../service/jwtMidleware");

const cartController = require('../controllers/cartController');


router.get('/cart', protect, isUser, cartController.getCart);
router.post('/cart', protect, isUser, cartController.addToCart);
router.patch('/cart/:id', protect, isUser, cartController.updateQuantity);
router.delete('/cart/:id', protect, isUser, cartController.deleteCart);


// router.get('/cart', protect, cartController.getCart);
// router.post('/cart', protect, cartController.addToCart);
// router.patch('/cart/:id', protect, cartController.updateQuantity);
// router.delete('/cart/:id', protect, cartController.deleteCart);

module.exports = router