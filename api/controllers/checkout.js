const DB = require("../../db");
const { QueryTypes } = require("sequelize");

const get_checkout = async (req, res) => {
  const userId = req.params.userId;
  console.log(userId);
  try {
    const getCartPrices = await DB.sequelize.query(
      `SELECT total_price FROM carts where user_id = ?`,
      {
        replacements: [userId],
        type: QueryTypes.SELECT,
      }
    );
    console.log(getCartPrices);
    let totalPrice = 0;
    console.log(totalPrice);
    for (const price of getCartPrices) {
      totalPrice += price.total_price;
      // console.log(totalPrice)
    }
    await DB.Checkout.create({
      user_id: userId,
      checkout: totalPrice,
    });
    let checkout_query = await DB.sequelize.query(
      `SELECT checkout FROM checkouts where user_id = ?`,
      {
        replacements: [userId],
        type: QueryTypes.SELECT,
      }
    );
    const checkout = checkout_query[0].checkout
    return res.status(200).json({data: checkout})
  } catch (err) {
    return res.status(400).json({ error: err });
  }
};

module.exports = {
  get_checkout,
};
