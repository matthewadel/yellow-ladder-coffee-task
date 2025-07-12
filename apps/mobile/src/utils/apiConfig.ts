import { Platform } from 'react-native';

export const getApiBaseUrl = (): string | undefined => {
  // Only return a custom URL for Android, otherwise use default
  if (Platform.OS === 'android') {
    return 'http://10.0.2.2:5001';
  }
  // For iOS and other platforms, return undefined to use the default localhost:5001
  return undefined;
};

export const getApiOptions = () => {
  const baseUrl = getApiBaseUrl();
  return baseUrl ? { baseUrl } : {};
};
