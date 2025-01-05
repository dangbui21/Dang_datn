const StockModel = require('../models/stockModel');

class StockController {
  static async searchStocks(req, res) {
    try {
      const { symbol } = req.query;
      console.log('Backend received search request for symbol:', symbol);
      
      const stocks = await StockModel.searchBySymbol(symbol);
      console.log('Search results:', stocks);
      
      res.json(stocks);
    } catch (error) {
      console.error('Backend search error:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
}

module.exports = StockController; 