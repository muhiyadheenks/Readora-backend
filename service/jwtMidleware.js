const jwt = require("jsonwebtoken")

const protect = (req, res, next) => {

    let token = req.headers.authorization
    console.log(token);


    if (!token) {
        return res.status(401).send("No token")
    }

    token = token.split(" ")[1]

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        req.user = decoded
        next()
    } catch (error) {
        res.status(401).send("Invalid token")
    }
}
module.exports = protect;