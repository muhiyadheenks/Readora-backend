const asyncHandler = require('express-async-handler');
const Order = require('../models/orderModel');
const Cart = require('../models/cartModel');
const { v4: uuidv4 } = require('uuid');


//place order
const placeOrder = async (req, res, next) => {
    try {
        const { items, totalAmount, paymentMethod, address, paymentId } = req.body;
        const userId = req.user._id || req.user;

        if (!items || items.length === 0) {
            res.status(400);
            throw new Error('No items in order');
        }

        const order = await Order.create({
            userId: uuidv4(),
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

    } catch (error) {
        next(error)
    }
};

// GET order
const getOrders = asyncHandler(async (req, res) => {
    const userId = req.user._id;


    if (!userId) {
        res.status(400);
        throw new Error('User ID is required');
    }

    const orders = await Order.find({ userId }).sort({ createdAt: -1 });


    if (!orders || orders.length === 0) {
        return res.status(404).json({ message: 'No orders found' });
    }

    res.json(orders);
});

module.exports = { placeOrder, getOrders };