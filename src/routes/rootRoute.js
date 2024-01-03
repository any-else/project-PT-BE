const authRoute = require("./auth.route");

const rootRoute = (app) => {
  authRoute(app);
};
module.exports = rootRoute;
