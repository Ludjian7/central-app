#!/usr/bin/env node

const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs');

// Function to execute commands and log output
function executeCommand(command, directory = __dirname) {
  console.log(`Running: ${command} in ${directory}`);
  try {
    execSync(command, { cwd: directory, stdio: 'inherit' });
  } catch (error) {
    console.error(`Error executing command: ${command}`);
    console.error(error);
    process.exit(1);
  }
}

// Main setup function
async function setup() {
  console.log('Setting up Central Computers Demo for Vercel deployment...\n');
  
  // Install root dependencies
  console.log('Installing root dependencies...');
  executeCommand('npm install');
  
  // Create client directories if they don't exist
  const clientDir = path.join(__dirname, 'client');
  if (!fs.existsSync(clientDir)) {
    console.log('Creating client directory...');
    fs.mkdirSync(clientDir, { recursive: true });
  }
  
  // Install client dependencies
  console.log('\nInstalling client dependencies...');
  executeCommand('npm install', clientDir);
  
  // Prepare Vercel deployment
  console.log('\nPreparing Vercel deployment structure...');
  executeCommand('node prepare-vercel-deploy.js');
  
  console.log('\nSetup complete! Ready for Vercel deployment.');
  console.log('\nTo run the project locally:');
  console.log('  npm run dev');
  console.log('\nTo deploy to Vercel, follow the instructions in VERCEL_DEPLOYMENT.md');
}

// Run setup
setup().catch(error => {
  console.error('Setup failed:', error);
  process.exit(1);
}); 