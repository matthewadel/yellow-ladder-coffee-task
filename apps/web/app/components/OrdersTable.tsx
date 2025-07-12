'use client';

import { IOrderStatus, Order } from '@yellow-ladder-coffee/types';
import { useState, useEffect, useRef } from 'react';
import { HiRefresh, HiDownload, HiChevronDown, HiDocumentText, HiCode, HiDotsVertical, HiCheck, HiX } from 'react-icons/hi';

interface OrdersTableProps {
    orders: Order[];
    onUpdateOrderStatus: (orderId: string, newStatus: IOrderStatus) => void;
    onRefresh?: () => Promise<void> | void;
    isLoading?: boolean;
}

interface ExportOption {
    label: string;
    icon: React.ReactNode;
    action: () => void;
}

interface ActionButton {
    label: string;
    icon: React.ReactNode;
    onClick: () => void;
    className: string;
}

interface DropdownMenuProps {
    isOpen: boolean;
    onClose: () => void;
    options: (ExportOption | ActionButton)[];
    className?: string;
}

// Reusable Components
const Button = ({
    children,
    onClick,
    className = "",
    variant = "primary",
    disabled = false
}: {
    children: React.ReactNode;
    onClick: () => void;
    className?: string;
    variant?: "primary" | "secondary";
    disabled?: boolean;
}) => {
    const baseClass = "px-4 py-2 rounded-lg transition-colors flex items-center gap-2";
    const variants = {
        primary: "bg-orange-500 text-white hover:bg-orange-600",
        secondary: "border border-gray-300 text-gray-700 hover:bg-gray-50"
    };

    const disabledClass = disabled ? "opacity-50 cursor-not-allowed" : "";

    return (
        <button
            onClick={disabled ? undefined : onClick}
            disabled={disabled}
            className={`${baseClass} ${variants[variant]} ${disabledClass} ${className}`}
        >
            {children}
        </button>
    );
};

const DropdownMenu = ({ isOpen, onClose, options, className = "" }: DropdownMenuProps) => {
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!isOpen) return;

        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                onClose();
            }
        };

        // Add event listener to document
        document.addEventListener('mousedown', handleClickOutside);
        
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    return (
        <div 
            ref={dropdownRef}
            className={`absolute right-0 top-12 z-20 bg-white border border-gray-200 rounded-lg shadow-lg py-1 min-w-[160px] ${className}`}
        >
            {options.map((option, index) => (
                <button
                    key={index}
                    onClick={() => {
                        if ('action' in option) {
                            option.action();
                        } else {
                            option.onClick();
                        }
                        onClose();
                    }}
                    className={
                        'className' in option ? option.className :
                            "w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2"
                    }
                >
                    {option.icon}
                    {option.label}
                </button>
            ))}
        </div>
    );
};

const StatusBadge = ({ status }: { status?: IOrderStatus }) => {
    const statusStyles = {
        [IOrderStatus.COMPLETED]: 'bg-green-100 text-green-800',
        [IOrderStatus.PENDING]: 'bg-yellow-100 text-yellow-800',
        [IOrderStatus.CANCELLED]: 'bg-red-100 text-red-800'
    };

    const defaultStyle = 'bg-gray-100 text-gray-800';
    return (
        <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${status ? statusStyles[status] : defaultStyle}`}>
            {status ?? 'Unknown'}
        </span>
    );
};

const TableHeader = ({ children }: { children: React.ReactNode }) => (
    <th className="text-left py-3 px-6 text-xs font-medium text-gray-500 uppercase tracking-wider">
        {children}
    </th>
);

const TableCell = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
    <td className={`py-4 px-6 ${className}`}>
        {children}
    </td>
);

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

export function OrdersTable({ orders, onUpdateOrderStatus, isLoading = false }: OrdersTableProps) {
    const [openMenu, setOpenMenu] = useState<string | null>(null);
    const [exportMenuOpen, setExportMenuOpen] = useState(false);

    const handleUpdateStatus = (orderId: string, newStatus: IOrderStatus) => {
        onUpdateOrderStatus(orderId, newStatus);
        setOpenMenu(null);
    };

    const createExportData = () => {
        return orders.map(order => ({
            orderId: order.id,
            date: order.orderTimestamp,
            time: order.orderTimestamp,
            items: order.orderDrinks,
            total: order.total,
            status: order.status,
            timestamp: order.orderTimestamp
        }));
    };

    const handleExport = () => {
        const headers = ['Order ID', 'Date', 'Time', 'Items', 'Total', 'Status'];
        const csvContent = [
            headers.join(','),
            ...orders.map(order => {
                const itemsString = order.orderDrinks?.map(item => `${item.name} (£${item.price.toFixed(2)})`).join('; ');
                return [
                    order.id,
                    order.orderTimestamp,
                    order.orderTimestamp,
                    `"${itemsString}"`,
                    `£${order.total?.toFixed(2)}`,
                    order.status
                ].join(',');
            })
        ].join('\n');

        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        downloadFile(blob, `orders-export-${new Date().toISOString().split('T')[0]}.csv`);
    };

    const handleExportJSON = () => {
        const jsonData = createExportData();
        const jsonContent = JSON.stringify(jsonData, null, 2);
        const blob = new Blob([jsonContent], { type: 'application/json;charset=utf-8;' });
        downloadFile(blob, `orders-export-${new Date().toISOString().split('T')[0]}.json`);
    };

    const handleRefresh = async () => {
        // if (onRefresh) {
        //     await onRefresh();
        // } else {
        window.location.reload();
        // }
    };

    // Configuration data
    const exportOptions: ExportOption[] = [
        {
            label: "Export as CSV",
            icon: <HiDocumentText className="w-4 h-4" />,
            action: handleExport
        },
        {
            label: "Export as JSON",
            icon: <HiCode className="w-4 h-4" />,
            action: handleExportJSON
        }
    ];

    const getStatusActions = (orderId: string): ActionButton[] => [
        {
            label: "Complete",
            icon: <HiCheck className="w-4 h-4" />,
            onClick: () => handleUpdateStatus(orderId, IOrderStatus.COMPLETED),
            className: "w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-green-50 hover:text-green-700 flex items-center gap-2"
        },
        {
            label: "Cancel",
            icon: <HiX className="w-4 h-4" />,
            onClick: () => handleUpdateStatus(orderId, IOrderStatus.CANCELLED),
            className: "w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-red-50 hover:text-red-700 flex items-center gap-2"
        }
    ];

    return (
        <div className="bg-white rounded-xl border border-gray-200 h-full flex flex-col flex-1 min-h-0">
            <div className="flex justify-between items-center p-6 border-b border-gray-200 flex-shrink-0">
                <h2 className="text-lg font-semibold text-gray-900">Recent Orders</h2>
                <div className="flex gap-3">
                    <Button onClick={handleRefresh} variant="primary" disabled={isLoading}>
                        <HiRefresh className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
                        {isLoading ? 'Refreshing...' : 'Refresh'}
                    </Button>

                    <div className="relative">
                        <Button onClick={() => setExportMenuOpen(!exportMenuOpen)} variant="secondary">
                            <HiDownload className="w-4 h-4" />
                            Export
                            <HiChevronDown className="w-4 h-4" />
                        </Button>

                        <DropdownMenu
                            isOpen={exportMenuOpen}
                            onClose={() => setExportMenuOpen(false)}
                            options={exportOptions}
                        />
                    </div>
                </div>
            </div>

            <div className="flex-1 overflow-auto">
                <table className="w-full">
                    <thead className="bg-gray-50 sticky top-0">
                        <tr>
                            <TableHeader>Order ID</TableHeader>
                            <TableHeader>Timestamp</TableHeader>
                            <TableHeader>Items</TableHeader>
                            <TableHeader>Total</TableHeader>
                            <TableHeader>Status</TableHeader>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {orders.map((order) => (
                            <tr key={order.id} className="hover:bg-yellow-50 transition-colors cursor-pointer">
                                <TableCell>
                                    <span className="text-sm font-medium text-gray-900">{order.id}</span>
                                </TableCell>
                                <TableCell>
                                    {new Date(order.orderTimestamp || "").toLocaleDateString('en-US', {
                                        year: 'numeric',
                                        month: 'short',
                                        day: 'numeric'
                                    })}
                                    <div className="text-sm text-gray-500">{new Date(order.orderTimestamp || "").toLocaleTimeString('en-US', {
                                        hour: '2-digit',
                                        minute: '2-digit',
                                        hour12: true
                                    })}</div>
                                </TableCell>
                                <TableCell>
                                    <div className="space-y-1">
                                        {order.orderDrinks?.map((item, itemIndex) => (
                                            <div key={itemIndex} className="flex justify-between text-sm">
                                                <span className="text-gray-900">{item.name} <span className='text-orange-600'>({item.size})</span></span>
                                                <span className="text-orange-600 font-medium">£{item.price.toFixed(2)}</span>
                                            </div>
                                        ))}
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <span className="text-sm font-semibold text-gray-900">£{order.total?.toFixed(2)}</span>
                                </TableCell>
                                <TableCell>
                                    <div className="flex items-center justify-between">
                                        <StatusBadge status={order.status} />

                                        {order.status === IOrderStatus.PENDING && (
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

                                                <DropdownMenu
                                                    isOpen={openMenu === order.id}
                                                    onClose={() => setOpenMenu(null)}
                                                    options={getStatusActions(order.id)}
                                                    className="top-1/2 -translate-y-1/2 min-w-[120px]"
                                                />
                                            </div>
                                        )}
                                    </div>
                                </TableCell>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
