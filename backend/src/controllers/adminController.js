const UserModel = require('../models/userModel');

class AdminController {
  static async getAllUsers(req, res) {
    try {
      const users = await UserModel.getAllUsers();
      res.status(200).json({
        success: true,
        data: users
      });
    } catch (error) {
      console.error('Error fetching users:', error);
      res.status(500).json({ 
        success: false, 
        message: 'Lỗi hệ thống khi lấy danh sách người dùng' 
      });
    }
  }

  static async searchUsers(req, res) {
    try {
      const { searchTerm } = req.query;
      const users = await UserModel.searchUsers(searchTerm);
      res.status(200).json({
        success: true,
        data: users
      });
    } catch (error) {
      console.error('Error searching users:', error);
      res.status(500).json({ 
        success: false, 
        message: 'Lỗi hệ thống khi tìm kiếm người dùng' 
      });
    }
  }

  static async updateUserStatus(req, res) {
    try {
      const { userId } = req.params;
      const { status } = req.body;

      if (!['active', 'inactive', 'banned'].includes(status)) {
        return res.status(400).json({
          success: false,
          message: 'Trạng thái không hợp lệ'
        });
      }

      await UserModel.updateUserStatus(userId, status);
      res.status(200).json({
        success: true,
        message: 'Cập nhật trạng thái tài khoản thành công'
      });
    } catch (error) {
      console.error('Error updating user status:', error);
      res.status(500).json({ 
        success: false, 
        message: 'Lỗi hệ thống khi cập nhật trạng thái người dùng' 
      });
    }
  }
}

module.exports = AdminController;