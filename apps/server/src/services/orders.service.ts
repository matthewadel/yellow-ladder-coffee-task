import { Orders } from "@yellow-ladder-coffee/shared-types"

export class OrdersService {

    async getAllOrders(): Promise<{ data: Orders[] }> {
        return { data: [] }
    }
    async createOrder(): Promise<{ data: Orders | null }> {
        return { data: null }
    }
}