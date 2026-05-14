const asyncHandler = require("express-async-handler");

const Category = require('../models/allCategoryModel')

//get all categary
const getAllCategory = asyncHandler(async (req, res) => {

    const categories = await Category.find();
    res.status(200).json(categories);
})

//add category
const addCategory = asyncHandler(async (req, res) => {
    const {
        type,
        img,
        description,
        category,
        aosDelay
    } = req.body;

    const newCategory = await Category.create({
        type,
        description,
        img,
        category,
        aosDelay
    });
    res.status(201).json(newCategory)
})

module.exports = {
    getAllCategory,
    addCategory
}