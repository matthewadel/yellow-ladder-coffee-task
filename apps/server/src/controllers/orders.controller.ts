import { Request, Response } from "express";
import { asyncWrapper } from "../middlewares";
import { OrdersService } from "../services";
import { sendSuccessResponse } from "../utils";
import { Order } from "@yellow-ladder-coffee/shared-types";

export class OrdersController {
    private readonly ordersService: OrdersService = new OrdersService();

    getAllOrders = asyncWrapper(async (req: Request, res: Response) => {
        const response = await this.ordersService.getAllOrders();
        sendSuccessResponse<Order>({
            res,
            ...response
        });
    });

    createOrder = asyncWrapper(async (req: Request, res: Response) => {
        const response = await this.ordersService.createOrder(req.body.orderDrinks);
        sendSuccessResponse<Order>({
            res,
            ...response
        });
    });

    changeStatus = asyncWrapper(async (req: Request, res: Response) => {
        const response = await this.ordersService.changeStatus(req.params.id, req.body.status);
        sendSuccessResponse<Order>({
            res,
            ...response
        });
    });

}