const express = require('express');
const router = express.Router();
const { protect, isUser } = require('../service/jwtMidleware');

const wishlistController = require('../controllers/wishlistController');

router.get('/wishlist/:userId', protect, isUser, wishlistController.getWishlist)
router.post('/wishlist', protect, isUser, wishlistController.addWishlist)

module.exports = router;