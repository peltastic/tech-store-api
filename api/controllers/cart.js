const DB = require("../../db")
const {QueryTypes} = require("sequelize")

const {v4} = require("uuid")

const create_cart = async (req, res) => {
    const {
        productName,
        userId,
        price,
        totalPrice,
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
            total_price: totalPrice,
            count: 1,
            order_completed: false
        })
    }catch (err) {
        return res.status(400).json({error: err, message: "shhshsh"})
    }
    return res.sendStatus(200)
}
const increase_cart_count = async (req, res) => {
    const cartId =  req.params.cartId
    const count = await getCount(cartId)
    const update = count[0].count + 1
    const price = count[0].price
    const totalPrice = update * price
    try {
        await DB.Cart.update({ count: update, total_price: totalPrice}, {
            where: {
                cart_id: cartId 
            }
        });
    } catch (err) {
        return res.status(400).json({error: err})
    }
    return res.sendStatus(200)
    
}
const decrease_cart_count = async (req, res) => {
    const cartId =  req.params.cartId
    try {
    const count = await getCount(cartId)
    const update = count[0].count - 1
    const price = count[0].price
    const totalPrice = update * price

        await DB.Cart.update({ count: update, total_price: totalPrice }, {
            where: {
                cart_id: cartId 
            }
          });
        } catch (err) {
        return res.status(400).json({error: err})
    }
    return res.sendStatus(200)
}

const get_user_cart = async (req, res) => {
    const userId = req.params.userId
    let data
    try {    
        data = await DB.sequelize.query(
           `SELECT * FROM carts WHERE user_id = ?`,
           {
               replacements: [userId],
               type: QueryTypes.SELECT
           }
           )
       } catch (err) {
       return res.status(400).json({error: err})
   }
   return res.status(200).json({
       data:  data
   })
}
const delete_cart = async (req, res) => {
    const cartId =  req.params.cartId
    try {      
        await DB.Cart.destroy({
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
        `SELECT count, price FROM carts WHERE cart_id = ?`,
        {
            replacements: [cartId],
            type: QueryTypes.SELECT,
          }
    )
    return count
}

module.exports = {create_cart, increase_cart_count, decrease_cart_count, get_user_cart,delete_cart}