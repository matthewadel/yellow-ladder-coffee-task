'use client';

import Image from "next/image";

// Types
interface StatusIndicatorProps {
    isOnline?: boolean;
    size?: 'sm' | 'md' | 'lg';
}

interface LogoProps {
    size?: number;
    showText?: boolean;
}

interface LastUpdatedProps {
    timestamp?: Date;
    label?: string;
}

// Reusable Components
const StatusIndicator = ({ isOnline = true, size = 'sm' }: StatusIndicatorProps) => {
    const sizeClasses = {
        sm: 'w-3 h-3',
        md: 'w-4 h-4',
        lg: 'w-5 h-5'
    };

    return (
        <div className={`${sizeClasses[size]} ${isOnline ? 'bg-green-500' : 'bg-red-500'} rounded-full`}></div>
    );
};

const Logo = ({ size = 30, showText = true }: LogoProps) => (
    <div className="flex items-center gap-3">
        <Image src={'/cup.png'} alt="cup" width={size} height={size} />
        {showText && (
            <div>
                <h1 className="text-xl font-semibold text-white">yellow ladder coffee Dashboard</h1>
                <p className="text-sm text-[#FEF2C7] mt-2">Order Management System</p>
            </div>
        )}
    </div>
);

const LastUpdated = ({ timestamp = new Date(), label = "Last Updated" }: LastUpdatedProps) => (
    <div className="text-right flex-col items-end">
        <p className="text-sm text-[#FEF2C7]">{label}</p>
        <span className="text-right text-sm font-medium text-white mt-2">
            {timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </span>
    </div>
);

const SystemStatus = ({ isOnline = true, lastUpdated }: { isOnline?: boolean; lastUpdated?: Date }) => (
    <div className="flex items-center gap-4">
        <LastUpdated timestamp={lastUpdated} />
        <StatusIndicator isOnline={isOnline} />
    </div>
);

// Constants
const HEADER_CONFIG = {
    backgroundColor: 'bg-amber-900',
    borderStyle: 'border-b border-gray-200',
    padding: 'px-6 py-4',
    brandColors: {
        primary: 'text-white',
        secondary: 'text-[#FEF2C7]'
    }
};

export function Header() {
    return (
        <header className={`${HEADER_CONFIG.backgroundColor} ${HEADER_CONFIG.borderStyle} ${HEADER_CONFIG.padding}`}>
            <div className="flex justify-between items-center">
                <Logo />
                <SystemStatus />
            </div>
        </header>
    );
}
