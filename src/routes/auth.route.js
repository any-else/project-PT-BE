const AuthController = require("../controllers/auth.controller");

const authRoute = (app) => {
  // đăng ký
  app.post("/api/v1/auth/signup", AuthController.signup);
  //đăng nhập
  app.post("/api/v1/auth/login", AuthController.login);
};

module.exports = authRoute;
