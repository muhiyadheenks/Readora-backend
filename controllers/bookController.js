const Books = require("../models/bookModel")
const asyncHandler = require('express-async-handler')

//add book
const addBook = asyncHandler(async (req, res) => {
    console.log('data reached', req.body)
    const newbook = await Books.create(req.body)
    res.send(newbook)

})
// all books
const getBooks = asyncHandler(async (req, res) => {
    const { category, title } = req.query;

    let filter = {};

    if (category) {
        filter.category = category;
    }

    if (title) {
        filter.title = { $regex: title, $options: "i" };
    }

    const books = await Books.find(filter);

    res.json(books);
})

//book detailes
const bookDetails = asyncHandler(async (req, res) => {

    const books = await Books.findById(req.params.id)

    if (!books) {
        res.status(404);
        throw new Error("book not found")
    }
    res.json(books)
})

//best books
const bestBooks = async (req, res) => {
    const books = await Books.find({ rating: { $gte: 4.5 } })
    res.status(200).json(books)
}


module.exports = {
    addBook,
    getBooks,
    bookDetails,
    bestBooks
}