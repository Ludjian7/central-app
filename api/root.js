// Root API endpoint
module.exports = (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Central Computers Demo API',
    endpoints: {
      health: '/api/health',
      sales: '/api/sales',
      products: '/api/products',
      finance: '/api/finance/reports',
      dashboard: '/api/dashboard/summary'
    },
    timestamp: new Date().toISOString()
  });
}; 