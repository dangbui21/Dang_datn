const express = require('express');
const router = express.Router();
const WatchlistController = require('../controllers/watchlistController');
const auth = require('../middleware/auth');

router.use(auth); // Yêu cầu xác thực cho tất cả các routes

router.get('/', WatchlistController.getWatchlist);
router.post('/', WatchlistController.addToWatchlist);
router.delete('/:symbol', WatchlistController.removeFromWatchlist);

module.exports = router; 