const express = require('express');
const router = express.Router();
const DashboardController = require('../controllers/dashboardController');

// SQL routes
router.post('/save-dashboard/sql', DashboardController.saveDashboard);
router.get('/load-dashboard/sql', DashboardController.loadDashboard);
router.get('/dashboard/history/:userId', DashboardController.getDashboardHistory);
router.get('/dashboard/detail/:id', DashboardController.getDashboardDetail);
router.post('/dashboard/apply/:id', DashboardController.applyDashboard);
router.delete('/dashboard/history/:id', DashboardController.deleteDashboardHistory);

// JSON file routes
router.post('/save-dashboard/json', DashboardController.saveDashboardToJson);
router.get('/load-dashboard/json', DashboardController.loadDashboardFromJson);

module.exports = router;