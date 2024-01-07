const connection = require("../configs/mysql.config");

const CartService = {
  create: (idUser) => {
    return new Promise((resolve, reject) => {
      connection.query(
        "INSERT INTO cart SET ?",
        { quantity: 0, user_id: idUser },
        (err, result) => {
          if (err) {
            reject(err);
          }
          resolve(result);
        }
      );
    });
  },

  findUserCart: (idUser) => {
    return new Promise((resolve, reject) => {
      connection.query(
        "SELECT * FROM cart WHERE user_id = ?",
        idUser,
        (err, result) => {
          if (err) {
            reject(err);
          }
          resolve(result[0]);
        }
      );
    });
  },

  getCart: () => {
    return new Promise((resolve, reject) => {
      connection.query("SELECT * FROM cart", (err, result) => {
        if (err) {
          reject(err);
        }
        resolve(result);
      });
    });
  },

  createCartItem: (product_id, quantity, cart_id) => {
    return new Promise((resolve, reject) => {
      connection.query(
        "INSERT INTO cart_item SET ?",
        { cart_id: cart_id, product_id: product_id, quanity: quantity },
        (err, result) => {
          if (err) {
            reject(err);
          }
          resolve(result);
        }
      );
    });
  },

  findCartItem: (cart_id, product_id) => {
    return new Promise((resolve, reject) => {
      connection.query(
        "SELECT * FROM cart_item WHERE cart_id = ? AND product_id = ?",
        [cart_id, product_id],
        (err, result) => {
          if (err) {
            reject(err);
          }
          resolve(result);
        }
      );
    });
  },

  incrementQuantity: (cart_id, product_id) => {
    return new Promise((resolve, reject) => {
      connection.query(
        "UPDATE cart_item SET quanity = quanity + 1 WHERE cart_id = ? AND product_id = ?",
        [cart_id, product_id],
        (err, result) => {
          if (err) {
            reject(err);
          }
          resolve(result);
        }
      );
    });
  },

  decrementQuantity: (cart_id, product_id) => {
    return new Promise((resolve, reject) => {
      connection.query(
        "UPDATE cart_item SET quanity = quanity - 1 WHERE cart_id = ? AND product_id = ?",
        [cart_id, product_id],
        (err, result) => {
          if (err) {
            reject(err);
          }
          resolve(result);
        }
      );
    });
  },

  getCountCartItem: () => {
    return new Promise((resolve, reject) => {
      connection.query(
        "SELECT COUNT(cart_item_id) FROM cart_item JOIN cart ON cart_item.cart_id = cart.cart_id",
        (err, result) => {
          if (err) {
            reject(err);
          }
          resolve(result[0]);
        }
      );
    });
  },

  updateQuantityCart: async (userId) => {
    const countCartItem = await CartService.getCountCartItem();
    console.log(countCartItem);
    return new Promise((resolve, reject) => {
      connection.query(
        "UPDATE cart SET quantity = ? WHERE user_id = ?",
        [countCartItem["COUNT(cart_item_id)"], userId],
        (err, result) => {
          if (err) {
            reject(err);
          }
          resolve(result);
        }
      );
    });
  },

  getAllCartItem: (user_id) => {
    return new Promise((resolve, reject) => {
      connection.query(
        `SELECT products.product_id, products.product_name, products.price, cart_item.quanity FROM cart_item 
        JOIN products ON products.product_id = cart_item.product_id
          JOIN cart ON cart.cart_id = cart_item.cart_id
        WHERE cart.user_id = ?`,
        user_id,
        (err, result) => {
          if (err) {
            reject(err);
          }
          resolve(result);
        }
      );
    });
  },
};

module.exports = CartService;
