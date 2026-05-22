const Book = require('../models/bookModel')

// Get all books 
const getAllBooks = async (req, res, next) => {
    try {
        const { _sort, _order, _page, _limit } = req.query

        // sort
        const sortField = _sort || 'createdAt'
        const sortOrder = _order === 'asc' ? 1 : -1

        // pagination
        const page = parseInt(_page) || 1
        const limit = parseInt(_limit) || 8
        const skip = (page - 1) * limit

        const books = await Book.find()
            .sort({ [sortField]: sortOrder })
            .skip(skip)
            .limit(limit)

        const total = await Book.countDocuments()

        res.json({
            books,
            total,
            page,
            totalPages: Math.ceil(total / limit)
        })

    } catch (err) {
        next(err)
    }
}

//edit&update
const updateBook = async (req, res, next) => {
    try {
        const allowedFields = ['title', 'author', 'price', 'category', 'stock', 'description', 'rating']
        const updates = {}
        allowedFields.forEach((f) => {
            if (req.body[f] !== undefined) updates[f] = req.body[f]
        })

        if (Object.keys(updates).length === 0) {
            return res.status(400).json({ message: 'No valid fields provided' })
        }

        const updatedBook = await Book.findByIdAndUpdate(
            req.params.id,
            { $set: updates },
            { new: true, runValidators: true }
        )

        if (!updatedBook) return res.status(404).json({ message: 'Book not found' })

        res.json({ message: 'Book updated', updatedBook })

    } catch (error) {
        next(error)
    }
}

//delete
const deleteBook = async (req, res, next) => {
    try {
        const deletedBook = await Book.findByIdAndDelete(req.params.id)

        if (!deletedBook) return res.status(404).json({ message: 'Book not found' })

        res.json({ message: 'Book deleted successfully' })

    } catch (error) {
        next(error)
    }
}

//add book
const addBook = async (req, res, next) => {
    console.log('data reached', req.body)
    const newbook = await Book.create(req.body)
    res.send(newbook)

}

module.exports = { getAllBooks, updateBook, deleteBook, addBook }