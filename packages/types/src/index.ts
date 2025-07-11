export interface OrderDrink {
    id: string;
    name: string;
    size: string;
    price: number;
}

export interface Drink {
    id: string;
    name: string;
    description: string;
    prices: { size: string, price: number }[]
}

export interface Order {
    id: string
    orderDrinks: OrderDrink[]
    orderTimestamp: string | undefined
    status?: IOrderStatus
    total?: number
}

export enum IOrderStatus {
    PENDING = 'PENDING',
    COMPLETED = 'COMPLETED',
    CANCELLED = 'CANCELLED'
} 