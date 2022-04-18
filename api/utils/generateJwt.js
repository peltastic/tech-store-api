const jwt = require("jsonwebtoken")
const authConfig = require("../config/auth")
const options = {
    expiresIn: "60s"
}



async function generateJwt(email, userId) {
    try {
        const payload = {email: email, id: userId};
        const token = await jwt.sign(payload, authConfig.JWT_SECRET, options)
        return {error: false, token: token}
    } catch(error){
        return {error: true}
    }
}

module.exports = {generateJwt}