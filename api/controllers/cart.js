const DB = require("../../db");
const { QueryTypes } = require("sequelize");

const { v4 } = require("uuid");

const create_cart = async (req, res) => {
  const { userId, productId, category } = req.body;
  if (!userId || !productId || !category) {
    return res.sendStatus(400);
  }
  const id = v4();
  try {
    const product_query = await DB.sequelize.query(
      `SELECT name, product_id, price, product_image FROM ${category} where product_id = ?`,
      {
        replacements: [productId],
        type: QueryTypes.SELECT,
      }
    );
    const product = product_query[0];
    await DB.Cart.create({
      cart_id: id,
      product_name: product.name,
      user_id: userId,
      product_image: product.product_image,
      product_id: product.product_id,
      price: product.price,
      total_price: product.price,
      count: 1,
      order_completed: false,
      category: product.category,
    });
  } catch (err) {
    return res.status(400).json({ error: err });
  }
  return res.sendStatus(200);
};
const increase_cart_count = async (req, res) => {
  const productId = req.params.productId;
  const userId = req.params.userId;
  if (!productId || !userId) {
    return res.sendStatus(400);
  }
  try {
    const count = await getCount(userId, productId);
    const update = count[0].count + 1;
    const price = count[0].price;
    const totalPrice = update * price;
    await DB.Cart.update(
      { count: update, total_price: totalPrice },
      {
        where: {
          cart_id: count[0].cart_id,
        },
      }
    );
  } catch (err) {
    return res.status(400).json({ error: err });
  }
  return res.sendStatus(200);
};
const decrease_cart_count = async (req, res) => {
  const productId = req.params.productId;
  const userId = req.params.userId;
  if (!productId || !userId) {
    return res.sendStatus(400);
  }
  try {
    const count = await getCount(userId, productId);
    console.log(count);
    const update = count[0].count - 1;
    const price = count[0].price;
    const totalPrice = update * price;
    if (totalPrice === 0) {
      await DB.Cart.destroy({
        where: {
          cart_id: count[0].cart_id,
        },
      });
      return res.sendStatus(200);
    }

    await DB.Cart.update(
      { count: update, total_price: totalPrice },
      {
        where: {
          cart_id: count[0].cart_id,
        },
      }
    );
  } catch (err) {
    return res.status(400).json({ error: err });
  }
  return res.sendStatus(200);
};

const get_user_cart = async (req, res) => {
  const userId = req.params.userId;
  if (!userId) {
    return res.sendStatus(400);
  }
  let data;
  try {
    data = await DB.sequelize.query(`SELECT * FROM carts WHERE user_id = ?`, {
      replacements: [userId],
      type: QueryTypes.SELECT,
    });
  } catch (err) {
    return res.status(400).json({ error: err });
  }
  return res.status(200).json({
    data: data,
  });
};
const delete_cart = async (req, res) => {
  const cartId = req.params.cartId;
  if (!cartId) {
    return res.sendStatus(400);
  }
  try {
    await DB.Cart.destroy({
      where: {
        cart_id: cartId,
      },
    });
  } catch (err) {
    return res.status(400).json({ error: err });
  }
};

const check_cart = async (req, res) => {
  const productId = req.params.productId;
  const userId = req.params.userId;
  if (!productId || !userId) {
    return res.sendStatus(400);
  }
  try {
    const productQuery = await DB.sequelize.query(
      `SELECT total_price FROM carts WHERE user_id = ? AND product_id = ?`,
      {
        replacements: [userId, productId],
        type: QueryTypes.SELECT,
      }
    );
    const product = productQuery[0];
    return res.status(200).json(product);
  } catch (err) {
    return res.status(400).json({ error: err });
  }
};

async function getCount(userId, productId) {
  try {
    const count = await DB.sequelize.query(
      "SELECT * FROM carts WHERE user_id = ? AND product_id = ?",
      {
        replacements: [userId, productId],
        type: QueryTypes.SELECT,
      }
    );
    return count;
  } catch (err) {
    return res.status(400).json({ error: err });
  }
}

module.exports = {
  create_cart,
  increase_cart_count,
  decrease_cart_count,
  get_user_cart,
  delete_cart,
  check_cart
};
