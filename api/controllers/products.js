const DB = require("../../db");
const { QueryTypes, Op } = require("sequelize");

const { v4 } = require("uuid");

const add_product = async (req, res) => {
  const {
    name,
    price,
    desc,
    category,
    productType,
    productBrand,
    productImageFileUrl,
  } = req.body;
  const id = v4();
  await DB.Product.create({
    name: name,
    price: price,
    desc: desc,
    category: category,
    product_id: id,
    product_type: productType,
    product_image: productImageFileUrl,
    product_brand: productBrand,
  });

  return res.status(200).send({
    message: "uploaded",
  });
};

const get_product = async (req, res) => {
  const id = req.params.id;
  if (!id) {
    return res.sendStatus(400);
  }

  const products = await DB.Product.findAll({
    where: {
      product_id: id,
    },
  }); 
  return res.status(200).json({ data: products });
};
const get_products = async (req, res) => {
  const category = req.query.category || "";
  const type = req.query.type || "";
  const limit = req.query.limit || null;
  let products;
  if (category || type) {
    products = await executeSpecificQuery(category, type);
  } else {
    products = await DB.Product.findAll({ limit: limit });
  }

  return res.status(200).json({ data: products });
};
async function executeSpecificQuery(category, type) {
  const logic = category && type ? "and" : "or";
  const products = await DB.Product.findAll({
    limit: 1,
    where: {
      [Op[logic]]: [{ category: category }, { product_type: type }],
    },
  });
  return products;
}
module.exports = { add_product, get_products, get_product };
