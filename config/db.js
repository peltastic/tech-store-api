const dotenv = require('dotenv')
dotenv.config()

module.exports = {
    DB_DRIVER: process.env.DB_DRIVER,
    DB_SOURCE: process.env.DB_SOURCE,
    DB_PASSWORD: process.env.DB_PASSWORD,
    DB_NAME: process.env.DB_NAME,
    DB_HOST: process.env.DB_HOST,

}