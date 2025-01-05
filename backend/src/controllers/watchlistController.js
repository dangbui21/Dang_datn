const WatchlistModel = require('../models/watchlistModel');

class WatchlistController {
  static async getWatchlist(req, res) {
    try {
      const userId = req.userData.userId; // Lấy từ auth middleware
      console.log('Getting watchlist for userId:', userId);
      
      const watchlist = await WatchlistModel.getWatchlist(userId);
      console.log('Watchlist retrieved:', watchlist);
      
      res.json(watchlist);
    } catch (error) {
      console.error('Error getting watchlist:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  static async addToWatchlist(req, res) {
    try {
      const userId = req.userData.userId;
      const { symbol } = req.body;
      console.log('Adding symbol to watchlist:', symbol, 'for userId:', userId);

      if (!symbol) {
        return res.status(400).json({ error: 'Symbol is required' });
      }

      const result = await WatchlistModel.addToWatchlist(userId, symbol);
      console.log('Add to watchlist result:', result);
      
      res.json({ message: 'Stock added to watchlist successfully' });
    } catch (error) {
      console.error('Error adding to watchlist:', error);
      if (error.message === 'Stock not found') {
        res.status(404).json({ error: 'Stock not found' });
      } else {
        res.status(500).json({ error: 'Internal server error' });
      }
    }
  }
}

module.exports = WatchlistController; 