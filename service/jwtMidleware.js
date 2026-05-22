const jwt = require("jsonwebtoken")
const User = require("../models/userModel")

const protect = async (req, res, next) => {
    let token = req.headers.authorization

    if (!token) {
        return res.status(401).send("No token")
    }

    token = token.split(" ")[1]

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        req.user = await User.findById(decoded.id)

        next()
    } catch (error) {
        res.status(401).send("Invalid token")
    }
}
//admin
const isAdmin = (req, res, next) => {
    if (req.user.role !== 'admin') {
        return res.status(403).json({ message: 'Admins only' });
    }
    next();
};


// User
const isUser = (req, res, next) => {
    if (req.user.role !== 'user') {
        return res.status(403).json({ message: 'Users only' });
    }
    next();
};

module.exports = { protect, isAdmin, isUser }