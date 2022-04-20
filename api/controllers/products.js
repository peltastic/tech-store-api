const DB = require("../../db");
const Upload = require("../../firebase/upload");
const { QueryTypes } = require("sequelize");

const { v4 } = require("uuid");

const add_product = async (req, res) => {
  const { name, price, desc, categtory, productType, productBrand, productImageFile } =
    req.body;
  const { error, url } = Upload.generateImageUploadUrl(categtory, productImageFile);
  if (error) {
    return res.status(400).send({
      message: error,
    });
  }
  const id = v4();
  if (categtory === "phones") {
    await DB.ProductPhones.create({
      name: name,
      price: price,
      desc: desc,
      categtory: categtory,
      product_id: id,
      product_type: productType,
      product_image: url,
      product_brand: productBrand,
    });
  } else if (categtory === "laptops") {
    await DB.ProductLaptops.create({
      name: name,
      price: price,
      desc: desc,
      categtory: categtory,
      product_id: id,
      product_type: productType,
      product_image: url,
      product_brand: productBrand,
    });
  }

  return res.status(200).send({
    message: "uploaded",
  });
};

const get_products = (req, res) => {
  const type = req.params.type;
  const category = req.params.category;
  let products;
  if (type === "gaming" && category === "phones") {
    products = executeQuery("phones", type);
  } else if (type === "regular" && category === "phones") {
    products = executeQuery("phones", type);
  } else if (type === "gaming" && category === "laptops") {
    products = executeQuery("laptops", type);
  } else if (type === "regular" && category === "laptops") {
    products = executeQuery("laptops", type);
  }

  return res.status(200).send(products)
};
function executeQuery(table, type) {
  const products = DB.sequelize.query(
    `SELECT * FROM ${table} WHERE product_type = ?`,
    {
      replacements: [type],
      type: QueryTypes.SELECT,
    }
  );
  return products;
}
module.exports = { add_product, get_products };
