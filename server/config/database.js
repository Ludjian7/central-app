const { Sequelize } = require('sequelize');
require('dotenv').config();

// Mock database configuration for demo mode
const mockDb = {
  isConnected: true
};

// Create Sequelize instance (will only be used for model definitions)
const sequelize = new Sequelize('sqlite::memory:', {
  logging: false
});

// Test database connection - for demo, always return true
const testConnection = async () => {
  // Log that we're using mock data
  console.log('Running in demo mode with mock data. No real database connection is used.');
  return true;
};

module.exports = {
  sequelize,
  testConnection,
  mockDb
}; 