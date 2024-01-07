const connection = require("../configs/mysql.config");

const ProductService = {
  create: (newProduct) => {
    return new Promise((resolve, reject) => {
      connection.query(
        "INSERT INTO products SET ?",
        {
          product_name: newProduct.product_name,
          price: newProduct.price,
          quantity: newProduct.quantity,
          image: newProduct.image,
          description_product: newProduct.description_product,
          category_id: newProduct.category_id,
        },
        (err, result) => {
          if (err) {
            reject(err);
          }
          resolve(result);
        }
      );
    });
  },
  getAll: () => {
    return new Promise((resolve, reject) => {
      connection.query("SELECT * FROM products", (err, result) => {
        if (err) {
          reject(err);
        }
        resolve(result);
      });
    });
  },
  getById: (id) => {
    return new Promise((resolve, reject) => {
      connection.query(
        "SELECT * FROM products WHERE product_id = ?",
        id,
        (err, result) => {
          if (err) {
            reject(err);
          }
          resolve(result[0]);
        }
      );
    });
  },
};

module.exports = ProductService;
