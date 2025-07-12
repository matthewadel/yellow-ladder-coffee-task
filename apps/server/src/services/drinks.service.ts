import { Drink } from "@yellow-ladder-coffee/shared-types";


export const coffeeItems: Drink[] = [
    {
        id: '1',
        name: 'Espresso',
        description: 'Rich, bold shot of pure coffee',
        prices: [
            { size: 'small', price: 2.0 },
            { size: 'medium', price: 2.5 },
            { size: 'large', price: 3.0 }
        ]
    },
    {
        id: '2',
        name: 'Latte',
        description: 'Smooth espresso with steamed milk',
        prices: [
            { size: 'small', price: 3.5 },
            { size: 'medium', price: 3.9 },
            { size: 'large', price: 4.3 }
        ]
    },
    {
        id: '3',
        name: 'Iced Americano',
        description: 'Espresso shots over ice with cold water',
        prices: [
            { size: 'medium', price: 2.5 },
            { size: 'large', price: 3.0 }
        ]
    },
    {
        id: '4',
        name: 'Cappuccino',
        description: 'Classic Italian blend with velvety microfoam',
        prices: [
            { size: 'small', price: 2.0 },
            { size: 'medium', price: 3.0 },
            { size: 'large', price: 3.5 }
        ]
    },
    {
        id: '5',
        name: 'Mocha',
        description: 'Rich espresso meets premium dark chocolate',
        prices: [
            { size: 'small', price: 2.0 },
            { size: 'medium', price: 3.5 },
            { size: 'large', price: 4.0 }
        ]
    },
    {
        id: '6',
        name: 'Cold Brew',
        description: '12-hour steeped coffee with natural sweetness',
        prices: [
            { size: 'small', price: 2.0 },
            { size: 'medium', price: 2.8 },
            { size: 'large', price: 3.3 }
        ]
    },
]
export class DrinksService {
    async getAllDrinks(): Promise<{ data: Drink[], message: string }> {
        return { data: coffeeItems, message: "All drinks fetched successfully" };
    }
}