const auth = (req, res, next) => {
    // Thêm logic xác thực JWT hoặc session ở đây
    next();
  };
  
  module.exports = auth;