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
  let products;
  if (type === "gaming" && category === "phones") {
    products = await executeQuery(category, type);
  } else if (type === "regular" && category === "phones") {
    products = await executeQuery(category, type);
  } else if (type === "gaming" && category === "laptops") {
    products = await executeQuery(category, type);
  } else if (type === "regular" && category === "laptops") {
    products = await executeQuery(category, type);
  }

  return res.status(200).send({ data: products });
};
async function executeQuery(table, type) {
  const products = await DB.sequelize.query(
    `SELECT * FROM ${table} WHERE product_type = ?`,
    {
      replacements: [type],
      type: QueryTypes.SELECT,
    }
  );
  console.log(products);
  return products;
}
module.exports = { add_product, get_products };
