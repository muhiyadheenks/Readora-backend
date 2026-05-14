const User = require('../models/userModel')
const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')
const bcrypt = require('bcryptjs')

// $user register
const createUser = asyncHandler(async (req, res) => {
    const { name, email, password, cpassword, phone } = req.body

    // check user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
        return res.status(400).send('user already exist')
    }
    //  hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // createUser
    const newUser = await User.create(
        {
            name,
            email,
            password: hashedPassword,
            // cpassword: hashedPassword,
            phone
        }
    )
    res.status(201).send({
        message: "User Registered Successfully",
        user: {
            id: newUser._id,
            name: newUser.name,
            email: newUser.email,
            password: newUser.password

        }
    })
})

// $user login 
const loginUser = asyncHandler(async (req, res, next) => {

    const { email, password } = req.body
    const user = await User.findOne({ email })

    if (!user) {
        return res.status(404).send("User not found")
    }

    const isMatch = await bcrypt.compare(password, user.password)

    if (!isMatch) {
        return res.status(400).send("Invalid Password")
    }

    const token = jwt.sign(
        { id: user._id },
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

})

// $reset password
const resetPassword = asyncHandler(async (req, res) => {

    const { password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10)
    const updatedUser = await User.findByIdAndUpdate(
        req.params.id,
        { password: hashedPassword },
        { new: true }
    )

    res.json(updatedUser)
})
const refreshController = asyncHandler(async (req, res) => {

    const user = await User.findById(req.params.id)
        .select('-password');

    if (!user) {
        return res.status(404).json({
            message: "User not found"
        });
    }

    res.json(user);

});

const getUsers = asyncHandler(async (req, res) => {
    const users = await User.find()
    res.send(users)
})

module.exports = {
    createUser,
    getUsers,
    resetPassword,
    loginUser,
    refreshController
}
