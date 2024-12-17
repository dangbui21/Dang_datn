const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs').promises;
const path = require('path');
const mysql = require('mysql');
const bcrypt = require('bcrypt');

const app = express();
const port = 3000;

// Middleware
app.use(cors());

app.use(bodyParser.json());

// Kết nối đến cơ sở dữ liệu MySQL
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root', // Thay thế bằng tên người dùng của bạn
  password: 'Password@123', // Thay thế bằng mật khẩu của bạn
  database: 'datn' // Tên cơ sở dữ liệu
});

// Đăng ký người dùng
app.post('/auth/register', async (req, res) => {
  const { username, email, password } = req.body;

  // Mã hóa mật khẩu trước khi lưu vào cơ sở dữ liệu
  const hashedPassword = await bcrypt.hash(password, 10);

  const sql = 'INSERT INTO users (username, email, password) VALUES (?, ?, ?)';
  db.query(sql, [username, email, hashedPassword], (err, result) => {
    if (err) {
      if (err.code === 'ER_DUP_ENTRY') {
        return res.status(400).send('Username or email already exists');
      }
      return res.status(500).send(err);
    }
    res.status(201).send('User registered');
  });
});

// Đăng nhập người dùng
app.post('/auth/login', async (req, res) => {
  const { email, password } = req.body;
  const sql = 'SELECT * FROM users WHERE email = ?';
  
  db.query(sql, [email], async (err, results) => {
    if (err) return res.status(500).send(err);
    if (results.length > 0) {
      const user = results[0];
      const match = await bcrypt.compare(password, user.password);
      if (match) {
        res.status(200).send('Login successful');
      } else {
        res.status(401).send('Invalid credentials');
      }
    } else {
      res.status(401).send('Invalid credentials');
    }
  });
});

// Thay đổi mật khẩu
app.post('/auth/reset-password', (req, res) => {
  const { username, newPassword } = req.body;
  const sql = 'UPDATE users SET password = ? WHERE username = ?';
  db.query(sql, [newPassword, username], (err, result) => {
    if (err) return res.status(500).send(err);
    res.status(200).send('Password updated');
  });
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
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
    const configPath = path.join(__dirname, '../ngx-admin/src/assets/data/dashboard-config.json');
    console.log('Saving dashboard config to:', configPath);
    console.log('Dashboard data:', req.body);
    
    await fs.writeFile(configPath, JSON.stringify(req.body, null, 2));
    res.json({ success: true, message: 'Dashboard configuration saved successfully' });
  } catch (error) {
    console.error('Error saving dashboard:', error);
    res.status(500).json({ error: 'Failed to save dashboard configuration' });
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

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Backend server running on port ${PORT}`);
}); 