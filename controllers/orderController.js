const asyncHandler = require('express-async-handler');
const Order = require('../models/orderModel');
const Cart = require('../models/cartModel');

//place order
const placeOrder = asyncHandler(async (req, res) => {
    const { userId, items, totalAmount, paymentMethod, address, paymentId } = req.body;

    const order = await Order.create({
        userId,
        items,
        totalAmount,
        paymentMethod: paymentMethod || 'COD',
        address,
        paymentId: paymentId || null,
        status: 'pending'
    });

    // clear cart
    await Cart.findOneAndUpdate({ userId }, { items: [] });

    res.json({ message: 'Order placed successfully', order });
});

// GET order
const getOrders = asyncHandler(async (req, res) => {
    const { userId } = req.query;
    const orders = await Order.find({ userId }).sort({ createdAt: -1 });
    res.json(orders);
});

module.exports = { placeOrder, getOrders };