import { Order, IOrderStatus, Drink } from '@yellow-ladder-coffee/types';

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

// API Options interface
export interface ApiOptions {
  baseUrl?: string;
}

// Default base URL
const DEFAULT_BASE_URL = 'http://localhost:5001';


// Get all drinks
export async function getDrinks(options: ApiOptions = {}): Promise<Drink[]> {
  const baseUrl = options.baseUrl || DEFAULT_BASE_URL;
  const response = await request<ApiResponse<Drink[]>>(`${baseUrl}/api/drinks`, { method: 'GET' });
  return response.data;
}

// Get all orders
export async function getOrders(options: ApiOptions = {}): Promise<Order[]> {
  const baseUrl = options.baseUrl || DEFAULT_BASE_URL;
  const response = await request<ApiResponse<Order[]>>(`${baseUrl}/api/orders`, { method: 'GET' });
  return response.data;
}

// Update order status
export async function updateOrderStatus(orderId: string, status: IOrderStatus, options: ApiOptions = {}): Promise<Order> {
  const baseUrl = options.baseUrl || DEFAULT_BASE_URL;
  const response = await request<ApiResponse<Order>>(`${baseUrl}/api/orders/${orderId}/change-status`, { method: 'POST', body: { status } });
  return response.data;
}

// Create a new order
export async function createOrder(orderData: { orderDrinks: { id: string, size: string }[] }, options: ApiOptions = {}): Promise<Order> {
  const baseUrl = options.baseUrl || DEFAULT_BASE_URL;
  const response = await request<ApiResponse<Order>>(`${baseUrl}/api/orders`, { method: 'POST', body: orderData });
  return response.data;
}



