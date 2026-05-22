const mongoose = require('mongoose')

const bookScheema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    author: {
        type: String
    },
    img: {
        type: String
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        min: 0,
        required: true
    },
    rating: {
        type: Number,
        max: 5
    },
    stock: {
        type: Number,
        default: 0
    }


})

module.exports = mongoose.model('books', bookScheema)

