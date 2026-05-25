const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    orderId: {
        type: String,
        unique: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    items: [
        {
            bookId: { type: mongoose.Schema.Types.ObjectId, ref: 'book' },
            title: String,
            price: Number,
            qty: Number,
            img: String
        }
    ],
    totalAmount: { type: Number, required: true },
    paymentMethod: { type: String, default: 'COD' },
    paymentId: { type: String, default: null },
    status: { type: String, default: 'pending' },
    address: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);