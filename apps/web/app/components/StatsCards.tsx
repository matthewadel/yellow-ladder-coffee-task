import { FaRegCircleCheck } from "react-icons/fa6";
import { FaDollarSign } from "react-icons/fa";
import { BiTime } from "react-icons/bi";
import { HiArrowTrendingUp } from "react-icons/hi2";
import React, { ReactNode } from "react";
import { IOrderStatus, Order } from "@yellow-ladder-coffee/types";

// Types
interface StatCardData {
  title: string;
  value: string | number;
  icon: ReactNode;
  bgColor: string;
  iconColor: string;
}

// Reusable Components
const StatCard = ({ title, value, icon, bgColor, iconColor }: StatCardData) => (
  <div className="bg-white rounded-xl p-6 border border-gray-200">
    <div className="flex items-center gap-3">
      <div className={`w-10 h-10 ${bgColor} rounded-lg flex items-center justify-center`}>
        {typeof icon === 'object' && React.isValidElement(icon)
          ? React.cloneElement(icon as React.ReactElement, {
            color: iconColor,
            size: 20
          })
          : icon
        }
      </div>
      <div>
        <span className="text-sm text-gray-600">{title}</span>
        <p className="text-2xl font-bold text-gray-900">{value}</p>
      </div>
    </div>
  </div>
);

// Helper function to format currency
const formatCurrency = (amount: number): string => `£${amount.toFixed(2)}`;

// Constants
const createStatsData = (
  totalOrders: number,
  totalRevenue: number,
  pendingOrdersCount: number,
  avgOrderValue: number
): StatCardData[] => [
    {
      title: "Total Orders",
      value: totalOrders,
      icon: <FaRegCircleCheck />,
      bgColor: "bg-green-100",
      iconColor: "#22c55e"
    },
    {
      title: "Today's Revenue",
      value: formatCurrency(totalRevenue),
      icon: <FaDollarSign />,
      bgColor: "bg-blue-100",
      iconColor: "#2563eb"
    },
    {
      title: "Pending Orders",
      value: pendingOrdersCount,
      icon: <BiTime />,
      bgColor: "bg-yellow-100",
      iconColor: "#ca8a04"
    },
    {
      title: "Avg Order Value",
      value: formatCurrency(avgOrderValue),
      icon: <HiArrowTrendingUp />,
      bgColor: "bg-purple-100",
      iconColor: "#9333ea"
    }
  ];

interface OrderStats {
  totalOrders: number;
  pendingOrdersCount: number;
  totalRevenue: number;
  avgOrderValue: number;
  completedOrders: number;
  cancelledOrders: number;
}

const calculateOrderStats = (orders: Order[]): OrderStats => {
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

export function StatsCards({ orders }: { orders: Order[] }) {
  const { totalOrders, totalRevenue, pendingOrdersCount, avgOrderValue } = calculateOrderStats(orders);

  const statsData = createStatsData(totalOrders, totalRevenue, pendingOrdersCount, avgOrderValue);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {statsData.map((stat, index) => (
        <StatCard key={stat.title} {...stat} />
      ))}
    </div>
  );
}
