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
        type: String,
        required: true
    },
    img: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    rating: {
        type: Number,
        required: true
    }


})

module.exports = mongoose.model('books', bookScheema)


//   "id": "b40",
//   "category": "nonfiction",
//   "title": "Fahrenheit 451",
//   "author": "Ray Bradbury",
//   "img": "https://i.pinimg.com/1200x/88/50/2b/88502bd749fb7da0acc3de96f737cfd3.jpg",
//   "description": "A dystopian novel that explores themes of censorship and the power of knowledge.",
//   "price": 640,
//   "rating": 4.5