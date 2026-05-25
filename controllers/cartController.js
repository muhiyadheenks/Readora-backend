const Cart = require('../models/cartModel');
const asyncHandler = require('express-async-handler')



const addToCart = async (req, res, next) => {
    try {
        const { userId, items } = req.body;

        const cart = await Cart.findOneAndUpdate(
            { userId },
            { userId, items },
            { new: true, upsert: true }
        );

        const populated = await cart.populate('items.book');

        res.json(populated);

    } catch (error) {
        next(error)
    }
};


//get cart
const getCart = asyncHandler(async (req, res) => {
    const { userId } = req.query;
    const cart = await Cart.findOne({ userId }).populate("items.book");
    if (!cart) return res.json({})
    res.json(cart)
})


// remove cart
const deleteCart = asyncHandler(async (req, res) => {
    await Cart.findByIdAndDelete(req.params.id);
    res.json({ message: 'Cart deleted' });
});

//update cart
const updateQuantity = asyncHandler(async (req, res) => {
    const { items } = req.body;
    const cart = await Cart.findByIdAndUpdate(
        req.params.id,
        { items },
        { returnDocument: 'after' }
    ).populate("items.book")
    if (!cart) {
        res.status(404);
        throw new Error("Cart not found");
    }

    res.json(cart)
})
module.exports = {
    addToCart,
    getCart,
    deleteCart,
    updateQuantity
}