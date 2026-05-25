const express = require('express');
const router = express.Router();
const { protect, isUser } = require('../service/jwtMidleware');

const wishlistController = require('../controllers/wishlistController');

router.get('/wishlist/:userId', protect, isUser, wishlistController.getWishlist)
router.post('/wishlist', protect, isUser, wishlistController.addWishlist)

module.exports = router;
// const express = require('express');
// const router = express.Router();
// const { protect } = require('../service/jwtMidleware');

// const wishlistController = require('../controllers/wishlistController');

// router.get('/wishlist/:userId', protect, wishlistController.getWishlist)
// router.post('/wishlist', protect, wishlistController.addWishlist)

// module.exports = router;