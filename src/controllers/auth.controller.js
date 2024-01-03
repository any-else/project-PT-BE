const UserService = require("../services/user.service");

const AuthController = {
  signup: async (req, res) => {
    const newUser = {
      user_name: req.body.username,
      email: req.body.email,
      pass_word: req.body.password,
    };
    try {
      await UserService.register(newUser);
      res.status(201).json({
        message: "tạo mới thành công",
      });
    } catch (error) {
      res.status(500).json({
        message: "Lỗi Server",
      });
    }
  },
  login: async (req, res) => {
    const { email, password } = req.body;
    try {
      // tìm kiếm người dùng qua email 1
      const findUser = await UserService.getUserByEmail(email);
      console.log("user", findUser.pass_word, password);
      // kiểm tra password  2
      const isCheck = findUser.pass_word == password;
      console.log("isCheck", isCheck);
      // nếu 1 và 2 mà sai => trả lỗi thông tin tài khoản mk không chính xác
      if (!findUser || !isCheck) {
        return res.status(400).json({
          message: "thông tin tài khoản mật khẩu không chính xác",
        });
      }
      //lưu thông tin vào cookie
      res.cookie("user", JSON.stringify(findUser));
      // login thành công
      return res.status(201).json({
        message: "login thành công",
      });
    } catch (error) {
      res.status(500).json({
        message: "lỗi server",
      });
    }
  },
};

module.exports = AuthController;
