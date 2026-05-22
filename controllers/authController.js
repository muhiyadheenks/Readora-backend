const User = require('../models/userModel')
const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')
const bcrypt = require('bcryptjs')

// $user register
const createUser = async (req, res, next) => {
    try {
        const { name, email, password, cpassword, phone, address } = req.body

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
                phone,
                address
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


    } catch (error) {
        next(error)
    }
}

// $user login 
const loginUser = async (req, res, next) => {
    try {

        const { email, password } = req.body
        const user = await User.findOne({ email })

        if (!user) {
            return res.status(404).send("User not found")
        }

        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) return res.status(400).json({ message: 'Wrong password' });

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
    } catch (error) {
        next(error)
    }
}

// $reset password
const resetPassword = async (req, res, next) => {
    try {
        const { password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10)
        const updatedUser = await User.findByIdAndUpdate(
            req.params.id,
            { password: hashedPassword },
            { new: true }
        )

        res.json(updatedUser)

    } catch (error) {
        next(error)
    }
};

//logout
const logout = async (req, res, next) => {
    try {
        res.status(200).json({
            success: true,
            message: "Logged out"
        });

    } catch (error) {
        next(error)
    }
};

//add address
const addAddress = async (req, res, next) => {
    try {
        const { address, city, state, pincode, hometown, district, post } = req.body;

        const updatedUser = await User.findByIdAndUpdate(
            req.user._id,
            {
                address: { address, city, district, state, pincode, hometown, post }
            },
            { new: true }
        );

        res.status(200).json({
            success: true,
            message: "Address updated successfully",
            user: updatedUser
        });
    } catch (error) {
        next(error);
    }
};


//get address
const getAddress = async (req, res, next) => {
    try {
        console.log("req.body:", req.body); // ← add this

        console.log("req.user:", req.user.id);        // ← what does middleware attach?
        console.log("req.user._id:", req.user._id); // ← is this defined?

        const userAddress = await User.findById(req.user.id);
        res.status(200).json({
            success: true,
            userAddress
        });

    } catch (error) {
        next(error)
    }
}
module.exports = {
    createUser,
    resetPassword,
    loginUser,
    logout,
    addAddress,
    getAddress
}
