const mongoose = require('mongoose')

const categorySchema = mongoose.Schema({
    img: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },

    description: {
        type: String,
        required: true
    },

    category: {
        type: String,
        required: true
    },
    aosDelay: {
        type: String
    }


})

module.exports = mongoose.model('category', categorySchema)

//   "id": "3",
//   "img": "/allcategory/religious.jpg",
//   "type": "🕌 devotional books",
//   "description": "Books about faith, beliefs, and spiritual growth.",
//   "category": "devotional book"