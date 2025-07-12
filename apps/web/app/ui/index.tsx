// Common UI Components
import React, { ReactNode } from 'react';

// Types
export interface ButtonProps {
    children: ReactNode;
    onClick: () => void;
    className?: string;
    variant?: 'primary' | 'secondary' | 'danger' | 'success';
    size?: 'sm' | 'md' | 'lg';
    disabled?: boolean;
    type?: 'button' | 'submit' | 'reset';
}

export interface CardProps {
    children: ReactNode;
    className?: string;
    padding?: 'sm' | 'md' | 'lg';
}

export interface BadgeProps {
    children: ReactNode;
    variant?: 'success' | 'warning' | 'danger' | 'info' | 'neutral';
    size?: 'sm' | 'md' | 'lg';
}

// Reusable Button Component
export const Button = ({
    children,
    onClick,
    className = '',
    variant = 'primary',
    size = 'md',
    disabled = false,
    type = 'button'
}: ButtonProps) => {
    const baseClasses = 'rounded-lg font-medium transition-colors flex items-center justify-center gap-2 focus:outline-none focus:ring-2 focus:ring-offset-2';
    
    const variants = {
        primary: 'bg-orange-500 text-white hover:bg-orange-600 focus:ring-orange-500',
        secondary: 'border border-gray-300 text-gray-700 bg-white hover:bg-gray-50 focus:ring-gray-500',
        danger: 'bg-red-500 text-white hover:bg-red-600 focus:ring-red-500',
        success: 'bg-green-500 text-white hover:bg-green-600 focus:ring-green-500'
    };

    const sizes = {
        sm: 'px-3 py-1.5 text-sm',
        md: 'px-4 py-2 text-sm',
        lg: 'px-6 py-3 text-base'
    };

    const disabledClasses = disabled ? 'opacity-50 cursor-not-allowed' : '';

    return (
        <button
            type={type}
            onClick={disabled ? undefined : onClick}
            disabled={disabled}
            className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${disabledClasses} ${className}`}
        >
            {children}
        </button>
    );
};

// Reusable Card Component
export const Card = ({ children, className = '', padding = 'md' }: CardProps) => {
    const baseClasses = 'bg-white border border-gray-200 rounded-xl';
    
    const paddingClasses = {
        sm: 'p-4',
        md: 'p-6',
        lg: 'p-8'
    };

    return (
        <div className={`${baseClasses} ${paddingClasses[padding]} ${className}`}>
            {children}
        </div>
    );
};

// Reusable Badge Component
export const Badge = ({ children, variant = 'neutral', size = 'md' }: BadgeProps) => {
    const baseClasses = 'inline-flex items-center font-medium rounded-full';
    
    const variants = {
        success: 'bg-green-100 text-green-800',
        warning: 'bg-yellow-100 text-yellow-800',
        danger: 'bg-red-100 text-red-800',
        info: 'bg-blue-100 text-blue-800',
        neutral: 'bg-gray-100 text-gray-800'
    };

    const sizes = {
        sm: 'px-2 py-0.5 text-xs',
        md: 'px-2.5 py-1 text-sm',
        lg: 'px-3 py-1.5 text-base'
    };

    return (
        <span className={`${baseClasses} ${variants[variant]} ${sizes[size]}`}>
            {children}
        </span>
    );
};

// Currency formatter utility
export const formatCurrency = (amount: number, currency = '£'): string => {
    return `${currency}${amount.toFixed(2)}`;
};

// Date formatter utilities
export const formatDate = (date: string | Date): string => {
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    return dateObj.toLocaleDateString('en-US', {
        month: 'numeric',
        day: 'numeric',
        year: 'numeric'
    });
};

export const formatTime = (date: string | Date): string => {
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    return dateObj.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
    });
};

// Common color palettes
export const colorPalette = {
    primary: {
        50: '#FFF7ED',
        100: '#FFEDD5',
        500: '#F97316',
        600: '#EA580C',
        900: '#9A3412'
    },
    success: {
        100: '#DCFCE7',
        500: '#22C55E',
        800: '#166534'
    },
    warning: {
        100: '#FEF3C7',
        500: '#F59E0B',
        800: '#92400E'
    },
    danger: {
        100: '#FEE2E2',
        500: '#EF4444',
        800: '#991B1B'
    }
};

export * from './ErrorAlert'
export * from './LoadingState'