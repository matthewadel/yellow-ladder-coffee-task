"use client"
import { useState } from 'react';
import { OrdersTable, Order, OrderStatus, StatsCards } from './components';

// Mock data for the dashboard
const initialOrders: Order[] = [
  {
    id: 'ORD-170384690234',
    timestamp: '1/15/2024 02:15 PM',
    items: [
      { name: 'Iced Americano (Large)', price: 4.00 },
      { name: 'Iced Americano (Large)', price: 4.00 }
    ],
    total: 8.00,
    status: 'Completed'
  },
  {
    id: 'ORD-170384679123',
    timestamp: '1/15/2024 02:10 PM',
    items: [
      { name: 'Espresso (Small)', price: 2.20 },
      { name: 'Espresso (Small)', price: 2.20 },
      { name: 'Latte (Medium)', price: 3.90 }
    ],
    total: 8.30,
    status: 'Completed'
  },
  {
    id: 'ORD-170384679012',
    timestamp: '1/15/2024 02:05 PM',
    items: [
      { name: 'Latte (Large)', price: 4.30 },
      { name: 'Iced Americano (Medium)', price: 3.60 }
    ],
    total: 7.90,
    status: 'Pending'
  },
  {
    id: 'ORD-170384567901',
    timestamp: '1/15/2024 02:00 PM',
    items: [
      { name: 'Espresso (Small)', price: 2.20 }
    ],
    total: 2.20,
    status: 'Completed'
  },
  {
    id: 'ORD-170384234568',
    timestamp: '1/15/2024 01:45 PM',
    items: [
      { name: 'Latte (Large)', price: 4.30 },
      { name: 'Latte (Large)', price: 4.30 },
      { name: 'Espresso (Small)', price: 2.20 },
      { name: 'Iced Americano (Medium)', price: 3.60 }
    ],
    total: 14.40,
    status: 'Completed'
  },
  {
    id: 'ORD-170384123457',
    timestamp: '1/15/2024 01:40 PM',
    items: [
      { name: 'Espresso (Small)', price: 2.20 },
      { name: 'Latte (Small)', price: 3.50 }
    ],
    total: 5.70,
    status: 'Pending'
  },
  {
    id: 'ORD-170384098765',
    timestamp: '1/15/2024 01:35 PM',
    items: [
      { name: 'Cappuccino (Large)', price: 4.50 },
      { name: 'Croissant', price: 2.80 }
    ],
    total: 7.30,
    status: 'Cancelled'
  }
];

export default function Home() {
  const [orders, setOrders] = useState<Order[]>(initialOrders);

  const updateOrderStatus = (orderId: string, newStatus: OrderStatus) => {
    setOrders(prev => prev.map(order =>
      order.id === orderId ? { ...order, status: newStatus } : order
    ));
  };

  // Calculate statistics
  const pendingOrdersCount = orders.filter(order => order.status === 'Pending').length;
  const totalRevenue = orders
    .filter(order => order.status === 'Completed')
    .reduce((sum, order) => sum + order.total, 0);
  const avgOrderValue = orders.length > 0 ? totalRevenue / orders.length : 0;

  return (
    <div className="p-6">
      <StatsCards
        totalOrders={orders.length}
        totalRevenue={totalRevenue}
        pendingOrdersCount={pendingOrdersCount}
        avgOrderValue={avgOrderValue}
      />

      <OrdersTable
        orders={orders}
        onUpdateOrderStatus={updateOrderStatus}
      />
    </div>
  )
}
