const DB = require("../../db")
const {QueryTypes} = require("sequelize")

const {v4} = require("uuid")
const create_orders = async (req, res) => {
    const {
        username,
        address,
        productName,
        price,
        productId,
        userId,
        productBrand,
        orderCount
    } = req.body
    console.log(req.body)
    const id = v4()
    try {
        await DB.Order.create({
           order_id: id,
           user_name: username,
           address: address,
           product_name: productName,
           price: price,
           product_id: productId,
           user_id: userId,
           product_brand: productBrand,
           is_completed: false,
           orderCount: orderCount
       })
    }catch (err) {
        return res.status(400).json({error: err})
    }
    return res.sendStatus(200)
}
const confirm_order = (req, res) => {
    const confirmed = req.params.orderId
    try {
        await DB.Order.update({ is_completed: true }, {
            where: {
              order_id: confirmed 
            }
          });
    } catch (err) {
        return res.status(400).json({error: err})
    }
    return res.sendStatus(200)
} 

module.exports = {create_orders, confirm_order}