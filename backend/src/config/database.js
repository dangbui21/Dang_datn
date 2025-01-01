const mysql = require('mysql2');

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

module.exports = db;