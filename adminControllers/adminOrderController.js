const Order = require('../models/orderModel');


// get order
const getOrder = async (req, res, next) => {
    try {
        const orders = await Order.aggregate([
            {
                $lookup: {
                    from: "users",
                    localField: "userId",
                    foreignField: "_id",
                    as: "user"
                }
            },
            { $unwind: "$user" },
            {
                $project: {
                    _id: 1,
                    totalAmount: 1,
                    paymentMethod: 1,
                    status: 1,
                    createdAt: 1,
                    items: 1,
                    'user.name': 1,
                    'user.email': 1
                }
            }
        ])
        res.json(orders)
    } catch (error) {
        next(error)
    }
}




module.exports = {
    getOrder
}