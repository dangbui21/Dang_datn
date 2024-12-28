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
      if (!user) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }

      const match = await bcrypt.compare(password, user.password);
      if (!match) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }

      const userResponse = {
        id: user.id,
        email: user.email,
        username: user.username,
        role: user.role,
        status: user.status
      };

      res.status(200).json({ 
        message: 'Login successful',
        user: userResponse 
      });
    } catch (error) {
      console.error('Lỗi đăng nhập:', error);
      res.status(500).json({ error: 'Internal server error' });
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