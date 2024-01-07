const connection = require("../configs/mysql.config");

const UserService = {
  register: (newUser) => {
    return new Promise((resolve, reject) => {
      connection.query("INSERT INTO users SET ?", newUser, (error, result) => {
        if (error) {
          reject(error);
        }
        resolve(result);
      });
    });
  },

  getUserByEmail: (email) => {
    console.log(email);
    return new Promise((resolve, reject) => {
      connection.query(
        "SELECT * FROM users WHERE email = ?",
        email,
        (error, result) => {
          if (error) {
            reject(error);
          }
          resolve(result[0]);
        }
      );
    });
  },
};

module.exports = UserService;
