const CategoryService = require("../services/category.service");

const CategoryController = {
  create: async (req, res) => {
    const { name } = req.body;
    // call service để service chọc db tạo mới dữ liệu
    console.log("name", name);
    try {
      await CategoryService.create(name);
      res.status(201).json({
        message: "tạo mới thành công",
      });
    } catch (error) {
      res.status(500).json({
        message: "lỗi server",
      });
    }
  },
};

module.exports = CategoryController;
