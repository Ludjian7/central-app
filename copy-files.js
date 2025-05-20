#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Source directory is the parent folder
const sourceDir = path.join(__dirname, '..');
// Destination directory is the current folder
const destDir = __dirname;

// Files to copy from client
const clientFiles = [
  {
    source: 'client/src/pages/Sales/SaleDetail.js',
    dest: 'client/src/pages/Sales/SaleDetail.js'
  },
  {
    source: 'client/src/pages/Sales/SaleForm.js',
    dest: 'client/src/pages/Sales/SaleForm.js'
  },
  {
    source: 'client/src/pages/Finance/FinancialReport.js',
    dest: 'client/src/pages/Finance/FinancialReport.js'
  },
  {
    source: 'client/src/components/Layout/Layout.js',
    dest: 'client/src/components/Layout/Layout.js'
  }
];

// Files to copy from server
const serverFiles = [
  {
    source: 'server/controllers/saleController.js',
    dest: 'server/controllers/saleController.js'
  },
  {
    source: 'server/controllers/financeController.js',
    dest: 'server/controllers/financeController.js'
  },
  {
    source: 'server/models/Sale.js',
    dest: 'server/models/Sale.js'
  }
];

// Create directory if it doesn't exist
function ensureDirectoryExists(dirPath) {
  const dirname = path.dirname(dirPath);
  if (fs.existsSync(dirname)) {
    return true;
  }
  ensureDirectoryExists(dirname);
  fs.mkdirSync(dirname);
}

// Copy file from source to destination
function copyFile(source, dest) {
  try {
    if (!fs.existsSync(source)) {
      console.log(`Source file does not exist: ${source}`);
      return false;
    }
    
    ensureDirectoryExists(dest);
    fs.copyFileSync(source, dest);
    console.log(`Copied: ${source} -> ${dest}`);
    return true;
  } catch (error) {
    console.error(`Error copying ${source} to ${dest}:`, error);
    return false;
  }
}

// Main function to copy files
function copyFiles() {
  console.log('Copying client files...');
  clientFiles.forEach(file => {
    const sourcePath = path.join(sourceDir, file.source);
    const destPath = path.join(destDir, file.dest);
    copyFile(sourcePath, destPath);
  });

  console.log('\nCopying server files...');
  serverFiles.forEach(file => {
    const sourcePath = path.join(sourceDir, file.source);
    const destPath = path.join(destDir, file.dest);
    copyFile(sourcePath, destPath);
  });

  console.log('\nFile copying complete!');
}

// Run the copy process
copyFiles(); 