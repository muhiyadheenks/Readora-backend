const express = require('express')
const router = express.Router()
const bookController = require('../controllers/bookController')
const protect = require('../service/jwtMidleware')

router.get('/books', bookController.getBooks)
router.get('/books/:id', bookController.bookDetails)
router.get('/bestbooks', bookController.bestBooks)

router.post('/books', bookController.addBook)
module.exports = router
