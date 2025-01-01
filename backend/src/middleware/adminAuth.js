const UserModel = require('../models/userModel');

const adminAuth = async (req, res, next) => {
  try {
    const userId = req.userData?.userId; // Lấy từ JWT middleware

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: 'Không có quyền truy cập'
      });
    }

    const userRole = await UserModel.checkUserRole(userId);
    
    if (userRole !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Chỉ admin mới có quyền truy cập'
      });
    }

    next();
  } catch (error) {
    console.error('Admin auth error:', error);
    res.status(500).json({
      success: false,
      message: 'Lỗi hệ thống khi kiểm tra quyền'
    });
  }
};

module.exports = adminAuth;
