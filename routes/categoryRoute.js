const express = require('express');
const router = express.Router();

const { getAllCategory, addCategory, selectedCategory } = require('../controllers/categoryController');

router.get('/allcategory', getAllCategory);
router.post('/addcategory', addCategory)


module.exports = router;