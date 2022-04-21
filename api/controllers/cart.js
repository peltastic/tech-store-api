const DB = require("../../db")
const {QueryTypes} = require("sequelize")

const {v4} = require("uuid")



const add_cart = (req, res) => {
    const {
        productName,
        userId,
        price,
        productId

    } = req.body
    const id = v4()
    try {
        await DB.Cart.create({
            cart_id: id,
            product_name: productName,
            user_id: userId,
            product_id: productId,
            price: price,
            count: 1,
            order_completed: false
        })
    }catch (err) {
        return res.status(400).json({error: err})
    }
}
const increase_cart_count = async (req, res) => {
    const cartId =  req.params.cartId
    const count = await getCount(cartId)
    console.log(count)
    try {
        await DB.Order.update({ count: count + 1 }, {
            where: {
              cart_id: cartId 
            }
          });
    } catch (err) {
        return res.status(400).json({error: err})
    }
    return res.sendSatus(200)

}
const decrease_cart_count = async (req, res) => {
    const cartId =  req.params.cartId
    const count = await getCount(cartId)
    console.log(count)
    try {
        await DB.Order.update({ count: count - 1 }, {
            where: {
                cart_id: cartId 
            }
          });
        } catch (err) {
        return res.status(400).json({error: err})
    }
    return res.sendSatus(200)
}
const delete_cart = async (req, res) => {
    const cartId =  req.params.cartId
    try {      
        await User.destroy({
            where: {
              cart_id: cartId
            }
          });
    }catch (err) {
        return res.status(400).json({error: err})
    }
}

async function  getCount(cartId){
    const count = await DB.sequelize.query(
        `SELECT count FROM orders WHERE cart_id = ?`,
        {
            replacements: [cartId],
            type: QueryTypes.SELECT,
          }
    )
    return count
}

module.exports = {add_cart, increase_cart_count, decrease_cart_count, delete_cart}