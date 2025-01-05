const db = require('../config/database');

class WatchlistModel {
  static async getWatchlist(userId) {
    return new Promise((resolve, reject) => {
      const sql = `
        SELECT s.* 
        FROM stocks s
        INNER JOIN user_stocks us ON s.id = us.stock_id
        WHERE us.user_id = ?
      `;
      console.log('Executing SQL:', sql, 'with userId:', userId);
      
      db.query(sql, [userId], (err, results) => {
        if (err) {
          console.error('Database error:', err);
          reject(err);
          return;
        }
        console.log('Watchlist results:', results);
        resolve(results);
      });
    });
  }

  static async addToWatchlist(userId, symbol) {
    return new Promise((resolve, reject) => {
      // Đầu tiên tìm stock_id từ symbol
      const findStockSql = 'SELECT id FROM stocks WHERE symbol = ?';
      console.log('Finding stock:', findStockSql, 'with symbol:', symbol);
      
      db.query(findStockSql, [symbol], (err, results) => {
        if (err) {
          console.error('Error finding stock:', err);
          reject(err);
          return;
        }
        
        if (results.length === 0) {
          console.log('Stock not found:', symbol);
          reject(new Error('Stock not found'));
          return;
        }

        const stockId = results[0].id;
        const insertSql = 'INSERT INTO user_stocks (user_id, stock_id) VALUES (?, ?)';
        console.log('Inserting into watchlist:', insertSql, 'userId:', userId, 'stockId:', stockId);
        
        db.query(insertSql, [userId, stockId], (err, result) => {
          if (err) {
            if (err.code === 'ER_DUP_ENTRY') {
              console.log('Stock already in watchlist');
              resolve({ message: 'Stock already in watchlist' });
              return;
            }
            console.error('Error inserting into watchlist:', err);
            reject(err);
            return;
          }
          console.log('Successfully added to watchlist');
          resolve(result);
        });
      });
    });
  }
}

module.exports = WatchlistModel; 