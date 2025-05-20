// Dashboard API endpoint
const { sales, products, financeData } = require('./mockData');

module.exports = (req, res) => {
  // Calculate summary data from mock data
  const totalSales = sales.length;
  const paidSales = sales.filter(s => s.paymentStatus === 'paid').length;
  const pendingSales = sales.filter(s => s.paymentStatus === 'pending').length;
  
  // Calculate total revenue
  const totalRevenue = sales.reduce((sum, sale) => sum + sale.total, 0);
  
  // Get low stock products (less than 10)
  const lowStockProducts = products.filter(p => p.stock < 10).length;
  
  res.json({
    success: true,
    data: {
      totalSales,
      paidSales,
      pendingSales,
      totalRevenue,
      lowStockProducts,
      recentSales: sales.slice(0, 5), // Last 5 sales
      recentTransactions: financeData.recentTransactions.slice(0, 5) // Last 5 transactions
    },
    message: 'Dashboard summary generated successfully'
  });
}; 