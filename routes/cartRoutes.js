const express = require('express');
const router = express.Router();
const protect = require("../service/jwtMidleware");
const cartController = require('../controllers/cartController');


router.get('/cart', protect, cartController.getCart);
router.post('/cart', protect, cartController.addToCart);
router.patch('/cart', protect, cartController.updateQuantity);
router.delete('/cart', protect, cartController.removeCart);


module.exports = router