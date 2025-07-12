# Monorepo Dependency Resolution Fix

This document explains the solution implemented to fix React Native dependency resolution issues in a monorepo setup.

## Problem

In monorepos, npm workspaces often hoist dependencies to the root `node_modules`, but React Native's Metro bundler expects certain dependencies to be in the local `node_modules` directory of the mobile app.

This causes errors like:
```
Unable to resolve module redux-persist/integration/react from /path/to/App.tsx
```

## Solution

### 1. Local Dependency Installation

Critical React Native dependencies are installed directly in the mobile app:

```bash
npm install redux-persist @react-native-async-storage/async-storage react-redux @reduxjs/toolkit
```

### 2. Enhanced Metro Configuration

Updated `metro.config.js` with:
- Multiple `nodeModulesPaths` (local and root)
- Workspace package aliases
- Enhanced resolver configuration
- Cache reset capabilities

### 3. NPM Configuration

Created `.npmrc` files to:
- Control dependency hoisting behavior
- Ensure local installations when needed
- Manage peer dependency resolution

### 4. Automated Fix Script

Created `fix-deps.js` script that:
- Checks for missing critical dependencies
- Installs them locally if needed
- Clears Metro cache
- Provides clear success feedback

## Usage

### Quick Fix
```bash
npm run fix-deps
```

### Manual Steps
1. Install dependencies locally:
   ```bash
   cd apps/mobile
   npm install redux-persist @react-native-async-storage/async-storage
   ```

2. Clear Metro cache:
   ```bash
   npx react-native start --reset-cache
   ```

3. Run the app:
   ```bash
   npm run android  # or npm run ios
   ```

## Files Modified

### `/apps/mobile/metro.config.js`
- Enhanced resolver with multiple node_modules paths
- Added workspace package aliases
- Improved cache handling

### `/apps/mobile/package.json`
- Added `fix-deps` script
- Ensured critical dependencies are listed

### `/apps/mobile/.npmrc`
- Local npm configuration for the mobile app

### `/.npmrc`
- Root workspace npm configuration

### `/apps/mobile/fix-deps.js`
- Automated dependency resolution script

## Prevention

To prevent this issue in the future:

1. **Always install React Native-specific dependencies locally** in the mobile app
2. **Run `npm run fix-deps`** after adding new dependencies
3. **Clear Metro cache** when experiencing resolution issues
4. **Use the enhanced Metro config** for better monorepo support

## Dependencies Requiring Local Installation

These dependencies should always be installed in the mobile app's local `node_modules`:

- `redux-persist`
- `@react-native-async-storage/async-storage`
- `react-redux`
- `@reduxjs/toolkit`
- Any React Native-specific libraries
- Libraries with platform-specific code

## Troubleshooting

If you still encounter issues:

1. Run `npm run fix-deps`
2. Delete `node_modules` and reinstall:
   ```bash
   rm -rf node_modules
   npm install
   ```
3. Clear all caches:
   ```bash
   npx react-native start --reset-cache
   ```
4. Ensure dependencies are in local `node_modules`:
   ```bash
   ls node_modules | grep redux
   ```

This solution provides a robust, automated way to handle monorepo dependency resolution issues in React Native projects.
