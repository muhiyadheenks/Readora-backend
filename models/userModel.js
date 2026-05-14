const mongoose = require('mongoose')

const userSchema = mongoose.Schema({

    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ["user", "admin"],
        default: "user"


    },
    isBlock: {
        type: String,
        enum: [false, true],
        default: false
    },
    lastName: String,
    address: String,
    city: String,
    state: String,
    pincode: Number,
    wishlist: String
})

module.exports = mongoose.model('user', userSchema)