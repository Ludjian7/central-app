// Finance API endpoint
const { financeData } = require('./mockData');

module.exports = (req, res) => {
  res.json({
    success: true,
    data: financeData,
    message: 'Financial reports generated successfully'
  });
}; 