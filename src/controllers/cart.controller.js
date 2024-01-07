const CartService = require("../services/cart.service");
const UserService = require("../services/user.service");

const CartController = {
  create: async (req, res) => {
    try {
      console.log("cookie", req.cookies.user);
      const userCookie = JSON.parse(req.cookies.user);
      //đi kiểm tra xem user có tồn tại hay không
      const user = await UserService.getUserByEmail(userCookie.email);
      if (!user) {
        return res.status(400).json({
          message: "BAD_REQUEST",
        });
      }
      // kiểm tra xem user đã có giỏ hàng hay chưa
      const checkCartUser = await CartService.findUserCart(user.user_id);
      if (checkCartUser !== undefined) {
        return res.status(400).json({
          message: "user có cart rồi",
        });
      }
      //tạo mới
      await CartService.create(user.user_id);
      return res.status(201).json({
        message: "tạo mới thành công",
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        message: "lỗi server",
      });
    }
  },

  getCart: async (req, res) => {
    try {
      const cart = await CartService.getCart();
      const { quantity, cart_id } = cart[0];
      return res.status(200).json({
        quantity,
        cart_id,
      });
    } catch (error) {
      res.status(500).json({
        message: "lỗi server",
      });
    }
  },
  createCartItem: async (req, res) => {
    const { product_id, cart_id, quantity, user_id } = req.body;
    try {
      console.log({ cart_id, product_id });
      const checkCartItem = await CartService.findCartItem(cart_id, product_id);
      console.log("checkCartItem", checkCartItem);

      if (checkCartItem !== undefined && checkCartItem.length > 0) {
        // tăng sản phẩm của số lượng lên
        await CartService.incrementQuantity(cart_id, product_id);
        return res.status(201).json({
          message: "sản phẩm đã được thêm vào giỏ hàng",
        });
      }
      //tạo mới cart-item
      await CartService.createCartItem(product_id, quantity, cart_id);
      //cập nhật số lượng tại bảng cart
      await CartService.updateQuantityCart(user_id);
      //lấy số lượng quanity của cart
      const quantityCart = await CartService.getCountCartItem();
      return res.status(201).json({
        message: "thêm vào giỏ hàng thành công",
        quantityCart: quantityCart["COUNT(cart_item_id)"],
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        message: "lỗi server",
      });
    }
  },
  getAllCartItem: async (req, res) => {
    try {
      const user = JSON.parse(req.cookies.user);
      const data = await CartService.getAllCartItem(user.user_id);
      res.status(200).json({
        cartData: data,
      });
    } catch (error) {
      res.status(500).json({
        message: "lỗi cart server",
      });
    }
  },
  incrementCartItem: async (req, res) => {
    try {
      await CartService.incrementQuantity(
        req.body.cart_id,
        req.body.product_id
      );
      res.status(201).json({
        message: "tang so luong san pham thanh cong",
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        message: "lỗi server",
      });
    }
  },
  decrementCartItem: async (req, res) => {
    try {
      await CartService.decrementQuantity(
        req.body.cart_id,
        req.body.product_id
      );
      res.status(201).json({
        message: "giảm so luong san pham thanh cong",
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        message: "lỗi server",
      });
    }
  },
};

module.exports = CartController;
