import { useState, useEffect, useCallback } from 'react';
import { IOrderStatus, Order } from '@yellow-ladder-coffee/shared-types'

export const useOrders = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchOrders = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch('http://localhost:5001/api/orders');
      if (!response.ok) {
        throw new Error(`Failed to fetch orders: ${response.status}`);
      }

      const data = await response.json();
      setOrders(data.data || []);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to load orders';
      setError(errorMessage);
      console.error('Error loading orders:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  const refreshOrders = useCallback(async () => {
    await fetchOrders();
  }, [fetchOrders]);

  const updateOrderStatus = useCallback(async (orderId: string, newStatus: IOrderStatus) => {
    try {
      // Optimistically update the UI
      setOrders(prev => prev.map(order =>
        order.id === orderId ? { ...order, status: newStatus } : order
      ));

      // Send request to server
      const response = await fetch(`http://localhost:5001/api/orders/${orderId}/change-status`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: newStatus }),
      });

      if (!response.ok) {
        throw new Error(`Failed to update order status: ${response.status}`);
      }
    } catch (err) {
      // Revert the optimistic update on error
      setOrders(prev => prev.map(order =>
        order.id === orderId ? { ...order, status: order.status } : order
      ));
      
      const errorMessage = err instanceof Error ? err.message : 'Failed to update order status';
      setError(errorMessage);
      console.error('Error updating order status:', err);
    }
  }, []);

  // Fetch orders on component mount
  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  return {
    orders,
    loading,
    error,
    refreshOrders,
    updateOrderStatus
  };
};
