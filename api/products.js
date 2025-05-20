// Products API endpoint
const { products } = require('./mockData');

module.exports = (req, res) => {
  // Return mock products data
  res.json({
    success: true,
    data: products,
    total: products.length,
    message: 'Products retrieved successfully'
  });
}; 