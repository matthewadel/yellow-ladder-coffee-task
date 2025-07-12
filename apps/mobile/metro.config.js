const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config');
const path = require('path');

/**
 * Metro configuration for monorepo
 * https://reactnative.dev/docs/metro
 *
 * @type {import('@react-native/metro-config').MetroConfig}
 */
const config = {
  // Watch for changes in packages
  watchFolders: [
    path.resolve(__dirname, '../../packages'),
    path.resolve(__dirname, '../../node_modules'),
  ],
  resolver: {
    // Search for modules in both local and root node_modules
    nodeModulesPaths: [
      path.resolve(__dirname, 'node_modules'),
      path.resolve(__dirname, '../../node_modules'),
    ],
    // Ensure we can resolve packages from both locations
    disableHierarchicalLookup: false,
    // Explicitly define how to handle workspace packages
    alias: {
      '@yellow-ladder-coffee/types': path.resolve(__dirname, '../../packages/types/src'),
      '@yellow-ladder-coffee/api-request': path.resolve(__dirname, '../../packages/api-request/src'),
    },
    // Additional extensions to resolve
    sourceExts: ['js', 'jsx', 'ts', 'tsx', 'json'],
    // Platforms to resolve
    platforms: ['native', 'android', 'ios'],
  },
  // Make Metro more resilient to monorepo issues
  transformer: {
    getTransformOptions: async () => ({
      transform: {
        experimentalImportSupport: false,
        inlineRequires: true,
      },
    }),
  },
  // Cache configuration
  resetCache: true,
};

module.exports = mergeConfig(getDefaultConfig(__dirname), config);
