import { Request, Response } from "express";
import { asyncWrapper } from "../middlewares";
import { OrdersService } from "../services";
import { sendSuccessResponse } from "../utils";
import { Drink, Orders } from "@yellow-ladder-coffee/shared-types";

export class OrdersController {
    private readonly ordersService: OrdersService = new OrdersService();

    getAllOrders = asyncWrapper(async (req: Request, res: Response) => {
        const response = await this.ordersService.getAllOrders();
        sendSuccessResponse<Orders>({
            res,
            ...response
        });
    });

    createOrder = asyncWrapper(async (req: Request, res: Response) => {
        const response = await this.ordersService.createOrder();
        sendSuccessResponse<Orders>({
            res,
            ...response
        });
    });

}