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

export interface OrdersState {
    id: string
    order: OrderItem[]
    orderTimestamp: string | undefined

}