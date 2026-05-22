const User = require('../models/userModel');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');


//login admn
const adminLogin = async (req, res, next) => {
    try {

        const { email, password } = req.body
        const user = await User.findOne({ email })

        if (user.role !== 'admin') {
            return res.status(403).json({ message: 'Access denied. Admins only.' });
        }

        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) return res.status(400).json({ message: 'Wrong password' });

        if (!isMatch) {
            return res.status(400).send("Invalid Password")
        }

        const token = jwt.sign(
            { id: user._id, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: '1d' }
        )
        res.send({
            message: "Login Success",
            token,
            user: {
                _id: user._id,
                name: user.name,
                email: user.email,
                phone: user.phone
            }
        })
    } catch (error) {
        next(error)
    }
}
const getUsers = async (req, res, next) => {
    try {
        const users = await User.find()
        res.send(users)

    } catch (error) {
        next(error)
    }
};

//toggle Status
const toggleStatus = async (req, res, next) => {
    try {
        const id = req.params.id.trim()

        const user = await User.findByIdAndUpdate(
            id,
            [{ $set: { isBlock: { $not: "$isBlock" } } }],
            { new: true, updatePipeline: true }
        )

        if (!user) return res.status(404).json({ message: 'User not found' })
        res.json({ message: 'Status updated', isBlock: user.isBlock })
    } catch (error) {
        next(error)
    }
}
module.exports = {
    getUsers,
    adminLogin,
    toggleStatus
}