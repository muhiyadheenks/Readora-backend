const Wishlist = require('../models/wishlistModel');

const addWishlist = async (req, res, next) => {
    const { userId, bookId } = req.body;

    try {
        const existing = await Wishlist.findOne({ userId }, { item: bookId })
        if (existing) {
            await Wishlist.findByIdAndDelete(existing._id)
            return res.json({ message: "removed from wishlist" })
        } else {
            const wishlist = await Wishlist.create({
                userId,
                item: bookId
            })
            res.json({
                message: "wishlist created",
                wishlist
            })
        }
    } catch (error) {
        next(error)
    }
}

//get wishlist
const getWishlist = async (req, res, next) => {
    try {
        const { userId, bookId } = req.params;

        const wishlist = await Wishlist.find({ userId }).populate("item")
        res.json({ wishlist })


    } catch (error) {
        next(error)
    }
}

module.exports = {
    addWishlist,
    getWishlist
}
