import { IOrderStatus, Order } from "@yellow-ladder-coffee/types";


export interface OrderStats {
  totalOrders: number;
  pendingOrdersCount: number;
  totalRevenue: number;
  avgOrderValue: number;
  completedOrders: number;
  cancelledOrders: number;
}

export const calculateOrderStats = (orders: Order[]): OrderStats => {
  const pendingOrders = orders.filter(order => order.status === IOrderStatus.PENDING);
  const completedOrders = orders.filter(order => order.status === IOrderStatus.COMPLETED);
  const cancelledOrders = orders.filter(order => order.status === IOrderStatus.CANCELLED);

  const totalRevenue = completedOrders.reduce((sum, order) => sum + (order.total || 0), 0);
  const avgOrderValue = completedOrders.length > 0 ? totalRevenue / completedOrders.length : 0;

  return {
    totalOrders: orders.length,
    pendingOrdersCount: pendingOrders.length,
    totalRevenue,
    avgOrderValue,
    completedOrders: completedOrders.length,
    cancelledOrders: cancelledOrders.length
  };
};

export const getOrdersByStatus = (orders: Order[], status: IOrderStatus): Order[] => {
  return orders.filter(order => order.status === status);
};

export const getTotalRevenue = (orders: Order[], includeStatuses: IOrderStatus[] = [IOrderStatus.COMPLETED]): number => {
  return orders
    .filter(order => includeStatuses.includes(order.status || IOrderStatus.COMPLETED))
    .reduce((sum, order) => sum + (order.total || 0), 0);
};

export const getOrdersInDateRange = (orders: Order[], startDate: Date, endDate: Date): Order[] => {
  return orders.filter(order => {
    const orderDate = new Date(order.orderTimestamp || "");
    return orderDate >= startDate && orderDate <= endDate;
  });
};
