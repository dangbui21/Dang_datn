const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs').promises;
const path = require('path');
const mysql = require('mysql2');
const bcrypt = require('bcrypt');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());

app.use(bodyParser.json());

// Kết nối MySQL
const db = mysql.createConnection({
  host: 'localhost',
  port: 3300,
  user: 'root',
  password: 'Password@123',
  database: 'datn'
});

db.connect((err) => {
  if (err) {
    console.error('Lỗi kết nối MySQL:', err);
    return;
  }
  console.log('Đã kết nối thành công tới MySQL');
});

// Đăng ký người dùng
app.post('/acc/register', async (req, res) => {
  const { username, email, password } = req.body;

  console.log('Yêu cầu đăng ký nhận được:', req.body);

  // Kiểm tra xem người dùng đã tồn tại chưa
  const checkUserSql = 'SELECT * FROM users WHERE username = ? OR email = ?';
  db.query(checkUserSql, [username, email], async (err, results) => {
    if (err) {
      console.error('Lỗi khi kiểm tra người dùng:', err);
      return res.status(500).send(err);
    }
    if (results.length > 0) {
      console.log('Người dùng đã tồn tại:', results);
      return res.status(400).send('Username or email already exists');
    }

    // Mã hóa mật khẩu trước khi lưu vào cơ sở dữ liệu
    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      console.log('Mật khẩu đã được mã hóa:', hashedPassword);

      const sql = 'INSERT INTO users (username, email, password) VALUES (?, ?, ?)';
      db.query(sql, [username, email, hashedPassword], (err, result) => {
        if (err) {
          console.error('Lỗi khi thêm người dùng vào cơ sở dữ liệu:', err);
          return res.status(500).json({ error: err.message });
        }
        console.log('Người dùng đã được đăng ký thành công:', result);
        res.status(201).json({ 
          message: 'User registered successfully',
          success: true 
        });
      });
    } catch (hashError) {
      console.error('Lỗi khi mã hóa mật khẩu:', hashError);
      return res.status(500).send('Error hashing password');
    }
  });
});

// Đăng nhập người dùng
app.post('/acc/login', async (req, res) => {
  const { email, password } = req.body;
  const sql = 'SELECT * FROM users WHERE email = ?';
  
  db.query(sql, [email], async (err, results) => {
    if (err) {
      console.error('Lỗi khi truy vấn người dùng:', err);
      return res.status(500).json({ error: 'Internal server error' });
    }
    if (results.length > 0) {
      const user = results[0];
      const match = await bcrypt.compare(password, user.password);
      if (match) {
        // Trả về phản hồi JSON
        return res.status(200).json({ message: 'Login successful' });
      } else {
        return res.status(401).json({ error: 'Invalid credentials' });
      }
    } else {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
  });
});

// Thay đổi mật khẩu
app.post('/acc/change-password', (req, res) => {
  const { username, newPassword } = req.body;
  const sql = 'UPDATE users SET password = ? WHERE username = ?';
  db.query(sql, [newPassword, username], (err, result) => {
    if (err) return res.status(500).send(err);
    res.status(200).send('Password updated');
  });
});

app.listen(PORT, () => {
  console.log(`Server đang chạy tại http://localhost:${PORT}`);
});

// API endpoint để lưu cấu hình dashboard vào MySQL
app.post('/api/save-dashboard/sql', (req, res) => {
  const { userId, dashboardData } = req.body;

  // Lệnh SQL để thêm mới hoặc cập nhật cấu hình dashboard
  const sql = `
    INSERT INTO dashboard (user_id, dashboard_data)
    VALUES (?, ?)
    ON DUPLICATE KEY UPDATE dashboard_data = ?, updated_at = CURRENT_TIMESTAMP;
  `;

  db.query(sql, [userId, JSON.stringify(dashboardData), JSON.stringify(dashboardData)], (err, result) => {
    if (err) {
      console.error('Error saving dashboard to database:', err);
      return res.status(500).send({ error: 'Failed to save dashboard configuration to database' });
    }
    res.status(200).send({ success: true, message: 'Dashboard configuration saved successfully to database' });
  });
});

// API endpoint để đọc cấu hình dashboard từ MySQL
app.get('/api/load-dashboard/sql', (req, res) => {
  const userId = req.query.userId; // Truyền `userId` qua query parameters

  // Lệnh SQL để lấy dữ liệu cấu hình dashboard
  const sql = 'SELECT dashboard_data FROM dashboard WHERE user_id = ?';

  db.query(sql, [userId], (err, results) => {
    if (err) {
      console.error('Error loading dashboard from database:', err);
      return res.status(500).send({ error: 'Failed to load dashboard configuration from database' });
    }

    if (results.length > 0) {
      const dashboardData = JSON.parse(results[0].dashboard_data); // Parse JSON từ MySQL
      res.status(200).json(dashboardData);
    } else {
      res.status(404).send({ error: 'Dashboard configuration not found for this user' });
    }
  });
});


// API endpoint để lưu dashboard
app.post('/api/save-dashboard/json', async (req, res) => {
  try {
    const configPath = path.join(__dirname, '../frontend/src/assets/data/dashboard-config.json');
    console.log('Saving dashboard config to:', configPath);
    console.log('Dashboard data:', req.body);
    
    const dir = path.dirname(configPath);
    await fs.mkdir(dir, { recursive: true });
    
    await fs.writeFile(configPath, JSON.stringify(req.body, null, 2));
    res.json({ success: true, message: 'Dashboard configuration saved successfully' });
  } catch (error) {
    console.error('Error saving dashboard:', error);
    res.status(500).json({ 
      error: 'Failed to save dashboard configuration',
      details: error.message  // Thêm chi tiết lỗi để debug
    });
  }
});

// API endpoint để đọc dashboard
app.get('/api/load-dashboard/json', async (req, res) => {
  try {
    const configPath = path.join(__dirname, '../ngx-admin/src/assets/data/dashboard-config.json');
    const data = await fs.readFile(configPath, 'utf8');
    res.json(JSON.parse(data));
  } catch (error) {
    console.error('Error loading dashboard:', error);
    res.status(500).json({ error: 'Failed to load dashboard configuration' });
  }
});


