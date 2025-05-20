// Finance API endpoint
const { mockData } = require('../server/models');

module.exports = (req, res) => {
  res.json({
    success: true,
    data: mockData.financeData,
    message: 'Financial reports generated successfully'
  });
}; 