const express = require('express')

const router = express.Router()
const User = require('../models/userModel')
const userController = require('../controllers/authController')
const protect = require('../service/jwtMidleware')

router.get('/:id', protect, userController.refreshController)
// router.get('/users', userController.getUsers)

router.post('/login', userController.loginUser)
router.post('/register', userController.createUser)

router.patch('/reset-password/:id', protect, userController.resetPassword)

module.exports = router;