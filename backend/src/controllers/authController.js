const UserModel = require('../models/userModel');
const bcrypt = require('bcrypt');

class AuthController {
  static async register(req, res) {
    const { username, email, password } = req.body;
    console.log('Yêu cầu đăng ký nhận được:', req.body);

    try {
      const existingUsers = await UserModel.checkExistingUser(username, email);
      if (existingUsers.length > 0) {
        console.log('Người dùng đã tồn tại:', existingUsers);
        return res.status(400).send('Username or email already exists');
      }

      await UserModel.createUser(username, email, password);
      res.status(201).json({ 
        message: 'User registered successfully',
        success: true 
      });
    } catch (error) {
      console.error('Lỗi đăng ký:', error);
      res.status(500).json({ error: error.message });
    }
  }

  static async login(req, res) {
    const { email, password } = req.body;
    try {
      const user = await UserModel.findByEmail(email);
      
      // Kiểm tra user tồn tại
      if (!user) {
        return res.status(401).json({ 
          success: false,
          message: 'Email hoặc mật khẩu không chính xác' 
        });
      }

      // Chỉ kiểm tra trạng thái banned
      if (user.status === 'banned') {
        return res.status(403).json({ 
          success: false,
          message: 'Tài khoản của bạn đã bị cấm. Vui lòng liên hệ quản trị viên để biết thêm chi tiết.' 
        });
      }

      // Kiểm tra mật khẩu
      const match = await bcrypt.compare(password, user.password);
      if (!match) {
        return res.status(401).json({ 
          success: false,
          message: 'Email hoặc mật khẩu không chính xác' 
        });
      }

      // Thêm cảnh báo nếu tài khoản inactive
      const warningMessage = user.status === 'inactive' 
        ? 'Tài khoản của bạn đang ở trạng thái không hoạt động. Một số tính năng có thể bị hạn chế.'
        : null;

      const userResponse = {
        id: user.id,
        email: user.email,
        username: user.username,
        role: user.role,
        status: user.status
      };

      res.status(200).json({ 
        success: true,
        message: 'Đăng nhập thành công',
        warning: warningMessage,
        user: userResponse 
      });
    } catch (error) {
      console.error('Lỗi đăng nhập:', error);
      res.status(500).json({ 
        success: false,
        message: 'Lỗi hệ thống' 
      });
    }
  }

  static async changePassword(req, res) {
    const { username, newPassword } = req.body;
    try {
      await UserModel.updatePassword(username, newPassword);
      res.status(200).send('Password updated');
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = AuthController;