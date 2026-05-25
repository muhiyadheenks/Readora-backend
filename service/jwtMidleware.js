// const jwt = require("jsonwebtoken")
// const User = require("../models/userModel")

// const protect = async (req, res, next) => {
//     console.log("REQ.USER :", req.user);

//     let token = req.headers.authorization

//     if (!token) {
//         return res.status(401).send("No token")
//     }

//     token = token.split(" ")[1]

//     try {
//         const decoded = jwt.verify(token, process.env.JWT_SECRET)
//         req.user = await User.findById(decoded.id)
//         console.log("FOUND USER :", user);

//         next()
//     } catch (error) {
//         res.status(401).send("Invalid token")
//     }
// }
// //admin
// const isAdmin = (req, res, next) => {
//     if (req.user.role !== 'admin') {
//         return res.status(403).json({ message: 'Admins only' });
//     }
//     next();
// };


// // User
// const isUser = (req, res, next) => {
//     if (req.user.role !== 'user') {
//         return res.status(403).json({ message: 'Users only' });
//     }
//     next();
// };

// module.exports = { protect, isAdmin, isUser }


const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const protect = async (req, res, next) => {
    try {
        let token = req.headers.authorization;

        if (!token) {
            return res.status(401).json({
                message: "No token"
            });
        }

        token = token.split(" ")[1];

        console.log("TOKEN :", token);

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const user = await User.findById(decoded.id);
        console.log("USER :", user);

        if (!user) {
            return res.status(401).json({
                message: "User not found"
            });
        }
        if (user.isBlock) {
            return res.status(401).json({
                success: false,
                isBlock: true,
                message: "Account Blocked"
            });
        }
        req.user = user;

        next();

    } catch (error) {

        console.log(error);

        return res.status(401).json({
            message: "Invalid token"
        });
    }
};
const isAdmin = (req, res, next) => {

    if (req.user.role !== "admin") {
        return res.status(403).json({
            message: "Admins only"
        });
    }

    next();
};

const isUser = (req, res, next) => {

    if (req.user.role !== "user") {
        return res.status(403).json({
            message: "Users only"
        });
    }

    next();
};

module.exports = { protect, isAdmin, isUser };