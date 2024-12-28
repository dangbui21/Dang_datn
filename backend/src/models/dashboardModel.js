const db = require('../config/database');

class DashboardModel {
  static async saveDashboard(userId, dashboardData) {
    return new Promise((resolve, reject) => {
      const dashboardJson = JSON.stringify(dashboardData);
      const sql = `
        INSERT INTO dashboard (user_id, dashboard_data)
        VALUES (?, ?)
        ON DUPLICATE KEY UPDATE dashboard_data = ?, updated_at = CURRENT_TIMESTAMP;
      `;
      db.query(sql, [userId, dashboardJson, dashboardJson], (err, result) => {
        if (err) reject(err);
        resolve(result);
      });
    });
  }

  static async loadDashboard(userId) {
    return new Promise((resolve, reject) => {
      const sql = `
        SELECT dashboard_data 
        FROM dashboard 
        WHERE user_id = ? 
        ORDER BY created_at DESC 
        LIMIT 1
      `;
      db.query(sql, [userId], (err, results) => {
        if (err) reject(err);
        resolve(results[0]?.dashboard_data || []);
      });
    });
  }

  static async getDashboardHistory(userId) {
    return new Promise((resolve, reject) => {
      const sql = `
        SELECT id, dashboard_data, created_at, updated_at
        FROM dashboard 
        WHERE user_id = ?
        ORDER BY created_at DESC
      `;
      db.query(sql, [userId], (err, results) => {
        if (err) reject(err);
        resolve(results);
      });
    });
  }

  static async getDashboardDetail(id) {
    return new Promise((resolve, reject) => {
      const sql = 'SELECT dashboard_data FROM dashboard WHERE id = ?';
      db.query(sql, [id], (err, results) => {
        if (err) reject(err);
        resolve(results[0]?.dashboard_data || null);
      });
    });
  }

  static async applyDashboard(userId, id) {
    return new Promise((resolve, reject) => {
      const sql = `
        INSERT INTO dashboard (user_id, dashboard_data)
        SELECT ?, dashboard_data
        FROM dashboard
        WHERE id = ?
      `;
      db.query(sql, [userId, id], (err, result) => {
        if (err) reject(err);
        resolve(result);
      });
    });
  }

  static async deleteDashboardHistory(id) {
    return new Promise((resolve, reject) => {
      const sql = 'DELETE FROM dashboard WHERE id = ?';
      db.query(sql, [id], (err, result) => {
        if (err) reject(err);
        resolve(result);
      });
    });
  }
}

module.exports = DashboardModel;