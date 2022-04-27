const dotenv = require('dotenv')
dotenv.config()

module.exports = {
    JWT_SECRET: "gYKaY2YRBzawIPvJHCmG5jICIuJep1DePxlGCDUHcjHwwXzb9QYs/8auvVqwEz6hK2xzaCz6i9CVuSeJgAVekZlKFEMOZuGVgCNJSrnMEmm0MYM0SZvkvxWP2g2Hc/8saD691bxQgOlfis8SYKPchEqS+2zLcHZhSaY4q2cJXWCtM7nnjhS6q3PCGEd8s8kcfMLZX4fYrJLCz5KVXd78w2311vmbSR59Bsh+Z9rfALA+FbqYFW780Yc4cxyYnWBsFK7LmkYexUw1Td0Ew5t5bJamdbWmfqIFDUNC1Tr8W0szj+f5u2rsBgk5z3sedzJXY+w0K4QztRpU+ImEFUd02Q",
    JWT_EXPIRATION: `${process.env.JWT_EXPIRATION}h`,
    JWT_REFRESH_EXPIRATION: process.env.JWT_REFRESH_EXPIRATION
}