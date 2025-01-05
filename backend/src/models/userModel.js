const db = require('../config/database');
const bcrypt = require('bcrypt');

class UserModel {
  static async checkExistingUser(username, email) {
    return new Promise((resolve, reject) => {
      const sql = 'SELECT * FROM users WHERE username = ? OR email = ?';
      db.query(sql, [username, email], (err, results) => {
        if (err) reject(err);
        resolve(results);
      });
    });
  }

  static async createUser(username, email, password) {
    const hashedPassword = await bcrypt.hash(password, 10);
    return new Promise((resolve, reject) => {
      const sql = 'INSERT INTO users (username, email, password) VALUES (?, ?, ?)';
      db.query(sql, [username, email, hashedPassword], (err, result) => {
        if (err) reject(err);
        resolve(result);
      });
    });
  }

  static async findByEmail(email) {
    return new Promise((resolve, reject) => {
      const sql = 'SELECT * FROM users WHERE email = ?';
      db.query(sql, [email], (err, results) => {
        if (err) reject(err);
        resolve(results[0]);
      });
    });
  }

  static async updatePassword(username, newPassword) {
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    return new Promise((resolve, reject) => {
      const sql = 'UPDATE users SET password = ? WHERE username = ?';
      db.query(sql, [hashedPassword, username], (err, result) => {
        if (err) reject(err);
        resolve(result);
      });
    });
  }

  static async getAllUsers() {
    return new Promise((resolve, reject) => {
      const sql = 'SELECT id, username, email, status, role, created_at FROM users WHERE role != ?';
      db.query(sql, ['admin'], (err, results) => {
        if (err) reject(err);
        resolve(results);
      });
    });
  }

  static async searchUsers(searchTerm) {
    return new Promise((resolve, reject) => {
      const sql = `
        SELECT id, username, email, status, role, created_at 
        FROM users 
        WHERE (username LIKE ? OR email LIKE ?)
        AND role != ?
      `;
      const searchPattern = `%${searchTerm}%`;
      db.query(sql, [searchPattern, searchPattern, 'admin'], (err, results) => {
        if (err) reject(err);
        resolve(results);
      });
    });
  }

  static async updateUserStatus(userId, status) {
    return new Promise((resolve, reject) => {
      const sql = 'UPDATE users SET status = ? WHERE id = ?';
      db.query(sql, [status, userId], (err, result) => {
        if (err) reject(err);
        resolve(result);
      });
    });
  }
}

module.exports = UserModel;