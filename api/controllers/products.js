const DB = require("../../db");
const { QueryTypes } = require("sequelize");

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
  if (category === "phones") {
    await DB.ProductPhones.create({
      name: name,
      price: price,
      desc: desc,
      category: category,
      product_id: id,
      product_type: productType,
      product_image: productImageFileUrl,
      product_brand: productBrand,
    });
  } else if (category === "laptops") {
    await DB.ProductLaptops.create({
      name: name,
      price: price,
      desc: desc,
      category: category,
      product_id: id,
      product_type: productType,
      product_image: productImageFileUrl,
      product_brand: productBrand,
    });
  }

  return res.status(200).send({
    message: "uploaded",
  });
};

const get_products = async (req, res) => {
  const type = req.params.type;
  const category = req.params.category;
  if (!type || !category) {
    return res.sendStatus(400);
  }
  let products;
  if (type === "gaming" && category === "phones") {
    products = await executeQuery(category, type, "product_type");
  } else if (type === "regular" && category === "phones") {
    products = await executeQuery(category, type);
  } else if (type === "gaming" && category === "laptops") {
    products = await executeQuery(category, type, "product_type");
  } else if (type === "regular" && category === "laptops") {
    products = await executeQuery(category, type, "product_type");
  }
  return res.status(200).send({ data: products });
};
const get_product = async (req, res) => {
  const table = req.params.table;
  const productId = req.params.id;
  if (!table || !productId) {
    return res.sendStatus(400);
  }
  const product = await executeQuery(table, productId, "product_id");
  return res.status(200).send({ data: product[0] });
};
async function executeQuery(table, type, column) {
  const products = await DB.sequelize.query(
    `SELECT * FROM ${table} WHERE ${column} = ?`,
    {
      replacements: [type],
      type: QueryTypes.SELECT,
    }
  );
  return products;
}
module.exports = { add_product, get_products, get_product };
