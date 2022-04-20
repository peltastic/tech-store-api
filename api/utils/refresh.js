const Models = require('../../db')
const authConfig = require("../../config/auth")
const {v4} = require('uuid')

const createToken = async function (user) {
    let expireAt = new Date();
    expireAt.setSeconds(expireAt.getSeconds() + authConfig.JWT_REFRESH_EXPIRATION)
    const refreshtoken = v4()
    const refreshTokenDB = await Models.Refresh.create({
        token: refreshtoken,
        id: user.user_id,
        expiry_date: expireAt.getTime(),
    })
    return refreshTokenDB.token
}

const verifyExpiration = (token) => {
    return token.expiry_date < new Date().getTime()
}

module.exports = {createToken, verifyExpiration}