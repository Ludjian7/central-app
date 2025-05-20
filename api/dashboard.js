// Dashboard API endpoint
const { mockData } = require('../server/models');

module.exports = (req, res) => {
  // Calculate summary data from mock data
  const totalSales = mockData.sales.length;
  const paidSales = mockData.sales.filter(s => s.paymentStatus === 'paid').length;
  const pendingSales = mockData.sales.filter(s => s.paymentStatus === 'pending').length;
  
  // Calculate total revenue
  const totalRevenue = mockData.sales.reduce((sum, sale) => sum + sale.total, 0);
  
  // Get low stock products (less than 10)
  const lowStockProducts = mockData.products.filter(p => p.stock < 10).length;
  
  res.json({
    success: true,
    data: {
      totalSales,
      paidSales,
      pendingSales,
      totalRevenue,
      lowStockProducts,
      recentSales: mockData.sales.slice(0, 5), // Last 5 sales
      recentTransactions: mockData.financeData.recentTransactions.slice(0, 5) // Last 5 transactions
    },
    message: 'Dashboard summary generated successfully'
  });
}; 