export interface OrderItem {
    id: string;
    name: string;
    size: string;
    price: number;
}

export interface CoffeeItem {
    id: string;
    name: string;
    description: string;
    prices: Record<string, number>[]
}