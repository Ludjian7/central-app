// Sales API endpoint
const { sales } = require('./mockData');

module.exports = (req, res) => {
  // Return mock sales data
  res.json({
    success: true,
    data: sales,
    total: sales.length,
    message: 'Sales retrieved successfully'
  });
}; 