// Direct handler for Vercel serverless functions
const { sales, products, financeData } = require('./mockData');

module.exports = (req, res) => {
  // Get the path from the request
  const path = req.url.split('?')[0];
  
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');

  // Handle OPTIONS method for CORS preflight
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  
  // Route requests based on path
  switch (path) {
    case '/api':
      return res.json({
        success: true,
        message: 'Central Computers Demo API',
        endpoints: {
          sales: '/api/sales',
          products: '/api/products',
          finance: '/api/finance/reports',
          dashboard: '/api/dashboard/summary'
        }
      });
    
    case '/api/sales':
      return res.json({
        success: true,
        data: sales,
        total: sales.length,
        message: 'Sales retrieved successfully'
      });
    
    case '/api/products':
      return res.json({
        success: true,
        data: products,
        total: products.length,
        message: 'Products retrieved successfully'
      });
    
    case '/api/finance/reports':
      return res.json({
        success: true,
        data: financeData,
        message: 'Financial reports generated successfully'
      });
    
    case '/api/dashboard/summary':
      // Calculate summary data
      const totalSales = sales.length;
      const paidSales = sales.filter(s => s.paymentStatus === 'paid').length;
      const pendingSales = sales.filter(s => s.paymentStatus === 'pending').length;
      const totalRevenue = sales.reduce((sum, sale) => sum + sale.total, 0);
      const lowStockProducts = products.filter(p => p.stock < 10).length;
      
      return res.json({
        success: true,
        data: {
          totalSales,
          paidSales,
          pendingSales,
          totalRevenue,
          lowStockProducts,
          recentSales: sales.slice(0, 5),
          recentTransactions: financeData.recentTransactions.slice(0, 5)
        },
        message: 'Dashboard summary generated successfully'
      });
    
    case '/api/health':
      return res.status(200).json({
        status: 'ok',
        service: 'central-computers-demo-api',
        timestamp: new Date().toISOString()
      });
    
    default:
      return res.status(404).json({
        success: false,
        message: 'Endpoint not found'
      });
  }
}; 