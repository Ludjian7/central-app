// Simple health check endpoint
module.exports = (req, res) => {
  res.status(200).json({
    status: 'ok',
    service: 'central-computers-demo-api',
    endpoint: 'health',
    timestamp: new Date().toISOString()
  });
}; 