// Simple API router for Vercel serverless functions
const express = require('express');
const cors = require('cors');

// Initialize Express
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Import our mockData
const { sales, products, financeData } = require('./mockData');

// Define routes - Make sure to include the full path
app.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'Central Computers Demo API',
    endpoints: {
      sales: '/api/sales',
      products: '/api/products',
      finance: '/api/finance/reports',
      dashboard: '/api/dashboard/summary'
    }
  });
});

app.get('/api', (req, res) => {
  res.json({
    success: true,
    message: 'Central Computers Demo API',
    endpoints: {
      sales: '/api/sales',
      products: '/api/products',
      finance: '/api/finance/reports',
      dashboard: '/api/dashboard/summary'
    }
  });
});

app.get('/api/sales', (req, res) => {
  res.json({
    success: true,
    data: sales,
    total: sales.length,
    message: 'Sales retrieved successfully'
  });
});

app.get('/api/products', (req, res) => {
  res.json({
    success: true,
    data: products,
    total: products.length,
    message: 'Products retrieved successfully'
  });
});

app.get('/api/finance/reports', (req, res) => {
  res.json({
    success: true,
    data: financeData,
    message: 'Financial reports generated successfully'
  });
});

app.get('/api/dashboard/summary', (req, res) => {
  // Calculate summary data
  const totalSales = sales.length;
  const paidSales = sales.filter(s => s.paymentStatus === 'paid').length;
  const pendingSales = sales.filter(s => s.paymentStatus === 'pending').length;
  const totalRevenue = sales.reduce((sum, sale) => sum + sale.total, 0);
  const lowStockProducts = products.filter(p => p.stock < 10).length;
  
  res.json({
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
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: 'ok',
    service: 'central-computers-demo-api',
    timestamp: new Date().toISOString()
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error details:', err);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Internal Server Error'
  });
});

// For Vercel, we need to export the app as a module
module.exports = app; 