import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Placeholder components
const Home = () => (
  <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
    <h1>Central Computers Demo</h1>
    <p>Welcome to the Central Computers Management System Demo.</p>
    <p>This is a demonstration version showing how the system would work with mock data.</p>
    <div style={{ marginTop: '20px' }}>
      <h2>Available Demo Pages:</h2>
      <ul>
        <li><a href="/sales/1">View Sample Sale</a></li>
        <li><a href="/finance/reports">Financial Reports</a></li>
      </ul>
    </div>
    <div style={{ marginTop: '40px', padding: '20px', backgroundColor: '#f5f5f5', borderRadius: '5px' }}>
      <p>Backend API endpoints:</p>
      <ul>
        <li><a href="/api/sales" target="_blank" rel="noreferrer">/api/sales</a> - List all sales</li>
        <li><a href="/api/products" target="_blank" rel="noreferrer">/api/products</a> - List all products</li>
        <li><a href="/api/dashboard/summary" target="_blank" rel="noreferrer">/api/dashboard/summary</a> - Dashboard data</li>
        <li><a href="/api/finance/reports" target="_blank" rel="noreferrer">/api/finance/reports</a> - Financial reports</li>
      </ul>
    </div>
  </div>
);

const SaleDetail = () => (
  <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
    <h1>Sale Detail Page</h1>
    <p>This would display detailed information about a specific sale.</p>
    <p><a href="/">← Back to Home</a></p>
  </div>
);

const FinancialReport = () => (
  <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
    <h1>Financial Reports</h1>
    <p>This would display charts and tables with financial data.</p>
    <p><a href="/">← Back to Home</a></p>
  </div>
);

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sales/:id" element={<SaleDetail />} />
        <Route path="/finance/reports" element={<FinancialReport />} />
      </Routes>
    </Router>
  );
}

export default App;
