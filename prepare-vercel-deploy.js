#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('Preparing Central Computers Demo for Vercel deployment...');

// Create directories if they don't exist
const dirs = [
  path.join(__dirname, 'client', 'public'),
  path.join(__dirname, 'client', 'src'),
  path.join(__dirname, 'client', 'src', 'components'),
  path.join(__dirname, 'client', 'src', 'pages'),
];

dirs.forEach(dir => {
  if (!fs.existsSync(dir)) {
    console.log(`Creating directory: ${dir}`);
    fs.mkdirSync(dir, { recursive: true });
  }
});

// Create a sample index.html for the client
const indexPath = path.join(__dirname, 'client', 'public', 'index.html');
if (!fs.existsSync(indexPath)) {
  console.log('Creating client/public/index.html');
  fs.writeFileSync(indexPath, `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <link rel="icon" href="%PUBLIC_URL%/favicon.ico" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="theme-color" content="#000000" />
    <meta name="description" content="Central Computers Management System Demo" />
    <link rel="apple-touch-icon" href="%PUBLIC_URL%/logo192.png" />
    <link rel="manifest" href="%PUBLIC_URL%/manifest.json" />
    <title>Central Computers Demo</title>
  </head>
  <body>
    <noscript>You need to enable JavaScript to run this app.</noscript>
    <div id="root"></div>
  </body>
</html>`);
}

// Create a manifest.json file
const manifestPath = path.join(__dirname, 'client', 'public', 'manifest.json');
if (!fs.existsSync(manifestPath)) {
  console.log('Creating client/public/manifest.json');
  fs.writeFileSync(manifestPath, `{
  "short_name": "CC Demo",
  "name": "Central Computers Demo",
  "icons": [
    {
      "src": "favicon.ico",
      "sizes": "64x64 32x32 24x24 16x16",
      "type": "image/x-icon"
    }
  ],
  "start_url": ".",
  "display": "standalone",
  "theme_color": "#000000",
  "background_color": "#ffffff"
}`);
}

// Create a basic entry point for the client
const indexJsPath = path.join(__dirname, 'client', 'src', 'index.js');
if (!fs.existsSync(indexJsPath)) {
  console.log('Creating client/src/index.js');
  fs.writeFileSync(indexJsPath, `import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);`);
}

// Create a basic App.js for the client
const appJsPath = path.join(__dirname, 'client', 'src', 'App.js');
if (!fs.existsSync(appJsPath)) {
  console.log('Creating client/src/App.js');
  fs.writeFileSync(appJsPath, `import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Placeholder for actual component imports
const Home = () => <div>Home Page</div>;
const SaleDetail = () => <div>Sale Detail Page</div>;
const FinancialReport = () => <div>Financial Report Page</div>;

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

export default App;`);
}

// Create an environment file if it doesn't exist
const envPath = path.join(__dirname, '.env');
if (!fs.existsSync(envPath)) {
  console.log('Creating .env file with sample values');
  fs.writeFileSync(envPath, `# This is a sample .env file for local development
# For production, set these variables in your Vercel dashboard
DATABASE_URL=postgres://postgres:password@localhost:5432/central_computers
SESSION_SECRET=development_secret_key
NODE_ENV=development
PORT=5001`);
}

console.log('Vercel deployment preparation complete!');
console.log('\nNext steps:');
console.log('1. Push your code to a Git repository');
console.log('2. Connect the repository to Vercel');
console.log('3. Set up environment variables in the Vercel dashboard');
console.log('4. Deploy your application');
console.log('\nRefer to VERCEL_DEPLOYMENT.md for detailed instructions.'); 