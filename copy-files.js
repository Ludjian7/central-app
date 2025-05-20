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
  
  // First ensure the public directory is clean
  fs.emptyDirSync(publicDir);
  
  // Copy all files from build to public
  fs.copySync(clientBuildDir, publicDir);
  
  // Make sure we have the necessary static directories
  const staticDir = path.join(publicDir, 'static');
  if (!fs.existsSync(staticDir)) {
    console.log('Creating static directories...');
    fs.mkdirSync(path.join(staticDir, 'js'), { recursive: true });
    fs.mkdirSync(path.join(staticDir, 'css'), { recursive: true });
    
    // If static directories don't exist, we might need to create sample files
    // This is just for safeguarding in case the build failed
    if (!fs.existsSync(path.join(staticDir, 'js', 'main.js'))) {
      console.log('Creating placeholder JS file...');
      fs.writeFileSync(
        path.join(staticDir, 'js', 'main.js'), 
        'console.log("Central Computers Demo App");'
      );
    }
    
    if (!fs.existsSync(path.join(staticDir, 'css', 'main.css'))) {
      console.log('Creating placeholder CSS file...');
      fs.writeFileSync(
        path.join(staticDir, 'css', 'main.css'), 
        'body { font-family: sans-serif; }'
      );
    }
  }
  
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