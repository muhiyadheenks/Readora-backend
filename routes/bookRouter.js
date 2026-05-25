const express = require('express')
const router = express.Router()
const bookController = require('../controllers/bookController')
const adminBookController = require('../adminControllers/adminBookController')
const { protect, isAdmin } = require('../service/jwtMidleware')


//user side
router.get('/books', bookController.getBooks)
router.get('/books/:id', bookController.bookDetails)
router.get('/bestbooks', bookController.bestBooks)

// adminside
router.get('/admin-books', protect, isAdmin, adminBookController.getAllBooks);
router.patch('/admin-book/:id', protect, isAdmin, adminBookController.updateBook);
router.delete('/admin-book/:id', protect, isAdmin, adminBookController.deleteBook)
router.post('/books', protect, isAdmin, adminBookController.addBook)

module.exports = router;

// const express = require('express')
// const router = express.Router()
// const bookController = require('../controllers/bookController')
// const adminBookController = require('../adminControllers/adminBookController')
// const { protect } = require('../service/jwtMidleware')


// //user side
// router.get('/books', bookController.getBooks)
// router.get('/books/:id', bookController.bookDetails)
// router.get('/bestbooks', bookController.bestBooks)

// // adminside
// router.get('/admin-books', protect, adminBookController.getAllBooks);
// router.patch('/admin-book/:id', protect, adminBookController.updateBook);
// router.delete('/admin-book/:id', protect, adminBookController.deleteBook)
// router.post('/books', protect, adminBookController.addBook)

// module.exports = router
