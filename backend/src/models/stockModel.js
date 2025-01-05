const db = require('../config/database');

class StockModel {
  static async searchBySymbol(symbol) {
    return new Promise((resolve, reject) => {
      const sql = 'SELECT * FROM stocks WHERE symbol LIKE ?';
      console.log('Executing SQL query:', sql, 'with parameter:', `${symbol}%`);
      
      db.query(sql, [`${symbol}%`], (err, results) => {
        if (err) {
          console.error('Database query error:', err);
          reject(err);
        }
        console.log('Database results:', results);
        resolve(results);
      });
    });
  }
}

module.exports = StockModel; 