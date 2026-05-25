const express = require('express')

const router = express.Router()
const User = require('../models/userModel')
const userController = require('../controllers/authController')
const adminAuthController = require('../adminControllers/adminAuthController')
const { protect, isAdmin, isUser } = require('../service/jwtMidleware')

//userside
router.get('/address', protect, isUser, userController.getAddress);
router.post('/login', userController.loginUser)
router.post('/register', userController.createUser);
router.post("/logout", userController.logout)
router.patch('/address', protect, isUser, userController.addAddress);
router.patch('/reset-password/:id', protect, isUser, userController.resetPassword)

//admin
router.post('/admin-login', adminAuthController.adminLogin)
router.get('/admin-users', protect, isAdmin, adminAuthController.getUsers)
router.patch('/admin-status/:id', protect, isAdmin, adminAuthController.toggleStatus)

module.exports = router;


// const express = require('express')

// const router = express.Router()
// const User = require('../models/userModel')
// const userController = require('../controllers/authController')
// const adminAuthController = require('../adminControllers/adminAuthController')
// const { protect } = require('../service/jwtMidleware')

// //userside
// router.get('/address', protect, userController.getAddress);
// router.post('/login', userController.loginUser)
// router.post('/register', userController.createUser);
// router.post("/logout", userController.logout)
// router.patch('/address', protect, userController.addAddress);
// router.patch('/reset-password/:id', protect, userController.resetPassword)

// //admin
// router.post('/admin-login', adminAuthController.adminLogin)
// router.get('/admin-users', protect, adminAuthController.getUsers)
// router.patch('/admin-status/:id', protect, adminAuthController.toggleStatus)

// module.exports = router;