'use client';

import { useState } from 'react';
import { HiRefresh, HiDownload, HiChevronDown, HiDocumentText, HiCode, HiDotsVertical, HiCheck, HiX } from 'react-icons/hi';

type OrderStatus = 'Pending' | 'Completed' | 'Cancelled';

interface Order {
    id: string;
    timestamp: string;
    items: { name: string; price: number }[];
    total: number;
    status: OrderStatus;
}

interface OrdersTableProps {
    orders: Order[];
    onUpdateOrderStatus: (orderId: string, newStatus: OrderStatus) => void;
}

export function OrdersTable({ orders, onUpdateOrderStatus }: OrdersTableProps) {
    const [openMenu, setOpenMenu] = useState<string | null>(null);
    const [exportMenuOpen, setExportMenuOpen] = useState(false);

    const formatTime = (timestamp: string) => {
        const date = new Date(timestamp);
        return date.toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: true
        });
    };

    const formatDate = (timestamp: string) => {
        const date = new Date(timestamp);
        return date.toLocaleDateString('en-US', {
            month: 'numeric',
            day: 'numeric',
            year: 'numeric'
        });
    };

    const handleUpdateStatus = (orderId: string, newStatus: OrderStatus) => {
        onUpdateOrderStatus(orderId, newStatus);
        setOpenMenu(null);
    };

    const handleExport = () => {
        // Create CSV content
        const headers = ['Order ID', 'Date', 'Time', 'Items', 'Total', 'Status'];
        const csvContent = [
            headers.join(','),
            ...orders.map(order => {
                const itemsString = order.items.map(item => `${item.name} (£${item.price.toFixed(2)})`).join('; ');
                return [
                    order.id,
                    formatDate(order.timestamp),
                    formatTime(order.timestamp),
                    `"${itemsString}"`, // Wrap in quotes to handle commas in items
                    `£${order.total.toFixed(2)}`,
                    order.status
                ].join(',');
            })
        ].join('\n');

        // Create and download the file
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        downloadFile(blob, `orders-export-${new Date().toISOString().split('T')[0]}.csv`);
        setExportMenuOpen(false);
    };

    const handleExportJSON = () => {
        // Create JSON content with formatted data
        const jsonData = orders.map(order => ({
            orderId: order.id,
            date: formatDate(order.timestamp),
            time: formatTime(order.timestamp),
            items: order.items,
            total: order.total,
            status: order.status,
            timestamp: order.timestamp
        }));

        const jsonContent = JSON.stringify(jsonData, null, 2);
        const blob = new Blob([jsonContent], { type: 'application/json;charset=utf-8;' });
        downloadFile(blob, `orders-export-${new Date().toISOString().split('T')[0]}.json`);
        setExportMenuOpen(false);
    };

    const downloadFile = (blob: Blob, filename: string) => {
        const link = document.createElement('a');

        if (link.download !== undefined) {
            const url = URL.createObjectURL(blob);
            link.setAttribute('href', url);
            link.setAttribute('download', filename);
            link.style.visibility = 'hidden';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            URL.revokeObjectURL(url);
        }
    };

    const handleRefresh = () => {
        // Simulate refresh action
        window.location.reload();
    };

    return (
        <div className="bg-white rounded-xl border border-gray-200">
            <div className="flex justify-between items-center p-6 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-900">Recent Orders</h2>
                <div className="flex gap-3">
                    <button
                        onClick={handleRefresh}
                        className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors flex items-center gap-2"
                    >
                        <HiRefresh className="w-4 h-4" />
                        Refresh
                    </button>

                    <div className="relative">
                        <button
                            onClick={() => setExportMenuOpen(!exportMenuOpen)}
                            className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2"
                        >
                            <HiDownload className="w-4 h-4" />
                            Export
                            <HiChevronDown className="w-4 h-4" />
                        </button>

                        {exportMenuOpen && (
                            <>
                                <div
                                    className="fixed inset-0 z-10"
                                    onClick={() => setExportMenuOpen(false)}
                                ></div>
                                <div className="absolute right-0 top-12 z-20 bg-white border border-gray-200 rounded-lg shadow-lg py-1 min-w-[160px]">
                                    <button
                                        onClick={handleExport}
                                        className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2"
                                    >
                                        <HiDocumentText className="w-4 h-4" />
                                        Export as CSV
                                    </button>
                                    <button
                                        onClick={handleExportJSON}
                                        className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2"
                                    >
                                        <HiCode className="w-4 h-4" />
                                        Export as JSON
                                    </button>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="text-left py-3 px-6 text-xs font-medium text-gray-500 uppercase tracking-wider">Order ID</th>
                            <th className="text-left py-3 px-6 text-xs font-medium text-gray-500 uppercase tracking-wider">Timestamp</th>
                            <th className="text-left py-3 px-6 text-xs font-medium text-gray-500 uppercase tracking-wider">Items</th>
                            <th className="text-left py-3 px-6 text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
                            <th className="text-left py-3 px-6 text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {orders.map((order) => (
                            <tr
                                key={order.id}
                                className="hover:bg-yellow-50 transition-colors cursor-pointer"
                            >
                                <td className="py-4 px-6">
                                    <span className="text-sm font-medium text-gray-900">{order.id}</span>
                                </td>
                                <td className="py-4 px-6">
                                    <div className="text-sm text-gray-900">{formatDate(order.timestamp)}</div>
                                    <div className="text-sm text-gray-500">{formatTime(order.timestamp)}</div>
                                </td>
                                <td className="py-4 px-6">
                                    <div className="space-y-1">
                                        {order.items.map((item, itemIndex) => (
                                            <div key={itemIndex} className="flex justify-between text-sm">
                                                <span className="text-gray-900">{item.name}</span>
                                                <span className="text-orange-600 font-medium">£{item.price.toFixed(2)}</span>
                                            </div>
                                        ))}
                                    </div>
                                </td>
                                <td className="py-4 px-6">
                                    <span className="text-sm font-semibold text-gray-900">£{order.total.toFixed(2)}</span>
                                </td>
                                <td className="py-4 px-6">
                                    <div className="flex items-center justify-between">
                                        <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${order.status === 'Completed'
                                                ? 'bg-green-100 text-green-800'
                                                : order.status === 'Pending'
                                                    ? 'bg-yellow-100 text-yellow-800'
                                                    : 'bg-red-100 text-red-800'
                                            }`}>
                                            {order.status}
                                        </span>

                                        {order.status === 'Pending' && (
                                            <div className="relative">
                                                <button
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        setOpenMenu(openMenu === order.id ? null : order.id);
                                                    }}
                                                    className="p-1 hover:bg-gray-100 rounded-full transition-colors"
                                                >
                                                    <HiDotsVertical className="w-4 h-4 text-gray-500" />
                                                </button>

                                                {openMenu === order.id && (
                                                    <>
                                                        <div
                                                            className="fixed inset-0 z-10"
                                                            onClick={() => setOpenMenu(null)}
                                                        ></div>
                                                        <div className="absolute right-0 top-8 z-20 bg-white border border-gray-200 rounded-lg shadow-lg py-1 min-w-[120px]">
                                                            <button
                                                                onClick={() => handleUpdateStatus(order.id, 'Completed')}
                                                                className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-green-50 hover:text-green-700 flex items-center gap-2"
                                                            >
                                                                <HiCheck className="w-4 h-4" />
                                                                Complete
                                                            </button>
                                                            <button
                                                                onClick={() => handleUpdateStatus(order.id, 'Cancelled')}
                                                                className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-red-50 hover:text-red-700 flex items-center gap-2"
                                                            >
                                                                <HiX className="w-4 h-4" />
                                                                Cancel
                                                            </button>
                                                        </div>
                                                    </>
                                                )}
                                            </div>
                                        )}
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export type { Order, OrderStatus };
