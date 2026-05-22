const mongoose = require('mongoose')

const wishlistSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true
    },
    item: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "books",
        required: true

    }
})
module.exports = mongoose.model("Wishlist", wishlistSchema)