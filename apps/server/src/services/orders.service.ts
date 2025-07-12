import { IOrderStatus, Order, OrderDrink } from "@yellow-ladder-coffee/shared-types"
import { coffeeItems } from "./drinks.service";
import { NotFoundError } from "../utils";

const orders: Order[] = [];
export class OrdersService {

    async getAllOrders(): Promise<{ data: Order[], message: string }> {
        return { data: orders, message: "All orders fetched successfully" };
    }

    async createOrder(inputOrderDrinks: { id: string, size: string }[]): Promise<{ data: Order | null, message: string }> {

        const orderDrinks: OrderDrink[] = []

        inputOrderDrinks.map(inputOrderDrink => {
            const drink = coffeeItems.find(drink => drink.id === inputOrderDrink.id);
            if (!drink)
                throw new NotFoundError(`Drink ${inputOrderDrink.id} not found`);

            const { prices, ...drinkWithoutPrices } = drink;
            const price = drink?.prices.find(price => price.size === inputOrderDrink.size)?.price;
            if (!price)
                throw new NotFoundError(`Drink size ${inputOrderDrink.size} of drink ${inputOrderDrink.id} not found`);

            if (drink && price) {
                orderDrinks.push({ ...drinkWithoutPrices, price, size: inputOrderDrink.size })
            }
        })

        const order = {
            id: Math.random().toString(36).substring(2, 15),
            orderDrinks,
            status: IOrderStatus.PENDING,
            orderTimestamp: new Date().toISOString(),
        }
        orders.push(order)

        console.log(order)

        return { data: order, message: "Order created successfully" };
    }

    async changeStatus(orderId: string, status: IOrderStatus): Promise<{ data: Order | null, message: string }> {

        const orderIndex = orders.findIndex(order => order.id === orderId);
        if (orderIndex === -1)
            throw new NotFoundError(`Order ${orderId} not found`);

        orders[orderIndex].status = status;

        return { data: orders[orderIndex], message: "Order status updated successfully" };
    }
}