// Sales API endpoint
const { mockData } = require('../server/models');

module.exports = (req, res) => {
  // Return mock sales data
  res.json({
    success: true,
    data: mockData.sales,
    total: mockData.sales.length,
    message: 'Sales retrieved successfully'
  });
}; 