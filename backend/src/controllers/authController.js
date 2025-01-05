const UserModel = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

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
    try {
      const { email, password } = req.body;
      const user = await UserModel.findByEmail(email);
      
      // Kiểm tra user tồn tại
      if (!user) {
        return res.status(401).json({
          success: false,
          message: 'Email hoặc mật khẩu không chính xác'
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

      // Kiểm tra trạng thái tài khoản
      if (user.status === 'inactive') {
        return res.status(403).json({
          success: false,
          message: 'Tài khoản tạm thời bị vô hiệu hóa. Vui lòng liên hệ admin để được hỗ trợ.',
          status: 'inactive'
        });
      }

      if (user.status === 'banned') {
        return res.status(403).json({
          success: false,
          message: 'Tài khoản đã bị cấm vĩnh viễn do vi phạm điều khoản sử dụng.',
          status: 'banned'
        });
      }

      // Chỉ tạo response cho tài khoản active
      const userResponse = {
        id: user.id,
        email: user.email,
        username: user.username,
        role: user.role,
        status: user.status
      };

      // Generate JWT token here
      const token = jwt.sign(
        { userId: user.id, role: user.role },
        'your_jwt_secret',
        { expiresIn: '24h' }
      );

      res.status(200).json({ 
        success: true,
        message: 'Đăng nhập thành công',
        user: userResponse,
        token: token
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