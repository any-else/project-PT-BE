const CartController = require("../controllers/cart.controller");

const cartRoute = (app) => {
  app.post("/api/v1/cart", CartController.create);
  app.get("/api/v1/cart", CartController.getCart);
  app.post("/api/v1/cart-item", CartController.createCartItem);
  app.get("/api/v1/cart-items", CartController.getAllCartItem);
  app.post("/api/v1/cart-increment", CartController.incrementCartItem);
  app.post("/api/v1/cart-decrement", CartController.decrementCartItem);
};

module.exports = cartRoute;
