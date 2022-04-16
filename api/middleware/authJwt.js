const { response } = require("express")
const jwt = require("jsonwebtoken")
const authConfig = require('../config/auth')

const verifyToken = (req, res, next) => {
    let token = req.headers["x-access-token"]
    if (!token) {
        return res.status(403).send({
            message: "No token provides!"
        })
    }
    jwt.verify(token, authConfig.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).send({
                message: "Unauthorized"
            })
        }
        req.userID = decoded.id
        next()
    })
}

module.exports = {verifyToken}
