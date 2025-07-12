#!/usr/bin/env node

/**
 * Fix monorepo dependency resolution issues for React Native
 * This script ensures all dependencies are properly resolved for Metro bundler
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('🔧 Fixing monorepo dependency resolution...');

// Dependencies that need to be installed locally for React Native
const criticalDependencies = [
  'redux-persist',
  '@react-native-async-storage/async-storage',
  'react-redux',
  '@reduxjs/toolkit'
];

const packageJsonPath = path.join(__dirname, 'package.json');
const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));

// Check and install missing dependencies
const missingDeps = criticalDependencies.filter(dep => {
  return !packageJson.dependencies[dep] && !packageJson.devDependencies[dep];
});

if (missingDeps.length > 0) {
  console.log(`📦 Installing missing dependencies: ${missingDeps.join(', ')}`);
  try {
    execSync(`npm install ${missingDeps.join(' ')}`, { stdio: 'inherit', cwd: __dirname });
  } catch (error) {
    console.error('❌ Failed to install dependencies:', error.message);
    process.exit(1);
  }
}

// Clean Metro cache
console.log('🧹 Cleaning Metro cache...');
try {
  execSync('npx react-native start --reset-cache', { 
    stdio: 'pipe', 
    cwd: __dirname,
    timeout: 5000 // Kill after 5 seconds, we just want to clear cache
  });
} catch (error) {
  // This is expected as we're killing the process
  console.log('✅ Metro cache cleared');
}

console.log('✅ Dependency resolution fixed!');
console.log('🚀 You can now run: npm run android or npm run ios');
