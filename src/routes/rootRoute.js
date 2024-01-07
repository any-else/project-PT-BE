const authRoute = require("./auth.route");
const productRoute = require("./product.route");
const categoryRoute = require("./category.route");
const cartRoute = require("./cart.route");
const rootRoute = (app) => {
  authRoute(app);
  productRoute(app);
  categoryRoute(app);
  cartRoute(app);
};
module.exports = rootRoute;
