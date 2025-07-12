import { IOrderStatus } from "@yellow-ladder-coffee/types";
import { z } from "zod";

const createOrder = z.object({
    body: z
        .object({
            orderDrinks: z.array(
                z.object({
                    id: z.string({ required_error: "Drink ID is required" }),
                    size: z.string({ required_error: "Size is required" }),
                })
            )
        })
        .strict()
})

const updateOrderStatus = z.object({
    body: z.object({
        status: z.enum(Object.values(IOrderStatus) as [string, ...string[]])
    })
});


export const ordersSchema = {
    createOrder,
    updateOrderStatus,
};
