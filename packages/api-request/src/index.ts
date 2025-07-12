// Simple HTTP Client + Coffee Orders API
import { Order, IOrderStatus, Drink } from '@yellow-ladder-coffee/types';

// Simple HTTP request function
export async function request<T>(url: string, options: {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
  body?: any;
} = {}): Promise<T> {
  const { method = 'GET', body } = options;

  const requestHeaders = {
    'Content-Type': 'application/json',
  };

  const config: RequestInit = {
    method,
    headers: requestHeaders,
  };

  if (body && method !== 'GET') {
    config.body = typeof body === 'string' ? body : JSON.stringify(body);
  }

  try {
    const response = await fetch(url, config);

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
}

// API Response interfaces
export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

// Base URL for the API
const getBaseUrl = () => {
  // Check if we're in React Native environment
  try {
    // @ts-ignore
    const Platform = require('react-native').Platform;
    if (Platform.OS === 'android') {
      return 'http://10.0.2.2:5001';
    }
  } catch (e) {
    // Not in React Native environment, use localhost
  }
  return 'http://localhost:5001';
};

const BASE_URL = getBaseUrl();

// Coffee Orders API functions
export const ordersApi = {
  // Get all drinks
  async getDrinks(): Promise<Drink[]> {
    const response = await request<ApiResponse<Drink[]>>(`${BASE_URL}/api/drinks`, { method: 'GET' });
    return response.data;
  },

  // Get all orders
  async getOrders(): Promise<Order[]> {
    const response = await request<ApiResponse<Order[]>>(`${BASE_URL}/api/orders`, { method: 'GET' });
    return response.data;
  },

  // Update order status
  async updateOrderStatus(orderId: string, status: IOrderStatus): Promise<Order> {
    const response = await request<ApiResponse<Order>>(`${BASE_URL}/api/orders/${orderId}/change-status`, { method: 'POST', body: { status } });
    return response.data;
  },

  // Create a new order
  async createOrder(orderData: { orderDrinks: { id: string, size: string }[] }): Promise<Order> {
    const response = await request<ApiResponse<Order>>(`${BASE_URL}/api/orders`, { method: 'POST', body: orderData });
    return response.data;
  }
};

// Export individual functions for convenience
export const { getDrinks, getOrders, updateOrderStatus, createOrder } = ordersApi;

