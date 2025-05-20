const { sequelize, mockDb } = require('../config/database');
const mockData = require('../data/mockData');

// Import model definitions (still needed for reference)
const Sale = require('./Sale');

// No need for real database synchronization with mock data
const syncModels = async () => {
  console.log('Using mock data - no database synchronization needed');
  return true;
};

// Export mock data and model definitions
module.exports = {
  Sale,
  syncModels,
  mockData
}; 