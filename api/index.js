// Vercel serverless function entry point
const express = require('express');
const cors = require('cors');
const session = require('express-session');
const path = require('path');
const { mockData } = require('../server/models');
const routes = require('../server/routes');

// Initialize Express
const app = express();

// Middleware
app.use(cors({
  origin: process.env.VERCEL_URL || '*',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept']
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Simple session for Vercel serverless functions
app.use(session({
  secret: process.env.SESSION_SECRET || 'demo_session_secret',
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24, // 1 day
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    httpOnly: true
  }
}));

// Use the routes
app.use('/', routes);

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'ok',
    service: 'central-computers-demo-api',
    environment: 'vercel-serverless',
    demoMode: 'active',
    timestamp: new Date().toISOString()
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error details:', err);
  
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Internal Server Error',
    error: process.env.NODE_ENV === 'production' ? 'Internal Server Error' : err.toString()
  });
});

// Export the Express app as the serverless function handler
module.exports = app; 