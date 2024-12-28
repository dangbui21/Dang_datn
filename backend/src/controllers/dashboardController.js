const DashboardModel = require('../models/dashboardModel');
const fs = require('fs').promises;
const path = require('path');

class DashboardController {
  static async saveDashboard(req, res) {
    try {
      const { userId, dashboardData } = req.body;
      await DashboardModel.saveDashboard(userId, dashboardData);
      res.status(200).json({ 
        success: true, 
        message: 'Dashboard configuration saved successfully' 
      });
    } catch (error) {
      console.error('Error saving dashboard:', error);
      res.status(500).json({ error: 'Failed to save dashboard configuration' });
    }
  }

  static async loadDashboard(req, res) {
    try {
      const userId = req.query.userId;
      console.log('Loading dashboard for userId:', userId);
      const dashboardData = await DashboardModel.loadDashboard(userId);
      res.status(200).json(dashboardData);
    } catch (error) {
      console.error('Error loading dashboard:', error);
      res.status(500).json({ error: 'Failed to load dashboard configuration' });
    }
  }

  static async getDashboardHistory(req, res) {
    try {
      const userId = req.params.userId;
      const history = await DashboardModel.getDashboardHistory(userId);
      res.status(200).json(history);
    } catch (error) {
      console.error('Error fetching dashboard history:', error);
      res.status(500).json({ error: 'Failed to fetch dashboard history' });
    }
  }

  static async getDashboardDetail(req, res) {
    try {
      const id = req.params.id;
      const detail = await DashboardModel.getDashboardDetail(id);
      if (!detail) {
        return res.status(404).json({ error: 'Dashboard not found' });
      }
      res.status(200).json(detail);
    } catch (error) {
      console.error('Error fetching dashboard detail:', error);
      res.status(500).json({ error: 'Failed to fetch dashboard detail' });
    }
  }

  static async applyDashboard(req, res) {
    try {
      const { userId } = req.body;
      const id = req.params.id;
      await DashboardModel.applyDashboard(userId, id);
      res.status(200).json({ 
        success: true, 
        message: 'Dashboard version applied successfully' 
      });
    } catch (error) {
      console.error('Error applying dashboard version:', error);
      res.status(500).json({ error: 'Failed to apply dashboard version' });
    }
  }

  static async deleteDashboardHistory(req, res) {
    try {
      const id = req.params.id;
      await DashboardModel.deleteDashboardHistory(id);
      res.status(200).json({ 
        success: true, 
        message: 'Dashboard history deleted successfully' 
      });
    } catch (error) {
      console.error('Error deleting dashboard history:', error);
      res.status(500).json({ error: 'Failed to delete dashboard history' });
    }
  }

  // Methods for JSON file operations
  static async saveDashboardToJson(req, res) {
    try {
      const configPath = path.join(__dirname, '../../frontend/src/assets/data/dashboard-config.json');
      console.log('Saving dashboard config to:', configPath);
      console.log('Dashboard data:', req.body);
      
      const dir = path.dirname(configPath);
      await fs.mkdir(dir, { recursive: true });
      
      await fs.writeFile(configPath, JSON.stringify(req.body, null, 2));
      res.json({ success: true, message: 'Dashboard configuration saved successfully' });
    } catch (error) {
      console.error('Error saving dashboard:', error);
      res.status(500).json({ 
        error: 'Failed to save dashboard configuration',
        details: error.message
      });
    }
  }

  static async loadDashboardFromJson(req, res) {
    try {
      const configPath = path.join(__dirname, '../../ngx-admin/src/assets/data/dashboard-config.json');
      const data = await fs.readFile(configPath, 'utf8');
      res.json(JSON.parse(data));
    } catch (error) {
      console.error('Error loading dashboard:', error);
      res.status(500).json({ error: 'Failed to load dashboard configuration' });
    }
  }
}

module.exports = DashboardController;