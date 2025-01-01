const express = require('express');
const router = express.Router();
const AdminController = require('../controllers/adminController');

router.get('/users', AdminController.getAllUsers);
router.get('/users/search', AdminController.searchUsers);
router.put('/users/:userId/status', AdminController.updateUserStatus);

module.exports = router;
