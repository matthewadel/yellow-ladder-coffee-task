import { HttpClient, createHttpClient } from './httpClient';
import { Order, IOrderStatus } from './index';

// API Response interfaces
export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

export interface OrdersApiResponse extends ApiResponse<Order[]> {}
export interface OrderApiResponse extends ApiResponse<Order> {}

// Coffee Orders API Client
export class CoffeeOrdersApi {
  private httpClient: HttpClient;

  constructor(baseUrl: string = 'http://localhost:5001/api') {
    this.httpClient = createHttpClient({ baseUrl });
  }

  // Get all orders
  async getOrders(): Promise<Order[]> {
    const response = await this.httpClient.get<OrdersApiResponse>('/orders');
    return response.data.data;
  }

  // Get a specific order
  async getOrder(orderId: string): Promise<Order> {
    const response = await this.httpClient.get<OrderApiResponse>(`/orders/${orderId}`);
    return response.data.data;
  }

  // Update order status
  async updateOrderStatus(orderId: string, status: IOrderStatus): Promise<Order> {
    const response = await this.httpClient.post<OrderApiResponse>(
      `/orders/${orderId}/change-status`,
      { status }
    );
    return response.data.data;
  }

  // Create a new order (if needed)
  async createOrder(orderData: Omit<Order, 'id'>): Promise<Order> {
    const response = await this.httpClient.post<OrderApiResponse>('/orders', orderData);
    return response.data.data;
  }

  // Delete an order (if needed)
  async deleteOrder(orderId: string): Promise<void> {
    await this.httpClient.delete(`/orders/${orderId}`);
  }
}

// Default instance for immediate use
export const coffeeOrdersApi = new CoffeeOrdersApi();

// Factory function for creating configured instances
export const createCoffeeOrdersApi = (baseUrl?: string): CoffeeOrdersApi => {
  return new CoffeeOrdersApi(baseUrl);
};
