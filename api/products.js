// Products API endpoint
const { mockData } = require('../server/models');

module.exports = (req, res) => {
  // Return mock products data
  res.json({
    success: true,
    data: mockData.products,
    total: mockData.products.length,
    message: 'Products retrieved successfully'
  });
}; 