const CategoryController = require("../controllers/category.controller");

const categoryRoute = (app) => {
  app.post("/api/v1/create-categories", CategoryController.create);
};

module.exports = categoryRoute;
