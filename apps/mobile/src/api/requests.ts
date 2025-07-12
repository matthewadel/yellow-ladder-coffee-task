import { Platform } from 'react-native';

// Use 10.0.2.2 for Android simulator, localhost for iOS simulator and web
const getBaseUrl = () => {
  if (Platform.OS === 'android') {
    return 'http://10.0.2.2:5001';
  }
  return 'http://localhost:5001';
};

const domain = getBaseUrl();
export const getDrinksAPI = `${domain}/api/drinks`;
export const createOrderAPI = `${domain}/api/orders`;