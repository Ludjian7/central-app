#!/usr/bin/env node

const fs = require('fs-extra');
const path = require('path');

console.log('Running copy-files script for Vercel deployment...');

// Define paths
const clientBuildDir = path.join(__dirname, 'client', 'build');
const publicDir = path.join(__dirname, 'public');

// Ensure the client build directory exists
if (!fs.existsSync(clientBuildDir)) {
  console.error('Error: Client build directory does not exist!');
  console.error('Make sure to run npm run build first.');
  process.exit(1);
}

// Create public directory if it doesn't exist
if (!fs.existsSync(publicDir)) {
  console.log('Creating public directory...');
  fs.mkdirSync(publicDir);
}

try {
  // Copy client build files to public directory
  console.log('Copying client build files to public directory...');
  fs.copySync(clientBuildDir, publicDir);
  console.log('Successfully copied client build files!');
} catch (err) {
  console.error('Error copying files:', err);
  process.exit(1);
}

// Create a simple vercel.json if it doesn't exist (as a backup)
const vercelJsonPath = path.join(__dirname, 'vercel.json');
if (!fs.existsSync(vercelJsonPath)) {
  console.log('Creating vercel.json file...');
  const vercelConfig = {
    "version": 2,
    "builds": [
      {
        "src": "server.js",
        "use": "@vercel/node"
      },
      {
        "src": "public/**",
        "use": "@vercel/static"
      }
    ],
    "routes": [
      {
        "src": "/api/(.*)",
        "dest": "/server.js"
      },
      {
        "handle": "filesystem"
      },
      {
        "src": "/(.*)",
        "dest": "/public/index.html"
      }
    ]
  };

  fs.writeFileSync(vercelJsonPath, JSON.stringify(vercelConfig, null, 2));
  console.log('vercel.json file created.');
}

console.log('Copy-files script completed successfully!'); 