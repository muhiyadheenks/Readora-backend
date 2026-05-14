const Cart = require('../models/cartModel');
const asyncHandler = require('express-async-handler')


// add cart
// const addToCart = asyncHandler(async (req, res) => {
//     const { userId, items } = req.body;

//     const cart = await Cart.create({ userId, items })
//     const populated = await cart.populated('items.book');
//     res.json(populated)

// })

const addToCart = asyncHandler(async (req, res) => {

    const { items } = req.body;

    const cart = await Cart.create({
        user: req.user.id,
        items
    });

    const populated = await cart.populate('items.book');

    res.json(populated);
});


//get cart
const getCart = asyncHandler(async (req, res) => {
    const { userId } = req.body;
    const cart = await Cart.find({ userId }).populate("items.book");
    if (!cart) return res.json({ items: [] })
    res.json(cart)
})


// remove cart
const removeCart = asyncHandler(async (req, res) => {
    const cart = await Cart.findOne({ user: req.user.id });
    if (!cart) return res.status(404).json({ message: 'cart not found' });

    cart.items.filter(
        item => item.book.toString() !== req.params.bookId
    );
    await cart.save();
    await cart.populate(items.book);
    res.json(cart)
})

//update cart
const updateQuantity = asyncHandler(async (req, res) => {
    const { items } = req.body;
    const cart = await Cart.findByIdAndUpdate(
        req.params.id,
        { items },
        { new: true }
    ).populate("items.book")
    if (!cart) return res.status(404);
    throw new Error('cart not found');

    res.json(cart)
})
module.exports = {
    addToCart,
    getCart,
    removeCart,
    updateQuantity
}