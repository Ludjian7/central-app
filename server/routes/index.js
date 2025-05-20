const express = require('express');
const router = express.Router();
const { mockData } = require('../models');

// Import controllers
// Note: In a real project, we would have proper controller imports
// const saleController = require('../controllers/saleController');

// Sales listing endpoint
router.get('/sales', (req, res) => {
  // Return mock sales data
  res.json({
    success: true,
    data: mockData.sales,
    total: mockData.sales.length,
    message: 'Sales retrieved successfully'
  });
});

// Single sale endpoint with items
router.get('/sales/:id', (req, res) => {
  const saleId = parseInt(req.params.id);
  const sale = mockData.sales.find(s => s.id === saleId);
  
  if (!sale) {
    return res.status(404).json({
      success: false,
      message: 'Sale not found'
    });
  }

  res.json({
    success: true,
    data: sale,
    message: 'Sale retrieved successfully'
  });
});

// Finance reports endpoint
router.get('/finance/reports', (req, res) => {
  res.json({
    success: true,
    data: mockData.financeData,
    message: 'Financial reports generated successfully'
  });
});

// Products listing endpoint
router.get('/products', (req, res) => {
  res.json({
    success: true,
    data: mockData.products,
    total: mockData.products.length,
    message: 'Products retrieved successfully'
  });
});

// Single product endpoint
router.get('/products/:id', (req, res) => {
  const productId = parseInt(req.params.id);
  const product = mockData.products.find(p => p.id === productId);
  
  if (!product) {
    return res.status(404).json({
      success: false,
      message: 'Product not found'
    });
  }

  res.json({
    success: true,
    data: product,
    message: 'Product retrieved successfully'
  });
});

// Dashboard summary endpoint
router.get('/dashboard/summary', (req, res) => {
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
});

// Other demo routes can be added here

module.exports = router; 